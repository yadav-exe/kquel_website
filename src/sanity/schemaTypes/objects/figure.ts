import { defineField, defineType } from "sanity";

/* A number and its caption. Two of the About page figures are worked out
   by the site rather than typed — the years since founding, and the count
   of published pieces — so they can never go stale. */
export const figureType = defineType({
  name: "figure",
  title: "Figure",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "auto",
      title: "Value",
      type: "string",
      initialValue: "none",
      options: {
        list: [
          { title: "Typed below", value: "none" },
          { title: "Years since founding (worked out)", value: "years" },
          { title: "Pieces in the catalogue (worked out)", value: "pieces" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "value",
      title: "Typed value",
      type: "string",
      hidden: ({ parent }) => parent?.auto && parent.auto !== "none",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { auto?: string } | undefined;
          const auto = parent?.auto ?? "none";
          return auto === "none" && !value ? "Type a value or choose a worked-out one." : true;
        }),
    }),
  ],
  preview: {
    select: { label: "label", value: "value", auto: "auto" },
    prepare: ({ label, value, auto }) => ({
      title: auto && auto !== "none" ? `(worked out: ${auto})` : value,
      subtitle: label,
    }),
  },
});
