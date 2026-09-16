import { defineField, defineType } from "sanity";
import { imageField } from "../fields";

export const collectionType = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "editorial", title: "Page copy" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "listing",
      description:
        "The last part of the page address: /collections/‹this›. Changing it breaks links people have saved.",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "listing",
      description:
        "Position on the collections page and in the footer, lowest first.",
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "listing",
      description:
        "One line under the collection name, on the tile and at the top of the page.",
      validation: (rule) => rule.required().max(90),
    }),
    imageField({
      name: "cover",
      title: "Cover photograph",
      description:
        "Fills the tile on the collections page and stands in for pieces without a photo.",
      group: "listing",
      required: true,
    }),

    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 5,
      group: "editorial",
      description:
        "What the piece is, in two or three sentences. Sits beside the title, above the pieces.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reasons",
      title: "Why it belongs at home",
      type: "object",
      group: "editorial",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small heading",
          type: "string",
          description:
            "The label above the heading, e.g. “Why it belongs at home”.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Reasons",
          type: "array",
          of: [{ type: "point" }],
          validation: (rule) => rule.required().min(3).max(6),
        }),
      ],
    }),
    defineField({
      name: "difference",
      title: "The KQUEL difference",
      type: "object",
      group: "editorial",
      options: { collapsible: true },
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Points",
          type: "array",
          of: [{ type: "point" }],
          description: "Six fill the grid exactly; three also works.",
          validation: (rule) => rule.required().min(3).max(6),
        }),
      ],
    }),

    defineField({
      name: "seo",
      title: "Search & sharing",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "cover" },
  },
});
