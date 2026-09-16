import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { getCategoriesForBuild, getCategory } from "@/lib/catalog";

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

const DESCRIPTION_LIMIT = 160;
/* Below this, whole sentences leave most of a search snippet empty. */
const DESCRIPTION_FLOOR = 110;

/* The story, fitted to a search result. Whole sentences where they fill the
   snippet; otherwise it runs on and stops at a word, with an ellipsis — never
   mid-word, which is what a plain slice at the limit produced. */
function describe(story: string) {
  if (story.length <= DESCRIPTION_LIMIT) return story;

  const sentences = story.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [story];
  let whole = "";
  for (const sentence of sentences) {
    if ((whole + sentence).trim().length > DESCRIPTION_LIMIT) break;
    whole += sentence;
  }
  if (whole.trim().length >= DESCRIPTION_FLOOR) return whole.trim();

  const cut = story.slice(0, DESCRIPTION_LIMIT - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}

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
  const { seo } = product;
  return {
    title: seo?.metaTitle ?? `${product.name} — KQUEL ${category.name}`,
    description:
      seo?.metaDescription ?? (product.story && describe(product.story)),
    alternates: { canonical: `/collections/${category.slug}/${product.slug}` },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
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
