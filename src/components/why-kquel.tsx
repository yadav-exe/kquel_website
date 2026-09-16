import Link from "next/link";
import Reveal from "@/components/reveal";
import type { HomePage } from "@/lib/pages";

type ClosingContent = HomePage["closing"];

function Arrow() {
  return (
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
  );
}

/* The homepage's last word and its way into the catalogue: the brand
   statement, the enquiry, and the disciplines the house works in. */
export default function WhyKquel({ closing }: { closing: ClosingContent }) {
  return (
    <section
      aria-labelledby="why-kquel"
      className="border-t border-chrome/15 bg-surface"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
          <Reveal>
            <p className="label-caps text-violet-ink">Why KQUEL</p>
            <h2
              id="why-kquel"
              className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
            >
              {closing.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[58ch]">
            <p className="text-lg leading-relaxed text-chrome/85">{closing.body}</p>
            <p className="mt-7 font-display text-xl italic leading-relaxed text-foreground">
              {closing.statement}
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="label-caps inline-flex min-h-11 items-center justify-center bg-violet-deep px-10 py-4 text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-opacity duration-300 hover:opacity-90"
              >
                Begin an enquiry
              </Link>
              <Link
                href="/collections"
                className="label-caps inline-flex min-h-11 items-center justify-center border border-chrome/40 px-10 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
              >
                View the collections
              </Link>
            </div>
          </Reveal>
        </div>

        {closing.disciplines.length > 0 && (
          <ul className="mt-20 grid grid-cols-1 gap-px border-t border-chrome/15 bg-chrome/10 sm:grid-cols-2 lg:grid-cols-4">
            {closing.disciplines.map((discipline, i) => (
              <li key={`${discipline.href}-${discipline.label}`} className="bg-surface">
                <Reveal delay={0.15 + i * 0.06} className="h-full">
                  <Link
                    href={discipline.href}
                    className="group flex h-full flex-col gap-3 py-8 md:px-6"
                  >
                    <span className="label-caps text-chrome/70">
                      {discipline.label}
                    </span>
                    <span className="inline-flex items-center gap-3 font-display text-xl leading-tight text-foreground transition-colors duration-300 group-hover:text-violet-ink">
                      {discipline.name}
                      <Arrow />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
