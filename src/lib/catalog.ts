import type { StaticImageData } from "next/image";
import { COLLECTION_COPY, type CategoryEditorial } from "./collection-copy";
import { tub, unit } from "./product-builders";

/* Collection cover art */
import whirlpoolCover from "../../public/collection_section_images/whirlpool.jpg";
import saunaCover from "../../public/collection_section_images/sauna.jpg";
import poolsCover from "../../public/collection_section_images/pools.jpg";
import showersCover from "../../public/collection_section_images/showers.jpg";

/* Product photography */
import aquelHotSpa from "../../public/catalog_images/aquel-hot-spa.png";
import empress from "../../public/catalog_images/empress.png";
import owens6x6 from "../../public/catalog_images/owens-6x6.png";
import owens6x5 from "../../public/catalog_images/owens-6x5.png";
import supreme from "../../public/catalog_images/supreme.png";
import oplux from "../../public/catalog_images/oplux.png";
import triora from "../../public/catalog_images/triora.png";
import sublime from "../../public/catalog_images/sublime.png";
import atlanta from "../../public/catalog_images/atlanta.png";
import diana from "../../public/catalog_images/diana.png";
import vintage from "../../public/catalog_images/vintage.png";
import slate from "../../public/catalog_images/slate.png";
import slime from "../../public/catalog_images/slime.png";
import opel from "../../public/catalog_images/opel.png";
import taal from "../../public/catalog_images/taal.png";
import roman from "../../public/catalog_images/roman.png";
import lineaLux from "../../public/catalog_images/linea-lux.png";
import aquaNova from "../../public/catalog_images/aqua-nova.png";
import symphony from "../../public/catalog_images/symphony.png";
import focus from "../../public/catalog_images/focus.png";
import coral from "../../public/catalog_images/coral.png";
import silven from "../../public/catalog_images/silven.png";
import glamour from "../../public/catalog_images/glamour.png";
import splash from "../../public/catalog_images/splash.png";
import mist from "../../public/catalog_images/mist.png";
import breeze from "../../public/catalog_images/breeze.png";
import tulipe from "../../public/catalog_images/tulipe.png";
import explorer from "../../public/catalog_images/explorer.png";
import breeze2 from "../../public/catalog_images/breeze-2.png";
import baine from "../../public/catalog_images/baine.png";
import hydraLux from "../../public/catalog_images/hydra-lux.png";
import standelle from "../../public/catalog_images/standelle.jpeg";
import aquaLith from "../../public/catalog_images/aqua-lith.png";
import saunaRoom from "../../public/catalog_images/sauna-room.png";
import saunaBath4kw from "../../public/catalog_images/sauna-bath-4kw.png";
import steamCumSauna from "../../public/catalog_images/steam-cum-sauna.png";
import steamKq01 from "../../public/catalog_images/steam-kq01.png";
import steamKq06s from "../../public/catalog_images/steam-kq06s.png";
import steamKq006 from "../../public/catalog_images/steam-kq006.png";
import steamAq006s from "../../public/catalog_images/steam-aq006s.png";
import steamKq002 from "../../public/catalog_images/steam-kq002.png";
import steamKq004 from "../../public/catalog_images/steam-kq004.png";
import plunge from "../../public/catalog_images/plunge.webp";

/* Accessories */
import whirlpoolPump from "../../public/bathtub_accesories/whirlpool-pump.png";
import whirlpoolJet from "../../public/bathtub_accesories/whirlpool-jet.png";
import spineJetImg from "../../public/bathtub_accesories/spine-jet.png";
import airBlower from "../../public/bathtub_accesories/air-blower.png";
import controlPanel from "../../public/bathtub_accesories/control-panel.png";
import diverterSet from "../../public/bathtub_accesories/diverter-set.png";
import mixingValve from "../../public/bathtub_accesories/mixing-valve.png";

export type BlueprintForm = "square" | "rect" | "round" | "corner";

export type Product = {
  name: string;
  slug: string;
  configuration: string;
  sizes: string[];
  image?: StaticImageData;
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
};

export type Category = {
  index: string;
  name: string;
  slug: string;
  tagline: string;
  src: StaticImageData;
  alt: string;
  products: Product[];
  editorial: CategoryEditorial;
};

/* The collection without its copy: what the tiles and the grid need. */
export type CategoryListing = Omit<Category, "editorial">;

const STEAM_CABIN_SPECS = [
  {
    title: "Enclosure",
    items: ["Steam cum shower enclosure", "Tempered glass", "Integrated seating"],
  },
  {
    title: "Steam",
    items: ["Steam generator unit", "Electronic control panel"],
  },
  { title: "Fittings", items: ["Overhead shower", "Hand holding shower"] },
];

