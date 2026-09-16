"use client";

import SanityPicture from "@/components/sanity-picture";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CategoryListing } from "@/lib/catalog";
import { configurationOptions, sizeOptions } from "@/lib/product-filters";

const EASE = [0.19, 1, 0.22, 1] as const;

const ALL_TYPES = "All types";
const ANY_SIZE = "Any size";
/* Two ways to read the grid: a 2 × 2 square of four, or a 3 × 2 rectangle
   of six. Both hold two columns on tablet and one on phones. */
type Layout = "square" | "wide";

/* Each formation has a preferred ratio — the wider the card, the shallower
   the crop, which also suits the landscape photography. */
const LAYOUTS: Record<
  Layout,
  { perPage: number; cols: string; media: string; label: string }
> = {
  square: {
    perPage: 4,
    cols: "lg:grid-cols-2",
    media: "aspect-[3/2]",
    label: "Square grid, four per page",
  },
  wide: {
    perPage: 6,
    cols: "lg:grid-cols-3",
    media: "aspect-[4/3]",
    label: "Wide grid, six per page",
  },
};

/* The ratio above is only a preference. What has to hold on every screen is
   that a whole row fits: the image is capped at the viewport height less the
   space the header and the card's text block already claim, so a short laptop
   crops tighter rather than pushing the card off-screen. A tall display never
   exceeds the ratio, and the floor stops it collapsing in landscape on a
   phone. */
const MEDIA_FIT = "max-h-[calc(100svh-24rem)] min-h-40";

/* Icons draw the actual formation — a 2 × 2 block and a 3 × 2 block — so the
   choice reads as a shape rather than a number alone. */
function GridIcon({ cols, rows }: { cols: number; rows: number }) {
  const size = 5;
  const gap = 2.5;
  return (
    <svg
      width={cols * size + (cols - 1) * gap}
      height={rows * size + (rows - 1) * gap}
      viewBox={`0 0 ${cols * size + (cols - 1) * gap} ${rows * size + (rows - 1) * gap}`}
      fill="currentColor"
      aria-hidden
    >
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * (size + gap)}
            y={r * (size + gap)}
            width={size}
            height={size}
          />
        ))
      )}
    </svg>
  );
}

function LayoutToggle({
  layout,
  onChange,
}: {
  layout: Layout;
  onChange: (next: Layout) => void;
}) {
  const button = (value: Layout, cols: number, rows: number, count: number) => {
    const active = layout === value;
    return (
      <button
        type="button"
        onClick={() => onChange(value)}
        aria-pressed={active}
        aria-label={LAYOUTS[value].label}
        className={`label-caps inline-flex min-h-11 items-center gap-2.5 border px-3.5 transition-colors duration-300 ${
          active
            ? "border-violet bg-violet-deep text-white"
            : "border-chrome/25 text-chrome/70 hover:border-violet hover:text-violet-ink"
        }`}
      >
        <GridIcon cols={cols} rows={rows} />
        {count}
      </button>
    );
  };

  return (
    <div role="group" aria-label="Grid layout" className="flex items-center gap-2">
      {button("square", 2, 2, 4)}
      {button("wide", 3, 2, 6)}
    </div>
  );
}

