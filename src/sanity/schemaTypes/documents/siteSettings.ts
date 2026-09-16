import { defineField, defineType } from "sanity";
import { imageField } from "../fields";

/* One document for the whole site: who the company is and how to reach it.
   The footer, contact page, manifest and structured data all read from here. */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      group: "brand",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent company",
      type: "string",
      group: "brand",
      description: "Shown in the footer and on the About page.",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "founded",
      title: "Year founded",
      type: "number",
      group: "brand",
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: "positioning",
      title: "One-line description",
      type: "text",
      rows: 2,
      group: "brand",
      description:
        "What the company makes, in a sentence. Used in the browser tab, the app manifest and as the fallback search description.",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "email",
      title: "Enquiries email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
      description:
        "With country code, e.g. +91 98… Leave blank to publish no number.",
    }),
    defineField({
      name: "website",
      title: "Existing website",
      type: "link",
      group: "contact",
      description:
        "The aquelbath.co.in link shown in the footer. Remove once this site replaces it.",
    }),
    defineField({
      name: "works",
      title: "Works",
      type: "string",
      group: "contact",
      description: "The address line, e.g. “Monarch Industries, New Delhi”.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social profiles",
      type: "array",
      of: [{ type: "link" }],
      group: "contact",
      description:
        "Instagram, LinkedIn and so on. Listed in the footer and given to search engines.",
    }),
    imageField({
      name: "defaultShareImage",
      title: "Default share image",
      description:
        "Used when a page is shared and has no share image of its own. 1200 × 630 works best.",
      group: "seo",
      altRequired: false,
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
