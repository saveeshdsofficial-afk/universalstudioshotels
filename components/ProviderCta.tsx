import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SITE } from "@/lib/site";
import { LISTINGS } from "@/lib/listings";

export function ProviderCta() {
  const { providers } = SITE;

  return (
    <section id="providers" className="section-y border-y border-line bg-bg-alt">
      <div className="wrap">
        <Reveal>
          <div className="card overflow-hidden bg-[linear-gradient(135deg,var(--color-accent-softer),var(--color-surface))]">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:p-12">
              <div>
                <span className="eyebrow">{providers.eyebrow}</span>
                <h2 className="mt-3.5 text-[clamp(1.6rem,3.6vw,2.3rem)]">
                  {providers.h2}
                </h2>
                <p className="mt-4 max-w-[46ch] text-[1.06rem] text-ink-soft">
                  {providers.lede}
                </p>

                <ul className="mt-6 grid gap-3">
                  {providers.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-ink-soft"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px] bg-accent-soft text-accent-ink">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href="#" className="btn btn-primary btn-lg">
                    <Icon name="key" className="size-[17px]" />
                    {providers.cta}
                  </a>
                  <a href="#faq" className="btn btn-ghost btn-lg">
                    How listing works
                  </a>
                </div>
              </div>

              {/* two plain numbers carry more weight here than a stock photo */}
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                {[
                  {
                    icon: "bed" as const,
                    big: `${LISTINGS.length}`,
                    sm: "properties listed",
                  },
                  {
                    icon: "route" as const,
                    big: "0.9 mi",
                    sm: "closest to the site",
                  },
                  {
                    icon: "percent" as const,
                    big: "0%",
                    sm: "commission taken",
                  },
                  {
                    icon: "calendar" as const,
                    big: "Weekly",
                    sm: "and monthly rates",
                  },
                ].map((stat) => (
                  <div
                    key={stat.sm}
                    className="rounded-card border border-line bg-surface p-4 sm:p-5"
                  >
                    <span className="grid size-10 place-items-center rounded-[11px] bg-accent-soft text-accent-ink">
                      <Icon name={stat.icon} className="size-5" />
                    </span>
                    <div className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em]">
                      {stat.big}
                    </div>
                    <div className="text-[0.84rem] text-ink-muted">
                      {stat.sm}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
