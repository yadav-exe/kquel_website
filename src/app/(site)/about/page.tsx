import type { Metadata } from "next";
import Link from "next/link";
import AboutHero from "@/components/about/about-hero";
import MaterialSection from "@/components/about/material-section";
import Reveal from "@/components/reveal";
import { getCategories } from "@/lib/catalog";
import { getAboutPage, type AboutPage as AboutContent } from "@/lib/pages";
import { pageMetadata, snippet } from "@/lib/seo";
import { getSiteSettings, type SiteSettings } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, about] = await Promise.all([getSiteSettings(), getAboutPage()]);
  return pageMetadata({
    title: `About — ${site.name}`,
    description: snippet(about.origin.lead),
    path: "/about",
    image: about.hero.image,
    seo: about.seo,
    site,
  });
}

/* Two of the figures are worked out rather than typed, so they cannot go
   stale: the years since founding and the count of published pieces. */
function resolveFigures(
  figures: AboutContent["figures"],
  site: SiteSettings,
  pieceCount: number
) {
  return figures.map((figure) => ({
    label: figure.label,
    value:
      figure.auto === "years"
        ? String(new Date().getFullYear() - site.founded)
        : figure.auto === "pieces"
          ? String(pieceCount)
          : (figure.value ?? ""),
  }));
}

export default async function AboutPage() {
  const [about, site, categories] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getCategories(),
  ]);
  const pieceCount = categories.reduce((n, c) => n + c.products.length, 0);
  const figures = resolveFigures(about.figures, site, pieceCount);
  const eyebrow =
    about.hero.eyebrow ??
    [`Established ${site.founded}`, site.city].filter(Boolean).join(" · ");
  const attribution =
    about.closing.attribution ??
    [site.parent, site.city].filter(Boolean).join(" · ");

  return (
    <main id="content" className="flex-1">
      <AboutHero hero={about.hero} eyebrow={eyebrow} />

      {/* Origin */}
      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal>
            <p className="label-caps text-violet-ink">{about.origin.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground">
              {about.origin.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[58ch]">
            <p className="text-lg leading-relaxed text-chrome/85">
              {about.origin.lead}
            </p>
            <p className="mt-7 font-display text-xl italic leading-relaxed text-foreground">
              {about.origin.quote}
            </p>
            <p className="mt-7 text-lg leading-relaxed text-chrome/70">
              {about.origin.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Figures */}
      <section
        aria-label={`${site.name} in figures`}
        className="border-y border-chrome/15 bg-surface"
      >
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px bg-chrome/10 md:grid-cols-4">
          {figures.map((figure, i) => (
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
          <p className="label-caps text-violet-ink">{about.principles.eyebrow}</p>
          <h2
            id="principles"
            className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
          >
            {about.principles.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px border-t border-chrome/15 bg-chrome/10 md:grid-cols-3">
          {about.principles.items.map((principle, i) => (
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

      {/* Process — numbered in the order the editor lists the stages. */}
      <section
        aria-labelledby="craft"
        className="border-t border-chrome/15 bg-surface"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
          <Reveal>
            <p className="label-caps text-violet-ink">{about.process.eyebrow}</p>
            <h2
              id="craft"
              className="mt-6 max-w-[24ch] font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
            >
              {about.process.heading}
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-chrome/15">
            {about.process.items.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.06}>
                <li className="grid grid-cols-1 gap-4 border-b border-chrome/15 py-9 md:grid-cols-[6rem_18rem_1fr] md:gap-10 md:py-10">
                  <span className="label-caps text-violet-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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

      <MaterialSection material={about.material} />

      {/* Promise */}
      <section
        aria-labelledby="promise"
        className="border-t border-chrome/15"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <Reveal>
              <p className="label-caps text-violet-ink">{about.promise.eyebrow}</p>
              <h2
                id="promise"
                className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
              >
                {about.promise.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="max-w-[58ch]">
              <p className="text-lg leading-relaxed text-chrome/85">
                {about.promise.lead}
              </p>
              <p className="mt-7 text-lg leading-relaxed text-chrome/70">
                {about.promise.body}
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
              “{about.closing.quote}”
            </blockquote>
          </Reveal>

          {attribution && (
            <Reveal delay={0.15}>
              <p className="label-caps mt-10 text-chrome/70">{attribution}</p>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <p className="mt-16 text-base text-chrome/70">
              {pieceCount} pieces across {categories.length} collections.
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
