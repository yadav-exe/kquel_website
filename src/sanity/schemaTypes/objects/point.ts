import { defineField, defineType } from "sanity";

/* A titled paragraph — the unit the collection pages and the About page
   are built from. */
export const pointType = defineType({
  name: "point",
  title: "Point",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
