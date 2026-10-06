import Link from "next/link";
import { Brand } from "./SiteHeader";
import { SITE } from "@/lib/site";

const LEGAL = [
  { label: "About", href: "/about" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap flex flex-col gap-14 py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Brand />
            <p className="max-w-[22rem] text-[0.95rem] leading-relaxed text-ink-muted">
              {SITE.footer.blurb}
            </p>
          </div>

          {SITE.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <h2 className="text-[0.72rem] font-bold tracking-[0.14em] uppercase">
                {col.title}
              </h2>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[0.95rem] text-ink-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="grid gap-8 border-t border-line pt-8 text-[0.82rem] leading-relaxed text-ink-muted lg:grid-cols-2 lg:gap-12">
          <p>
            <strong className="text-ink">Affiliate disclosure.</strong>{" "}
            Booking.com is our only partner. When you book through our links we
            may earn a commission, at no extra cost to you. It never decides
            which places are listed or in what order.{" "}
            <Link
              href="/affiliate-disclosure"
              className="underline underline-offset-[3px] hover:text-ink"
            >
              Read the full disclosure
            </Link>
            .
          </p>
          <p>
            {SITE.disclaimer} © {new Date().getFullYear()} {SITE.brand}.
          </p>
        </div>

        <div className="safe-b flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-[0.86rem]">
          {LEGAL.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 items-center text-ink-muted transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
