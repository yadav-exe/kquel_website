/* The site's page copy and settings as they stand in the components today,
   in the shape the Studio stores. Once seeded, the Studio is the source and
   this file is history. */

export type SeedImage = { file?: string; url?: string; alt?: string };

type Upload = (source: SeedImage) => Promise<unknown>;
type Keyed = <T extends object>(
  items: T[] | undefined
) => ({ _key: string } & T)[] | undefined;

const collection = (slug: string) => ({
  _type: "reference" as const,
  _ref: `collection-${slug}`,
});
const product = (slug: string) => ({
  _type: "reference" as const,
  _ref: `product-${slug}`,
});

const HERO = { file: "hero_image.jpg" };

/* Staging placeholders from Pexels, carried over until brand photography
   replaces them — now swappable from the Studio rather than the code. */
const PEXELS = {
  steamRoom:
    "https://images.pexels.com/photos/18408807/pexels-photo-18408807/free-photo-of-decorated-room-with-ornament-on-wall.jpeg?auto=compress&cs=tinysrgb&w=1920",
  terrace:
    "https://images.pexels.com/photos/18903511/pexels-photo-18903511/free-photo-of-bathtub-and-sunbed-on-terrace.jpeg?auto=compress&cs=tinysrgb&w=1920",
  villaPool:
    "https://images.pexels.com/photos/19075398/pexels-photo-19075398/free-photo-of-swimming-pool-in-yard-of-luxury-residence.jpeg?auto=compress&cs=tinysrgb&w=1920",
  droplets:
    "https://images.pexels.com/photos/9821737/pexels-photo-9821737.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export async function SITE_SETTINGS(upload: Upload) {
  return {
    name: "KQUEL",
    parent: "Monarch Industries",
    city: "New Delhi",
    founded: 1998,
    positioning:
      "Whirlpool baths, hot spas, saunas and pools, manufactured in New Delhi since 1998.",
    email: "aquelbath.in@gmail.com",
    website: { label: "aquelbath.co.in", href: "https://www.aquelbath.co.in" },
    works: "Monarch Industries, New Delhi",
    defaultShareImage: await upload(HERO),
  };
}

export async function HOME_PAGE(upload: Upload, keyed: Keyed) {
  return {
    hero: {
      statement: "Designing Spaces Where Wellness Becomes A Way Of Life.",
      taglineLead: "Water,",
      taglineAccent: "Crafted.",
      cta: "Let's Dive",
      image: await upload(HERO),
    },
    ethos: {
      cards: keyed([
        {
          title: "Relax",
          copy: "A private sanctuary designed for deep relaxation.",
          image: await upload({
            ...HERO,
            alt: "Sculptural freestanding stone tub in a glass-walled bathroom with soft morning light",
          }),
        },
        {
          title: "Rejuvenate",
          copy: "A daily ritual of warmth, steam and recovery.",
          image: await upload({
            url: PEXELS.steamRoom,
            alt: "Dim stone steam room with mosaic detail and warm ambient light",
          }),
        },
        {
          title: "Escape",
          copy: "Transform your home into a destination.",
          image: await upload({
            url: PEXELS.terrace,
            alt: "Outdoor whirlpool bath on a terrace overlooking a lush garden",
          }),
        },
        {
          title: "Gather",
          copy: "Designed to bring people together.",
          image: await upload({
            url: PEXELS.villaPool,
            alt: "Illuminated villa pool under a night sky",
          }),
        },
      ]),
      closingLead: "Now, the collection that makes it all",
      closingAccent: "possible.",
    },
    /* Tiles use each collection's cover, as the page does today. */
    archetypes: keyed([
      { collection: collection("whirlpool-bathtubs"), title: "Whirlpool" },
      { collection: collection("sauna"), title: "Sauna" },
      { collection: collection("steam"), title: "Steam" },
      { collection: collection("spa"), title: "Spa" },
      { collection: collection("showers"), title: "Showers" },
      { collection: collection("pools"), title: "Pools" },
    ]),
    signaturePieces: keyed([
      {
        product: product("aquel-hot-spa"),
        copy: "Three pumps, twenty-two jets and twenty air bubble outlets, tuned across a single seven-by-eight-foot shell.",
      },
      {
        product: product("customised-swimming-pool"),
        copy: "Twelve feet of water on a W.P.C deck, filtered, heated and lit from beneath the surface.",
      },
      {
        product: product("empress"),
        copy: "Fourteen jets and eight spine jets held in a six-foot square, with light under the water and sound above it.",
      },
    ]),
    innovation: {
      heading: "Synthesis of science and serenity.",
      disciplines: keyed([
        {
          title: "Cryotherapy",
          body: "Recovery through precisely controlled cold. Sub-zero cycles are calibrated to the body, reducing inflammation and sharpening the return to baseline.",
        },
        {
          title: "Hydrotherapy",
          body: "Computational fluid dynamics used to master water pressure and temperature, ensuring a therapeutic ritual that transcends standard bathing.",
        },
      ]),
      image: await upload({
        url: PEXELS.droplets,
        alt: "Macro view of water droplets beading on a brushed metal surface",
      }),
    },
    closing: {
      heading: "Not a bathroom brand.",
      body: "KQUEL builds the rooms a house rests in. Hydrotherapy, steam, sauna, the pool — each piece is engineered to the same three ends: a design worth looking at, the technology to make it work, and the durability to keep it working.",
      statement: "What arrives is not a fitting. It is the environment.",
      disciplines: keyed([
        { label: "Hydrotherapy", name: "Whirlpool baths", collection: collection("whirlpool-bathtubs") },
        { label: "Steam", name: "Steam cabins", collection: collection("steam") },
        { label: "Dry heat", name: "Saunas", collection: collection("sauna") },
        { label: "Immersion", name: "Pools", collection: collection("pools") },
      ]),
    },
  };
}

