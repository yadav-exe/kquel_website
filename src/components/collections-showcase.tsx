"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { CATEGORIES as COLLECTIONS, type Category } from "@/lib/catalog";

function CollectionTile({ collection }: { collection: Category }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      aria-label={`Explore the ${collection.name} collection`}
      className="group relative block h-[62svh] w-[80vw] flex-none overflow-hidden border border-chrome/15 transition-[border-color,box-shadow] duration-500 hover:border-violet/60 hover:shadow-[0_0_34px_rgba(124,92,255,0.25)] focus-visible:border-violet/60 md:h-[72svh] md:w-[46vw]"
    >
      {/* Eager: the track sits off-viewport horizontally, so lazy loading
          would defer these until mid-pan and they would pop in. */}
      <Image
        src={collection.src}
        alt={collection.alt}
        fill
        loading="eager"
        sizes="(max-width: 768px) 80vw, 46vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgb(11_11_15/0.3),rgb(11_11_15/0.3)),linear-gradient(0deg,rgb(11_11_15/0.9)_0%,rgb(11_11_15/0.2)_48%,transparent_72%)]"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-10 text-center md:pb-12">
        <p className="label-caps text-violet-ink">{collection.index}</p>
        <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none text-foreground">
          {collection.name}
        </h2>
        <span className="label-caps inline-flex items-center gap-3 border-b border-chrome/40 pb-2 text-foreground transition-colors duration-300 group-hover:border-violet group-hover:text-violet-ink">
          Explore
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function CollectionsShowcase() {
  const runwayRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [panRange, setPanRange] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    /* Travel is measured centre-to-centre between the first and last tile,
       not from scrollWidth: an overflowing flex row reports scrollWidth
       without its trailing padding, which would stop the pan short and
       leave the last tile off-centre. */
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const tiles = Array.from(track.children) as HTMLElement[];
      if (tiles.length < 2) {
        setPanRange(0);
        return;
      }
      const first = tiles[0];
      const last = tiles[tiles.length - 1];
      const firstCenter = first.offsetLeft + first.offsetWidth / 2;
      const lastCenter = last.offsetLeft + last.offsetWidth / 2;
      setPanRange(Math.max(0, lastCenter - firstCenter));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Function transform: keeps the pan on the main thread, in lockstep with
  // useScroll progress (a declarative range gets promoted to a native
  // ScrollTimeline whose progress can drift from useScroll's).
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const progress = useTransform(scrollYProgress, (v) =>
    clamp01((v - 0.04) / 0.92)
  );
  const x = useTransform(progress, (v) => -panRange * v);
  const railScale = useTransform(progress, (v) => 0.04 + v * 0.96);

  if (reduceMotion) {
    return (
      <section className="px-5 pt-32 pb-28 md:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14">
          {COLLECTIONS.map((collection) => (
            <CollectionTile key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    );
  }

  return (
    /* One viewport of scroll per tile, so the pan keeps its pace as
       collections are added or withheld. */
    <section
      ref={runwayRef}
      className="relative"
      style={{ height: `${COLLECTIONS.length * 100}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col overflow-hidden"
      >
        {/* Equal side padding parks the first and last tiles dead centre at
            each end of the pan. */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-1 items-center gap-[8vw] px-[10vw] md:gap-[6vw] md:px-[27vw]"
        >
          {COLLECTIONS.map((collection) => (
            <CollectionTile key={collection.slug} collection={collection} />
          ))}
        </motion.div>

        {/* Progress rail: horizontal movement needs an affordance. */}
        <div className="mx-auto mb-10 h-px w-[60vw] max-w-md bg-chrome/15 md:w-[24vw]">
          <motion.div
            style={{ scaleX: railScale }}
            className="h-full origin-left bg-violet"
          />
        </div>
      </div>
    </section>
  );
}
