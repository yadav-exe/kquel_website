import type { Metadata } from "next";
import CollectionsShowcase from "@/components/collections-showcase";
import { getCategories, toListing } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ]);
  const names = categories.map((c) => c.name.toLowerCase());
  return pageMetadata({
    title: `Collections — ${site.name}`,
    description: `Explore the ${site.name} collections: ${names.join(", ")} — engineered for private wellness architecture.`,
    path: "/collections",
    image: categories[0]?.cover,
    site,
  });
}

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
