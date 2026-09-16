import Reveal from "@/components/reveal";
import type { Category } from "@/lib/catalog";

/* The case for the collection, made after the pieces rather than before
   them: what it is sits beside the title, and why it belongs and what sets
   ours apart come once the reader has seen the range. */
export default function CollectionEditorial({
  category,
}: {
  category: Category;
}) {
  const { reasons, difference } = category.editorial;

  return (
    <>
      {reasons.items.length > 0 && (
      <section
        aria-labelledby="reasons"
        className="mt-28 border-t border-chrome/15 pt-20 md:mt-36 md:pt-28"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <Reveal>
            <p className="label-caps text-violet-ink">{reasons.eyebrow}</p>
            <h2
              id="reasons"
              className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
            >
              {reasons.heading}
            </h2>
          </Reveal>

          <ul className="border-t border-chrome/15">
            {reasons.items.map((point, i) => (
              <li key={point.title} className="border-b border-chrome/15">
                <Reveal
                  delay={i * 0.06}
                  className="grid gap-3 py-7 md:grid-cols-[15rem_1fr] md:gap-10"
                >
                  <h3 className="font-display text-xl leading-tight text-foreground">
                    {point.title}
                  </h3>
                  <p className="max-w-[58ch] text-base leading-relaxed text-chrome/75">
                    {point.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}

      {difference.items.length > 0 && (
      <section aria-labelledby="difference" className="mt-28 md:mt-36">
        <Reveal>
          <p className="label-caps text-violet-ink">The KQUEL difference</p>
          <h2
            id="difference"
            className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-foreground"
          >
            {difference.heading}
          </h2>
        </Reveal>

        {/* Hairline grid, as on the About page: the gap shows the chrome
            wash behind the cells. */}
        <ul className="mt-16 grid grid-cols-1 gap-px border-t border-chrome/15 bg-chrome/10 md:grid-cols-2 lg:grid-cols-3">
          {difference.items.map((point, i) => (
            <li key={point.title} className="bg-void">
              <Reveal delay={i * 0.08} className="h-full py-10 md:px-8">
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {point.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-chrome/75">
                  {point.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      )}
    </>
  );
}
