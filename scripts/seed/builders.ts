/* Seed-time stand-ins for the site's product builders. The site builds a
   full Product from these inputs; the seed only needs the inputs themselves,
   because that is what the Studio stores. Images are file names under
   public/ rather than imported assets. */

export type SeedTub = {
  kind: "tub";
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: string;
  form?: "square" | "rect" | "round" | "corner";
  panel?: string;
  pumps?: number;
  jets?: number;
  spineJets?: number;
  bubbleJets?: number;
  pillows?: number;
  lights?: number;
  ratedAirPump?: boolean;
  audio?: boolean;
  controlsStandard?: boolean;
  extras?: string[];
  shellNote?: string;
  story?: string;
};

export type SeedUnit = {
  kind: "unit";
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: string;
  story: string;
  highlights?: { label: string; value: string }[];
  specGroups: { title: string; items: string[] }[];
};

export type SeedProduct = SeedTub | SeedUnit;

export const tub = (input: Omit<SeedTub, "kind">): SeedProduct => ({
  kind: "tub",
  ...input,
});

export const unit = (input: Omit<SeedUnit, "kind">): SeedProduct => ({
  kind: "unit",
  ...input,
});
