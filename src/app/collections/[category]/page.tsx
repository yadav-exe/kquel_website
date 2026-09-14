import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogView from "@/components/catalog-view";
import CollectionEditorial from "@/components/collection-editorial";
import { CATEGORIES, getCategory } from "@/lib/catalog";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

/* Anything outside the known slugs is a 404, not a rendered page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) return {};

  return {
    title: `${category.name} — KQUEL Collections`,
    description: `${category.tagline} Explore the KQUEL ${category.name.toLowerCase()} catalog.`,
    alternates: { canonical: `/collections/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  /* The grid is a client component; it gets the listing and not the prose,
     which would otherwise be serialised into the page a second time. */
  const { editorial, ...listing } = category;

  return (
    <main id="content" className="flex-1">
      <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-28 md:px-20 md:pt-40 md:pb-36">
        <nav aria-label="Breadcrumb" className="label-caps text-chrome/70">
          <Link
            href="/collections"
            className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-foreground"
          >
            Collections
          </Link>
          <span className="px-2 text-chrome/70">/</span>
          <span className="text-chrome/80">{category.name}</span>
        </nav>

        {/* The introduction sits beside the title rather than beneath it, so
            the pieces stay high on the page. */}
        <header className="mt-8 mb-16 grid grid-cols-1 gap-x-20 gap-y-8 md:mb-20 lg:grid-cols-[1fr_minmax(0,36rem)] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.02em] text-foreground">
              {category.name}
            </h1>
            <p className="mt-5 max-w-xl font-display text-lg italic leading-relaxed text-chrome/70 md:text-xl">
              {category.tagline}
            </p>
          </div>
          <p className="max-w-[60ch] text-base leading-relaxed text-chrome/80 md:text-lg">
            {editorial.intro}
          </p>
        </header>

        <CatalogView category={listing} />

        <CollectionEditorial category={category} />

        <div className="mt-24 flex flex-col items-center md:mt-32">
          <div aria-hidden className="mb-12 h-px w-full bg-chrome/15" />
          <Link
            href="/collections"
            className="label-caps border border-chrome/40 px-12 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
          >
            View all collections
          </Link>
        </div>
      </div>
    </main>
  );
}
