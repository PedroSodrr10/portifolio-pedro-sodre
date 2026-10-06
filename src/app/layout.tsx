import type { Metadata } from "next";
import localFont from "next/font/local";
import { content } from "@/lib/content";
import "./globals.css";
const rajdhani = localFont({
  src: [
    { path: "../../public/fonts/rajdhani-600.ttf", weight: "600" },
    { path: "../../public/fonts/rajdhani-700.ttf", weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});
const production = process.env.VERCEL_ENV === "production";
export const metadata: Metadata = {
  title: content.brand.title,
  description: content.brand.description,
  metadataBase: new URL(
    (production && process.env.SITE_URL) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  robots: { index: production, follow: production },
  ...(production && process.env.SITE_URL
    ? {
        metadataBase: new URL(process.env.SITE_URL),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title: content.brand.title,
    description: content.brand.description,
    locale: "pt_BR",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={rajdhani.variable}>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
