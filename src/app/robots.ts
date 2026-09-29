import type { MetadataRoute } from "next";
import { SITE_URL, absolute } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* The editing dashboard and the webhook endpoints are not pages. */
      disallow: ["/studio", "/api/"],
    },
    sitemap: absolute("/sitemap.xml"),
    host: SITE_URL,
  };
}
