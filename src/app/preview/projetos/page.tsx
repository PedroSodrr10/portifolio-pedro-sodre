import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDemo } from "@/components/ProjectDemo";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Demonstração de projetos | Pedro Sodré",
  robots: { index: false, follow: false },
};
export default function Preview() {
  if (
    process.env.VERCEL_ENV !== "preview" &&
    process.env.NODE_ENV !== "development"
  )
    notFound();
  return (
    <main
      id="conteudo"
      style={{ maxWidth: 1200, margin: "60px auto", padding: "0 20px" }}
    >
      <Link href="/">← Voltar ao portfólio</Link>
      <h1 style={{ fontSize: 46, marginTop: 30, color: "var(--yellow)" }}>
        Laboratório de projetos
      </h1>
      <p>
        Demonstração de interface. Estes exemplos não são trabalhos de Pedro.
        Simulações disponíveis apenas em desenvolvimento e preview.
      </p>
      <ProjectDemo />
    </main>
  );
}
