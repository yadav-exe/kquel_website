"use client";

import { motion, useReducedMotion } from "motion/react";
import type { AboutPage } from "@/lib/pages";

const EASE = [0.19, 1, 0.22, 1] as const;

const SLAB_X = 150;
const SLAB_W = 560;

const LAYERS = [
  { y: 76, h: 30, label: "Acrylic shell", note: "The surface you touch", grp: false },
  { y: 106, h: 40, label: "Glass-reinforced plastic", note: "Layer 01", grp: true },
  { y: 146, h: 40, label: "Glass-reinforced plastic", note: "Layer 02", grp: true },
  { y: 186, h: 40, label: "Glass-reinforced plastic", note: "Layer 03", grp: true },
];

export default function MaterialSection({
  material,
}: {
  material: AboutPage["material"];
}) {
  const reduceMotion = useReducedMotion();
  const still = Boolean(reduceMotion);

  const layerIn = (i: number) => ({
    initial: still ? false : { scaleX: 0, opacity: 0 },
    whileInView: still ? undefined : { scaleX: 1, opacity: 1 },
    viewport: { once: true, margin: "-90px" },
    transition: { duration: 1.1, ease: EASE, delay: 0.25 + i * 0.22 },
  });

  const fadeIn = (delay: number) => ({
    initial: still ? false : { opacity: 0 },
    whileInView: still ? undefined : { opacity: 1 },
    viewport: { once: true, margin: "-90px" },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section
      aria-labelledby="material"
      className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <div className="lg:pt-6">
          <p className="label-caps text-violet-ink">{material.eyebrow}</p>
          <h2
            id="material"
            className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
          >
            {material.heading}
          </h2>
          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-chrome/85">
            {material.lead}
          </p>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-chrome/70">
            {material.body}
          </p>
        </div>

        <div className="border border-chrome/15 bg-surface-raised/40 p-6 md:p-10">
          <svg
            viewBox="0 0 1000 300"
            className="w-full text-chrome"
            role="img"
            aria-label="Cross-section through a KQUEL bath wall: an acrylic shell over three bonded layers of glass-reinforced plastic"
          >
            <defs>
              <pattern
                id="grp-hatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0" y1="0" x2="0" y2="8"
                  className="stroke-chrome/30" strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Waterline above the shell */}
            <motion.g {...fadeIn(0.1)}>
              <path
                d={`M${SLAB_X - 20} 48 L${SLAB_X + SLAB_W + 20} 48`}
                className="stroke-violet/60"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <text
                x={SLAB_X + SLAB_W + 34} y={52}
                className="fill-violet/80 font-sans text-[11px] font-semibold uppercase"
                letterSpacing="1.4"
              >
                Water
              </text>
            </motion.g>

            {LAYERS.map((layer, i) => (
              <g key={layer.note}>
                <motion.g {...layerIn(i)} style={{ originX: 0 }}>
                  <rect
                    x={SLAB_X} y={layer.y}
                    width={SLAB_W} height={layer.h}
                    className={
                      layer.grp
                        ? "fill-[url(#grp-hatch)] stroke-chrome/40"
                        : "fill-violet/15 stroke-violet/60"
                    }
                    strokeWidth="1"
                  />
                </motion.g>

                <motion.g {...fadeIn(0.9 + i * 0.12)}>
                  <path
                    d={`M${SLAB_X + SLAB_W} ${layer.y + layer.h / 2} L${SLAB_X + SLAB_W + 26} ${layer.y + layer.h / 2}`}
                    className="stroke-chrome/30"
                    strokeWidth="0.75"
                  />
                  <text
                    x={SLAB_X + SLAB_W + 34}
                    y={layer.y + layer.h / 2 - 2}
                    className="fill-chrome/75 font-sans text-[11px] font-semibold uppercase"
                    letterSpacing="1.4"
                  >
                    {layer.label}
                  </text>
                  <text
                    x={SLAB_X + SLAB_W + 34}
                    y={layer.y + layer.h / 2 + 13}
                    className="fill-chrome/40 font-sans text-[10px] uppercase"
                    letterSpacing="1.2"
                  >
                    {layer.note}
                  </text>
                </motion.g>
              </g>
            ))}

            {/* Build-up bracket */}
            <motion.g {...fadeIn(1.4)}>
              <path
                d={`M${SLAB_X - 30} 106 L${SLAB_X - 40} 106 L${SLAB_X - 40} 226 L${SLAB_X - 30} 226`}
                className="stroke-chrome/35"
                strokeWidth="0.75"
                fill="none"
              />
              <text
                x={SLAB_X - 52} y={166}
                textAnchor="middle"
                transform={`rotate(-90 ${SLAB_X - 52} 166)`}
                className="fill-chrome/60 font-sans text-[11px] font-semibold uppercase"
                letterSpacing="1.4"
              >
                Reinforcement
              </text>
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}
