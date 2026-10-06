"use client";

import { useDirectory } from "./DirectoryProvider";
import { ListingCard } from "./ListingCard";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { RuleHead } from "./SectionHead";
import { cn } from "@/lib/cn";
import { AFFILIATE_NOTE } from "@/lib/affiliate";
import Link from "next/link";

export function ListingsExplorer() {
  const { results, type, setType, query, setQuery, reset } = useDirectory();

  const filtered = type !== "All" || query.trim() !== "";

  return (
    <section id="listings" className="noise section-y bg-tint">
      <div className="wrap">
        <Reveal>
          <RuleHead n="06" label="The whole list" className="mb-6" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[640px]">
              <h2 className="text-[clamp(1.9rem,5vw,3.4rem)]">
                {type === "All"
                  ? "Everywhere on the list"
                  : `Every ${type.toLowerCase()} on the list`}
              </h2>
              <p className="serif mt-4 text-[1.08rem] text-ink-soft">
                {results.length}{" "}
                {results.length === 1 ? "place" : "places"}
                {filtered ? " match what you asked for" : " so far"}, each with a
                straight-line distance worked out from its postcode.
              </p>
            </div>

          </div>
        </Reveal>

        {/* active filters, always removable */}
        {filtered ? (
          <div className="mt-6 flex flex-wrap items-center gap-2">
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

        {/* disclosure sits with the links it describes, not only in the footer */}
        <p className="mt-6 flex flex-wrap items-center gap-x-1.5 text-[0.84rem] text-ink-muted">
          {AFFILIATE_NOTE}{" "}
          <Link
            href="/affiliate-disclosure"
            className="underline underline-offset-2 hover:text-ink"
          >
            How this works
          </Link>
        </p>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => (
              <Reveal key={l.slug} className="h-full">
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="card mt-8 grid place-items-center px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-card bg-tint text-accent-ink">
              <Icon name="pin" className="size-6" />
            </span>
            <h3 className="mt-4 text-[1.2rem]">Nothing matches that</h3>
            <p className="mt-2 max-w-[42ch] text-ink-muted">
              Widen it a little — drop the type filter, or try Bedford, Kempston
              or a postcode like MK42.
            </p>
            <button type="button" onClick={reset} className="btn btn-primary mt-6">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
