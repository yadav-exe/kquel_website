import { defineCliConfig } from "sanity/cli";

/* Read by the Sanity CLI (typegen, seeding, CORS). Same values the site uses. */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
  typegen: {
    path: "./src/**/*.{ts,tsx}",
    schema: "schema.json",
    generates: "./src/sanity/types.ts",
    overloadClientMethods: true,
  },
});
