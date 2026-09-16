import type { SanityImage } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";

/* The company's published details, edited once in the Studio. The footer,
   contact page, manifest and structured data all read from here so they
   cannot drift apart. */

export type SiteSettings = {
  name: string;
  parent?: string;
  city?: string;
  founded: number;
  positioning: string;
  email: string;
  phone?: string;
  website?: { label: string; href: string };
  works?: string;
  socialLinks: { label: string; href: string }[];
  defaultShareImage?: SanityImage;
};

/* Stands in until the settings document exists, so a fresh dataset renders
   rather than crashes. */
const FALLBACK: SiteSettings = {
  name: "KQUEL",
  parent: "Monarch Industries",
  city: "New Delhi",
  founded: 1998,
  positioning:
    "Whirlpool baths, hot spas, saunas and pools, manufactured in New Delhi since 1998.",
  email: "aquelbath.in@gmail.com",
  socialLinks: [],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
  /* Live fetches brand strings for visual editing; the shape is the same. */
  const settings = data as unknown as SITE_SETTINGS_QUERY_RESULT;
  if (!settings) {
    console.warn("Site settings have not been published yet; using defaults.");
    return FALLBACK;
  }
  return {
    name: settings.name ?? FALLBACK.name,
    parent: settings.parent ?? undefined,
    city: settings.city ?? undefined,
    founded: settings.founded ?? FALLBACK.founded,
    positioning: settings.positioning ?? FALLBACK.positioning,
    email: settings.email ?? FALLBACK.email,
    phone: settings.phone ?? undefined,
    website: settings.website ?? undefined,
    works: settings.works ?? undefined,
    socialLinks: settings.socialLinks ?? [],
    defaultShareImage: settings.defaultShareImage ?? undefined,
  };
}

export type ContactDetail = {
  label: string;
  value: string;
  /** Absent for entries that are not linkable, such as the works address. */
  href?: string;
};

/* Rendered as the definition list on the contact page. Only what has been
   filled in is shown. */
export function contactDetails(settings: SiteSettings): ContactDetail[] {
  const details: ContactDetail[] = [
    { label: "Enquiries", value: settings.email, href: `mailto:${settings.email}` },
  ];
  if (settings.phone) {
    details.push({
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/[^\d+]/g, "")}`,
    });
  }
  if (settings.website) {
    details.push({
      label: "Online",
      value: settings.website.label,
      href: settings.website.href,
    });
  }
  if (settings.works) details.push({ label: "Works", value: settings.works });
  return details;
}
