import type { Metadata } from "next";
import CollectionsShowcase from "@/components/collections-showcase";

export const metadata: Metadata = {
  title: "Collections — KQUEL",
  description:
    "Explore the KQUEL collections: whirlpool bathtubs, sauna, spa, shower and pool systems engineered for private wellness architecture.",
};

export default function CollectionsPage() {
  return (
    <main id="content" className="flex-1">
      <h1 className="sr-only">Collections</h1>
      <CollectionsShowcase />
    </main>
  );
}
