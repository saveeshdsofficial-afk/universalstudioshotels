import { LISTINGS } from "@/lib/listings";

const nearest = Math.min(...LISTINGS.map((l) => l.miles));

/* Four plain numbers. Each is true and checkable — see /about. */
const STATS = [
  { big: `${LISTINGS.length}`, small: "properties, each postcode-verified" },
  { big: `${nearest} mi`, small: "from the closest to the site" },
  { big: "0", small: "paid placements, ever" },
  { big: "Free", small: "to use, and to be listed" },
];

export function TrustStrip() {
  return (
    <section className="wrap pt-12 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
      <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.small}
            className="flex flex-col gap-1 border-l border-line px-4 sm:px-6 lg:px-8"
          >
            <span className="font-display text-[clamp(1.6rem,4vw,2.25rem)] leading-tight font-extrabold tracking-[-0.04em]">
              {s.big}
            </span>
            <span className="text-[0.86rem] text-ink-muted">{s.small}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
