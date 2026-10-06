import Link from "next/link";
import { ListingCard } from "./ListingCard";
import { Reveal } from "./Reveal";
import { RuleHead } from "./SectionHead";
import { LISTINGS } from "@/lib/listings";
import { AFFILIATE_NOTE } from "@/lib/affiliate";

const CLOSEST = [...LISTINGS].sort((a, b) => a.miles - b.miles).slice(0, 3);

export function ClosestListings() {
  return (
    <section className="section-y bg-surface">
      <div className="wrap">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <RuleHead
              n="02"
              label="Our closest picks"
              className="min-w-[min(100%,22rem)] flex-1"
            />
            <span className="text-[0.82rem] text-ink-muted">
              Ranked by distance · checked against the postcode database
            </span>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLOSEST.map((l, i) => (
            <Reveal key={l.slug} className="h-full">
              <ListingCard listing={l} priority={i < 3} />
            </Reveal>
          ))}
        </div>

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
