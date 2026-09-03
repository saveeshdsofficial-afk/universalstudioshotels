import Image from "next/image";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SearchPanel } from "./SearchPanel";
import { SITE } from "@/lib/site";
import { LISTINGS } from "@/lib/listings";

const nearest = Math.min(...LISTINGS.map((l) => l.miles));
const [headline, headlineAccent] = SITE.hero.h1;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 md:pt-20 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_75%_0%,var(--color-accent-softer),transparent_70%)]"
      />

      <div className="wrap relative">
        {/* copy and artwork sit side by side once there is room */}
        <div className="grid items-center gap-9 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-16">
          <Reveal>
            <h1 className="text-[clamp(2.1rem,6.4vw,3.5rem)]">
              {headline}
              <span className="text-accent-ink">{headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,1.7vw,1.24rem)] text-ink-soft">
              {SITE.hero.lede}
            </p>
          </Reveal>

          <Reveal>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-panel shadow-[var(--shadow-tall)] ring-1 ring-line">
              <Image
                src="/images/hero.jpg"
                alt="Illustration of hotels and houses along a road leading to the Bedford site"
                fill
                priority
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 sm:mt-10">
          <SearchPanel />
        </Reveal>

        <Reveal className="mt-6">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.92rem] text-ink-muted">
            <li className="flex items-center gap-2">
              <Icon name="bed" className="size-4 text-accent-ink" />
              <b className="font-semibold text-ink">{LISTINGS.length}</b>
              properties listed
            </li>
            <li className="flex items-center gap-2">
              <Icon name="route" className="size-4 text-accent-ink" />
              nearest is
              <b className="font-semibold text-ink">{nearest} miles</b>
              from the site
            </li>
            <li className="flex items-center gap-2">
              <Icon name="shield" className="size-4 text-accent-ink" />
              independent &amp; commission-free
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