/* Cabins share one specification, so written copy is what keeps their pages
   from reading as duplicates of each other. The generated line stands in
   only until a cabin is photographed and written up. */
const steamCabin = (
  name: string,
  size: string,
  image?: StaticImageData,
  story?: string
) =>
  unit({
    name,
    slug: name.toLowerCase(),
    configuration: "Steam cum shower",
    sizes: [size],
    image,
    story:
      story ??
      `A ${size} steam cum shower enclosure. The cabin runs as a shower or seals for a steam cycle, with the generator and controls held on a single panel.`,
    specGroups: STEAM_CABIN_SPECS,
  });

const showerFitting = (
  name: string,
  slug: string,
  configuration: string,
  story: string,
  items: string[]
) =>
  unit({
    name,
    slug,
    configuration,
    sizes: ["—"],
    story,
    highlights: [{ label: "Type", value: configuration }],
    specGroups: [{ title: "Specification", items }],
  });

/* ---------------------------------------------------------------- */
/* Whirlpool bathtubs                                                */
/* ---------------------------------------------------------------- */

const WHIRLPOOL_TUBS: Product[] = [
  /* Double seater */
  tub({
    name: "Owens", slug: "owens-6x5", configuration: "Double seater",
    sizes: ["6 × 5 ft"], image: owens6x5, form: "rect",
    spineJets: 4, pillows: 2,
    extras: ["Teakwood top with waterproof finish"],
    story:
      "The broadest of the double seaters, framed in teak finished against water. Two bathers lie side by side with room between them rather than shoulder to shoulder, and the dark timber rim turns a white shell into a piece of furniture.",
  }),
  tub({
    name: "Supreme", slug: "supreme", configuration: "Double seater",
    sizes: ["6 × 4 ft"], image: supreme, form: "rect",
    spineJets: 4, pillows: 2,
    story:
      "A double whirlpool bath laid out face to face. Supreme sets its two headrests at opposite ends of the shell, so the bath is shared along its length rather than side by side, and a long sculpted apron gives the front its line.",
  }),
  tub({
    name: "Oplux", slug: "oplux", configuration: "Double seater",
    sizes: ["6 × 4 ft"], image: oplux, form: "rect",
    spineJets: 4, pillows: 2,
    story:
      "Six feet by four, drawn in straight lines. Oplux has the plainest shell of the double seaters — square corners, level walls, an open floor — which makes it the one to specify for a room with strong architecture of its own.",
  }),
  tub({
    name: "Triora", slug: "triora", configuration: "Double seater",
    sizes: ["6 × 4'3\" ft"], image: triora, form: "rect",
    spineJets: 4, pillows: 2,
    story:
      "A double whirlpool bath squared at one end and swept round at the other. Triora seats two side by side against its straight back wall, while the far end curves away in a single moulded arc — a bath that softens a room rather than filling it.",
  }),
  tub({
    name: "Sublime", slug: "sublime", configuration: "Double seater",
    sizes: ["6 × 3.6 ft"], image: sublime, form: "rect",
    panel: "Toughened glass panel", spineJets: 4, pillows: 2,
    extras: ["Teakwood top with waterproof finish"],
    story:
      "A double whirlpool bath with a window in its side. A toughened glass panel lets the light from beneath the water out into the room, and a teak top, finished against water, draws a dark line around the rim. The most architectural bath in the collection.",
  }),
  tub({
    name: "Atlanta", slug: "atlanta", configuration: "Double seater",
    sizes: ["6 × 3.3 ft"], image: atlanta, form: "rect",
    story:
      "The narrowest of the double seaters, and only a little wider than a single. Atlanta brings a bath for two into a room that could not otherwise give up the width, with a sculpted apron and a grab rail at its end.",
  }),
  tub({
    name: "Diana", slug: "diana", configuration: "Double seater",
    sizes: ["5.6 × 4 ft"], image: diana, form: "rect",
    spineJets: 4, pillows: 2,
    story:
      "The shortest of the double seaters. Diana trades length for breadth, setting its two headrests side by side at one end of a four-foot-wide shell — the bath for two in a room that is wide rather than long.",
  }),

  /* Single seater */
  tub({
    name: "Vintage", slug: "vintage", configuration: "Single seater",
    sizes: ["6 × 3 ft"], image: vintage, form: "rect",
    story:
      "An oval bowl set into a rectangular deck — the shape most people draw when they draw a bath. Vintage keeps that familiar silhouette and puts a full whirlpool inside it, with the jets set along the curve of its walls.",
  }),
  tub({
    name: "Slate", slug: "slate", configuration: "Single seater",
    sizes: ["6 × 3 ft"], image: slate, form: "rect",
    story:
      "The plainest of the six-foot singles. A clean oval bowl and a broad, flat rim: the whirlpool and air systems are fitted as on every KQUEL bath, but nothing on the deck competes with the shape.",
  }),
  tub({
    name: "Slime", slug: "slime", configuration: "Single seater",
    sizes: ["6 × 3 ft"], image: slime, form: "rect",
    story:
      "A six-foot single moulded to the body rather than to a rule. The shell rises into a lumbar support, dips for the seat and lifts into a headrest at one end, so the bather is held in place while the jets do their work.",
  }),
  tub({
    name: "Opel", slug: "opel", configuration: "Single seater",
    sizes: ["6 × 3 ft"], image: opel, form: "rect",
    story:
      "A squared basin inside a six-by-three shell. Opel's walls run straight and its floor stays level, giving a full length to stretch out in, with the jets lined along both sides and the air rising from beneath.",
  }),
  tub({
    name: "Taal", slug: "taal", configuration: "Single seater",
    sizes: ["6 × 2.6 ft"], image: taal, form: "rect",
    story:
      "Six feet long and the narrowest of the six-foot baths, alongside Roman. Taal is the whirlpool for the long, narrow bathroom — mixer, spout and hand shower lined along the rim, a grab bar at the head, and nothing asked of the room's width.",
  }),
  tub({
    name: "Roman", slug: "roman", configuration: "Single seater",
    sizes: ["6 × 2.6 ft"], image: roman, form: "rect",
    story:
      "The classic bath line, drawn long and low. Roman is six feet of straight, uninterrupted basin with a single soft line across its apron, shaped the way baths have been for a century and fitted the way they have not.",
  }),
  tub({
    name: "Linea Lux", slug: "linea-lux", configuration: "Single seater",
    sizes: ["5.8 × 2.6 ft"], image: lineaLux, form: "rect",
    story:
      "Straight lines, end to end. Linea Lux sets its mixer, spout and hand shower in a row along the rim and keeps its apron flat and unbroken — a bath for rooms finished in stone, tile, or anything else with edges of its own.",
  }),
  tub({
    name: "Aqua Nova", slug: "aqua-nova", configuration: "Single seater",
    sizes: ["5.6 × 2.6 ft", "5 × 2.6 ft"], image: aquaNova, form: "rect",
    story:
      "A single whirlpool bath offered in two lengths. Aqua Nova keeps the same width, shell and headrest either way, so the choice is made by the length of the room alone and nothing about the bath has to give.",
  }),
  tub({
    name: "Symphony", slug: "symphony", configuration: "Single seater",
    sizes: ["5.6 × 2.6 ft", "5 × 2.6 ft"], image: symphony, form: "rect",
    story:
      "The most sculpted of the compact singles. Symphony moulds armrests and a raised headrest into its shell and stands the whole of it on a recessed plinth; like Aqua Nova, it comes in two lengths, so the form survives a shorter room intact.",
  }),
  tub({
    name: "Focus", slug: "focus", configuration: "Single seater",
    sizes: ["5.6 × 2.6 ft"], image: focus, form: "rect",
    story:
      "Everything a whirlpool bath carries, in a compact single-seat shell. Focus lines its fittings along the deck and contours the basin to the body, so a smaller bathroom gives up floor space and nothing else.",
  }),
  tub({
    name: "Coral", slug: "coral", configuration: "Single seater",
    sizes: ["5.6 × 3 ft", "5 × 3 ft", "5.6 × 2.6 ft", "4.6 × 2.6 ft"],
    image: coral, form: "rect",
    story:
      "The whirlpool bath that fits. Coral is built in four sizes, from 5.6 by 3 feet down to 4.6 by 2.6, so the same bath can be specified for a principal bathroom and a guest room alike, with a light beneath the waterline in every one.",
  }),

  /* Corner */
  tub({
    name: "Silven", slug: "silven", configuration: "Corner",
    sizes: ["5 × 5 ft"], image: silven, form: "corner",
    panel: "Glass panel", spineJets: 4, pillows: 3,
    story:
      "A corner whirlpool bath with glass set into its curved front. Silven's panel lets the light from under the water out into the room, a grab rail follows the arc above it, and a third headrest makes it the corner bath for more than two.",
  }),
  tub({
    name: "Glamour", slug: "glamour", configuration: "Corner",
    sizes: ["5 × 5 ft"], image: glamour, form: "corner",
    panel: "Front panel", spineJets: 4, pillows: 2,
    story:
      "A five-foot corner bath that seats two, turned towards each other. Glamour sets a headrest at either end of its arc, sweeps its front round in one broad curve and bands the apron in fine horizontal lines.",
  }),
  tub({
    name: "Splash", slug: "splash", configuration: "Corner",
    sizes: ["5 × 5 ft", "4.6 × 4.6 ft"], image: splash, form: "corner",
    panel: "Front panel", spineJets: 4, pillows: 2,
    story:
      "Two moulded seats inside a quarter-circle. Splash is shaped for sitting rather than lying — backrest, seat and footwell formed into the shell itself — and is built in two sizes, so the corner decides which.",
  }),
  tub({
    name: "Mist", slug: "mist", configuration: "Corner",
    sizes: ["4 × 4 ft"], image: mist, form: "corner",
    panel: "Front panel", spineJets: 4, pillows: 2,
    story:
      "The smallest corner bath in the collection, four feet on each side. Mist fits a whirlpool into the room that believed it had no space for one, with a diamond motif pressed into its apron.",
  }),

  /* Round */
  tub({
    name: "Breeze", slug: "breeze", configuration: "Round",
    sizes: ["6 ft round"], image: breeze, form: "round",
    panel: "Front panel", jets: 8, spineJets: 6, bubbleJets: 20, pillows: 4,
    story:
      "The largest round bath in the collection, six feet across. Breeze seats four around a sunken central well and carries the fullest fitment of the round range — more jets and more air than any round bath but Tulipe.",
  }),
  tub({
    name: "Tulipe", slug: "tulipe", configuration: "Round",
    sizes: ["5 ft round"], image: tulipe, form: "round",
    panel: "Front panel", jets: 8, spineJets: 6, bubbleJets: 20, pillows: 4,
    story:
      "The fitment of Breeze in a five-foot bowl. Tulipe keeps the four headrests and the round range's fullest jet and air systems, and moulds its interior into rounded seats that open like petals from the centre.",
  }),
  tub({
    name: "Explorer", slug: "explorer", configuration: "Round",
    sizes: ["5 ft round"], image: explorer, form: "round",
    panel: "Front panel", spineJets: 4, pillows: 2,
    story:
      "A round whirlpool bath for two, seated side by side. Explorer sets its headrests together on one side of a five-foot bowl, looking across a textured footwell to the fittings on the far rim.",
  }),
  tub({
    name: "Breeze 2", slug: "breeze-2", configuration: "Round",
    sizes: ["5 ft round"], image: breeze2, form: "round",
    panel: "Front panel", spineJets: 4, pillows: 2,
    story:
      "Two seats facing each other across a five-foot bowl, and a rope-twist moulding running round the rim. Breeze 2 is the round bath with ornament — a classical edge on a whirlpool shell.",
  }),

  /* Free standing */
  tub({
    name: "Baine", slug: "baine", configuration: "Free standing",
    sizes: ["6 × 3 ft"], image: baine, form: "rect",
    panel: "Panel", pillows: 0,
    story:
      "A free-standing whirlpool bath: an oval shell that stands in the room rather than against it. Baine rises at both ends, finishes every side and carries its fittings on the deck, so it can be placed wherever the plumbing can reach.",
  }),
  tub({
    name: "Hydra Lux", slug: "hydra-lux", configuration: "Free standing",
    sizes: ["5'3\" × 3'0\" × 2'0\""], image: hydraLux, form: "rect",
    panel: "Panel", pillows: 0,
    story:
      "The compact free-standing whirlpool, two feet tall. Hydra Lux is an egg-shaped shell that turns one flatter side to the wall to carry its fittings, and leaves the rest of its curve to the room.",
  }),

  /* Soaking tubs — no whirlpool fitment, so no jet geometry to draw. */
  unit({
    name: "Standelle", slug: "standelle", configuration: "Soaking tub",
    sizes: ["—"], image: standelle,
    story:
      "A free-standing slipper bath raised on ornamental claw feet. Standelle lifts high at one end so the back reclines, the way a bath did in a Victorian house, and rolls its rim all the way round. There are no jets and no panels: it is a bath for lying in still water.",
    highlights: [{ label: "Type", value: "Soaking tub" }],
    specGroups: [
      { title: "Specification", items: ["Pop up waste", "Golden legs", "Outer legs"] },
    ],
  }),
  unit({
    name: "Aqua Lith", slug: "aqua-lith", configuration: "Soaking tub",
    sizes: ["—"], image: aquaLith,
    story:
      "A free-standing, double-ended soaking tub: one seamless oval shell, raised equally at both ends and set straight onto the floor. Aqua Lith has no legs, no panels and no jets — only a fine rim and a deep bowl — so it can be turned to face whichever way the room is best seen.",
    highlights: [{ label: "Type", value: "Soaking tub" }],
    specGroups: [{ title: "Specification", items: ["Pop up waste"] }],
  }),
];

