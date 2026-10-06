import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return process.env.VERCEL_ENV === "production" && process.env.SITE_URL
    ? [{ url: process.env.SITE_URL }]
    : [];
}
