"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import SanityPicture from "@/components/sanity-picture";
import type { SanityImage } from "@/sanity/image";

export type SignaturePiece = {
  name: string;
  size: string;
  image: SanityImage;
  alt?: string;
  href: string;
  copy: string;
};

const EASE = [0.19, 1, 0.22, 1] as const;

function PieceCard({
  piece,
  order,
  animate,
}: {
  piece: SignaturePiece;
  order: number;
  animate: boolean;
}) {
  return (
    <motion.article
      initial={animate ? { opacity: 0, y: 28 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay: order * 0.12 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-void">
        <SanityPicture
          image={piece.image}
          alt={piece.alt}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgb(11_11_15/0.18),rgb(11_11_15/0.18))]"
          aria-hidden
        />
      </div>
      <h3 className="mt-8 font-display text-2xl leading-tight text-foreground">
        {piece.name}
      </h3>
      <p className="label-caps mt-3 text-chrome/70">{piece.size}</p>
      <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-chrome/85">
        {piece.copy}
      </p>
      <Link
        href={piece.href}
        className="label-caps mt-6 inline-flex min-h-11 items-center border-b border-violet/50 pb-1.5 text-violet-ink transition-[color,border-color,text-shadow] duration-300 hover:border-violet hover:[text-shadow:0_0_16px_rgba(124,92,255,0.55)]"
      >
        Discover
      </Link>
    </motion.article>
  );
}

export default function SignaturePieces({ pieces }: { pieces: SignaturePiece[] }) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <section
      id="signature"
      className="mx-auto max-w-[1440px] px-5 py-28 md:px-20 md:py-36"
    >
      <motion.h2
        initial={animate ? { opacity: 0, y: 22 } : false}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mb-14 bg-[linear-gradient(105deg,#e4e1e7_55%,#cabeff_90%)] bg-clip-text text-center font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-tight text-transparent md:mb-20"
      >
        Signature Pieces
      </motion.h2>

      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:gap-14">
        {pieces.map((piece, i) => (
          <PieceCard
            key={piece.name}
            piece={piece}
            order={i}
            animate={animate}
          />
        ))}
      </div>
    </section>
  );
}
