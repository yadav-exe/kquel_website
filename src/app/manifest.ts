import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site";

/* Replaces the generated site.webmanifest, which shipped with an empty name,
   icon paths pointing at the site root rather than /favicon, and white
   theme colours that would flash against a near-black site. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteSettings();
  return {
    name: `${site.name} — ${site.positioning}`,
    short_name: site.name,
    description: site.positioning,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
