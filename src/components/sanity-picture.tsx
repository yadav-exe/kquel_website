"use client";

import Image, { type ImageProps } from "next/image";
import {
  imageDimensions,
  imageUrl,
  objectPosition,
  sanityLoader,
  type SanityImage,
} from "@/sanity/image";

type Props = Omit<ImageProps, "src" | "alt" | "loader" | "width" | "height"> & {
  image: SanityImage;
  /** Overrides the alt text set in the Studio. Pass "" for decoration. */
  alt?: string;
  width?: number;
  height?: number;
};

/* next/image for a Sanity asset. A client component because the loader is
   a function, which a server component cannot hand to next/image. Blurs in
   from the tiny preview Sanity stores with every upload. */
export default function SanityPicture({
  image,
  alt,
  fill,
  width,
  height,
  style,
  placeholder,
  ...rest
}: Props) {
  if (!image.asset) return null;

  const dimensions = fill || (width && height) ? undefined : imageDimensions(image);
  const lqip = image.asset.metadata?.lqip ?? undefined;
  const focus = fill ? objectPosition(image) : undefined;

  return (
    <Image
      src={imageUrl(image)}
      alt={alt ?? image.alt ?? ""}
      loader={sanityLoader}
      fill={fill}
      width={width ?? dimensions?.width}
      height={height ?? dimensions?.height}
      placeholder={placeholder ?? (lqip ? "blur" : "empty")}
      blurDataURL={lqip}
      style={focus ? { objectPosition: focus, ...style } : style}
      {...rest}
    />
  );
}
