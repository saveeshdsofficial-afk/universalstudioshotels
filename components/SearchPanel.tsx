"use client";

import { useDirectory } from "./DirectoryProvider";
import { Icon } from "./Icon";
import { ALL_TYPES, LISTINGS } from "@/lib/listings";
import type { PropertyType, SortKey } from "@/lib/types";
import { cn } from "@/lib/cn";

const SORT_LABELS: Record<SortKey, string> = {
  nearest: "Closest to the site",
  name: "Name A–Z",
};

/** A labelled field in the glass panel. */
function Field({
  icon,
  label,
  children,
}: {
  icon: "pin" | "calendar" | "bed";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-tint-line">
      <Icon name={icon} className="size-5 shrink-0 text-ink-muted" />
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="text-[0.75rem] font-semibold text-ink-muted">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

const fieldInput =
  "w-full min-w-0 border-0 bg-transparent p-0 text-[1rem] font-semibold text-ink outline-none";

export function SearchPanel() {
  const { query, setQuery, type, setType, sort, setSort, results } =
    useDirectory();

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        document
          .getElementById("listings")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="flex flex-col gap-4 rounded-panel border border-white/70 bg-white/80 p-4 shadow-[var(--shadow-float)] backdrop-blur-[20px] backdrop-saturate-150 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* type pills double as the mockup's destination tabs */}
        <div className="flex gap-1 rounded-pill bg-ink/[0.06] p-1">
          {(["All", "Hotel"] as const).map((t) => {
            const on = type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={on}
                className={cn(
                  "rounded-pill px-4 py-2 text-[0.85rem] font-semibold transition",
                  on
                    ? "bg-surface text-ink shadow-[0_1px_2px_rgb(23_24_27/0.08),0_4px_12px_-4px_rgb(23_24_27/0.16)]"
                    : "text-ink-soft",
                )}
              >
                {t === "All" ? "Everything" : "Hotels"}
              </button>
            );
          })}
        </div>
        <span className="text-[0.8rem] text-ink-muted">
          {LISTINGS.length} places · distances from Kempston Hardwick
        </span>
      </div>

      <div className="grid gap-2 lg:grid-cols-[1.3fr_1.2fr_0.9fr_auto] lg:items-stretch">
        <Field icon="pin" label="Search">
          <input
            id="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bedford, Kempston, MK42…"
            className={fieldInput}
            aria-label="Search by name, town or postcode"
          />
        </Field>

        <Field icon="bed" label="Type">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "All")}
            className={cn(fieldInput, "cursor-pointer")}
          >
            <option value="All">All types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field icon="calendar" label="Order">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className={cn(fieldInput, "cursor-pointer")}
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </Field>

        <button type="submit" className="btn btn-primary btn-lg w-full lg:w-auto">
          View {results.length}
          <Icon name="route" className="size-4" />
        </button>
      </div>

      <p className="flex items-center justify-end gap-2 text-[0.8rem] text-ink-soft">
        <Icon name="check" className="size-3.5 text-accent" />
        Every entry shows its straight-line distance to the site
      </p>
    </form>
  );
}
