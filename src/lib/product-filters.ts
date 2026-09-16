import type { Product } from "./catalog";

/* Options for the collection page's filter bar. Kept apart from catalog.ts,
   which fetches on the server and cannot be imported by the client-side
   grid that uses these. */

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
