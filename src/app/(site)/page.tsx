import Hero from "@/components/hero";
import Ethos from "@/components/ethos";
import Archetypes from "@/components/archetypes";
import SignaturePieces from "@/components/signature-pieces";
import Innovation from "@/components/innovation";
import WhyKquel from "@/components/why-kquel";
import { findProduct } from "@/lib/catalog";

/* The three most heavily specified pieces in the catalogue. Name, size and
   photography are read from the catalogue so the section cannot drift out
   of step with the collection pages. */
const SIGNATURE = [
  {
    slug: "aquel-hot-spa",
    copy: "Three pumps, twenty-two jets and twenty air bubble outlets, tuned across a single seven-by-eight-foot shell.",
  },
  {
    slug: "customised-swimming-pool",
    copy: "Twelve feet of water on a W.P.C deck, filtered, heated and lit from beneath the surface.",
  },
  {
    slug: "empress",
    copy: "Fourteen jets and eight spine jets held in a six-foot square, with light under the water and sound above it.",
  },
];

export default async function Home() {
  const pieces = (
    await Promise.all(
      SIGNATURE.map(async (entry) => {
        const found = await findProduct(entry.slug);
        if (!found) return null;
        return {
          name: found.product.name,
          size: found.product.sizes[0],
          image: found.product.image ?? found.category.cover,
          alt: found.product.image ? found.product.name : undefined,
          href: `/collections/${found.category.slug}`,
          copy: entry.copy,
        };
      })
    )
  ).filter((piece) => piece !== null);

  return (
    <main id="content" className="flex-1">
      <Hero />
      <Ethos />
      <Archetypes />
      <SignaturePieces pieces={pieces} />
      <Innovation />
      <WhyKquel />
    </main>
  );
}
