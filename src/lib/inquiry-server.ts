import { Redis } from "@upstash/redis";
import nodemailer from "nodemailer";
import { z } from "zod";
import { isIP } from "node:net";
import type { Inquiry } from "./inquiry-schema";
import type { InquiryDependencies, Reservation } from "./inquiry-handler";
const configSchema = z.object({
  GMAIL_USER: z.email(),
  GMAIL_APP_PASSWORD: z.string().min(16),
  CONTACT_TO_EMAIL: z.email(),
  UPSTASH_REDIS_REST_URL: z.url().startsWith("https://"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_SECRET: z.string().min(32),
});
// All counters and submission reservations are atomic across Vercel instances.
export const reserveScript = `
local prior = redis.call('GET', KEYS[1])
if prior then
  if string.sub(prior, 1, 64) ~= ARGV[1] then return 'conflict' end
  return string.sub(prior, 66)
end
local attempts = redis.call('INCR', KEYS[2])
if attempts == 1 then redis.call('EXPIRE', KEYS[2], 900) end
if attempts > 5 then return 'limited' end
local daily = tonumber(redis.call('GET', KEYS[3]) or '0')
if daily >= 100 then return 'limited' end
redis.call('INCR', KEYS[3])
if daily == 0 then redis.call('EXPIRE', KEYS[3], 86400) end
redis.call('SET', KEYS[1], ARGV[1] .. ':pending', 'EX', 86400)
return 'reserved'
`;
export const escapeHtml = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function mailContent(data: Inquiry) {
  const rows = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["WhatsApp", data.phone || "Não informado"],
    ["Serviço", data.service],
    ["Sobre o projeto", data.message],
    ["Site atual", data.website || "Não informado"],
    ["Prazo desejado", data.timeline || "Não informado"],
  ];
  return {
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
    html: `<h1>Solicitação de orçamento</h1>${rows.map(([k, v]) => `<p><strong>${k}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`).join("")}`,
  };
}
export function serverDependencies(): InquiryDependencies {
  const config = configSchema.safeParse(process.env);
  function env() {
    if (!config.success) throw Error("Configuration unavailable");
    return config.data;
  }
  function redis() {
    return new Redis({
      url: env().UPSTASH_REDIS_REST_URL,
      token: env().UPSTASH_REDIS_REST_TOKEN,
      retry: { retries: 0 },
    });
  }
  return {
    configured: () => config.success,
    secret: () => env().RATE_LIMIT_SECRET,
    origin: (request) => {
      if (process.env.VERCEL === "1") {
        const value = request.headers
          .get("x-vercel-forwarded-for")
          ?.split(",")[0]
          ?.trim();
        return value && isIP(value) ? value : null;
      }
      return process.env.NODE_ENV === "development" ? "127.0.0.1" : null;
    },
    reserve: async (origin, id, digest) => {
      const result = await redis().eval(
        reserveScript,
        [
          `portfolio:submission:${id}`,
          `portfolio:origin:${origin}`,
          "portfolio:daily",
        ],
        [digest],
      );
      if (
        ![
          "reserved",
          "sent",
          "pending",
          "uncertain",
          "limited",
          "conflict",
        ].includes(String(result))
      )
        throw Error("Invalid reservation response");
      return result as Reservation;
    },
    complete: async (id, digest, state) => {
      await redis().set(`portfolio:submission:${id}`, `${digest}:${state}`, {
        ex: 86400,
      });
    },
    send: async (data) => {
      const e = env();
      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: e.GMAIL_USER, pass: e.GMAIL_APP_PASSWORD },
        connectionTimeout: 7000,
        greetingTimeout: 7000,
        socketTimeout: 15000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      try {
        const info = await transport.sendMail({
          from: { name: "Portfólio Pedro Sodré", address: e.GMAIL_USER },
          to: e.CONTACT_TO_EMAIL,
          replyTo: data.email,
          subject: `Solicitação de orçamento — ${data.service}`,
          ...mailContent(data),
        });
        if (!info.accepted?.length)
          throw Error("SMTP did not accept recipient");
      } finally {
        transport.close();
      }
    },
  };
}
