import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import { CATEGORIES, getCategory } from "@/lib/catalog";

type Params = { category: string; product: string };

/* Only products with written copy get a page. The rest are added as their
   detail copy is prepared. */
export function generateStaticParams(): Params[] {
  return CATEGORIES.flatMap((category) =>
    category.products
      .filter((product) => product.story)
      .map((product) => ({
        category: category.slug,
        product: product.slug,
      }))
  );
}

export const dynamicParams = false;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);

  if (!category || !product) return {};

  return {
    title: `${product.name} — KQUEL ${category.name}`,
    description: product.story && describe(product.story),
    alternates: { canonical: `/collections/${category.slug}/${product.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);

  if (!category || !product) notFound();

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