/* ---------------------------------------------------------------- */
/* Hot spas                                                          */
/* ---------------------------------------------------------------- */

const SPA: Product[] = [
  tub({
    name: "Aquel Hot Spa", slug: "aquel-hot-spa", configuration: "Hot spa",
    sizes: ["7 × 8 × 3 ft"], image: aquelHotSpa, form: "rect",
    shellNote: "Spa 10 mm thickness", panel: "8 inch grating",
    pumps: 3, jets: 14, spineJets: 8, bubbleJets: 20, pillows: 4, lights: 3,
    ratedAirPump: true, audio: true, controlsStandard: true,
    extras: ["Online filter"],
    story:
      "The flagship: a seven-by-eight-foot hot spa cast at 10 mm. Seats ring a central well, a grating replaces the side panels so the spa sets into a deck or floor, and three pumps, an online heater and filter, and sound in the shell make it a room of its own.",
  }),
  tub({
    name: "Empress", slug: "empress", configuration: "Hot spa",
    sizes: ["6 × 6 ft"], image: empress, form: "square",
    pumps: 2, jets: 14, spineJets: 8, bubbleJets: 20, pillows: 4, lights: 3,
    ratedAirPump: true, audio: true, controlsStandard: true,
    story:
      "A six-foot square hot spa with a seat in every corner. Empress steps its seating down towards a central well, lights the water from beneath and carries sound in the shell, with the heater, control panel and ozone cycle fitted as standard.",
  }),
  tub({
    name: "Owens", slug: "owens-6x6", configuration: "Hot spa",
    sizes: ["6 × 6 ft"], image: owens6x6, form: "square",
    spineJets: 8, pillows: 4,
    story:
      "The shape and seating of a hot spa, at the fitment of a whirlpool bath. Owens gives four people a place in a six-foot square, a headrest set at each seat around the rim, with the heater and control panel left as options.",
  }),
];

