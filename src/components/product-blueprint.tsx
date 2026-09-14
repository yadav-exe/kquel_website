"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/catalog";

const EASE = [0.19, 1, 0.22, 1] as const;

/* Plan is drawn about this centre, at most MAX across. */
const CX = 500;
const CY = 500;
const MAX = 320;

type Point = [number, number];

/** Evenly spaced points around a rectangle's perimeter. */
function rectPoints(
  x: number, y: number, w: number, h: number, n: number
): Point[] {
  const perimeter = 2 * (w + h);
  return Array.from({ length: n }, (_, i) => {
    let d = ((i + 0.5) / n) * perimeter;
    if (d < w) return [x + d, y] as Point;
    d -= w;
    if (d < h) return [x + w, y + d] as Point;
    d -= h;
    if (d < w) return [x + w - d, y + h] as Point;
    d -= w;
    return [x, y + h - d] as Point;
  });
}

/** Evenly spaced points on a circle, starting at the top. */
function circlePoints(
  cx: number, cy: number, r: number, n: number
): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as Point;
  });
}

/** Evenly spaced points along a quarter arc (corner baths). */
function arcPoints(
  cx: number, cy: number, r: number, n: number
): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((i + 0.5) / n) * (Math.PI / 2);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as Point;
  });
}

function Callout({
  d, x, y, anchorEnd, label,
}: {
  d: string; x: number; y: number; anchorEnd?: boolean; label: string;
}) {
  return (
    <g>
      <path d={d} className="stroke-chrome/35" strokeWidth="0.75" fill="none" />
      <text
        x={x}
        y={y}
        textAnchor={anchorEnd ? "end" : "start"}
        className="fill-chrome/65 font-sans text-[11px] font-semibold uppercase"
        letterSpacing="1.4"
      >
        {label}
      </text>
    </g>
  );
}

