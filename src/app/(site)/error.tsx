"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="content"
      className="flex flex-1 items-center justify-center px-5 py-32 md:py-40"
    >
      <div className="mx-auto max-w-[46ch] text-center">
        <p className="label-caps text-violet-ink">Something went wrong</p>
        <h1 className="mt-7 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-foreground">
          This page did not load.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-chrome/75">
          The fault is ours, not yours. Try again — and if it persists, write to
          us and we will look into it.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="label-caps bg-violet-deep px-10 py-4 text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-opacity duration-300 hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="label-caps border border-chrome/40 px-10 py-4 text-foreground transition-colors duration-500 hover:bg-foreground hover:text-void"
          >
            Back home
          </Link>
        </div>

        {error.digest && (
          <p className="label-caps mt-12 text-chrome/70">
            Reference {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