const pageNavClasses =
  "label-caps inline-flex min-h-11 min-w-11 items-center justify-center border border-chrome/25 " +
  "text-chrome/70 transition-colors duration-300 hover:border-violet hover:text-violet-ink " +
  "disabled:pointer-events-none disabled:opacity-30";

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const id = `filter-${label.toLowerCase()}`;
  return (
    <div className="flex items-center gap-3">
      <label className="label-caps text-chrome/70" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* 16px minimum: anything smaller makes iOS Safari zoom the page on
           focus. min-h-11 keeps the control a 44px tap target. */
        className="min-h-11 cursor-pointer border-none bg-transparent py-0 pr-6 text-base text-foreground focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-violet"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-surface text-foreground"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* Wraps a card in a link where the product has a page, and in a plain
   container where it does not — so a card never looks clickable when it
   leads nowhere. */
function CardShell({
  href,
  name,
  children,
}: {
  href?: string;
  name: string;
  children: React.ReactNode;
}) {
  if (!href) return <div className="flex h-full flex-col">{children}</div>;
  return (
    <Link
      href={href}
      aria-label={name}
      className="flex h-full flex-col focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}

/* Takes the listing alone — the page keeps the prose on the server side of
   the boundary. */
export default function CatalogView({
  category,
}: {
  category: CategoryListing;
}) {
  const [configuration, setConfiguration] = useState(ALL_TYPES);
  const [size, setSize] = useState(ANY_SIZE);
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState<Layout>("square");
  const gridRef = useRef<HTMLDivElement>(null);
  const perPage = LAYOUTS[layout].perPage;
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const configurations = useMemo(
    () => [ALL_TYPES, ...configurationOptions(category.products)],
    [category.products]
  );
  const sizes = useMemo(
    () => sizeOptions(category.products),
    [category.products]
  );

  const products = useMemo(
    () =>
      category.products.filter(
        (product) =>
          (configuration === ALL_TYPES ||
            product.configuration === configuration) &&
          (size === ANY_SIZE || product.sizes.includes(size))
      ),
    [category.products, configuration, size]
  );

  const filtered = configuration !== ALL_TYPES || size !== ANY_SIZE;

  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const firstOnPage = (currentPage - 1) * perPage;
  const lastOnPage = Math.min(firstOnPage + perPage, products.length);

  /* Switching formation keeps the reader where they were: the page that
     still contains the piece they were looking at. */
  const changeLayout = (next: Layout) => {
    setLayout(next);
    setPage(Math.floor(firstOnPage / LAYOUTS[next].perPage) + 1);
  };

  /* Filters reset paging here rather than in an effect — changing a filter
     while on page 6 would otherwise land the reader on an empty page. */
  const changeConfiguration = (value: string) => {
    setConfiguration(value);
    setPage(1);
  };
  const changeSize = (value: string) => {
    setSize(value);
    setPage(1);
  };
  const clearFilters = () => {
    setConfiguration(ALL_TYPES);
    setSize(ANY_SIZE);
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    /* Return to the top of the grid, and put focus there so a screen reader
       or keyboard user is not stranded at the pagination control. */
    gridRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    gridRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* A collection still being photographed says so, rather than showing
          an empty grid behind filters that cannot match anything. */}
      {category.products.length === 0 ? (
        <div className="border-y border-chrome/15 bg-surface px-6 py-20 text-center md:py-28">
          <p className="label-caps text-violet-ink">In preparation</p>
          <p className="mx-auto mt-6 max-w-[34ch] font-display text-2xl leading-tight text-foreground md:text-3xl">
            This collection is being photographed.
          </p>
          <p className="mx-auto mt-5 max-w-[44ch] text-base leading-relaxed text-chrome/70">
            The range is in production and will appear here shortly. Until
            then, tell us what you are looking for and we will send the
            details directly.
          </p>
          <Link
            href="/contact"
            className="label-caps mt-10 inline-block border border-chrome/40 px-10 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
          >
            Enquire about {category.name}
          </Link>
        </div>
      ) : (
      <>
      <section
        aria-label="Filter products"
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-chrome/15 bg-surface px-6 py-4"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <FilterSelect
            label="Type"
            value={configuration}
            options={configurations}
            onChange={changeConfiguration}
          />
          {sizes.length > 0 && (
            <>
              <div aria-hidden className="hidden h-4 w-px bg-chrome/20 lg:block" />
              <FilterSelect
                label="Size"
                value={size}
                options={[ANY_SIZE, ...sizes]}
                onChange={changeSize}
              />
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <LayoutToggle layout={layout} onChange={changeLayout} />
          <div aria-hidden className="hidden h-4 w-px bg-chrome/20 sm:block" />
          <p className="label-caps text-chrome/70" aria-live="polite">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={clearFilters}
              className="label-caps inline-flex min-h-11 items-center text-violet-ink transition-opacity duration-300 hover:opacity-70"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {products.length === 0 ? (
        <div className="flex flex-col items-start gap-5 py-24">
          <p className="font-display text-2xl text-foreground">
            No pieces match this combination.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="label-caps inline-flex min-h-11 items-center border-b border-chrome/40 pb-2 text-foreground transition-colors duration-300 hover:border-violet hover:text-violet-ink"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div ref={gridRef} tabIndex={-1} className="scroll-mt-28 focus:outline-none">
        <ul
          className={`mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 ${LAYOUTS[layout].cols}`}
        >
          {products.map((product, i) => {
            /* Every piece stays in the markup and only the current page is
               shown. Slicing instead would drop the other product links out
               of the served HTML, costing them their route in from here. */
            const onPage = i >= firstOnPage && i < lastOnPage;
            return (
            <motion.li
              /* Keyed by formation and page so cards remount and replay their
                 reveal. No `layout` prop: animating layout while cards are
                 being hidden leaves motion mid-correction, stranding them at
                 the wrong size and offset. */
              key={`${layout}-${currentPage}-${product.slug}`}
              hidden={!onPage}
              initial={animate ? { opacity: 0, y: 24 } : false}
              animate={animate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE, delay: (i % perPage) * 0.06 }}
              className="group border border-chrome/10 bg-surface transition-[border-color,box-shadow] duration-500 hover:border-violet/50 hover:shadow-[0_0_28px_rgba(124,92,255,0.2)] focus-within:border-violet/50 focus-within:shadow-[0_0_28px_rgba(124,92,255,0.2)]"
            >
              {/* The whole card is the target where a detail page exists. */}
              <CardShell
                href={
                  product.story
                    ? `/collections/${category.slug}/${product.slug}`
                    : undefined
                }
                name={product.name}
              >
              <div
                className={`relative overflow-hidden bg-void ${LAYOUTS[layout].media} ${MEDIA_FIT}`}
              >
                <SanityPicture
                  /* A piece is only listed with its own photograph; the
                     cover is a belt-and-braces fallback. */
                  image={product.image ?? category.cover}
                  alt={product.image ? product.name : ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgb(22_22_28/0.75)_0%,transparent_55%)]"
                  aria-hidden
                />
              </div>

              <div className="flex flex-grow flex-col p-7 md:p-8">
                <h2 className="font-display text-[1.6rem] leading-tight text-foreground">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm text-chrome/70">
                  {product.configuration}
                </p>

                <dl className="mt-8 border-t border-chrome/10 pt-5">
                  <dt className="label-caps text-chrome/70">
                    {product.sizes.length > 1 ? "Sizes" : "Size"}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-chrome/85">
                    {product.sizes[0] === "—"
                      ? "Made to specification"
                      : product.sizes.join(" · ")}
                  </dd>
                </dl>

                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                  <p className="label-caps text-violet-ink">Price on request</p>
                  {/* A cue, not a second target — the card itself carries the link. */}
                  {product.story && (
                    <span className="label-caps inline-flex items-center gap-2 border-b border-chrome/40 pb-1.5 text-foreground transition-colors duration-300 group-hover:border-violet group-hover:text-violet-ink">
                      View
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M0 5h12M8 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
              </CardShell>
            </motion.li>
            );
          })}
        </ul>

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-16 flex flex-col items-center gap-6 border-t border-chrome/15 pt-10 sm:flex-row sm:justify-between"
          >
            <p className="label-caps text-chrome/70" aria-live="polite">
              Showing {firstOnPage + 1}–{lastOnPage} of {products.length}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={pageNavClasses}
              >
                <span aria-hidden>←</span>
                <span className="sr-only">Previous page</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  aria-label={`Page ${n}`}
                  className={`label-caps inline-flex min-h-11 min-w-11 items-center justify-center border transition-colors duration-300 ${
                    n === currentPage
                      ? "border-violet bg-violet-deep text-white"
                      : "border-chrome/25 text-chrome/70 hover:border-violet hover:text-violet-ink"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={pageNavClasses}
              >
                <span aria-hidden>→</span>
                <span className="sr-only">Next page</span>
              </button>
            </div>
          </nav>
        )}
        </div>
      )}
      </>
      )}
    </>
  );
}
