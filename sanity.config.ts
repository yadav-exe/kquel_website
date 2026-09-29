"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId, studioBasePath } from "./src/sanity/env";
import { SINGLETON_TYPES, schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

/* The editing dashboard, mounted inside the site at /studio. */
export default defineConfig({
  name: "kquel",
  title: "KQUEL",
  basePath: studioBasePath,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      /* Singletons cannot be created; the one copy opens from the sidebar. */
      ...templates.filter(
        (template) => !SINGLETON_TYPES.has(template.schemaType)
      ),
      {
        id: "product-in-collection",
        title: "Product in collection",
        schemaType: "product",
        parameters: [{ name: "collectionId", type: "string" }],
        value: ({ collectionId }: { collectionId: string }) => ({
          collection: { _type: "reference", _ref: collectionId },
        }),
      },
    ],
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) =>
            action
              ? ["publish", "unpublish", "discardChanges", "restore"].includes(
                  action
                )
              : false
          )
        : actions,
  },
});
