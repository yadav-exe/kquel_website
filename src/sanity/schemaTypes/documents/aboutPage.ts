import { defineField, defineType } from "sanity";
import { imageField } from "../fields";

/* A titled section with a small heading above it — the shape most of the
   About page is made of. */
const section = (
  name: string,
  title: string,
  group: string,
  extra: ReturnType<typeof defineField>[]
) =>
  defineField({
    name,
    title,
    type: "object",
    group,
    validation: (rule) => rule.required(),
    fields: [
      defineField({
        name: "eyebrow",
        title: "Small heading",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "heading",
        title: "Heading",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      ...extra,
    ],
  });

const paragraph = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 5,
    description,
    validation: (rule) => rule.required(),
  });

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "principles", title: "Principles & process" },
    { name: "promise", title: "Material & promise" },
    { name: "closing", title: "Closing" },
    { name: "seo", title: "Search & sharing" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      validation: (rule) => rule.required(),
      group: "hero",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small heading",
          type: "string",
          description:
            "Leave blank to show “Established ‹year› · ‹city›” from site settings.",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "tagline",
          title: "Line beneath",
          type: "string",
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

    section("origin", "The beginning", "story", [
      paragraph("lead", "Opening paragraph"),
      defineField({
        name: "quote",
        title: "Pull line",
        type: "string",
        description: "Set large and in italics between the paragraphs.",
        validation: (rule) => rule.required(),
      }),
      paragraph("body", "Second paragraph"),
    ]),
    defineField({
      name: "figures",
      title: "Figures",
      type: "array",
      group: "story",
      of: [{ type: "figure" }],
      description: "The row of large numbers. Four fit the row.",
      validation: (rule) => rule.required().min(2).max(4),
    }),

    section("principles", "Philosophy", "principles", [
      defineField({
        name: "items",
        title: "Principles",
        type: "array",
        of: [{ type: "point" }],
        validation: (rule) =>
          rule.required().length(3).error("Three principles fill the row."),
      }),
    ]),
    section("process", "Craft", "principles", [
      defineField({
        name: "items",
        title: "Stages",
        type: "array",
        of: [{ type: "point" }],
        description: "Numbered in the order listed here.",
        validation: (rule) => rule.required().min(3).max(8),
      }),
    ]),

    section("material", "Material", "promise", [
      paragraph("lead", "Opening paragraph"),
      paragraph("body", "Second paragraph"),
    ]),
    section("promise", "The promise", "promise", [
      paragraph("lead", "Opening paragraph"),
      paragraph("body", "Second paragraph"),
    ]),

    defineField({
      name: "closing",
      title: "Closing",
      type: "object",
      validation: (rule) => rule.required(),
      group: "closing",
      fields: [
        defineField({
          name: "quote",
          title: "Quotation",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "attribution",
          title: "Attribution",
          type: "string",
          description:
            "Leave blank to show “‹parent company› · ‹city›” from site settings.",
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
  preview: { prepare: () => ({ title: "About page" }) },
});
