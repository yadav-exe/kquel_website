import { defineField } from "sanity";

/* An image with the alt text the site requires. Alt is what a screen reader
   says and what search engines read, so it is asked for wherever the image
   is more than decoration. */
export function imageField(options: {
  name: string;
  title: string;
  description?: string;
  group?: string;
  altRequired?: boolean;
  required?: boolean;
}) {
  const { altRequired = true, required = false } = options;
  return defineField({
    name: options.name,
    title: options.title,
    type: "image",
    description: options.description,
    group: options.group,
    options: { hotspot: true },
    validation: required ? (rule) => rule.required() : undefined,
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description:
          "Describe what is in the picture for people who cannot see it — one plain sentence, no “image of”.",
        validation: altRequired ? (rule) => rule.required() : undefined,
      }),
    ],
  });
}
