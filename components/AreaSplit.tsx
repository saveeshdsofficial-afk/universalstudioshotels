import Link from "next/link";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { RuleHead } from "./SectionHead";

/**
 * 04 — the reference's "two resorts, two very different trips".
 *
 * There is only one site here, so the split is the real choice people face:
 * sit on the doorstep, or take the town. Card one gets the arch crop, card
 * two the offset blue frame, exactly as the reference pairs them.
 */
const AREAS = [
  {
    eyebrow: "Under 1 mile · the doorstep",
    title: "Kempston & Elstow",
    body: "Right by the A421 junction. The shortest possible run in, and it is not close — but you will drive for anything beyond a pub and a shop.",
    links: [
      { label: "Where to stay near the site", href: "/blog/where-to-stay-near-universal-studios-uk" },
      { label: "Which town to base yourself in", href: "/blog/bedford-area-guide-where-to-base-yourself" },
      { label: "See the closest hotels", href: "/#listings" },
    ],
  },
  {
    eyebrow: "2–3 miles · the town",
    title: "Central Bedford",
    body: "A proper town: the Embankment, somewhere to eat that is not the hotel bar, and fast trains to St Pancras. The cost is crossing Bedford at eight in the morning.",
    links: [
      { label: "Getting to the site by road and rail", href: "/blog/getting-to-the-universal-uk-site" },
      { label: "Cutting the cost of a long stay", href: "/blog/cutting-the-cost-of-a-long-stay" },
      { label: "Browse Bedford hotels", href: "/#listings" },
    ],
  },
];

export function AreaSplit() {
  return (
    <section className="section-y border-t border-line bg-bg">
      <div className="wrap">
        <Reveal>
          <RuleHead
            n="04"
            label="Two ways to base yourself"
            className="mb-12"
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {AREAS.map((a, i) => (
            <Reveal key={a.title} className="h-full">
              <div className="grid h-full gap-8 rounded-panel border border-line bg-surface p-7 shadow-[var(--shadow-raise)] sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10 sm:p-10">
                {i === 0 ? (
                  /* arch crop, with the circle breaking its edge */
                  <div className="relative">
                    <div className="hatch-blue h-56 rounded-t-full rounded-b-card shadow-[inset_0_0_0_1px_rgb(23_24_27/0.04)] sm:h-[22rem]" />
                    <div className="hatch absolute -right-5 bottom-5 size-24 rounded-full shadow-[0_0_0_6px_#fff,0_12px_24px_-8px_rgb(23_24_27/0.3)]" />
                  </div>
                ) : (
                  /* offset blue frame behind the image */
                  <div className="relative pr-4 pb-4">
                    <div className="absolute inset-y-4 right-0 left-4 rounded-card border-[1.5px] border-accent" />
                    <div className="hatch relative h-56 rounded-card shadow-[0_12px_24px_-12px_rgb(23_24_27/0.25)] sm:h-[21.5rem]" />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <span className="text-[0.72rem] font-bold tracking-[0.16em] text-accent-ink uppercase">
                    {a.eyebrow}
                  </span>
                  <h3 className="text-[clamp(1.6rem,3.2vw,2.75rem)] leading-none">
                    {a.title}
                  </h3>
                  <p className="serif text-[clamp(1rem,1.5vw,1.13rem)] text-ink-soft">
                    {a.body}
                  </p>

                  <div className="mt-2 flex flex-col border-t border-line">
                    {a.links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        className="flex items-center justify-between gap-4 border-b border-line py-3.5 text-[0.95rem] font-semibold hover:text-accent"
                      >
                        {l.label}
                        <Icon name="route" className="size-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
