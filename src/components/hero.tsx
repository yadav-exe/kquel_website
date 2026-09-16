"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "motion/react";
import SanityPicture from "@/components/sanity-picture";
import type { HomePage } from "@/lib/pages";

type HeroContent = HomePage["hero"];

/* Thin plumb-line ornament pointing from the statement to the image below. */
function PlumbLine() {
  return (
    <svg
      width="130"
      height="76"
      viewBox="0 0 130 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-chrome/40"
    >
      <path d="M5 1H125M65 1v74" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function DiveCta({ label }: { label: string }) {
  return (
    <a
      href="#ethos"
      className="group inline-flex flex-col items-center gap-4"
    >
      <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors duration-300 group-hover:text-violet-ink">
        {label}
      </span>
      <span className="drift text-violet-ink [filter:drop-shadow(0_0_10px_rgba(124,92,255,0.45))]">
        <svg
          width="12"
          height="64"
          viewBox="0 0 12 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M6 0v58M1 53l5 9 5-9"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </span>
    </a>
  );
}

function IntroStatement({ statement }: { statement: string }) {
  return (
    <>
      <p className="max-w-[24ch] font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.2] tracking-[-0.02em] text-foreground">
        {statement}
      </p>
      <div className="mt-10">
        <PlumbLine />
      </div>
    </>
  );
}

function BrandLockup({
  lead,
  accent,
  wordmark,
  tagline,
}: {
  lead: string;
  accent: string;
  wordmark?: MotionStyle;
  tagline?: MotionStyle;
}) {
  return (
    <>
      <motion.h1
        style={wordmark}
        className="mr-[-0.14em] font-display text-[clamp(3.5rem,9vw,6.75rem)] leading-none font-normal tracking-[0.14em] text-foreground"
      >
        KQUEL
      </motion.h1>
      <motion.p
        style={tagline}
        className="mt-6 font-display text-[clamp(1.75rem,3.5vw,3.25rem)] italic leading-tight text-foreground"
      >
        {lead}{" "}
        <span className="text-violet-ink [text-shadow:0_0_28px_rgba(124,92,255,0.45)]">
          {accent}
        </span>
      </motion.p>
    </>
  );
}

function HeroImage({ image }: { image: HeroContent["image"] }) {
  return (
    <SanityPicture
      image={image}
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}

export default function Hero({ hero }: { hero: HeroContent }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // Opacities use function transforms: the declarative array form gets
  // promoted to a native ScrollTimeline animation, whose progress can
  // disagree with useScroll's JS progress — function transforms always run
  // on the main thread, in lockstep with the clip/transform values.
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

  // The statement glides up and away as scrolling begins.
  const introY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-40vh"]);
  const introOpacity = useTransform(scrollYProgress, (v) => 1 - clamp01(v / 0.3));

  // The framed window expands to full bleed while the photo settles from a zoom.
  const clipTop = useTransform(scrollYProgress, [0, 0.55], [58, 0]);
  const clipX = useTransform(scrollYProgress, [0, 0.55], [16, 0]);
  const clipPath = useMotionTemplate`inset(${clipTop}% ${clipX}% 0% ${clipX}%)`;
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [1.18, 1.06, 1]);
  const scrimOpacity = useTransform(scrollYProgress, (v) =>
    clamp01((v - 0.45) / 0.3)
  );

  // The brand lockup surfaces in sequence: wordmark, tagline, then the dive cue.
  const wordmarkOpacity = useTransform(scrollYProgress, (v) =>
    clamp01((v - 0.58) / 0.16)
  );
  const wordmarkY = useTransform(scrollYProgress, [0.58, 0.74], [28, 0]);
  const taglineOpacity = useTransform(scrollYProgress, (v) =>
    clamp01((v - 0.7) / 0.16)
  );
  const taglineY = useTransform(scrollYProgress, [0.7, 0.86], [24, 0]);
  const ctaOpacity = useTransform(scrollYProgress, (v) =>
    clamp01((v - 0.82) / 0.14)
  );
  const ctaY = useTransform(scrollYProgress, [0.82, 0.96], [18, 0]);

  if (reduceMotion) {
    return (
      <>
        <section className="flex min-h-[60svh] flex-col items-center justify-center px-5 pt-24 text-center">
          <IntroStatement statement={hero.statement} />
        </section>
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <HeroImage image={hero.image} />
          </div>
          <div className="hero-scrim absolute inset-0" aria-hidden />
          <div className="relative z-10 flex flex-col items-center px-5 text-center">
            <BrandLockup lead={hero.taglineLead} accent={hero.taglineAccent} />
          </div>
          <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
            <DiveCta label={hero.cta} />
          </div>
        </section>
      </>
    );
  }

  return (
    <section ref={runwayRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 will-change-[clip-path]"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <HeroImage image={hero.image} />
          </motion.div>
          {/* Constant dim keeps the framed photo moody before the reveal. */}
          <div className="absolute inset-0 bg-void/25" aria-hidden />
          <motion.div
            style={{ opacity: scrimOpacity }}
            className="hero-scrim absolute inset-0"
            aria-hidden
          />
        </motion.div>

        <motion.div
          style={{ y: introY, opacity: introOpacity }}
          className="reveal-rise absolute inset-x-0 top-0 flex h-[58svh] flex-col items-center justify-center px-5 pt-14 text-center"
        >
          <IntroStatement statement={hero.statement} />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <BrandLockup
            lead={hero.taglineLead}
            accent={hero.taglineAccent}
            wordmark={{ opacity: wordmarkOpacity, y: wordmarkY }}
            tagline={{ opacity: taglineOpacity, y: taglineY }}
          />
        </div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-0 bottom-10 flex justify-center"
        >
          <DiveCta label={hero.cta} />
        </motion.div>
      </div>
    </section>
  );
}