/* ---------------------------------------------------------------- */
/* Sauna & steam                                                     */
/* ---------------------------------------------------------------- */

const SAUNA: Product[] = [
  unit({
    name: "Sauna Bath 3 kW", slug: "sauna-bath-3kw", configuration: "Sauna room",
    sizes: ["1200 × 1200 × 2000 mm"], image: saunaRoom,
    story:
      "A wood-lined cabin on a 3 kW heater, holding high temperature at low humidity. Built to the size the room requires.",
    highlights: [
      { label: "Dimensions", value: "1200 × 1200 × 2000 mm" },
      { label: "Heater", value: "3 kW" },
    ],
    specGroups: [
      { title: "Cabin", items: ["Wood-lined cabin", "Bench seating", "Available in any size required"] },
      { title: "Heat", items: ["3 kW heater", "Traditional dry heat", "Low humidity"] },
    ],
  }),
  unit({
    name: "Sauna Bath 4 kW", slug: "sauna-bath-4kw", configuration: "Sauna room",
    sizes: ["1200 × 1800 × 2000 mm"], image: saunaBath4kw,
    story:
      "The larger of the two cabins, on a 4 kW heater, with bench depth for a longer sitting. Built to the size the room requires.",
    highlights: [
      { label: "Dimensions", value: "1200 × 1800 × 2000 mm" },
      { label: "Heater", value: "4 kW" },
    ],
    specGroups: [
      { title: "Cabin", items: ["Wood-lined cabin", "Bench seating", "Available in any size required"] },
      { title: "Heat", items: ["4 kW heater", "Traditional dry heat", "Low humidity"] },
    ],
  }),
  unit({
    name: "Steam Cum Sauna", slug: "steam-cum-sauna", configuration: "Steam & sauna",
    sizes: ["1050 × 1800 × 2000 mm"], image: steamCumSauna,
    story:
      "One cabin running two climates — dry sauna heat on one cycle, saturated steam on the other, held on a single control panel.",
    specGroups: [
      { title: "Cabin", items: ["Combined steam and sauna cabin", "Bench seating", "Available in any size required"] },
      { title: "Systems", items: ["Sauna heater", "Steam generator unit", "Electronic control panel"] },
    ],
  }),
];

