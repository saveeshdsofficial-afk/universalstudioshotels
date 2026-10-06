import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { MAIL, SITE } from "@/lib/site";

/* Takes the newsletter slot from the reference. We have no mailing list, and
   a form that goes nowhere is worse than none — this is the real action. */
export function ProviderCta() {
  const { providers } = SITE;

  return (
    <section id="providers" className="section-y bg-bg">
      <div className="wrap">
        <Reveal>
          <div className="noise grid gap-10 rounded-panel border border-tint-line bg-tint p-8 shadow-[0_1px_2px_rgb(23_24_27/0.04),0_24px_56px_-28px_rgb(31_75_255/0.35)] sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
            <div className="flex flex-col gap-4">
              <span className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-accent-ink">
                For owners
              </span>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] leading-none">
                {providers.h2}
              </h2>
              <p className="serif text-[clamp(1rem,1.6vw,1.13rem)] text-ink-soft">
                {providers.lede}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <ul className="grid gap-3">
                {providers.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Icon name="check" className="size-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <a href={MAIL.listing} className="btn btn-dark btn-lg mt-2 w-full sm:w-auto">
                {providers.cta}
                <Icon name="route" className="size-4" />
              </a>
              <span className="text-[0.82rem] text-ink-muted">
                Free to list. No commission on anything you take.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
