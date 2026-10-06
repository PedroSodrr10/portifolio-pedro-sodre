import { createHmac } from "node:crypto";
import { inquirySchema, type Inquiry } from "./inquiry-schema";
export type Reservation =
  | "reserved"
  | "sent"
  | "pending"
  | "uncertain"
  | "limited"
  | "conflict";
export interface InquiryDependencies {
  configured: () => boolean;
  secret: () => string;
  origin: (request: Request) => string | null;
  reserve: (origin: string, id: string, digest: string) => Promise<Reservation>;
  complete: (
    id: string,
    digest: string,
    state: "sent" | "uncertain",
  ) => Promise<void>;
  send: (data: Inquiry) => Promise<void>;
}
const reply = (
  status: number,
  message: string,
  extra: Record<string, unknown> = {},
) =>
  Response.json(
    { message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } },
  );
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw Error("invalid");
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 16384) {
      await reader.cancel();
      throw Error("large");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
export function createInquiryHandler(deps: InquiryDependencies) {
  return async (request: Request) => {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      return reply(403, "Origem da solicitação inválida.");
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return reply(415, "Formato de solicitação inválido.");
    if (Number(request.headers.get("content-length")) > 16384)
      return reply(413, "A solicitação ultrapassa o tamanho permitido.");
    let body: unknown;
    try {
      body = await readBody(request);
    } catch (e) {
      return reply(
        e instanceof Error && e.message === "large" ? 413 : 400,
        "Não foi possível ler a solicitação.",
      );
    }
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        errors[String(issue.path[0] ?? "form")] = issue.message;
      return reply(400, "Revise os campos informados.", { errors });
    }
    const data = parsed.data;
    if (data.company)
      return reply(400, "Não foi possível validar a solicitação.");
    if (!deps.configured())
      return reply(
        503,
        "O formulário está temporariamente indisponível. Fale comigo pelo WhatsApp ou e-mail.",
      );
    const ip = deps.origin(request);
    if (!ip)
      return reply(
        503,
        "Não foi possível proteger o envio. Use os contatos diretos.",
      );
    const hash = (v: string) =>
      createHmac("sha256", deps.secret()).update(v).digest("hex");
    const originKey = hash(ip);
    const { submissionId, ...fields } = data;
    const id = hash(submissionId);
    const digest = hash(JSON.stringify(fields));
    let state: Reservation;
    try {
      state = await deps.reserve(originKey, id, digest);
    } catch {
      return reply(
        503,
        "O envio está indisponível no momento. Tente mais tarde ou use os contatos diretos.",
      );
    }
    if (state === "limited")
      return reply(
        429,
        "Limite de tentativas atingido. Aguarde 15 minutos ou use os contatos diretos.",
      );
    if (state === "conflict")
      return reply(
        409,
        "Esta solicitação já foi utilizada. Recarregue a página para iniciar outra.",
      );
    if (state === "sent")
      return reply(
        200,
        "Esta solicitação já foi aceita pelo serviço de e-mail.",
      );
    if (state === "pending" || state === "uncertain")
      return reply(
        409,
        "O envio anterior ainda não pôde ser confirmado. Não reenvie; confirme comigo pelo WhatsApp ou e-mail.",
        { uncertain: true },
      );
    try {
      await deps.send(data);
    } catch {
      try {
        await deps.complete(id, digest, "uncertain");
      } catch {
        /* Keep the pending reservation to prevent an unsafe retry. */
      }
      return reply(
        503,
        "Não foi possível confirmar o envio. Para evitar duplicidade, confirme comigo pelo WhatsApp ou e-mail antes de tentar outra vez.",
        { uncertain: true },
      );
    }
    try {
      await deps.complete(id, digest, "sent");
    } catch {
      /* SMTP accepted. The existing pending reservation still prevents duplicate sending. */
    }
    return reply(
      200,
      "Sua solicitação foi aceita pelo serviço de e-mail. Obrigado por contar sobre o projeto!",
    );
  };
}