/* ---------------------------------------------------------------- */
/* Steam                                                             */
/* ---------------------------------------------------------------- */

/* Steam is its own climate — saturated humidity rather than the dry heat of
   a sauna — so the cabins are catalogued apart from the sauna rooms. */
const STEAM: Product[] = [
  steamCabin(
    "AQU1", "1000 × 1000 mm", steamKq01,
    "A compact corner steam shower cabin, one metre square. AQU1 curves its glass front into the corner of the bathroom and brings its roof to a point above it; inside, a moulded seat, an overhead shower and a hand shower on a rail. Shower in the morning, sealed for steam at night — on the smallest footprint in the steam range."
  ),
  steamCabin(
    "AQUS1", "1000 × 1000 mm", steamKq06s,
    "A one-metre corner steam cabin with a softer outline. AQUS1 shares AQU1's footprint, but its canopy follows the curve of the glass instead of meeting at a point, so the whole enclosure reads as a single arc. A frosted band at mid-height, a moulded seat, and steam and shower run from one electronic panel."
  ),
  steamCabin("AQU2", "900 × 1400 mm"),
  steamCabin("AQUS2", "900 × 1200 mm"),
  steamCabin(
    "AQU3", "1200 × 1200 mm", steamKq006,
    "A 1200 mm corner steam shower cabin, raised on a moulded base edged in steel. AQU3 keeps the curved front of the compact cabins and adds the room between seat and glass that turns a steam cycle from a few minutes into something you stay for."
  ),
  steamCabin(
    "AQUS3", "1200 × 1200 mm", steamAq006s,
    "A square-fronted steam shower cabin, 1200 × 1200 mm, with straight sliding doors in place of a curve. AQUS3 suits a bathroom built in right angles — tile, stone, a flat run of wall — and sets its digital control panel beside the door, where it is reached before the steam begins."
  ),
  steamCabin(
    "AQU4", "1500 × 1500 mm", steamKq002,
    "The largest steam cabin in the collection, at 1500 × 1500 mm — closer to a steam room than a shower that steams. AQU4 stands tall behind curved glass on a high moulded base, with a central column carrying the controls and the hand shower, and space enough to sit back and stay."
  ),
  steamCabin("AQU5", "1200 × 1800 mm"),
  steamCabin("AQU6", "750 × 1700 mm"),
  steamCabin("AQU7", "900 × 1800 mm"),
];

