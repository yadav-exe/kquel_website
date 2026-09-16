import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Address",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
