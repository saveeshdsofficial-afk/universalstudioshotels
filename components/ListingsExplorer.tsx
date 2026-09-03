"use client";

import { useDirectory } from "./DirectoryProvider";
import { ListingCard } from "./ListingCard";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export function ListingsExplorer() {
  const { results, type, setType, query, setQuery, reset } = useDirectory();

  const filtered = type !== "All" || query.trim() !== "";

  return (
    <section id="listings" className="section-y">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[640px]">
              <span className="eyebrow">The whole list</span>
              <h2 className="mt-3.5 text-[clamp(1.75rem,4.2vw,2.7rem)]">
                {type === "All"
                  ? "Everywhere on the list"
                  : `Every ${type.toLowerCase()} on the list`}
              </h2>
              <p className="mt-3.5 text-[1.08rem] text-ink-muted">
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
                className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-accent-ring bg-accent-softer px-3 text-[0.85rem] text-accent-ink"
              >
                {type}
                <Icon name="x" className="size-3.5" />
              </button>
            ) : null}
            {query.trim() ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-pill border border-accent-ring bg-accent-softer px-3 text-[0.85rem] text-accent-ink"
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
          <div className="mt-8 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => (
              <Reveal key={l.slug} className="h-full">
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="card mt-8 grid place-items-center px-6 py-16 text-center">
            <span className="grid size-13 place-items-center rounded-[14px] bg-accent-soft text-accent-ink">
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
