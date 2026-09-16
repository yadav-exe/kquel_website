import type { Metadata } from "next";
import { imageUrl, type SanityImage } from "@/sanity/image";
import type { Seo } from "./catalog";
import type { SiteSettings } from "./site";

/* The public address, for everything that has to be absolute: canonical
   links, the sitemap, share cards and structured data. Set in Vercel for
   production; local builds fall back to the dev server. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const absolute = (path: string) => `${SITE_URL}${path}`;

const DESCRIPTION_LIMIT = 160;
/* Below this, whole sentences leave most of a search snippet empty. */
const DESCRIPTION_FLOOR = 110;

/* Prose fitted to a search result: whole sentences where they fill the
   snippet, otherwise cut at a word with an ellipsis — never mid-word. */
export function snippet(text: string) {
  if (text.length <= DESCRIPTION_LIMIT) return text;

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let whole = "";
  for (const sentence of sentences) {
    if ((whole + sentence).trim().length > DESCRIPTION_LIMIT) break;
    whole += sentence;
  }
  if (whole.trim().length >= DESCRIPTION_FLOOR) return whole.trim();

  const cut = text.slice(0, DESCRIPTION_LIMIT - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}

/* A 1200 × 630 crop from the CDN, the size every social network reads. */
export function shareImageUrl(image: SanityImage | null | undefined) {
  if (!image?.asset) return undefined;
  const url = new URL(imageUrl(image));
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("auto", "format");
  return url.toString();
}

/* One shape of metadata for every page. The Studio's Search & sharing
   panel overrides the page's own title, description and image where an
   editor has filled it in; otherwise the page supplies sensible ones. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  seo,
  site,
}: {
  title: string;
  description: string;
  path: string;
  image?: SanityImage | null;
  seo?: Seo | null;
  site: SiteSettings;
}): Metadata {
  const finalTitle = seo?.metaTitle || title;
  const finalDescription = seo?.metaDescription || description;
  const share = shareImageUrl(seo?.shareImage ?? image ?? site.defaultShareImage);

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: finalTitle,
      description: finalDescription,
      url: path,
      images: share ? [{ url: share, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: share ? "summary_large_image" : "summary",
      title: finalTitle,
      description: finalDescription,
      images: share ? [share] : undefined,
    },
  };
}

/* Organization and WebSite records, once per page, so search engines can
   attach the brand's details to every result. */
export function organizationJsonLd(site: SiteSettings) {
  const organization = {
    "@type": "Organization",
    "@id": absolute("/#organization"),
    name: site.name,
    url: SITE_URL,
    logo: absolute("/favicon/android-chrome-512x512.png"),
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.city
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: site.city,
            addressCountry: "IN",
          },
        }
      : {}),
    foundingDate: String(site.founded),
    ...(site.parent
      ? { parentOrganization: { "@type": "Organization", name: site.parent } }
      : {}),
    ...(site.socialLinks.length
      ? { sameAs: site.socialLinks.map((link) => link.href) }
      : {}),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": absolute("/#website"),
        url: SITE_URL,
        name: site.name,
        description: site.positioning,
        publisher: { "@id": absolute("/#organization") },
      },
    ],
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}
