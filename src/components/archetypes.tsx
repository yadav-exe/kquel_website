"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import SanityPicture from "@/components/sanity-picture";
import type { HomePage } from "@/lib/pages";

type Tile = HomePage["archetypes"][number];

/* Six tiles filling a 12 × 3 grid exactly: 6×2 + 6 + 6 + 4 + 4 + 4. The
   first tile in the Studio is the large one. */
const SPANS = [
  "sm:col-span-2 md:col-span-6 md:row-span-2",
  "sm:col-span-2 md:col-span-6",
  "sm:col-span-2 md:col-span-6",
  "sm:col-span-1 md:col-span-4",
  "sm:col-span-1 md:col-span-4",
  "sm:col-span-2 md:col-span-4",
];

const EASE = [0.19, 1, 0.22, 1] as const;

function CategoryTile({
  tile,
  order,
  animate,
}: {
  tile: Tile;
  order: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 26 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay: order * 0.08 }}
      className={`group relative min-h-[15rem] overflow-hidden border border-chrome/15 transition-[border-color,box-shadow] duration-500 hover:border-violet/70 hover:shadow-[0_0_28px_rgba(124,92,255,0.28)] focus-within:border-violet/70 focus-within:shadow-[0_0_28px_rgba(124,92,255,0.28)] md:min-h-0 ${SPANS[order] ?? SPANS[SPANS.length - 1]}`}
    >
      <Link
        href={tile.href}
        aria-label={`${tile.title} collection`}
        className="block h-full w-full focus-visible:outline-none"
      >
        <div className="absolute inset-0 overflow-hidden">
          <SanityPicture
            image={tile.image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 group-focus-within:scale-105"
          />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(rgb(11_11_15/0.22),rgb(11_11_15/0.22)),linear-gradient(0deg,rgb(11_11_15/0.82)_0%,rgb(11_11_15/0.15)_38%,transparent_60%)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6">
          <p className="label-caps text-violet-ink">
            {String(order + 1).padStart(2, "0")}
          </p>
          <h3 className="font-display text-[1.6rem] leading-none text-foreground md:text-[1.85rem]">
            {tile.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Archetypes({ tiles }: { tiles: Tile[] }) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <section
      id="archetypes"
      className="mx-auto flex max-w-[1440px] flex-col px-5 py-28 md:h-svh md:justify-center md:px-20 md:py-10"
    >
      <motion.div
        initial={animate ? { opacity: 0, y: 22 } : false}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-12 flex flex-none flex-col gap-3 md:mb-8"
      >
        <p className="label-caps text-chrome/70">Collections</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground">
          Architectural Archetypes
        </h2>
      </motion.div>

      <div className="grid auto-rows-[15rem] grid-cols-1 gap-5 sm:grid-cols-2 md:min-h-0 md:flex-1 md:auto-rows-auto md:grid-cols-12 md:grid-rows-3 md:gap-6">
        {tiles.map((tile, i) => (
          <CategoryTile key={tile.href} tile={tile} order={i} animate={animate} />
        ))}
      </div>
    </section>
  );
}
