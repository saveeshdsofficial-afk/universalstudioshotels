"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { LISTINGS } from "@/lib/listings";
import type { Listing, PropertyType, SortKey } from "@/lib/types";

interface DirectoryValue {
  query: string;
  setQuery: (v: string) => void;
  type: PropertyType | "All";
  setType: (v: PropertyType | "All") => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  results: Listing[];
  reset: () => void;
  /** Jump to the results and apply a type in one action. */
  browseType: (v: PropertyType) => void;
}

const DirectoryContext = createContext<DirectoryValue | null>(null);

const SORTERS: Record<SortKey, (a: Listing, b: Listing) => number> = {
  nearest: (a, b) => a.miles - b.miles,
  name: (a, b) => a.name.localeCompare(b.name, "en-GB"),
};

export function DirectoryProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PropertyType | "All">("All");
  const [sort, setSort] = useState<SortKey>("nearest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LISTINGS.filter((l) => {
      if (type !== "All" && l.type !== type) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.town.toLowerCase().includes(q) ||
        l.postcode.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q) ||
        l.blurb.toLowerCase().includes(q)
      );
    }).sort(SORTERS[sort]);
  }, [query, type, sort]);

  const value = useMemo<DirectoryValue>(
    () => ({
      query,
      setQuery,
      type,
      setType,
      sort,
      setSort,
      results,
      reset: () => {
        setQuery("");
        setType("All");
        setSort("nearest");
      },
      browseType: (v) => {
        setType(v);
        document
          .getElementById("listings")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [query, type, sort, results],
  );

  return <DirectoryContext value={value}>{children}</DirectoryContext>;
}

export function useDirectory() {
  const ctx = useContext(DirectoryContext);
  if (!ctx)
    throw new Error("useDirectory must be used inside <DirectoryProvider>");
  return ctx;
}
