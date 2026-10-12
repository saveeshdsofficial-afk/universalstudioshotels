import type { Metadata } from "next";
import type { ReactNode } from "react";

/* The page itself is a client component and cannot export metadata, so the
   noindex lives here. This is an internal tool, not site content. */
export const metadata: Metadata = {
  title: "Demand API test console",
  robots: { index: false, follow: false, nocache: true },
};

export default function BookingTestLayout({ children }: { children: ReactNode }) {
  return children;
}
