"use client";

import { motion, useReducedMotion } from "motion/react";
import SanityPicture from "@/components/sanity-picture";
import type { HomePage } from "@/lib/pages";

type InnovationContent = HomePage["innovation"];

const EASE = [0.19, 1, 0.22, 1] as const;

/* Water glyph — three crests, echoing the wordmark's restraint. */
function WaveMark() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-white"
    >
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 8q2.5-3 5 0t5 0 5 0" />
        <path d="M2 12q2.5-3 5 0t5 0 5 0" />
        <path d="M2 16q2.5-3 5 0t5 0 5 0" />
      </g>
    </svg>
  );
}

export default function Innovation({
  innovation,
}: {
  innovation: InnovationContent;
}) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const rise = (delay: number) => ({
    initial: animate ? { opacity: 0, y: 24 } : false,
    whileInView: animate ? { opacity: 1, y: 0 } : undefined,
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section
      id="innovation"
      className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        <div>
          <motion.p {...rise(0)} className="label-caps text-chrome/70">
            Innovation
          </motion.p>
          <motion.h2
            {...rise(0.08)}
            className="mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight text-foreground"
          >
            {innovation.heading}
          </motion.h2>

          <dl className="mt-12 border-t border-chrome/15">
            {innovation.disciplines.map((discipline, i) => (
              <motion.div
                key={discipline.title}
                {...rise(0.18 + i * 0.1)}
                className="border-b border-chrome/15 py-7"
              >
                <dt className="label-caps text-violet-ink">{discipline.title}</dt>
                <dd className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-chrome/85">
                  {discipline.body}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <motion.div {...rise(0.12)} className="relative">
          {/* Chrome hairline frame with the image inset, per DESIGN.md. */}
          <div className="border border-chrome/20 p-3 md:p-4">
            <div className="relative aspect-square overflow-hidden">
              <SanityPicture
                image={innovation.image}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(rgb(11_11_15/0.2),rgb(11_11_15/0.2))]"
                aria-hidden
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -bottom-8 right-0 flex h-24 w-24 items-center justify-center bg-violet shadow-[0_0_28px_rgba(124,92,255,0.35)] md:-right-8 md:h-28 md:w-28"
          >
            <WaveMark />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
