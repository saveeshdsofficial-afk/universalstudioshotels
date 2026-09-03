import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DirectoryProvider } from "@/components/DirectoryProvider";
import { SITE } from "@/lib/site";
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
  title: `${SITE.brand} — independent guide to staying near the Bedford site`,
  description:
    "An independent directory of hotels, B&Bs, apartments and rentals near the Universal Studios UK site in Bedfordshire, with road distance shown on every entry. Not an official Universal Studios website.",
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
        <DirectoryProvider>{children}</DirectoryProvider>
      </body>
    </html>
  );
}
