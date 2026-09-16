import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      /* Product photography and page imagery are served from Sanity's CDN. */
      { protocol: "https", hostname: "cdn.sanity.io" },
      /* Staging placeholders; goes once the last stock image is replaced. */
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
