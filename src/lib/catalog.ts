import type { SanityImage } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { COLLECTIONS_QUERY } from "@/sanity/queries";
import type { COLLECTIONS_QUERY_RESULT } from "@/sanity/types";
import { tub, unit } from "./product-builders";

/* The catalogue as the pages see it. Content comes from Sanity; the shapes
   here are what the components render, and the builders in
   product-builders.ts turn a whirlpool piece's fitment counts into its
   specification and drawing on the way through. */

export type BlueprintForm = "square" | "rect" | "round" | "corner";

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: SanityImage | null;
  noIndex?: boolean;
};

export type Point = { title: string; body: string };

export type CategoryEditorial = {
  /** What the thing is. Sits beside the title, above the grid. */
  intro: string;
  /** Why it belongs at home, read as a list once the pieces have been seen. */
  reasons: { eyebrow: string; heading: string; items: Point[] };
  /** What sets a KQUEL piece apart. Six points fill the 3 × 2 grid. */
  difference: { heading: string; items: Point[] };
};

export type Product = {
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: SanityImage;
  features: string[];
  story?: string;
  highlights?: { label: string; value: string }[];
  specGroups?: { title: string; items: string[] }[];
  /* Present only where the geometry can be drawn truthfully from the
     catalogue's own counts. */
  blueprint?: {
    form: BlueprintForm;
    /** Plan proportion, width ÷ depth. */
    aspect: number;
    counts: {
      jets: number;
      spineJets: number;
      bubbleJets: number;
      pumps: number;
      lights: number;
    };
    callouts: {
      controlPanel: string;
      heater: string;
      spineJets: string;
      jets: string;
      air: string;
      pumps: string;
    };
  };
  seo?: Seo;
};

export type Category = {
  index: string;
  name: string;
  slug: string;
  tagline: string;
  cover: SanityImage;
  products: Product[];
  editorial: CategoryEditorial;
  seo?: Seo;
};

/* The collection without its copy: what the tiles and the grid need. */
export type CategoryListing = Omit<Category, "editorial">;

type CollectionDoc = COLLECTIONS_QUERY_RESULT[number];
type ProductDoc = CollectionDoc["products"][number];

const orUndefined = <T,>(value: T | null | undefined) => value ?? undefined;

const points = (items: (Point & { _key: string })[] | undefined): Point[] =>
  (items ?? []).map(({ title, body }) => ({ title, body }));

function buildProduct(doc: ProductDoc): Product {
  const common = {
    name: doc.name,
    slug: doc.slug,
    configuration: doc.configuration,
    /* An empty size list means made to specification; the pages show the
       dash the printed catalogue uses. */
    sizes: doc.sizes?.length ? doc.sizes : ["—"],
    image: orUndefined(doc.image),
    story: orUndefined(doc.story),
    seo: orUndefined(doc.seo),
  };

  if (doc.kind === "tub") {
    return tub({
      ...common,
      form: orUndefined(doc.form),
      panel: orUndefined(doc.panel),
      shellNote: orUndefined(doc.shellNote),
      pumps: orUndefined(doc.pumps),
      jets: orUndefined(doc.jets),
      spineJets: orUndefined(doc.spineJets),
      bubbleJets: orUndefined(doc.bubbleJets),
      pillows: orUndefined(doc.pillows),
      lights: orUndefined(doc.lights),
      ratedAirPump: orUndefined(doc.ratedAirPump),
      audio: orUndefined(doc.audio),
      controlsStandard: orUndefined(doc.controlsStandard),
      extras: orUndefined(doc.extras),
    });
  }

  return unit({
    ...common,
    highlights: doc.highlights?.map(({ label, value }) => ({ label, value })),
    specGroups: (doc.specGroups ?? []).map(({ title, items }) => ({
      title,
      items,
    })),
  });
}

function buildCategory(doc: CollectionDoc, position: number): Category {
  const lower = doc.name.toLowerCase();
  return {
    index: String(position + 1).padStart(2, "0"),
    name: doc.name,
    slug: doc.slug,
    tagline: doc.tagline,
    cover: doc.cover,
    products: doc.products.map(buildProduct),
    editorial: {
      intro: doc.intro,
      reasons: {
        eyebrow: doc.reasons?.eyebrow ?? "Why it belongs at home",
        heading: doc.reasons?.heading ?? `Why ${lower} belong at home.`,
        items: points(doc.reasons?.items),
      },
      difference: {
        heading:
          doc.difference?.heading ?? `What makes KQUEL ${lower} different.`,
        items: points(doc.difference?.items),
      },
    },
    seo: orUndefined(doc.seo),
  };
}

/* Tags name what a page depends on. /api/revalidate expires them when an
   editor publishes, and the next request rebuilds the page. */
const TAGS = ["collection", "product"];

/* Every collection with its published pieces, in the editors' order.
   Fetches are cached and deduplicated, so calling this from several
   components on one page costs one request. */
export async function getCategories(): Promise<Category[]> {
  const { data } = await sanityFetch({ query: COLLECTIONS_QUERY, tags: TAGS });
  return (data as COLLECTIONS_QUERY_RESULT).map(buildCategory);
}

/* For generateStaticParams, which runs outside any request: published
   content only, with nothing read from cookies or draft mode. */
export async function getCategoriesForBuild(): Promise<Category[]> {
  const { data } = await sanityFetch({
    query: COLLECTIONS_QUERY,
    tags: TAGS,
    perspective: "published",
    stega: false,
  });
  return (data as COLLECTIONS_QUERY_RESULT).map(buildCategory);
}

export async function getCategory(slug: string) {
  return (await getCategories()).find((category) => category.slug === slug);
}

export async function findProduct(productSlug: string) {
  for (const category of await getCategories()) {
    const product = category.products.find((p) => p.slug === productSlug);
    if (product) return { product, category };
  }
  return undefined;
}

/* The collection without its copy, for client components that only draw
   the tiles or the grid. */
export function toListing(category: Category): CategoryListing {
  const { editorial, ...listing } = category;
  void editorial;
  return listing;
}

export function configurationOptions(products: Product[]) {
  return Array.from(new Set(products.map((p) => p.configuration)));
}

export function sizeOptions(products: Product[]) {
  const sizes = new Set<string>();
  products.forEach((p) =>
    p.sizes.filter((s) => s !== "—").forEach((s) => sizes.add(s))
  );
  return Array.from(sizes);
}
