import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { fmt, getDictionary } from "@/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const t = getDictionary();

// Image d'aperçu (app/opengraph-image.tsx) et favicon (app/icon.tsx) sont ajoutés automatiquement par Next.js
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: fmt(t.meta.title),
  description: fmt(t.meta.description),
  keywords: [...t.meta.keywords],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: siteConfig.name,
    title: fmt(t.meta.shareTitle),
    description: fmt(t.meta.shareDescription),
  },
  twitter: {
    card: "summary_large_image",
    title: fmt(t.meta.shareTitle),
    description: fmt(t.meta.shareDescription),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-theme="kairos" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
