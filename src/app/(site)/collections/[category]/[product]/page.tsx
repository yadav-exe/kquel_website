import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { getCategoriesForBuild, getCategory } from "@/lib/catalog";
import { pageMetadata, snippet } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";

type Params = { category: string; product: string };

/* Only products with written copy get a page. The rest are listed and gain
   a page the moment an editor writes their introduction. */
export async function generateStaticParams(): Promise<Params[]> {
  const categories = await getCategoriesForBuild();
  return categories.flatMap((category) =>
    category.products
      .filter((product) => product.story)
      .map((product) => ({
        category: category.slug,
        product: product.slug,
      }))
  );
}

export const dynamicParams = true;

async function load(params: Promise<Params>) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = await getCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  /* A listed piece without its copy has no page yet. */
  if (!category || !product?.story) return undefined;
  return { category, product };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};

  const { category, product } = found;
  const site = await getSiteSettings();
  return pageMetadata({
    title: `${product.name} — ${site.name} ${category.name}`,
    description: snippet(product.story ?? ""),
    path: `/collections/${category.slug}/${product.slug}`,
    image: product.image ?? category.cover,
    seo: product.seo,
    site,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const found = await load(params);
  if (!found) notFound();

  const { category, product } = found;
  const related = category.products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main id="content" className="flex-1">
      <ProductDetail
        product={product}
        category={category}
        related={related}
      />
    </main>
  );
}
