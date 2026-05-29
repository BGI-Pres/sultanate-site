import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/portal/", "/auth/"] },
    sitemap: "https://www.sultanateofamexem.com/sitemap.xml",
  };
}