/* ---------------------------------------------------------------- */
/* Pools                                                             */
/* ---------------------------------------------------------------- */

const POOLS: Product[] = [
  unit({
    name: "Customised Swimming Pool with Deck",
    slug: "customised-swimming-pool",
    configuration: "Swimming pool",
    sizes: ["12 × 7 × 4 ft"], image: plunge,
    story:
      "A twelve-foot pool in a 10 mm shell, decked in W.P.C on two sides with stairs down to the water. Filtration, heating and ozone run in line; whirlpool and air systems turn the whole of it into a bath. Built to any size required.",
    highlights: [
      { label: "Dimensions", value: "12 × 7 × 4 ft" },
      { label: "Shell", value: "10 mm" },
      { label: "Air pump", value: "700 kWh" },
      { label: "Decking", value: "Two sides" },
    ],
    specGroups: [
      { title: "Structure", items: ["Pool 10 mm thickness", "W.P.C decking 2 sides with stairs", "3 step ladder", "8 inch grating"] },
      { title: "Hydrotherapy", items: ["Whirlpool pump", "Whirlpool jet", "Whirlpool spine jet", "Air pump 700 kWh", "Air bubble jets", "Air regulator"] },
      { title: "Water treatment", items: ["Filtration unit with motor", "Online filter", "Online heater", "Ozone disinfection"] },
      { title: "Fittings", items: ["Under water L.E.D light", "Hot & cold mixing valve", "Hand holding shower", "Water fall spout", "Pop up waste", "Bath tub pillow"] },
      { title: "Control & audio", items: ["Electronic control panel", "Hi-fi speaker", "FM radio"] },
    ],
  }),
];

/* ---------------------------------------------------------------- */
/* Showers                                                           */
/* ---------------------------------------------------------------- */

