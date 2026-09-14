import type { Metadata } from "next";
import Link from "next/link";
import AboutHero from "@/components/about/about-hero";
import MaterialSection from "@/components/about/material-section";
import Reveal from "@/components/reveal";
import { CATEGORIES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About — KQUEL",
  description:
    "Established in 1998 under Monarch Industries, KQUEL builds whirlpool baths, hot spas, saunas and pools in New Delhi — acrylic shells over three layers of glass-reinforced plastic.",
  alternates: { canonical: "/about" },
};

const FOUNDED = 1998;
const pieceCount = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

const FIGURES = [
  { value: String(FOUNDED), label: "Established" },
  {
    value: String(new Date().getFullYear() - FOUNDED),
    label: "Years of manufacture",
  },
  { value: "3", label: "Layers of reinforcement" },
  { value: String(pieceCount), label: "Pieces in the catalogue" },
];

const PRINCIPLES = [
  {
    title: "Luxury, blended with practicality",
    body: "A bath that looks extraordinary and fails in its third year was never luxury to begin with. Every decision answers first to the way a room is actually used, and only then to the eye.",
  },
  {
    title: "Durability and comfort",
    body: "Comfort is easy to stage and hard to sustain. We specify for the tenth year rather than the first week — the reinforcement, the seals and the fitment are all chosen for a life of daily use.",
  },
  {
    title: "Elegance and innovation",
    body: "Elegance is what is left once nothing has been added for effect. Innovation is what allows us to take things away: quieter systems, cleaner lines, controls that settle into the rim.",
  },
];

/* A real sequence — each stage depends on the one before it, which is why
   these are numbered and the principles above are not. */
const PROCESS = [
  {
    step: "01",
    title: "Moulding",
    body: "Every form begins as a mould, and the mould sets the standard that everything after it has to meet.",
  },
  {
    step: "02",
    title: "Thermoforming",
    body: "Cast acrylic is heated until it will move, then drawn to the shape of the mould in a single pass.",
  },
  {
    step: "03",
    title: "Resin & dispensing",
    body: "Italian resin and dispensing systems meter and mix by machine, so the chemistry does not drift from one shell to the next.",
  },
  {
    step: "04",
    title: "Reinforcement",
    body: "Three layers of glass-reinforced plastic are laid behind the shell and cured until the two behave as a single body.",
  },
  {
    step: "05",
    title: "Fitment",
    body: "Pumps, whirlpool and spine jets, air lines, lighting and control are set into the shell and plumbed.",
  },
  {
    step: "06",
    title: "Quality & after",
    body: "A comprehensive quality programme, and then a service relationship that carries on long after the installation is signed off.",
  },
];

export default function AboutPage() {
  return (
    <main id="content" className="flex-1">
      <AboutHero />

      {/* Origin */}
      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal>
            <p className="label-caps text-violet-ink">The beginning</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground">
              A bathroom is not a bathroom.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[58ch]">
            <p className="text-lg leading-relaxed text-chrome/85">
              KQUEL was established under Monarch Industries in 1998 with an
              ambition that sounds simpler than it is — to build a bathtub and
              whirlpool experience able to stand beside anything made anywhere.
              Manufacturing and distribution came first. The discipline came
              with time.
            </p>
            <p className="mt-7 font-display text-xl italic leading-relaxed text-foreground">
              The ambition has not changed since. The tolerances have.
            </p>
            <p className="mt-7 text-lg leading-relaxed text-chrome/70">
              We hold that a bathroom is not a utility room. It is where the day
              is finally set down — a space for relaxation, for rejuvenation,
              and for the rare quiet in which a person gets to meet themselves.
              Everything in this catalogue is answerable to that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Figures */}
      <section
        aria-label="KQUEL in figures"
        className="border-y border-chrome/15 bg-surface"
      >
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-chrome/10 md:grid-cols-4">
          {FIGURES.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 0.08} className="bg-surface">
              <div className="px-6 py-12 text-center md:py-16">
                <dt className="sr-only">{figure.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-foreground">
                    {figure.value}
                  </span>
                  <span className="label-caps mt-5 block text-chrome/70">
                    {figure.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Principles */}
      <section
        aria-labelledby="principles"
        className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36"
      >
        <Reveal>
          <p className="label-caps text-violet-ink">Philosophy</p>
          <h2
            id="principles"
            className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
          >
            Three things every piece has to answer to.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border-t border-chrome/15 bg-chrome/10 md:grid-cols-3">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.1} className="bg-void">
              <div className="h-full px-0 py-10 md:px-8">
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-chrome/75">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section
        aria-labelledby="craft"
        className="border-t border-chrome/15 bg-surface"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
          <Reveal>
            <p className="label-caps text-violet-ink">Craft</p>
            <h2
              id="craft"
              className="mt-6 max-w-[24ch] font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
            >
              Six stages, in the only order they work in.
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-chrome/15">
            {PROCESS.map((stage, i) => (
              <Reveal key={stage.step} delay={i * 0.06}>
                <li className="grid grid-cols-1 gap-4 border-b border-chrome/15 py-9 md:grid-cols-[6rem_18rem_1fr] md:gap-10 md:py-10">
                  <span className="label-caps text-violet-ink">{stage.step}</span>
                  <h3 className="font-display text-2xl leading-tight text-foreground">
                    {stage.title}
                  </h3>
                  <p className="max-w-[62ch] text-base leading-relaxed text-chrome/75">
                    {stage.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <MaterialSection />

      {/* Promise */}
      <section
        aria-labelledby="promise"
        className="border-t border-chrome/15"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <p className="label-caps text-violet-ink">The promise</p>
              <h2
                id="promise"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
              >
                The relationship does not end at the door.
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="max-w-[58ch]">
              <p className="text-lg leading-relaxed text-chrome/85">
                A bath is delivered once and lived with for years, which makes
                the delivery the least interesting part of it. Our post-delivery
                service exists to keep installations smooth, to answer what
                comes up afterwards, and to make sure a bath feels the way it
                was meant to — not on the day it arrives, but on an ordinary
                evening three years later.
              </p>
              <p className="mt-7 text-lg leading-relaxed text-chrome/70">
                The quality programme behind it does not scale with the size of
                the order. Whether you are walking through our doors for the
                first time or have worked with us for a decade, the standard is
                the same standard.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-chrome/15 bg-surface">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-28 text-center md:px-20 md:py-36">
          <Reveal>
            <blockquote className="max-w-[24ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-tight text-foreground">
              “The goal is not just to manufacture products, but to create an
              essence that feels right over time.”
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="label-caps mt-10 text-chrome/70">
              Monarch Industries · New Delhi
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-16 text-base text-chrome/70">
              {pieceCount} pieces across {CATEGORIES.length} collections.
            </p>
            <Link
              href="/collections"
              className="label-caps mt-8 inline-block border border-chrome/40 px-12 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
            >
              View the collections
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
