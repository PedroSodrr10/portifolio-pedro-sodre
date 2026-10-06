import { z } from "zod";
export const serviceOptions = [
  "Site",
  "Landing page",
  "Reformulação de site",
  "Preciso de orientação",
] as const;
export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Informe seu nome.")
      .max(100, "Use até 100 caracteres.")
      .refine((v) => !/[\r\n]/.test(v), "Nome inválido."),
    email: z
      .email("Informe um e-mail válido.")
      .max(254)
      .refine((v) => !/[\r\n]/.test(v)),
    phone: z
      .string()
      .trim()
      .max(30, "Use até 30 caracteres.")
      .regex(/^[+\d\s().-]*$/, "Informe um telefone válido.")
      .default(""),
    service: z.enum(serviceOptions, { error: "Selecione o serviço desejado." }),
    message: z
      .string()
      .trim()
      .min(20, "Conte um pouco mais: pelo menos 20 caracteres.")
      .max(5000, "Use até 5.000 caracteres."),
    website: z
      .union([
        z.literal(""),
        z
          .url("Informe uma URL completa, com https://.")
          .max(500)
          .refine((v) => /^https?:\/\//.test(v), "Use http:// ou https://."),
      ])
      .default(""),
    timeline: z.string().trim().max(100, "Use até 100 caracteres.").default(""),
    company: z.string().max(200).default(""),
    submissionId: z.uuid(),
  })
  .strict();
export type Inquiry = z.infer<typeof inquirySchema>;
