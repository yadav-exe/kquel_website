"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* Scroll silence before the bar returns. Long enough to ride over the gaps
   inside a single wheel or trackpad gesture — a shorter window lets the bar
   drop mid-gesture and get shoved straight back up. */
const IDLE_DELAY = 300;

/* Movement below this is layout settling, not a gesture. */
const SCROLL_THRESHOLD = 4;

/* Waits out the hero's wordmark reveal before the bar drops in. */
const HERO_SETTLE_DELAY = 1600;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/collections", label: "Collections" },
  { href: "/contact", label: "Contact" },
];

const navLinkClasses =
  "label-caps relative block pb-1.5 text-chrome/85 transition-colors duration-300 hover:text-foreground " +
  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 " +
  "after:bg-chrome/60 after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100 " +
  "focus-visible:after:origin-left focus-visible:after:scale-x-100";

export default function SiteHeader() {
  const pathname = usePathname();
  /* Only the homepage has a wordmark reveal to wait out. Everywhere else the
     bar must be present — and focusable — the moment the page renders. */
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [entered, setEntered] = useState(!isHome);
  const [lastPath, setLastPath] = useState(pathname);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Re-arm on navigation, during render rather than in an effect — the bar
     should be present immediately off the homepage, and replay its drop-in
     when the hero reveal starts again. */
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setEntered(!isHome);
  }

  /* The bar drops in after the hero's wordmark has settled. Driven by state
     rather than a CSS animation: a filled animation would keep owning
     `transform` and the scroll slide below would never take effect. */
  useEffect(() => {
    if (!isHome) return;
    const timer = setTimeout(() => setEntered(true), HERO_SETTLE_DELAY);
    return () => clearTimeout(timer);
  }, [isHome, pathname]);

  /* The bar steps aside while the page is in motion and returns the moment
     scrolling stops, so it is reachable from anywhere without ever sitting
     on top of the reveal sequences. */
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const top = y < 8;
      setAtTop(top);
      /* Ignore sub-threshold jitter (image loads, layout settling) so the bar
         never flinches at something the reader did not do. */
      if (!top && Math.abs(y - lastY.current) < SCROLL_THRESHOLD) return;
      lastY.current = y;
      setScrolling(!top);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolling(false), IDLE_DELAY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const hidden = !entered || (scrolling && !open);

  /* The open menu is a modal surface: it takes focus, keeps it, and hands it
     back to the control that opened it. */
  useEffect(() => {
    if (!open) return;
    /* Captured now so the cleanup does not read a ref that may have moved on. */
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !menuRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      /* Return focus to the toggle so the keyboard user is not dropped to
         the top of the document. */
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      /* Off-screen: keep it out of the tab order until it drops back in. */
      inert={hidden || undefined}
    >
      {/* Once off the hero the bar needs its own ground to stay legible. */}
      <div
        aria-hidden
        className={`absolute inset-0 border-b border-chrome/15 bg-void/75 backdrop-blur-md transition-opacity duration-500 ${
          atTop && !open ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 py-6 md:px-20 md:py-7">
        <Link
          href="/"
          aria-label="KQUEL home"
          onClick={() => setOpen(false)}
          className="-ml-3 flex min-h-11 items-center px-3 justify-self-start font-display text-[22px] font-medium tracking-[0.28em] text-foreground"
        >
          KQUEL
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          /* -mr-3 keeps the text optically aligned to the edge while the
             tappable box stays a full 44px. */
          className="label-caps col-start-3 -mr-3 flex min-h-11 min-w-11 items-center justify-end px-3 justify-self-end text-chrome/85 transition-colors duration-300 hover:text-foreground md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>

    {/* Sits OUTSIDE the header on purpose: the header carries a transform,
        which would make it the containing block for a fixed child and
        collapse this overlay into the height of the bar. Kept below the bar
        in z-order so the Close control stays reachable. */}
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-void md:hidden"
    >
      <nav
        aria-label="Mobile"
        className="flex min-h-svh flex-col justify-center px-5 pt-28 pb-16"
      >
        <ul className="border-t border-chrome/15">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-chrome/15">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center py-5 font-display text-2xl text-foreground transition-colors duration-300 hover:text-chrome"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
}
