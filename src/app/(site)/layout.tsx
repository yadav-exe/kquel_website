import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { SanityLive } from "@/sanity/live";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#content"
        className="label-caps sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-50 focus:bg-void focus:px-4 focus:py-3 focus:text-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
      {/* Keeps rendered pages in step with the content lake: when something
          is published, pages that show it are refreshed. */}
      <SanityLive />
    </>
  );
}
