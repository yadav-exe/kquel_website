import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import {
  metadata as studioMetadata,
  viewport,
} from "next-sanity/studio";
import config from "../../../../sanity.config";

/* The editing dashboard. Renders as one static shell; the Studio itself
   runs entirely in the browser, and next-sanity's metadata keeps it out of
   search engines. */
export const dynamic = "force-static";

export const metadata: Metadata = { ...studioMetadata, title: "KQUEL Studio" };
export { viewport };

export default function StudioPage() {
  return <NextStudio config={config} />;
}
