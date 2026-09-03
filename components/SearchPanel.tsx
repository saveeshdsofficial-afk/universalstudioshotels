"use client";

import { useDirectory } from "./DirectoryProvider";
import { Icon } from "./Icon";
import { ALL_TYPES } from "@/lib/listings";
import type { PropertyType, SortKey } from "@/lib/types";

const SORT_LABELS: Record<SortKey, string> = {
  nearest: "Closest to the site",
  name: "Name A–Z",
};

const fieldClass =
  "min-h-11 w-full rounded-card border border-line bg-surface px-3.5 text-[0.95rem] text-ink outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent-ring";

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
      className="card p-4 shadow-[var(--shadow-mid)] sm:p-5"
    >
      {/* stacks on phones, becomes a single row once there is width */}
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1.2fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="q"
            className="mb-1.5 block text-[0.82rem] font-medium text-ink-soft"
          >
            Search by name or place
          </label>
          <div className="relative">
            <Icon
              name="pin"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted"
            />
            <input
              id="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Bedford, Kempston, MK42…"
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-1.5 block text-[0.82rem] font-medium text-ink-soft"
          >
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "All")}
            className={fieldClass}
          >
            <option value="All">All types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="mb-1.5 block text-[0.82rem] font-medium text-ink-soft"
          >
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className={fieldClass}
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full lg:w-auto">
          <Icon name="check" className="size-4" />
          View {results.length}
          <span className="lg:hidden"> matching stays</span>
        </button>
      </div>
    </form>
  );
}
