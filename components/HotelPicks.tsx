"use client";

import Link from "next/link";
import { useDirectory } from "./DirectoryProvider";
import { ListingCard } from "./ListingCard";
import { Reveal } from "./Reveal";
import { RuleHead } from "./SectionHead";
import { Icon } from "./Icon";
import { AFFILIATE_NOTE } from "@/lib/affiliate";

/**
 * 03 — the reference's "Hotel picks": a grid of hotel cards on the tinted-to-
 * white step. This is also the directory, so the hero's search panel filters
 * it; the reference had nowhere for results to land, we do.
 */
export function HotelPicks() {
  const { results, type, setType, query, setQuery, reset } = useDirectory();
  const filtered = type !== "All" || query.trim() !== "";

  return (
    <section
      id="listings"
      className="noise bg-[linear-gradient(180deg,var(--color-tint)_0,var(--color-tint)_7.5rem,var(--color-surface)_7.5rem)] pb-20 lg:pb-32"
    >
      {/* the grid climbs back into the blue band above it */}
      <div className="wrap relative lg:-top-26 lg:-mb-26">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 pt-14 pb-8 lg:pt-0">
            <RuleHead
              n="03"
              label="Our hotel picks"
              className="min-w-[min(100%,20rem)] flex-1 [&::after]:bg-tint-line"
            />
            <span className="text-[0.82rem] text-ink-muted">
              {results.length} of {results.length === 1 ? "" : ""}
              {filtered ? "matching" : "all"} · distances from Kempston Hardwick
            </span>
          </div>
        </Reveal>

        {filtered ? (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {type !== "All" ? (
              <button
                type="button"
                onClick={() => setType("All")}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-tint-line bg-surface px-3 text-[0.85rem] font-semibold text-accent-ink"
              >
                {type}
                <Icon name="x" className="size-3.5" />
              </button>
            ) : null}
            {query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-tint-line bg-surface px-3 text-[0.85rem] font-semibold text-accent-ink"
              >
                &ldquo;{query.trim()}&rdquo;
                <Icon name="x" className="size-3.5" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-9 items-center px-2 text-[0.85rem] text-ink-muted underline underline-offset-4 hover:text-ink"
            >
              Clear all
            </button>
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l, i) => (
              <Reveal key={l.slug} className="h-full">
                <ListingCard listing={l} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="card grid place-items-center px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-card bg-tint text-accent-ink">
              <Icon name="pin" className="size-6" />
            </span>
            <h3 className="mt-4 text-[1.3rem]">Nothing matches that</h3>
            <p className="mt-2 max-w-[42ch] text-ink-muted">
              Widen it a little — drop the type filter, or try Bedford, Kempston
              or a postcode like MK42.
            </p>
            <button type="button" onClick={reset} className="btn btn-primary mt-6">
              Clear filters
            </button>
          </div>
        )}

        <p className="mt-8 flex flex-wrap items-center gap-x-2 text-[0.84rem] text-ink-muted">
          {AFFILIATE_NOTE}
          <Link
            href="/affiliate-disclosure"
            className="underline underline-offset-2 hover:text-ink"
          >
            How we work
          </Link>
        </p>
      </div>
    </section>
  );
}
