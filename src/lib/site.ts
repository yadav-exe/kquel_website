/* Single source for the company's published details. The footer and the
   contact page both read from here so the two cannot drift apart. */

export const SITE = {
  name: "KQUEL",
  parent: "Monarch Industries",
  city: "New Delhi",
  founded: 1998,
  positioning:
    "Whirlpool baths, hot spas, saunas and pools, manufactured in New Delhi since 1998.",
} as const;

export const CONTACT = {
  email: "aquelbath.in@gmail.com",
  website: { label: "aquelbath.co.in", href: "https://www.aquelbath.co.in" },
  works: `${SITE.parent}, ${SITE.city}`,
} as const;

export type ContactDetail = {
  label: string;
  value: string;
  /** Absent for entries that are not linkable, such as the works address. */
  href?: string;
};

/* Rendered as the definition list on the contact page. */
export const CONTACT_DETAILS: ContactDetail[] = [
  { label: "Enquiries", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "Online", value: CONTACT.website.label, href: CONTACT.website.href },
  { label: "Works", value: CONTACT.works },
];