export default function ProductBlueprint({ product }: { product: Product }) {
  const reduceMotion = useReducedMotion();
  const blueprint = product.blueprint;
  if (!blueprint) return null;

  const { form, aspect, counts, callouts } = blueprint;
  const animate = !reduceMotion;

  /* Plan footprint, scaled to the product's own proportion. */
  const square = form === "round" || form === "corner";
  const planW = square ? MAX : aspect >= 1 ? MAX : MAX * aspect;
  const planH = square ? MAX : aspect >= 1 ? MAX / aspect : MAX;
  const planX = CX - planW / 2;
  const planY = CY - planH / 2;

  const inset = Math.min(26, Math.min(planW, planH) / 5);
  const wellInset = Math.min(64, Math.min(planW, planH) / 2 - 14);

  /* Jets sit on the seat line, air outlets ring the footwell floor. */
  let jetPoints: Point[];
  let airPoints: Point[];

  if (form === "round") {
    jetPoints = circlePoints(CX, CY, MAX / 2 - inset, counts.jets);
    airPoints = circlePoints(CX, CY, MAX / 2 - wellInset, counts.bubbleJets);
  } else if (form === "corner") {
    jetPoints = arcPoints(planX, planY, planW - inset, counts.jets);
    airPoints = arcPoints(planX, planY, planW - wellInset, counts.bubbleJets);
  } else {
    jetPoints = rectPoints(
      planX + inset, planY + inset,
      planW - inset * 2, planH - inset * 2, counts.jets
    );
    airPoints = rectPoints(
      planX + wellInset, planY + wellInset,
      planW - wellInset * 2, planH - wellInset * 2, counts.bubbleJets
    );
  }

  const cornerPath = (o: number) =>
    `M${planX + o} ${planY + o} L${planX + planW - o} ${planY + o} ` +
    `A${planW - o * 2} ${planH - o * 2} 0 0 1 ${planX + o} ${planY + planH - o} Z`;

  const draw = (delay: number) => ({
    initial: animate ? { pathLength: 0, opacity: 0 } : false,
    whileInView: animate ? { pathLength: 1, opacity: 1 } : undefined,
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 1.6, ease: EASE, delay },
  });

  const fade = (delay: number) => ({
    initial: animate ? { opacity: 0 } : false,
    whileInView: animate ? { opacity: 1 } : undefined,
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  /* Backrest jets, stacked up the elevation wall. */
  const spineSpacing = Math.min(20, 100 / Math.max(counts.spineJets, 1));
  const spineStart = 200 - ((counts.spineJets - 1) * spineSpacing) / 2;

  return (
    <section
      aria-labelledby="blueprint"
      className="mt-28 border-t border-chrome/15 pt-16 md:mt-36"
    >
      <div className="flex flex-col items-center text-center">
        <p className="label-caps text-chrome/70">Engineering</p>
        <h2
          id="blueprint"
          className="mt-5 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-foreground"
        >
          Technical Blueprint
        </h2>
        <div aria-hidden className="mt-6 h-px w-16 bg-chrome/30" />
      </div>

      <div className="mt-14 border border-chrome/15 bg-surface-raised/40 p-6 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-56 lg:flex-none">
            <p className="font-display text-2xl leading-tight text-foreground">
              KQUEL {product.name}
            </p>
            <p className="mt-2 text-sm text-chrome/70">
              {product.configuration} · {product.sizes[0]}
            </p>
          </div>

          <svg
            viewBox="0 0 1000 800"
            className="w-full flex-1 text-chrome"
            role="img"
            aria-label={`Technical drawing of the ${product.name}: side elevation and plan view, with ${counts.jets} whirlpool jets, ${counts.spineJets} spine jets and ${counts.bubbleJets} air outlets marked`}
          >
            {/* ---------------- Elevation ---------------- */}
            <motion.path
              {...draw(0)}
              d="M340 120 L660 120 L638 250 L362 250 Z"
              className="stroke-chrome/55"
              strokeWidth="1.25"
              fill="none"
            />
            <motion.path
              {...draw(0.15)}
              d="M352 156 L648 156"
              className="stroke-violet/50"
              strokeWidth="0.75"
              strokeDasharray="5 5"
              fill="none"
            />

            {/* Control panel on the rim */}
            <motion.g {...fade(1.05)}>
              <rect
                x="584" y="112" width="46" height="9"
                className="fill-violet/20 stroke-violet/70" strokeWidth="0.75"
              />
              <circle cx="607" cy="116" r="2.5" className="fill-violet" />
            </motion.g>

            {/* Spine jets up the backrest */}
            <motion.g {...fade(1.15)}>
              {Array.from({ length: counts.spineJets }, (_, i) => (
                <circle
                  key={i}
                  cx={347 + i * 1.6}
                  cy={spineStart + i * spineSpacing}
                  r="3"
                  className="fill-violet/80"
                />
              ))}
            </motion.g>

            {/* Under water lights along the floor */}
            <motion.g {...fade(1.2)}>
              {Array.from({ length: counts.lights }, (_, i) => (
                <circle
                  key={i}
                  cx={430 + (i * 140) / Math.max(counts.lights - 1, 1)}
                  cy={238}
                  r="3.5"
                  className="fill-none stroke-violet/70"
                  strokeWidth="1"
                />
              ))}
            </motion.g>

            {/* Heater / ozone unit */}
            <motion.g {...fade(1.25)}>
              <path d="M660 220 L690 220" className="stroke-chrome/40" strokeWidth="0.75" />
              <rect
                x="690" y="202" width="54" height="36"
                className="fill-void/40 stroke-chrome/50" strokeWidth="0.75"
              />
              <path
                d="M700 212 h34 M700 220 h34 M700 228 h34"
                className="stroke-violet/50" strokeWidth="0.75"
              />
            </motion.g>

            {/* ---------------- Plan ---------------- */}
            {form === "round" ? (
              <>
                <motion.circle
                  {...draw(0.35)}
                  cx={CX} cy={CY} r={MAX / 2}
                  className="stroke-chrome/55" strokeWidth="1.25" fill="none"
                />
                <motion.circle
                  {...draw(0.5)}
                  cx={CX} cy={CY} r={MAX / 2 - inset}
                  className="stroke-chrome/35" strokeWidth="0.75" fill="none"
                />
                <motion.circle
                  {...draw(0.65)}
                  cx={CX} cy={CY} r={MAX / 2 - wellInset}
                  className="stroke-chrome/30" strokeWidth="0.75" fill="none"
                />
              </>
            ) : form === "corner" ? (
              <>
                <motion.path
                  {...draw(0.35)} d={cornerPath(0)}
                  className="stroke-chrome/55" strokeWidth="1.25" fill="none"
                />
                <motion.path
                  {...draw(0.5)} d={cornerPath(inset)}
                  className="stroke-chrome/35" strokeWidth="0.75" fill="none"
                />
                <motion.path
                  {...draw(0.65)} d={cornerPath(wellInset)}
                  className="stroke-chrome/30" strokeWidth="0.75" fill="none"
                />
              </>
            ) : (
              <>
                <motion.rect
                  {...draw(0.35)}
                  x={planX} y={planY} width={planW} height={planH} rx="24"
                  className="stroke-chrome/55" strokeWidth="1.25" fill="none"
                />
                <motion.rect
                  {...draw(0.5)}
                  x={planX + inset} y={planY + inset}
                  width={planW - inset * 2} height={planH - inset * 2} rx="16"
                  className="stroke-chrome/35" strokeWidth="0.75" fill="none"
                />
                <motion.rect
                  {...draw(0.65)}
                  x={planX + wellInset} y={planY + wellInset}
                  width={planW - wellInset * 2} height={planH - wellInset * 2} rx="12"
                  className="stroke-chrome/30" strokeWidth="0.75" fill="none"
                />
              </>
            )}

            {/* Centre lines */}
            <motion.path
              {...draw(0.75)}
              d={`M${CX} ${planY - 18} L${CX} ${planY + planH + 18} M${planX - 18} ${CY} L${planX + planW + 18} ${CY}`}
              className="stroke-chrome/15" strokeWidth="0.75"
              strokeDasharray="8 6" fill="none"
            />

            {/* Jets */}
            <motion.g {...fade(1.3)}>
              {jetPoints.map(([cx, cy], i) => (
                <circle
                  key={i} cx={cx} cy={cy} r="4"
                  className="fill-violet/70 stroke-violet" strokeWidth="0.75"
                />
              ))}
            </motion.g>

            {/* Air outlets */}
            <motion.g {...fade(1.4)}>
              {airPoints.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.75" className="fill-chrome/60" />
              ))}
            </motion.g>

            {/* Suction & waste */}
            <motion.g {...fade(1.45)}>
              <circle
                cx={CX} cy={CY} r="9"
                className="fill-none stroke-chrome/50" strokeWidth="0.75"
              />
              <circle cx={CX} cy={CY} r="3" className="fill-chrome/60" />
            </motion.g>

            {/* Pumps */}
            <motion.g {...fade(1.5)}>
              {Array.from({ length: counts.pumps }, (_, i) => (
                <g key={i} transform={`translate(${i * 46} 0)`}>
                  <rect
                    x={planX + planW - 40} y={planY + planH + 26}
                    width="34" height="24"
                    className="fill-void/40 stroke-chrome/50" strokeWidth="0.75"
                  />
                  <circle
                    cx={planX + planW - 23} cy={planY + planH + 38} r="6"
                    className="fill-none stroke-violet/70" strokeWidth="0.75"
                  />
                </g>
              ))}
            </motion.g>

            {/* Dimension line */}
            <motion.g {...fade(1.55)}>
              <path
                d={`M${planX} ${planY + planH + 74} L${planX + planW} ${planY + planH + 74} M${planX} ${planY + planH + 68} L${planX} ${planY + planH + 80} M${planX + planW} ${planY + planH + 68} L${planX + planW} ${planY + planH + 80}`}
                className="stroke-chrome/30" strokeWidth="0.75" fill="none"
              />
              <text
                x={CX} y={planY + planH + 96} textAnchor="middle"
                className="fill-chrome/55 font-sans text-[11px] font-semibold uppercase"
                letterSpacing="1.4"
              >
                {product.sizes[0]}
              </text>
            </motion.g>

            {/* ---------------- Callouts ---------------- */}
            <motion.g {...fade(1.6)}>
              <Callout
                d={`M344 ${spineStart + 6} L300 178 L258 178`}
                x={250} y={182} anchorEnd label={callouts.spineJets}
              />
              <Callout
                d={`M${planX + 4} ${planY + planH / 2 - 40} L312 400 L258 400`}
                x={250} y={404} anchorEnd label={callouts.jets}
              />
              <Callout
                d={`M${planX + wellInset} ${planY + planH - wellInset} L340 660 L258 660`}
                x={250} y={664} anchorEnd label={callouts.air}
              />
              <Callout
                d="M607 112 L680 88 L742 88"
                x={750} y={92} label={callouts.controlPanel}
              />
              <Callout
                d="M744 220 L742 220"
                x={750} y={224} label={callouts.heater}
              />
              <Callout
                d={`M${planX + planW - 6} ${planY + planH + 38} L700 660 L742 660`}
                x={750} y={664} label={callouts.pumps}
              />
            </motion.g>
          </svg>
        </div>
      </div>
    </section>
  );
}
