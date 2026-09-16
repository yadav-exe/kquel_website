import { createImageUrlBuilder } from "@sanity/image-url";
import type { ImageLoader } from "next/image";
import { dataset, projectId } from "./env";

/* What every query projects for an image: enough to build a CDN address,
   reserve its space before it loads, and honour the crop and focal point
   set in the Studio. Matches the generated query types field for field. */
export type SanityImage = {
  asset?: {
    _id?: string;
    _ref?: string;
    url?: string | null;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      } | null;
      lqip?: string | null;
    } | null;
  } | null;
  hotspot?: { x?: number; y?: number; height?: number; width?: number } | null;
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null;
  alt?: string | null;
};

const builder = createImageUrlBuilder({ projectId, dataset });

type Source = Parameters<typeof builder.image>[0];

/* A CDN address carrying the Studio's crop. Width and quality are left to
   the loader so next/image can ask for exactly the size it will show. */
export function imageUrl(image: SanityImage) {
  return builder.image(image as Source).auto("format").fit("max").url();
}

/* next/image hands over the width it wants; the CDN resizes on the fly and
   caches the result, so a phone never downloads a desktop-sized file. */
export const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 80));
  url.searchParams.set("auto", "format");
  return url.toString();
};

export function imageDimensions(image: SanityImage) {
  const d = image.asset?.metadata?.dimensions;
  return d?.width && d?.height ? { width: d.width, height: d.height } : undefined;
}

/* The focal point, as a CSS object-position, so a cover-fitted image keeps
   what the editor marked as important in frame. */
export function objectPosition(image: SanityImage) {
  const h = image.hotspot;
  if (!h || h.x === undefined || h.y === undefined) return undefined;
  return `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%`;
}
