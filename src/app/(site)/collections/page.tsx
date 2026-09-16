import type { Metadata } from "next";
import CollectionsShowcase from "@/components/collections-showcase";
import { getCategories, toListing } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Collections — KQUEL",
  description:
    "Explore the KQUEL collections: whirlpool bathtubs, sauna, spa, shower and pool systems engineered for private wellness architecture.",
};

export default async function CollectionsPage() {
  /* The showcase is a client component; it gets the tiles' worth of data
     and not the page copy, which would otherwise ride along in the payload. */
  const collections = (await getCategories()).map(toListing);

  return (
    <main id="content" className="flex-1">
      <h1 className="sr-only">Collections</h1>
      <CollectionsShowcase collections={collections} />
    </main>
  );
}
