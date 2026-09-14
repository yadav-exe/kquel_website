"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import heroImage from "../../../public/collection_section_images/whirlpool.jpg";

const EASE = [0.19, 1, 0.22, 1] as const;

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Function transforms stay on the main thread, in lockstep with
     useScroll — a declarative range can be promoted to a native
     ScrollTimeline whose progress drifts. */
  const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
  const imageY = useTransform(scrollYProgress, (v) => `${clamp01(v) * 18}%`);
  const imageScale = useTransform(scrollYProgress, (v) => 1 + clamp01(v) * 0.08);
  const textY = useTransform(scrollYProgress, (v) => `${clamp01(v) * -30}%`);
  const textOpacity = useTransform(scrollYProgress, (v) =>
    1 - clamp01((v - 0.25) / 0.5)
  );

  const still = Boolean(reduceMotion);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        style={still ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="hero-scrim absolute inset-0" aria-hidden />

      <motion.div
        style={still ? undefined : { y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center px-5 text-center"
      >
        <motion.p
          initial={still ? false : { opacity: 0, letterSpacing: "0.5em" }}
          animate={still ? undefined : { opacity: 1, letterSpacing: "0.1em" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          className="label-caps text-chrome/70"
        >
          Established 1998 · New Delhi
        </motion.p>

        <motion.h1
          initial={still ? false : { opacity: 0, y: 30 }}
          animate={still ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
          className="mt-10 max-w-[16ch] font-display text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[1.05] tracking-[-0.02em] text-foreground"
        >
          Twenty-eight years on a single subject.
        </motion.h1>

        <motion.p
          initial={still ? false : { opacity: 0, y: 24 }}
          animate={still ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          className="mt-8 font-display text-[clamp(1.15rem,2.2vw,1.75rem)] italic text-chrome/85"
        >
          Water, and the rooms built to hold it.
        </motion.p>
      </motion.div>

      <motion.div
        aria-hidden
        initial={still ? false : { opacity: 0 }}
        animate={still ? undefined : { opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute inset-x-0 bottom-10 z-10 flex justify-center"
      >
        <span className="drift text-violet-ink">
          <svg width="12" height="46" viewBox="0 0 12 46" fill="none">
            <path d="M6 0v40M1 35l5 9 5-9" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
