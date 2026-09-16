import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";
import { getSiteSettings } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

/* Site-wide defaults. metadataBase turns every relative canonical, share
   image and Open Graph url below into an absolute one. Pages set their own
   title and description; these only stand in where one does not. */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} — ${site.positioning}`,
      template: "%s",
    },
    description: site.positioning,
    applicationName: site.name,
    openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
    twitter: { card: "summary_large_image" },
  };
}

/* Pinch-zoom stays available — capping or disabling user scaling fails
   WCAG 1.4.4. themeColor keeps the browser chrome from flashing white. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b0b0f",
};

/* Fonts and global styles only. The site's header and footer live in the
   (site) group so the editing Studio at /studio renders without them. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
