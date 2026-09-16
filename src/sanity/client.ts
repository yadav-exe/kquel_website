import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioBasePath } from "./env";

/* Read-only, through the CDN. Draft reads and the live connection add a
   token on top of this in live.ts. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl: studioBasePath },
});
