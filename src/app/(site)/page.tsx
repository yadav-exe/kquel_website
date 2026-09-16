import type { Metadata } from "next";
import Hero from "@/components/hero";
import Ethos from "@/components/ethos";
import Archetypes from "@/components/archetypes";
import SignaturePieces from "@/components/signature-pieces";
import Innovation from "@/components/innovation";
import WhyKquel from "@/components/why-kquel";
import { getHomePage } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSiteSettings(), getHomePage()]);
  return pageMetadata({
    title: `${site.name} — ${home.hero.statement.replace(/\.$/, "")}`,
    description: site.positioning,
    path: "/",
    image: home.hero.image,
    seo: home.seo,
    site,
  });
}

export default async function Home() {
  const home = await getHomePage();

  return (
    <main id="content" className="flex-1">
      <Hero hero={home.hero} />
      <Ethos ethos={home.ethos} />
      <Archetypes tiles={home.archetypes} />
      <SignaturePieces pieces={home.signaturePieces} />
      <Innovation innovation={home.innovation} />
      <WhyKquel closing={home.closing} />
    </main>
  );
}