const SHOWERS: Product[] = [
  showerFitting(
    "Spa Shower 3 Function", "spa-shower-3-function", "Spa shower",
    "An LED spa shower carrying three flow patterns on one head, switched at the wall.",
    ["LED spa shower", "Three flow functions", "Chrome, rose gold, black or gold"]
  ),
  showerFitting(
    "Spa Shower 1 Function", "spa-shower-1-function", "Spa shower",
    "A single-function LED spa shower, available across several head designs.",
    ["LED spa shower", "Single flow function", "Multiple head designs", "Chrome, rose gold, black or gold"]
  ),
  showerFitting(
    "Waterfall Flow Shower", "waterfall-flow-shower", "Spa shower",
    "An LED head that drops water as an unbroken sheet rather than a spray.",
    ["LED spa shower", "Waterfall flow", "Chrome, rose gold, black or gold"]
  ),
  ...["AQU1", "AQU2", "AQU3", "AQU4", "AQU5"].map((name) =>
    showerFitting(
      name, `single-flow-${name.toLowerCase()}`, "Single flow shower",
      `A single flow shower head, ${name} in the series.`,
      ["Single flow shower head", "Chrome, rose gold, black or gold"]
    )
  ),
  ...["WALL-E1", "WALL-E2", "WALL-E3", "WALL-E4", "WALL-E5"].map((name) =>
    showerFitting(
      name, `wall-${name.toLowerCase()}`, "Wall mounted",
      `A wall mounted shower, ${name} in the series.`,
      ["Wall mounted shower", "Chrome, rose gold, black or gold"]
    )
  ),
];

/* ---------------------------------------------------------------- */
/* Accessories                                                       */
/* ---------------------------------------------------------------- */

const FINISHES = "Chrome, rose gold, black or gold";

const accessory = (
  name: string,
  slug: string,
  group: "Bathtub accessory" | "Bathroom accessory",
  story: string,
  items: string[],
  image?: StaticImageData
) =>
  unit({
    name,
    slug,
    configuration: group,
    sizes: ["—"],
    image,
    story,
    highlights: [{ label: "Type", value: group }],
    specGroups: [{ title: "Specification", items }],
  });

/* The working parts behind a whirlpool bath, supplied on their own for
   specification, replacement and service. */
const ACCESSORIES: Product[] = [
  accessory(
    "Whirlpool Pump", "whirlpool-pump", "Bathtub accessory",
    "The motor behind the jets. Sized to the shell it serves, and the part that decides how a bath sounds as much as how it feels.",
    ["Whirlpool motor", "Sized to the tub", "Serviceable in place"],
    whirlpoolPump
  ),
  accessory(
    "Whirlpool Jet", "whirlpool-jet", "Bathtub accessory",
    "The directional jet set into the wall of the shell, adjustable at the face for flow and angle.",
    ["Directional whirlpool jet", "Adjustable flow", "Set flush to the shell"],
    whirlpoolJet
  ),
  accessory(
    "Spine Jet", "spine-jet", "Bathtub accessory",
    "The narrower jet that runs up the backrest, laid in a column to follow the line of the spine.",
    ["Spine jet", "Backrest column", "Adjustable flow"],
    spineJetImg
  ),
  accessory(
    "Air Blower", "air-blower", "Bathtub accessory",
    "The air pump that lifts bubbles from the floor of the shell, separate from the whirlpool circuit.",
    ["Air pump", "Feeds the air bubble jets", "Air regulator compatible"],
    airBlower
  ),
  accessory(
    "Air Bubble Jet", "air-bubble-jet", "Bathtub accessory",
    "The floor outlet the blower feeds, set in a ring so the air rises evenly across the base.",
    ["Floor-set air outlet", "Ring layout", "Non-return fitting"]
  ),
  accessory(
    "Control Panel", "control-panel", "Bathtub accessory",
    "The electronic panel at the rim that holds the pumps, blower, heater, light and ozone cycle on one face.",
    ["Electronic control panel", "Pump, blower and light control", "Heater and ozone cycle"],
    controlPanel
  ),
  accessory(
    "Diverter Set", "diverter-set", "Bathtub accessory",
    "The valve set that sends water where it is wanted — spout, hand shower or jets — from a single control.",
    ["Diverter valve set", "Multi-outlet", FINISHES],
    diverterSet
  ),
  accessory(
    "Mixing Valve", "mixing-valve", "Bathtub accessory",
    "The hot and cold mixer that sets the temperature before the water reaches the shell.",
    ["Hot & cold mixing valve", "Temperature control", FINISHES],
    mixingValve
  ),
  accessory(
    "Floor Mount Faucet", "floor-mount-faucet", "Bathtub accessory",
    "A floor-standing faucet for free-standing baths, run from below rather than off the wall.",
    ["Floor mounted", "For free-standing baths", FINISHES]
  ),

  accessory(
    "Thermostatic Diverter", "thermostatic-diverter", "Bathroom accessory",
    "A diverter that holds its temperature as the flow is moved between outlets.",
    ["Thermostatic control", "Multi-outlet diverter", FINISHES]
  ),
  accessory(
    "Body Jets", "body-jets", "Bathroom accessory",
    "Wall-set jets for a shower enclosure, plumbed in columns and aimed at the body rather than overhead.",
    ["Wall-set shower jets", "Column layout", FINISHES]
  ),
  accessory(
    "Health Faucet", "health-faucet", "Bathroom accessory",
    "A hand-held spray on a flexible hose, with a trigger that closes as it is released.",
    ["Hand-held spray", "Flexible hose", FINISHES]
  ),
  accessory(
    "Shower Drain", "shower-drain", "Bathroom accessory",
    "A twenty-four inch linear drain that takes the fall of a wet room along one edge.",
    ["Linear drain", "24 inch", FINISHES]
  ),
  accessory(
    "Flood Drain", "flood-drain", "Bathroom accessory",
    "A floor drain sized for the volume a wet room sheds, with a removable grate.",
    ["Floor drain", "Removable grate", FINISHES]
  ),
  accessory(
    "Bottle Trap", "bottle-trap", "Bathroom accessory",
    "The trap under a basin, finished to be seen rather than boxed in.",
    ["Basin trap", "Exposed finish", FINISHES]
  ),
  accessory(
    "Angle Cock", "angle-cock", "Bathroom accessory",
    "The quarter-turn stop valve that isolates a fitting without shutting down the room.",
    ["Quarter-turn stop valve", "Wall mounted", FINISHES]
  ),
];

