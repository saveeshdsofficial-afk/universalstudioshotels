"use client";

import { ListingCard } from "./ListingCard";
import { Reveal } from "./Reveal";
import { LISTINGS } from "@/lib/listings";

/* Editorial only: the nearest few by the distance we computed. Nobody pays
   to appear here — there is no paid placement on this site. */
const CLOSEST = [...LISTINGS].sort((a, b) => a.miles - b.miles).slice(0, 6);

export function ClosestListings() {
  return (
    <section className="section-y">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[640px]">
              <span className="eyebrow">Nearest first</span>
              <h2 className="mt-3.5 text-[clamp(1.75rem,4.2vw,2.7rem)]">
                Closest to the site
              </h2>
              <p className="mt-3.5 text-[1.08rem] text-ink-muted">
                Ranked by straight-line distance from Kempston Hardwick. No one
                pays to appear here.
              </p>
            </div>
            <a href="#listings" className="btn btn-ghost">
              See the whole list
            </a>
          </div>
        </Reveal>

        {/*
          A scroll-snapping rail on phones (thumb-friendly, no cramped cards)
          that becomes a plain grid once there is room for three across.
        */}
        <div
          className="-mx-(--wrap-pad) mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-(--wrap-pad) pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5.5 lg:overflow-visible lg:px-0 lg:pb-0"
          style={{ scrollbarWidth: "thin" }}
        >
          {CLOSEST.map((l, i) => (
            <div
              key={l.slug}
              className="w-[78vw] max-w-[330px] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
            >
              <ListingCard listing={l} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
