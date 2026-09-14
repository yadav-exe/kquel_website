import Image from "next/image";
import Link from "next/link";
import ProductBlueprint from "@/components/product-blueprint";
import type { Category, Product } from "@/lib/catalog";

function Breadcrumb({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  return (
    <nav aria-label="Breadcrumb" className="label-caps text-chrome/70">
      <Link
        href="/collections"
        className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-foreground"
      >
        Collections
      </Link>
      <span className="px-2 text-chrome/70">/</span>
      <Link
        href={`/collections/${category.slug}`}
        className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-foreground"
      >
        {category.name}
      </Link>
      <span className="px-2 text-chrome/70">/</span>
      <span className="text-chrome/80">{product.name}</span>
    </nav>
  );
}

export default function ProductDetail({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category;
  related: Product[];
}) {
  const image = product.image ?? category.src;
  const specGroups =
    product.specGroups ??
    [{ title: "Specification", items: product.features }];

  /* Search engines read the specification as structured data, not just as
     rendered text. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    brand: { "@type": "Brand", name: "KQUEL" },
    category: category.name,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Type", value: product.configuration },
      { "@type": "PropertyValue", name: "Size", value: product.sizes.join(", ") },
      ...product.features.map((feature) => ({
        "@type": "PropertyValue",
        name: "Fitment",
        value: feature,
      })),
    ],
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-28 md:px-20 md:pt-40 md:pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb category={category} product={product} />

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* The photograph holds while the specification scrolls beside it. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden border border-chrome/15 bg-surface">
            <Image
              src={image}
              alt={product.image ? product.name : category.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="label-caps text-violet-ink">{category.name}</p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-[-0.02em] text-foreground">
            {product.name}
          </h1>
          <p className="mt-4 text-sm text-chrome/70">
            {product.configuration} · {product.sizes.join(" · ")}
          </p>

          {product.story && (
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-chrome/85">
              {product.story}
            </p>
          )}

          {product.highlights && (
            <dl className="mt-12 grid grid-cols-2 gap-px border border-chrome/15 bg-chrome/15">
              {product.highlights.map((highlight) => (
                <div key={highlight.label} className="bg-surface p-6">
                  <dt className="label-caps text-chrome/70">
                    {highlight.label}
                  </dt>
                  <dd className="mt-3 font-display text-2xl leading-none text-foreground">
                    {highlight.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-12 flex flex-col gap-5 border-t border-chrome/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-caps text-violet-ink">Price on request</p>
            <Link
              /* Carries the piece through so the enquiry arrives pre-filled. */
              href={`/contact?collection=${category.slug}&product=${product.slug}`}
              className="label-caps bg-violet-deep px-10 py-4 text-center text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-opacity duration-300 hover:opacity-90"
            >
              Enquire about {product.name}
            </Link>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="specification"
        className="mt-28 border-t border-chrome/15 pt-16 md:mt-36"
      >
        <h2
          id="specification"
          className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-foreground"
        >
          Specification
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {specGroups.map((group) => (
            <div key={group.title}>
              <h3 className="label-caps border-b border-chrome/15 pb-4 text-chrome/70">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-chrome/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ProductBlueprint product={product} />

      {related.length > 0 && (
        <section
          aria-labelledby="related"
          className="mt-28 border-t border-chrome/15 pt-16 md:mt-36"
        >
          <h2
            id="related"
            className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-foreground"
          >
            Also in {category.name}
          </h2>

          <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const hasPage = Boolean(item.story);
              const card = (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden bg-void">
                    <Image
                      src={item.image ?? category.src}
                      alt={item.image ? item.name : ""}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-[1.6rem] leading-tight text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm text-chrome/70">
                      {item.configuration} · {item.sizes[0]}
                    </p>
                  </div>
                </>
              );

              return (
                <li key={item.slug}>
                  {hasPage ? (
                    <Link
                      href={`/collections/${category.slug}/${item.slug}`}
                      className="group flex flex-col border border-chrome/10 bg-surface transition-[border-color,box-shadow] duration-500 hover:border-violet/50 hover:shadow-[0_0_28px_rgba(124,92,255,0.2)]"
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className="group flex flex-col border border-chrome/10 bg-surface">
                      {card}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="mt-24 flex flex-col items-center">
        <div aria-hidden className="mb-12 h-px w-full bg-chrome/15" />
        <Link
          href={`/collections/${category.slug}`}
          className="label-caps border border-chrome/40 px-12 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
        >
          Back to {category.name}
        </Link>
      </div>
    </div>
  );
}
