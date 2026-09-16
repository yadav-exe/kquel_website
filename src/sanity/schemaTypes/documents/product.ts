import {
  defineField,
  defineType,
  type ConditionalPropertyCallbackContext,
} from "sanity";
import { imageField } from "../fields";

/* A product is one of two kinds. A whirlpool bath or spa is described by
   its fitment counts — jets, pumps, lights — and the site writes the
   specification and draws the technical blueprint from those numbers, so
   the two can never disagree. Everything else carries a specification
   written by hand. */

const isTub = ({ document }: ConditionalPropertyCallbackContext) =>
  document?.kind === "tub";
const isUnit = ({ document }: ConditionalPropertyCallbackContext) =>
  document?.kind === "unit";

const countField = (
  name: string,
  title: string,
  initialValue: number,
  description?: string
) =>
  defineField({
    name,
    title,
    type: "number",
    group: "fitment",
    hidden: (context) => !isTub(context),
    initialValue,
    description,
    validation: (rule) =>
      rule.custom((value, context) => {
        if (context.document?.kind !== "tub") return true;
        if (value === undefined || value === null) {
          return "Required for a whirlpool piece.";
        }
        if (!Number.isInteger(value) || value < 0) return "Whole numbers only.";
        return true;
      }),
  });

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "fitment", title: "Fitment" },
    { name: "specification", title: "Specification" },
    { name: "story", title: "Page copy" },
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
        "The last part of the page address. Changing it breaks links people have saved.",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind of piece",
      type: "string",
      group: "listing",
      options: {
        list: [
          {
            title:
              "Whirlpool bath or spa — specification and drawing generated from the fitment counts",
            value: "tub",
          },
          {
            title: "Any other piece — specification written by hand",
            value: "unit",
          },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "configuration",
      title: "Type",
      type: "string",
      group: "listing",
      description:
        "Groups pieces in the Type filter — Double seater, Corner, Hot spa, Steam cum shower… Match the spelling of existing pieces exactly or the filter splits.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      group: "listing",
      description:
        "As printed in the catalogue, e.g. “6 × 4 ft”. Leave empty for pieces made to specification.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      group: "listing",
      description: "Position within its collection, lowest first.",
      validation: (rule) => rule.required().integer(),
    }),
    imageField({
      name: "image",
      title: "Photograph",
      description: "Needed before the piece can be published.",
      group: "listing",
    }),
    defineField({
      name: "published",
      title: "Show on the site",
      type: "boolean",
      group: "listing",
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) =>
          value && !context.document?.image
            ? "Add a photograph before showing this piece on the site."
            : true
        ),
    }),

    /* Fitment — whirlpool pieces only */
    defineField({
      name: "form",
      title: "Plan shape",
      type: "string",
      group: "fitment",
      hidden: (context) => !isTub(context),
      description: "The outline the technical drawing uses.",
      options: {
        list: [
          { title: "Rectangle", value: "rect" },
          { title: "Square", value: "square" },
          { title: "Round", value: "round" },
          { title: "Corner", value: "corner" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.kind === "tub" && !value
            ? "Choose a plan shape."
            : true
        ),
    }),
    defineField({
      name: "panel",
      title: "Panel",
      type: "string",
      group: "fitment",
      hidden: (context) => !isTub(context),
      initialValue: "Two side panel",
      description:
        "The second construction line, e.g. “Toughened glass panel”, “Front panel”, “8 inch grating”.",
    }),
    defineField({
      name: "shellNote",
      title: "Shell",
      type: "string",
      group: "fitment",
      hidden: (context) => !isTub(context),
      description:
        "Replaces “Acrylic bathtub” as the first construction line, e.g. “Spa 10 mm thickness”. Leave blank for the standard shell.",
    }),
    countField("pumps", "Whirlpool pumps", 1),
    countField("jets", "Whirlpool jets", 6),
    countField("spineJets", "Spine jets", 2, "The finer jets up the backrest."),
    countField(
      "bubbleJets",
      "Air bubble jets",
      12,
      "Air outlets in the floor of the shell."
    ),
    countField("pillows", "Pillows", 1),
    countField("lights", "Underwater lights", 1),
    defineField({
      name: "ratedAirPump",
      title: "700 kWh air pump",
      type: "boolean",
      group: "fitment",
      hidden: (context) => !isTub(context),
      initialValue: false,
      description:
        "The catalogue rates the spa-tier blower; leave off for the standard air pump.",
    }),
    defineField({
      name: "audio",
      title: "Hi-fi speaker and FM radio",
      type: "boolean",
      group: "fitment",
      hidden: (context) => !isTub(context),
      initialValue: false,
    }),
    defineField({
      name: "controlsStandard",
      title: "Control panel and heater fitted as standard",
      type: "boolean",
      group: "fitment",
      hidden: (context) => !isTub(context),
      initialValue: false,
      description:
        "On: electronic panel, online heater and ozone listed as fitted. Off: listed as optional.",
    }),
    defineField({
      name: "extras",
      title: "Extra construction lines",
      type: "array",
      of: [{ type: "string" }],
      group: "fitment",
      hidden: (context) => !isTub(context),
      description:
        "Added after the panel, e.g. “Teakwood top with waterproof finish”, “Online filter”.",
    }),

    /* Specification — written by hand for everything else */
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "specification",
      hidden: (context) => !isUnit(context),
      description:
        "The figures shown large at the top of the page: Dimensions, Heater, Type…",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "specGroups",
      title: "Specification",
      type: "array",
      group: "specification",
      hidden: (context) => !isUnit(context),
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.kind === "unit" && !(value && value.length)
            ? "Add at least one specification group."
            : true
        ),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Group",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "items",
              title: "Lines",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare: ({ title, items }) => ({
              title,
              subtitle: Array.isArray(items) ? items.join(" · ") : "",
            }),
          },
        },
      ],
    }),

    defineField({
      name: "story",
      title: "Introduction",
      type: "text",
      rows: 7,
      group: "story",
      description:
        "The written paragraph on the product page. Describe the piece — leave the counts to the specification. A piece without one is listed but has no page of its own.",
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
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      configuration: "configuration",
      collection: "collection.name",
      published: "published",
      media: "image",
    },
    prepare: ({ title, configuration, collection, published, media }) => ({
      title,
      subtitle: [collection, configuration, published ? undefined : "hidden"]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
