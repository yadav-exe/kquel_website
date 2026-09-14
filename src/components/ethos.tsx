"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import heroImage from "../../public/hero_image.jpg";

type Experience = {
  title: string;
  copy: string;
  src: string | StaticImageData;
  alt: string;
  /* Editorial rhythm: cards alternate portrait / landscape on desktop. */
  aspect: string;
};

/* Remote images are staging placeholders from Pexels — swap for brand
   renders when photography is ready. */
const EXPERIENCES: Experience[] = [
  {
    title: "Relax",
    copy: "A private sanctuary designed for deep relaxation.",
    src: heroImage,
    alt: "Sculptural freestanding stone tub in a glass-walled bathroom with soft morning light",
    aspect: "md:aspect-[3/4]",
  },
  {
    title: "Rejuvenate",
    copy: "A daily ritual of warmth, steam and recovery.",
    src: "https://images.pexels.com/photos/18408807/pexels-photo-18408807/free-photo-of-decorated-room-with-ornament-on-wall.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Dim stone steam room with mosaic detail and warm ambient light",
    aspect: "md:aspect-[7/5]",
  },
  {
    title: "Escape",
    copy: "Transform your home into a destination.",
    src: "https://images.pexels.com/photos/18903511/pexels-photo-18903511/free-photo-of-bathtub-and-sunbed-on-terrace.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Outdoor whirlpool bath on a terrace overlooking a lush garden",
    aspect: "md:aspect-[3/4]",
  },
  {
    title: "Gather",
    copy: "Designed to bring people together.",
    src: "https://images.pexels.com/photos/19075398/pexels-photo-19075398/free-photo-of-swimming-pool-in-yard-of-luxury-residence.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Illuminated villa pool under a night sky",
    aspect: "md:aspect-[7/5]",
  },
];

/* "Our" and "ETHOS" previously sat at the same size, so neither led and the
   tracked caps collided with the italic. Now the article is a quiet lead-in
   and the word itself carries the section. */
function EthosHeading() {
  return (
    <div className="flex flex-col items-center">
      {/* Stacked spans leave no whitespace between the words, so the label is
          given explicitly — otherwise it is announced as "OurETHOS". */}
      <h2
        aria-label="Our ETHOS"
        className="flex flex-col items-center text-foreground"
      >
        <span className="font-display text-[clamp(1rem,1.7vw,1.4rem)] italic leading-none text-chrome/75">
          Our
        </span>
        <span
          /* The negative margin cancels the trailing letter-space so the word
             sits optically centred, as on the hero wordmark. */
          className="mt-2 mr-[-0.2em] font-display text-[clamp(3rem,7.5vw,6rem)] leading-[0.95] tracking-[0.2em] [text-shadow:0_0_45px_rgba(124,92,255,0.4)]"
        >
          ETHOS
        </span>
      </h2>
      <span
        aria-hidden
        className="mt-6 h-px w-20 bg-violet [box-shadow:0_0_14px_rgba(124,92,255,0.8)]"
      />
    </div>
  );
}

/* The payoff of the whole pan — it has to land, not murmur. */
function ClosingStatement() {
  return (
    <p className="relative max-w-[15ch] text-center font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-foreground">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(124,92,255,0.18),transparent)]"
      />
      Now, the collection that makes it all{" "}
      <span className="text-violet-ink [text-shadow:0_0_34px_rgba(124,92,255,0.55)]">
        possible.
      </span>
    </p>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article
      /* Height comes from the track rather than the viewport, so the cards
         cannot outgrow the space the heading leaves them. */
      className={`relative w-[80vw] flex-none touch-pan-y overflow-hidden aspect-[3/4] md:h-full md:w-auto ${experience.aspect}`}
    >
      {/* Eager: the track sits off-viewport horizontally, so lazy loading
          would defer these until mid-pan and they would pop in. */}
      <Image
        src={experience.src}
        alt={experience.alt}
        fill
        loading="eager"
        sizes="(max-width: 768px) 80vw, 60vw"
        className="object-cover"
      />
      {/* Constant dim + bottom gradient for text legibility, per DESIGN.md
          chiaroscuro imagery treatment. */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgb(11_11_15/0.32),rgb(11_11_15/0.32)),linear-gradient(0deg,rgb(11_11_15/0.88)_0%,rgb(11_11_15/0.25)_45%,transparent_70%)]"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-7 md:p-8">
        <p className="label-caps text-chrome/75">Experience</p>
        <h3 className="font-display text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">
          {experience.title}
        </h3>
        <p className="max-w-[34ch] text-[15px] leading-relaxed text-chrome/85">
          {experience.copy}
        </p>
        <Link
          href="/collections"
          className="group mt-2 inline-flex min-h-11 items-center gap-3 border-b border-chrome/40 pb-2 transition-colors duration-300 hover:border-violet/70"
        >
          <span className="label-caps text-foreground transition-colors duration-300 group-hover:text-violet-ink">
            Explore Collection
          </span>
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="text-chrome transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-violet-ink"
          >
            <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function ClosingPanel() {
  return (
    <div className="flex h-full w-screen flex-none items-center justify-center bg-surface px-5">
      <ClosingStatement />
    </div>
  );
}

export default function Ethos() {
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
    const measure = () => {
      if (!trackRef.current || !stageRef.current) return;
      setPanRange(
        Math.max(0, trackRef.current.scrollWidth - stageRef.current.clientWidth)
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Function transform: keeps the pan on the main thread, in lockstep with
  // useScroll progress (see note in hero.tsx about native ScrollTimeline).
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const x = useTransform(
    scrollYProgress,
    (v) => -panRange * clamp01((v - 0.05) / 0.9)
  );

  if (reduceMotion) {
    return (
      <section id="ethos" className="px-5 py-28 md:px-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16">
          <EthosHeading />
          <div className="flex w-full flex-col items-center gap-16">
            {EXPERIENCES.map((experience) => (
              <ExperienceCard key={experience.title} experience={experience} />
            ))}
          </div>
        </div>
        <div className="mt-28 flex justify-center bg-surface px-5 py-32">
          <ClosingStatement />
        </div>
      </section>
    );
  }

  return (
    <section id="ethos" ref={runwayRef} className="relative h-[500vh]">
      {/* The heading holds its own row rather than floating over the track —
          at its new size an absolute heading would land on the cards. */}
      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col overflow-hidden"
      >
        <div className="flex flex-none justify-center pt-12 pb-8 md:pt-14">
          <EthosHeading />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex min-h-0 flex-1 items-center gap-[7vw] pl-[12vw] md:gap-[6vw] md:pl-[16vw]"
        >
          {EXPERIENCES.map((experience) => (
            <ExperienceCard key={experience.title} experience={experience} />
          ))}
          <ClosingPanel />
        </motion.div>
      </div>
    </section>
  );
}
