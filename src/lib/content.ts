import { z } from "zod";
import raw from "../../content/landing-content.json";
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string().startsWith("/projects/"),
  alt: z.string().min(1),
  url: z.url().refine((v) => v.startsWith("https://")),
});
export type Project = z.infer<typeof projectSchema>;
const serviceSchema = z.object({
  id: z.literal("servicos"),
  title: z.string(),
  items: z.array(z.object({ title: z.string(), body: z.string() })),
});
const aboutSchema = z.object({
  id: z.literal("sobre"),
  title: z.string(),
  body: z.string(),
});
export const content = raw;
export const services = serviceSchema.parse(
  raw.sections.find((s) => s.id === "servicos"),
);
export const about = aboutSchema.parse(
  raw.sections.find((s) => s.id === "sobre"),
);
export const projects = z
  .array(projectSchema)
  .parse(raw.sections.find((s) => s.id === "projetos")?.items);
export const contactSection = raw.sections.find((s) => s.id === "contato")!;
export const projectsSection = raw.sections.find((s) => s.id === "projetos")!;
const contact = z
  .object({
    whatsapp: z
      .string()
      .regex(/^\d{10,15}$/)
      .nullable(),
    email: z.email().nullable(),
  })
  .parse(raw.contact);
export const whatsappHref = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(raw.contact.whatsappMessage)}`
  : null;
export const emailHref = contact.email ? `mailto:${contact.email}` : null;
