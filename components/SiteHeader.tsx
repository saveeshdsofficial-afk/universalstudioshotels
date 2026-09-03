"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Brand({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <a
      href="#top"
      aria-label={`${SITE.brand} ${SITE.brandSub} — home`}
      className="flex min-h-11 items-center gap-2.5"
    >
      <span className="size-[11px] shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-accent-soft)]" />
      <span className="leading-none">
        <span
          className={cn(
            /* the name is long — hold it on one line and let it shrink first */
            "block text-[0.95rem] font-semibold tracking-[-0.02em] whitespace-nowrap xs:text-[1.02rem] sm:text-[1.12rem]",
            tone === "dark" && "text-white",
          )}
        >
          {SITE.brand}
        </span>
        <span
          className={cn(
            "mt-0.5 block font-mono text-[0.7rem] font-normal tracking-[0.1em] uppercase",
            tone === "dark" ? "text-footer-dim" : "text-ink-muted",
          )}
        >
          {SITE.brandSub}
        </span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock the page behind the mobile menu, and never leave it open on
  // a viewport that has the desktop nav.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const mq = window.matchMedia("(min-width: 64rem)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      mq.removeEventListener("change", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-lg backdrop-saturate-150">
      <div className="wrap flex h-(--header-h) items-center gap-7">
        <Brand />

        <nav aria-label="Primary" className="ml-3.5 hidden gap-6.5 lg:flex">
          {SITE.nav.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className="inline-flex min-h-11 items-center text-[0.96rem] font-medium whitespace-nowrap text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="#"
            className="hidden min-h-11 items-center text-[0.94rem] font-medium whitespace-nowrap text-ink-soft transition-colors hover:text-ink lg:inline-flex"
          >
            Log in
          </a>

          <a href="#providers" className="btn btn-primary hidden sm:inline-flex">
            <Icon name="key" className="size-[17px]" />
            Add listing
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 shrink-0 place-items-center rounded-[10px] border border-line-strong text-ink lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu: a real panel, not a squeezed desktop nav. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-surface shadow-[var(--shadow-mid)] lg:hidden"
      >
        <nav aria-label="Primary" className="wrap flex flex-col py-2">
          {SITE.nav.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[1.02rem] font-medium text-ink-soft last:border-b-0"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="wrap safe-b flex flex-col gap-3 pt-2 pb-5">
          <a
            href="#providers"
            onClick={() => setOpen(false)}
            className="btn btn-primary w-full sm:hidden"
          >
            <Icon name="key" className="size-[17px]" />
            Add listing
          </a>
          <a href="#" className="btn btn-ghost w-full">
            Log in
          </a>
        </div>
      </div>
    </header>
  );
}
