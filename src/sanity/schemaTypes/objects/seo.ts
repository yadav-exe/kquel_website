import { defineField, defineType } from "sanity";

/* The same panel on every page type, so editors learn it once. Every field
   falls back to something sensible when blank. */
export const seoType = defineType({
  name: "seo",
  title: "Search & sharing",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Search title",
      type: "string",
      description:
        "The headline in search results and the browser tab. Leave blank to use the page's own title.",
      validation: (rule) =>
        rule
          .max(60)
          .warning("Titles over 60 characters are cut off in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Search description",
      type: "text",
      rows: 3,
      description:
        "The grey text under the headline in search results. Leave blank to use the page's first paragraph.",
      validation: (rule) =>
        rule
          .max(160)
          .warning("Descriptions over 160 characters are cut off."),
    }),
    defineField({
      name: "shareImage",
      title: "Share image",
      type: "image",
      description:
        "Shown when the page is shared on WhatsApp, LinkedIn or X. 1200 × 630 works best. Leave blank to use the site default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
      description:
        "Keeps this page out of Google. For pages that are not ready to be found.",
    }),
  ],
});
