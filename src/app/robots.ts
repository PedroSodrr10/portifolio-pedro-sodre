import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return process.env.VERCEL_ENV === "production"
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/preview/"] },
        ...(process.env.SITE_URL
          ? { sitemap: `${process.env.SITE_URL}/sitemap.xml` }
          : {}),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
