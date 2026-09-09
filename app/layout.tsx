import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DirectoryProvider } from "@/components/DirectoryProvider";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import {
  ALL_KEYWORDS,
  BASE_URL,
  organisationLd,
  websiteLd,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `Hotels near the ${SITE.park} site, Bedford`,
    // every child page appends the brand without repeating it by hand
    template: `%s | ${SITE.brand}`,
  },
  description:
    "Independent directory of hotels near the Universal Studios UK site at Kempston Hardwick, Bedford. Distance on every entry. Not an official site.",
  keywords: ALL_KEYWORDS,
  applicationName: SITE.brand,
  authors: [{ name: SITE.brand, url: BASE_URL }],
  creator: SITE.brand,
  publisher: SITE.brand,
  category: "Travel",
  alternates: { canonical: BASE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: SITE.brand,
    locale: "en_GB",
    title: `${SITE.brand} — hotels near the ${SITE.park} site, Bedford`,
    description:
      "Independent directory of hotels near the Universal Studios UK site at Kempston Hardwick, Bedford. Distance on every entry. Not an official Universal Studios website.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.brand} — independent guide to staying near the ${SITE.park} site`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — hotels near the ${SITE.park} site`,
    description:
      "Independent directory of hotels near the Universal Studios UK site at Kempston Hardwick, Bedford.",
    images: ["/og.jpg"],
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    // plain-language restatement of the footer disclaimer for any crawler
    // that reads it before it reaches the bottom of the page
    "subject": "Independent accommodation directory, not affiliated with Universal Studios",
    "geo.region": "GB-BDF",
    "geo.placename": "Bedford, Bedfordshire",
    "geo.position": "52.1046;-0.4936",
    "ICBM": "52.1046, -0.4936",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // let people pinch-zoom; capping this is an accessibility failure
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="text-[16px] leading-[1.65] sm:text-[17px]">
        <JsonLd data={organisationLd()} />
        <JsonLd data={websiteLd()} />
        <DirectoryProvider>{children}</DirectoryProvider>
      </body>
    </html>
  );
}
