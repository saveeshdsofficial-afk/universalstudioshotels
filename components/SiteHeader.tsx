"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { MAIL, SITE } from "@/lib/site";
import { AFFILIATE_NOTE, AFFILIATE_REL, bookingSearchUrl } from "@/lib/affiliate";
import { cn } from "@/lib/cn";

export function Brand({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.brand} — home`}
      className="flex min-h-11 items-baseline gap-2.5"
    >
      <span
        className={cn(
          "font-display text-[1.05rem] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap sm:text-[1.25rem] lg:text-[1.4rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        Universal Studios Hotels
        <span className="text-accent">.</span>
      </span>
      <span
        className={cn(
          "hidden text-[0.69rem] font-semibold tracking-[0.14em] uppercase lg:inline",
          tone === "dark" ? "text-on-dark-dim" : "text-ink-muted",
        )}
      >
        {SITE.brandSub}
      </span>
    </Link>
  );
}

/** Dark strip above the header: the disclosure people see before anything else. */
export function AnnouncementBar() {
  return (
    <div className="bg-dark text-on-dark">
      <div className="wrap flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-[0.8rem]">
        <Icon name="shield" className="size-3.5 shrink-0" />
        <span>{AFFILIATE_NOTE}</span>
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-white underline underline-offset-[3px]"
        >
          How we work
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const mq = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      mq.removeEventListener("change", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-30 border-b border-line bg-bg/[0.86] shadow-[0_1px_2px_rgb(23_24_27/0.04),0_8px_24px_-12px_rgb(23_24_27/0.10)] backdrop-blur-[14px]">
        <div className="wrap flex h-(--header-h) items-center justify-between gap-6">
          <Brand />

          <nav
            aria-label="Primary"
            className="hidden gap-8 text-[0.95rem] font-medium lg:flex"
          >
            {SITE.nav.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="whitespace-nowrap transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={bookingSearchUrl("hotels near Kempston Hardwick, Bedford")}
              target="_blank"
              rel={AFFILIATE_REL}
              className="btn btn-primary hidden !min-h-[42px] !gap-2.5 !py-2.5 !pr-3 !pl-4.5 !text-[0.88rem] sm:inline-flex"
            >
              Find hotels
              <span className="btn-chip">Booking.com</span>
              <Icon name="route" className="size-4" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 shrink-0 place-items-center rounded-[12px] border border-line bg-surface text-ink lg:hidden"
            >
              <Icon name={open ? "x" : "menu"} className="size-5" />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-line bg-surface shadow-[var(--shadow-raise)] lg:hidden"
        >
          <nav aria-label="Primary" className="wrap flex flex-col py-2">
            {SITE.nav.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[1.02rem] font-medium last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="wrap safe-b flex flex-col gap-2.5 pt-2 pb-5">
            <a
              href={bookingSearchUrl("hotels near Kempston Hardwick, Bedford")}
              target="_blank"
              rel={AFFILIATE_REL}
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full sm:hidden"
            >
              Find hotels
              <span className="btn-chip">Booking.com</span>
            </a>
            <a href={MAIL.listing} className="btn btn-ghost w-full">
              Add your place
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
