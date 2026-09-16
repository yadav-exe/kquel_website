/* Sanity connection settings. The project id and dataset are safe in the
   browser — the Studio needs them there — hence the NEXT_PUBLIC_ prefix.
   Tokens never pass through this file. */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill it in.`
    );
  }
  return value;
}

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/* Pinned so a future API change cannot alter query results underneath us. */
export const apiVersion = "2026-06-01";

export const studioBasePath = "/studio";
