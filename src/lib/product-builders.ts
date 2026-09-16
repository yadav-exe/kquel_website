import type { SanityImage } from "@/sanity/image";
import type { Product, Seo } from "./catalog";

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

const word = (n: number) => WORDS[n] ?? String(n);
const plural = (n: number, s: string) => `${word(n)} ${s}${n === 1 ? "" : "s"}`;

export type TubInput = {
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: SanityImage;
  /** Drawing shape. Omit for products we cannot draw truthfully. */
  form?: "square" | "rect" | "round" | "corner";
  panel?: string;
  pumps?: number;
  jets?: number;
  spineJets?: number;
  bubbleJets?: number;
  pillows?: number;
  lights?: number;
  /** 700 kWh units are called out by the catalogue; others are unrated. */
  ratedAirPump?: boolean;
  audio?: boolean;
  /** Control panel and heater are standard on the spa tier, optional below. */
  controlsStandard?: boolean;
  extras?: string[];
  shellNote?: string;
  /**
   * Hand-written copy for the product page. When absent, an accurate but
   * plainly worded intro is generated from the numbers below — a placeholder
   * meant to be replaced, not a finished piece of writing.
   *
   * Describe the piece; leave the counts to the specification, which is
   * generated from the same figures and cannot drift out of step with the
   * technical drawing.
   */
  story?: string;
  seo?: Seo;
  updatedAt: Date;
};

/* One product, assembled from its catalogue specification. Features, spec
   groups, highlights, blueprint counts and the written intro all derive from
   the same numbers, so a page can never contradict the specification. */
export function tub(input: TubInput): Product {
  const {
    name, slug, configuration, sizes, image, form, seo, updatedAt,
    panel = "Two side panel",
    pumps = 1, jets = 6, spineJets = 2, bubbleJets = 12,
    pillows = 1, lights = 1,
    ratedAirPump = false, audio = false, controlsStandard = false,
    extras = [], shellNote, story: written,
  } = input;

  const airPump = ratedAirPump ? "Air pump 700 kWh" : "Air pump";
  const pcs = (n: number, label: string) => `${label} ${n} pcs`;

  const construction = [shellNote ?? "Acrylic bathtub", panel, ...extras];
  const hydrotherapy = [
    pumps > 1 ? pcs(pumps, "Whirlpool pump") : "Whirlpool pump",
    pcs(jets, "Whirlpool jet"),
    pcs(spineJets, "Whirlpool spine jet"),
    "Suction",
    "Air regulator",
  ];
  const airSystem = [airPump, pcs(bubbleJets, "Air bubble jets")];
  const fittings = [
    "Hot & cold mixing valve",
    "Hand holding shower",
    "Water fall spout",
    "Pop up waste",
  ];
  const comfort = [
    ...(pillows > 0 ? [pcs(pillows, "Bath tub pillow")] : []),
    lights > 1 ? pcs(lights, "Under water light") : "Under water light",
    ...(audio ? ["Hi-fi speaker", "FM radio"] : []),
  ];
  const controls = controlsStandard
    ? ["Electronic control panel", "Online heater", "Ozone disinfection"]
    : [
        "Ozone disinfection",
        "Electronic control panel (optional)",
        "Online heater (optional)",
      ];

  const specGroups = [
    { title: "Construction", items: construction },
    { title: "Hydrotherapy", items: hydrotherapy },
    { title: "Air system", items: airSystem },
    { title: "Water & fittings", items: fittings },
    { title: "Comfort", items: comfort },
    { title: "Control & hygiene", items: controls },
  ];

  const size = sizes[0];
  const extraSentence = extras.length
    ? ` ${extras.join(" and ")} finish${extras.length > 1 ? "" : "es"} the rim.`
    : "";
  const lightPhrase =
    lights > 1
      ? `${plural(lights, "light")} sit beneath the waterline`
      : "a light sits beneath the waterline";
  const audioPhrase = audio
    ? " A hi-fi speaker and FM radio are carried in the shell."
    : "";

  /* Written copy wins where it exists; the generated line is the fallback. */
  const story =
    written ??
    `A ${size} ${configuration.toLowerCase()} in acrylic with ${panel.toLowerCase()}. ` +
      `${pumps > 1 ? `${plural(pumps, "pump")} drive` : "A single pump drives"} ` +
      `${plural(jets, "whirlpool jet")} and ${plural(spineJets, "spine jet")}, ` +
      `while ${plural(bubbleJets, "air outlet")} rise from the floor of the shell and ${lightPhrase}.` +
      extraSentence +
      audioPhrase;

  /* Proportion for the drawing, taken from the first two figures in the
     stated size ("6 × 3 ft" → 2:1). Falls back to square. */
  const figures = (size.match(/\d+(\.\d+)?/g) ?? []).map(Number);
  const aspect =
    figures.length >= 2 && figures[1] > 0 ? figures[0] / figures[1] : 1;

  const blueprint = form
    ? {
        form,
        aspect,
        counts: { jets, spineJets, bubbleJets, pumps, lights },
        callouts: {
          controlPanel: controlsStandard
            ? "Electronic control panel"
            : "Control panel (optional)",
          heater: controlsStandard
            ? "Online heater & ozone unit"
            : "Heater & ozone unit",
          spineJets: `Whirlpool spine jets (×${spineJets})`,
          jets: `Whirlpool jets (×${jets})`,
          air: `Air injection outlets (×${bubbleJets})`,
          pumps: `Whirlpool ${pumps > 1 ? "pumps" : "pump"} (×${pumps})`,
        },
      }
    : undefined;

  return {
    name, slug, configuration, sizes, image, story, specGroups, blueprint, seo, updatedAt,
    features: [
      ...construction, ...hydrotherapy, ...airSystem,
      ...fittings, ...comfort, ...controls,
    ],
    highlights: [
      { label: "Dimensions", value: size },
      { label: "Whirlpool jets", value: `${jets} pcs` },
      { label: "Spine jets", value: `${spineJets} pcs` },
      { label: "Air bubble jets", value: `${bubbleJets} pcs` },
    ],
  };
}

/* Cabins, showers and pools carry no jet geometry we can draw, so they get a
   plain page: written intro, highlights and grouped specification only. */
export function unit(input: {
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: SanityImage;
  story?: string;
  highlights?: { label: string; value: string }[];
  specGroups: { title: string; items: string[] }[];
  seo?: Seo;
  updatedAt: Date;
}): Product {
  const { specGroups, sizes } = input;
  return {
    ...input,
    features: specGroups.flatMap((group) => group.items),
    highlights:
      input.highlights ?? [{ label: "Dimensions", value: sizes[0] }],
  };
}
