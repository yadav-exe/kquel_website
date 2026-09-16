import type { Metadata, Viewport } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KQUEL — Designing Spaces Where Wellness Becomes a Way of Life",
  description:
    "KQUEL crafts cinematic wellness spaces and bathing collections — architecture, stone, and water composed into a private sanctuary you live in every day.",
};

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
