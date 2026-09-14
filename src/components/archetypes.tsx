"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import whirlpoolImage from "../../public/collection_section_images/whirlpool.jpg";
import saunaImage from "../../public/collection_section_images/sauna.jpg";
import poolsImage from "../../public/collection_section_images/pools.jpg";
import showersImage from "../../public/collection_section_images/showers.jpg";
import steamImage from "../../public/catalog_images/steam-kq004.png";
import spaImage from "../../public/catalog_images/aquel-hot-spa.png";

type Category = {
  index: string;
  title: string;
  href: string;
  src: string | StaticImageData;
  alt: string;
  /* Six tiles filling a 12 × 3 grid exactly: 6×2 + 6 + 6 + 4 + 4 + 4. */
  span: string;
};

const CATEGORIES: Category[] = [
  {
    index: "01",
    title: "Whirlpool",
    href: "/collections/whirlpool-bathtubs",
    src: whirlpoolImage,
    alt: "Stone whirlpool bath glowing from within, set against a dark textured wall",
    span: "sm:col-span-2 md:col-span-6 md:row-span-2",
  },
  {
    index: "02",
    title: "Sauna",
    href: "/collections/sauna",
    src: saunaImage,
    alt: "Dark timber sauna with layered benches and soft ember light",
    span: "sm:col-span-2 md:col-span-6",
  },
  {
    index: "03",
    title: "Steam",
    href: "/collections/steam",
    src: steamImage,
    alt: "Steam cum shower cabin in glass and dark metal",
    span: "sm:col-span-2 md:col-span-6",
  },
  {
    index: "04",
    title: "Spa",
    href: "/collections/spa",
    src: spaImage,
    alt: "Aquel hot spa with underwater lighting",
    span: "sm:col-span-1 md:col-span-4",
  },
  {
    index: "05",
    title: "Showers",
    href: "/collections/showers",
    src: showersImage,
    alt: "Rain shower head streaming water against dark stone",
    span: "sm:col-span-1 md:col-span-4",
  },
  {
    index: "06",
    title: "Pools",
    href: "/collections/pools",
    src: poolsImage,
    alt: "Indoor lap pool in raw concrete lit by a single line of light",
    span: "sm:col-span-2 md:col-span-4",
  },
];

const EASE = [0.19, 1, 0.22, 1] as const;

function CategoryTile({
  category,
  order,
  animate,
}: {
  category: Category;
  order: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 26 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay: order * 0.08 }}
      className={`group relative min-h-[15rem] overflow-hidden border border-chrome/15 transition-[border-color,box-shadow] duration-500 hover:border-violet/70 hover:shadow-[0_0_28px_rgba(124,92,255,0.28)] focus-within:border-violet/70 focus-within:shadow-[0_0_28px_rgba(124,92,255,0.28)] md:min-h-0 ${category.span}`}
    >
      <Link
        href={category.href}
        aria-label={`${category.title} collection`}
        className="block h-full w-full focus-visible:outline-none"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={category.src}
            alt={category.alt}
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
          <p className="label-caps text-violet-ink">{category.index}</p>
          <h3 className="font-display text-[1.6rem] leading-none text-foreground md:text-[1.85rem]">
            {category.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Archetypes() {
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
        {CATEGORIES.map((category, i) => (
          <CategoryTile
            key={category.index}
            category={category}
            order={i}
            animate={animate}
          />
        ))}
      </div>
    </section>
  );
}