const ALL_CATEGORIES: CategoryListing[] = [
  {
    index: "01",
    name: "Whirlpool Bathtubs",
    slug: "whirlpool-bathtubs",
    tagline: "Whirlpool baths engineered around the shape of the body.",
    src: whirlpoolCover,
    alt: "Stone whirlpool bath glowing from within, set against a dark textured wall",
    products: WHIRLPOOL_TUBS,
  },
  {
    index: "02",
    name: "Sauna",
    slug: "sauna",
    tagline: "Dry heat held in wood-lined rooms.",
    src: saunaCover,
    alt: "Dark timber sauna with layered benches and soft ember light",
    products: SAUNA,
  },
  {
    index: "03",
    name: "Steam",
    slug: "steam",
    tagline: "Saturated air, sealed in glass.",
    src: steamKq004,
    alt: "Steam cum shower cabin in glass and dark metal",
    products: STEAM,
  },
  {
    index: "04",
    name: "Spa",
    slug: "spa",
    tagline: "Full hot spas for more than one.",
    src: aquelHotSpa,
    alt: "Aquel hot spa with underwater lighting",
    products: SPA,
  },
  {
    index: "05",
    name: "Showers",
    slug: "showers",
    tagline: "Water shaped by pressure, temperature and fall.",
    src: showersCover,
    alt: "Rain shower head streaming water against dark stone",
    products: SHOWERS,
  },
  {
    index: "06",
    name: "Pools",
    slug: "pools",
    tagline: "Edges that dissolve into the horizon.",
    src: poolsCover,
    alt: "Infinity pool edge dissolving into a night skyline",
    products: POOLS,
  },
  {
    index: "07",
    name: "Accessories",
    slug: "accessories",
    tagline: "The working parts, supplied on their own.",
    src: whirlpoolPump,
    alt: "Whirlpool pump unit",
    products: ACCESSORIES,
  },
];

/* Only pieces with photography are published: a card without its own image
   falls back to the collection cover, which misrepresents the piece. A
   collection can stand with nothing in it while its photography is
   prepared. Pieces reappear as soon as their images land. */
export const CATEGORIES: Category[] = ALL_CATEGORIES.map((category, i) => {
  const editorial = COLLECTION_COPY[category.slug];
  /* Without its copy a collection page is a bare listing. Fail the build
     rather than publish one. */
  if (!editorial) {
    throw new Error(
      `No editorial copy for the "${category.slug}" collection — add an entry to collection-copy.ts.`
    );
  }
  return {
    ...category,
    index: String(i + 1).padStart(2, "0"),
    products: category.products.filter((product) => product.image),
    editorial,
  };
});

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function findProduct(productSlug: string) {
  for (const category of CATEGORIES) {
    const product = category.products.find((p) => p.slug === productSlug);
    if (product) return { product, category };
  }
  return undefined;
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
