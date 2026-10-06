import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/* The three families the design canvas loads from Google Fonts. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Parkline — Bedfordshire stay guide",
  description:
    "An independent guide to Bedfordshire and the planned theme park near Bedford: area guides, getting there, days out and where to stay.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#DCDCD6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} ${sourceSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