export async function ABOUT_PAGE(upload: Upload, keyed: Keyed) {
  return {
    hero: {
      headline: "Twenty-eight years on a single subject.",
      tagline: "Water, and the rooms built to hold it.",
      image: await upload({ file: "collection_section_images/whirlpool.jpg" }),
    },
    origin: {
      eyebrow: "The beginning",
      heading: "A bathroom is not a bathroom.",
      lead: "KQUEL was established under Monarch Industries in 1998 with an ambition that sounds simpler than it is — to build a bathtub and whirlpool experience able to stand beside anything made anywhere. Manufacturing and distribution came first. The discipline came with time.",
      quote: "The ambition has not changed since. The tolerances have.",
      body: "We hold that a bathroom is not a utility room. It is where the day is finally set down — a space for relaxation, for rejuvenation, and for the rare quiet in which a person gets to meet themselves. Everything in this catalogue is answerable to that.",
    },
    figures: keyed([
      { label: "Established", auto: "none", value: "1998" },
      { label: "Years of manufacture", auto: "years" },
      { label: "Layers of reinforcement", auto: "none", value: "3" },
      { label: "Pieces in the catalogue", auto: "pieces" },
    ]),
    principles: {
      eyebrow: "Philosophy",
      heading: "Three things every piece has to answer to.",
      items: keyed([
        {
          title: "Luxury, blended with practicality",
          body: "A bath that looks extraordinary and fails in its third year was never luxury to begin with. Every decision answers first to the way a room is actually used, and only then to the eye.",
        },
        {
          title: "Durability and comfort",
          body: "Comfort is easy to stage and hard to sustain. We specify for the tenth year rather than the first week — the reinforcement, the seals and the fitment are all chosen for a life of daily use.",
        },
        {
          title: "Elegance and innovation",
          body: "Elegance is what is left once nothing has been added for effect. Innovation is what allows us to take things away: quieter systems, cleaner lines, controls that settle into the rim.",
        },
      ]),
    },
    process: {
      eyebrow: "Craft",
      heading: "Six stages, in the only order they work in.",
      items: keyed([
        {
          title: "Moulding",
          body: "Every form begins as a mould, and the mould sets the standard that everything after it has to meet.",
        },
        {
          title: "Thermoforming",
          body: "Cast acrylic is heated until it will move, then drawn to the shape of the mould in a single pass.",
        },
        {
          title: "Resin & dispensing",
          body: "Italian resin and dispensing systems meter and mix by machine, so the chemistry does not drift from one shell to the next.",
        },
        {
          title: "Reinforcement",
          body: "Three layers of glass-reinforced plastic are laid behind the shell and cured until the two behave as a single body.",
        },
        {
          title: "Fitment",
          body: "Pumps, whirlpool and spine jets, air lines, lighting and control are set into the shell and plumbed.",
        },
        {
          title: "Quality & after",
          body: "A comprehensive quality programme, and then a service relationship that carries on long after the installation is signed off.",
        },
      ]),
    },
    material: {
      eyebrow: "Material",
      heading: "Three layers deep.",
      lead: "Under every acrylic shell we lay three layers of glass-reinforced plastic, bonded until the shell and its reinforcement behave as one body rather than four.",
      body: "It is why the rim of a KQUEL bath does not flex when you lean on it, why the shell holds its line through a decade of heating and cooling, and why the tub is heavier than it looks when it arrives. Strength you will never see is still the part you feel.",
    },
    promise: {
      eyebrow: "The promise",
      heading: "The relationship does not end at the door.",
      lead: "A bath is delivered once and lived with for years, which makes the delivery the least interesting part of it. Our post-delivery service exists to keep installations smooth, to answer what comes up afterwards, and to make sure a bath feels the way it was meant to — not on the day it arrives, but on an ordinary evening three years later.",
      body: "The quality programme behind it does not scale with the size of the order. Whether you are walking through our doors for the first time or have worked with us for a decade, the standard is the same standard.",
    },
    closing: {
      quote:
        "The goal is not just to manufacture products, but to create an essence that feels right over time.",
    },
  };
}
