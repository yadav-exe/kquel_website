import { defineField, defineType } from "sanity";
import { imageField } from "../fields";

export const homePageType = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "ethos", title: "Our ethos" },
    { name: "archetypes", title: "Archetypes" },
    { name: "signature", title: "Signature pieces" },
    { name: "innovation", title: "Innovation" },
    { name: "closing", title: "Why KQUEL" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "statement",
          title: "Opening statement",
          type: "string",
          description: "The line shown before the brand reveals.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "taglineLead",
          title: "Tagline, first part",
          type: "string",
          description: "E.g. “Water,” — set in white.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "taglineAccent",
          title: "Tagline, accent",
          type: "string",
          description: "E.g. “Crafted.” — set in violet.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "cta",
          title: "Scroll cue",
          type: "string",
          initialValue: "Let's Dive",
          validation: (rule) => rule.required(),
        }),
        imageField({
          name: "image",
          title: "Photograph",
          required: true,
          altRequired: false,
        }),
      ],
    }),

    defineField({
      name: "ethos",
      title: "Our ethos",
      type: "object",
      group: "ethos",
      fields: [
        defineField({
          name: "cards",
          title: "Experience cards",
          type: "array",
          validation: (rule) =>
            rule.length(4).error("The ethos strip holds exactly four cards."),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "copy",
                  title: "Line",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                imageField({ name: "image", title: "Photograph", required: true }),
              ],
              preview: {
                select: { title: "title", subtitle: "copy", media: "image" },
              },
            },
          ],
        }),
        defineField({
          name: "closingLead",
          title: "Closing line, first part",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "closingAccent",
          title: "Closing line, accent",
          type: "string",
          description: "Set in violet with a glow.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: "archetypes",
      title: "Archetype tiles",
      type: "array",
      group: "archetypes",
      description:
        "Six tiles in a fixed arrangement: the first is the large one.",
      validation: (rule) =>
        rule.length(6).error("The tile grid holds exactly six."),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "collection",
              title: "Collection",
              type: "reference",
              to: [{ type: "collection" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Short title",
              type: "string",
              description: "Leave blank to use the collection's name.",
            }),
            imageField({
              name: "image",
              title: "Photograph",
              description: "Leave blank to use the collection's cover.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              collection: "collection.name",
              media: "image",
            },
            prepare: ({ title, collection, media }) => ({
              title: title || collection,
              subtitle: collection,
              media,
            }),
          },
        },
      ],
    }),

    defineField({
      name: "signaturePieces",
      title: "Signature pieces",
      type: "array",
      group: "signature",
      validation: (rule) =>
        rule.length(3).error("The signature row holds exactly three."),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Piece",
              type: "reference",
              to: [{ type: "product" }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "copy",
              title: "Line",
              type: "string",
              description: "One sentence under the name.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "product.name",
              subtitle: "copy",
              media: "product.image",
            },
          },
        },
      ],
    }),

    defineField({
      name: "innovation",
      title: "Innovation",
      type: "object",
      group: "innovation",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "disciplines",
          title: "Disciplines",
          type: "array",
          of: [{ type: "point" }],
          validation: (rule) => rule.required().min(1).max(4),
        }),
        imageField({ name: "image", title: "Photograph", required: true }),
      ],
    }),

    defineField({
      name: "closing",
      title: "Why KQUEL",
      type: "object",
      group: "closing",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "Paragraph",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "statement",
          title: "Closing line",
          type: "string",
          description: "Set in italics beneath the paragraph.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "disciplines",
          title: "Discipline links",
          type: "array",
          validation: (rule) =>
            rule.length(4).error("The link row holds exactly four."),
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Discipline",
                  type: "string",
                  description: "E.g. “Hydrotherapy”.",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "name",
                  title: "Link text",
                  type: "string",
                  description: "E.g. “Whirlpool baths”.",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "collection",
                  title: "Links to",
                  type: "reference",
                  to: [{ type: "collection" }],
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: { select: { title: "name", subtitle: "label" } },
            },
          ],
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
  preview: { prepare: () => ({ title: "Home page" }) },
});
