import type { SignaturePiece } from "@/components/signature-pieces";
import type { SanityImage } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { ABOUT_QUERY, HOME_QUERY } from "@/sanity/queries";
import type { ABOUT_QUERY_RESULT, HOME_QUERY_RESULT } from "@/sanity/types";
import type { Point, Seo } from "./catalog";

/* The two composed pages, as their sections render them. Each is a single
   Studio document; the shapes here are what the components take, with
   nulls and dangling references tidied away. */

export type HomePage = {
  hero: {
    statement: string;
    taglineLead: string;
    taglineAccent: string;
    cta: string;
    image: SanityImage;
  };
  ethos: {
    cards: { title: string; copy: string; image: SanityImage }[];
    closingLead: string;
    closingAccent: string;
  };
  archetypes: { title: string; href: string; image: SanityImage }[];
  signaturePieces: SignaturePiece[];
  innovation: { heading: string; disciplines: Point[]; image: SanityImage };
  closing: {
    heading: string;
    body: string;
    statement: string;
    disciplines: { label: string; name: string; href: string }[];
  };
  seo?: Seo;
};

export type AboutPage = {
  hero: { eyebrow?: string; headline: string; tagline: string; image: SanityImage };
  origin: { eyebrow: string; heading: string; lead: string; quote: string; body: string };
  figures: { label: string; auto: "none" | "years" | "pieces"; value?: string }[];
  principles: { eyebrow: string; heading: string; items: Point[] };
  process: { eyebrow: string; heading: string; items: Point[] };
  material: { eyebrow: string; heading: string; lead: string; body: string };
  promise: { eyebrow: string; heading: string; lead: string; body: string };
  closing: { quote: string; attribution?: string };
  seo?: Seo;
};

const orUndefined = <T,>(value: T | null | undefined) => value ?? undefined;

const points = (
  items: ({ title: string; body: string } & { _key: string })[] | null | undefined
): Point[] => (items ?? []).map(({ title, body }) => ({ title, body }));

const missing = (page: string) =>
  new Error(
    `The ${page} has not been published in the Studio yet. Open /studio, fill it in and publish.`
  );

export async function getHomePage(): Promise<HomePage> {
  const { data } = await sanityFetch({
    query: HOME_QUERY,
    /* Tiles and signature pieces resolve collections and products, so a
       change to either has to reach this page too. */
    tags: ["homePage", "collection", "product"],
  });
  const doc = data as unknown as HOME_QUERY_RESULT;
  if (!doc) throw missing("home page");

  return {
    hero: {
      statement: doc.hero.statement,
      taglineLead: doc.hero.taglineLead,
      taglineAccent: doc.hero.taglineAccent,
      cta: doc.hero.cta,
      image: doc.hero.image,
    },
    ethos: {
      cards: doc.ethos.cards.map(({ title, copy, image }) => ({ title, copy, image })),
      closingLead: doc.ethos.closingLead,
      closingAccent: doc.ethos.closingAccent,
    },
    archetypes: doc.archetypes.flatMap((tile) => {
      /* A tile whose collection was deleted is dropped rather than drawn empty. */
      if (!tile.collection) return [];
      return [
        {
          title: tile.title || tile.collection.name,
          href: `/collections/${tile.collection.slug}`,
          image: tile.image?.asset ? tile.image : tile.collection.cover,
        },
      ];
    }),
    signaturePieces: doc.signaturePieces.flatMap((entry) => {
      const product = entry.product;
      if (!product?.image?.asset || !product.category) return [];
      return [
        {
          name: product.name,
          size: product.sizes?.[0] ?? "Made to specification",
          image: product.image,
          alt: product.name,
          href: `/collections/${product.category}`,
          copy: entry.copy,
        },
      ];
    }),
    innovation: {
      heading: doc.innovation.heading,
      disciplines: points(doc.innovation.disciplines),
      image: doc.innovation.image,
    },
    closing: {
      heading: doc.closing.heading,
      body: doc.closing.body,
      statement: doc.closing.statement,
      disciplines: doc.closing.disciplines.flatMap((d) =>
        d.slug ? [{ label: d.label, name: d.name, href: `/collections/${d.slug}` }] : []
      ),
    },
    seo: orUndefined(doc.seo),
  };
}

export async function getAboutPage(): Promise<AboutPage> {
  const { data } = await sanityFetch({
    query: ABOUT_QUERY,
    tags: ["aboutPage"],
  });
  const doc = data as unknown as ABOUT_QUERY_RESULT;
  if (!doc) throw missing("About page");

  return {
    hero: {
      eyebrow: orUndefined(doc.hero.eyebrow),
      headline: doc.hero.headline,
      tagline: doc.hero.tagline,
      image: doc.hero.image,
    },
    origin: doc.origin,
    figures: doc.figures.map((figure) => ({
      label: figure.label,
      auto: figure.auto ?? "none",
      value: orUndefined(figure.value),
    })),
    principles: {
      eyebrow: doc.principles.eyebrow,
      heading: doc.principles.heading,
      items: points(doc.principles.items),
    },
    process: {
      eyebrow: doc.process.eyebrow,
      heading: doc.process.heading,
      items: points(doc.process.items),
    },
    material: doc.material,
    promise: doc.promise,
    closing: {
      quote: doc.closing.quote,
      attribution: orUndefined(doc.closing.attribution),
    },
    seo: orUndefined(doc.seo),
  };
}
