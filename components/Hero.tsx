import Image from "next/image";
import { SearchPanel } from "./SearchPanel";
import { HERO_CREDIT, SITE } from "@/lib/site";

const [headline, headlineAccent] = SITE.hero.h1;

export function Hero() {
  return (
    <>
      <section className="relative isolate flex min-h-[clamp(26rem,62vh,44rem)] items-end overflow-hidden pt-16 pb-24 sm:pb-28 lg:min-h-[42rem] lg:pb-44">
        <Image
          src="/images/hero.jpg"
          alt={HERO_CREDIT.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* dark at the top for the sticky header, dark at the foot for the copy */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_24_27/0.55)_0%,rgb(23_24_27/0.28)_26%,rgb(23_24_27/0.52)_58%,rgb(23_24_27/0.92)_100%)]"
        />
        {/* a second, softer pass keeps the copy legible over the bright sky */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_20%_80%,rgb(23_24_27/0.55)_0%,rgb(23_24_27/0)_70%)]"
        />

        <div className="wrap relative text-white">
          <div className="flex max-w-[56rem] flex-col gap-5">
            <div className="flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
              <span className="h-px w-8 bg-white" />
              {SITE.region} · {SITE.park}
            </div>

            <h1 className="text-[clamp(2.3rem,6.6vw,4.75rem)] leading-[0.95] drop-shadow-[0_2px_24px_rgb(23_24_27/0.4)]">
              {/* no manual break — text-wrap:balance distributes the lines */}
              {headline}
              {headlineAccent}
            </h1>

            <p className="serif max-w-[36rem] text-[clamp(1.02rem,1.9vw,1.3rem)] text-[#f1f1f3] drop-shadow-[0_1px_12px_rgb(23_24_27/0.5)]">
              {SITE.hero.lede}
            </p>
          </div>
        </div>
      </section>

      {/* the panel lifts into the hero rather than sitting under it */}
      <div className="wrap relative z-10 -mt-16 sm:-mt-20 lg:-mt-28">
        <SearchPanel />
      </div>

      <p className="wrap mt-3 text-[0.72rem] text-ink-muted">
        Photo:{" "}
        <a
          href={HERO_CREDIT.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {HERO_CREDIT.title}
        </a>{" "}
        by {HERO_CREDIT.author},{" "}
        <a
          href={HERO_CREDIT.licenceUrl}
          target="_blank"
          rel="noopener noreferrer license"
          className="underline underline-offset-2"
        >
          {HERO_CREDIT.licence}
        </a>
        . Bedford town centre, about two miles from the site.
      </p>
    </>
  );
}
