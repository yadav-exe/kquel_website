import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="content"
      className="flex flex-1 items-center justify-center px-5 py-32 md:py-40"
    >
      <div className="mx-auto max-w-[46ch] text-center">
        <p className="label-caps text-violet-ink">404</p>
        <h1 className="mt-7 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-foreground">
          This page has drained away.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-chrome/75">
          The address you followed does not lead anywhere. It may have been
          moved, or the piece may have been renamed.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/collections"
            className="label-caps bg-violet-deep px-10 py-4 text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-opacity duration-300 hover:opacity-90"
          >
            View the collections
          </Link>
          <Link
            href="/"
            className="label-caps border border-chrome/40 px-10 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
