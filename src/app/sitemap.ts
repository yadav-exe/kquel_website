import type { MetadataRoute } from "next";
import { getCategoriesForBuild } from "@/lib/catalog";
import { absolute } from "@/lib/seo";

/* Every public page, with the date its content last changed in the
   Studio. Products without written copy have no page and are left out. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategoriesForBuild();
  const now = new Date();

  const fixed: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/collections"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absolute("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: absolute("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const collections: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absolute(`/collections/${category.slug}`),
    lastModified: category.products.reduce(
      (latest, product) => (product.updatedAt > latest ? product.updatedAt : latest),
      category.updatedAt
    ),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.products
      .filter((product) => product.story)
      .map((product) => ({
        url: absolute(`/collections/${category.slug}/${product.slug}`),
        lastModified: product.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  return [...fixed, ...collections, ...products];
}
