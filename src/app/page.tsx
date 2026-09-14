import Hero from "@/components/hero";
import Ethos from "@/components/ethos";
import Archetypes from "@/components/archetypes";
import SignaturePieces from "@/components/signature-pieces";
import Innovation from "@/components/innovation";
import WhyKquel from "@/components/why-kquel";

export default function Home() {
  return (
    <main id="content" className="flex-1">
      <Hero />
      <Ethos />
      <Archetypes />
      <SignaturePieces />
      <Innovation />
      <WhyKquel />
    </main>
  );
}
