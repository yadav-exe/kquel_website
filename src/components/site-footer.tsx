import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { CONTACT, SITE } from "@/lib/site";

/* Only routes that exist are linked — privacy and terms are left out until
   those pages are written, rather than shipping dead links. */
const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

/* inline-flex + min-h-11 gives each row a 44px tap target without changing
   how the type sits. */
const columnLink =
  "inline-flex min-h-11 items-center text-sm text-chrome/70 transition-colors duration-300 hover:text-violet-ink";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-chrome/15 bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-20 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-20">
          <div>
            <p className="font-display text-2xl tracking-[0.28em] text-foreground">
              {SITE.name}
            </p>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-chrome/70">
              {SITE.positioning}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="label-caps text-chrome/70">Collections</p>
              <ul className="mt-4 flex flex-col">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/collections/${category.slug}`}
                      className={columnLink}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-caps text-chrome/70">Company</p>
              <ul className="mt-4 flex flex-col">
                {COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={columnLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-caps text-chrome/70">Enquiries</p>
              <ul className="mt-4 flex flex-col">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className={columnLink}>
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.website.href}
                    rel="noopener noreferrer"
                    className={columnLink}
                  >
                    {CONTACT.website.label}
                  </a>
                </li>
                <li className="flex min-h-11 items-center text-sm leading-relaxed text-chrome/70">
                  {CONTACT.works}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-chrome/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-caps text-chrome/70">
            © {year} {SITE.name} · {SITE.parent}
          </p>
          <p className="label-caps text-chrome/70">{SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
