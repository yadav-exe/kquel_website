import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/* The editing dashboard. Renders as one static shell; the Studio itself
   runs entirely in the browser, and its own metadata keeps it out of
   search engines. */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
