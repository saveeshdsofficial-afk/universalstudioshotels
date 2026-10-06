import Link from "next/link";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { RuleHead } from "./SectionHead";
import { POSTS_BY_DATE, formatPostDate } from "@/lib/posts";

const [lead, ...rest] = POSTS_BY_DATE;
const side = rest.slice(0, 2);

/**
 * 03 — Featured guides, matching the reference geometry.
 *
 * Two things carry this layout and both are fragile, so they are spelled out:
 *
 *   1. The hero image bleeds off the left edge of the viewport.
 *      `ml-[calc(50%-50vw)]` does it from inside the centred container:
 *      the element's left offset is (100vw - W)/2, and adding W/2 - 50vw
 *      cancels exactly to 0. Its left corners go square so the crop reads
 *      as intentional. Only from lg up — below that it is a plain card.
 *
 *   2. The white card climbs 160px back over the image, sits 200px in from
 *      the left, and overhangs the column by 48px on the right. Those three
 *      numbers are what make it look placed rather than stacked.
 */
export function GuidesTeaser() {
  return (
    <section id="guides" className="section-y bg-bg">
      <div className="wrap">
        <Reveal>
          <RuleHead
            n="03"
            label="Featured guides"
            link={{ href: "/blog", label: "All guides" }}
            className="mb-10"
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="hatch-blue bleed-left relative grid h-[clamp(17rem,44vw,37.5rem)] place-items-center rounded-panel">
                {/* 24px inside the visible edge once the image has bled left */}
                <div className="absolute top-4 right-4 left-4 flex flex-wrap gap-2 sm:top-5 sm:right-auto sm:left-5 lg:left-[calc(var(--bleed)+1.5rem)]">
                  <span className="rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.75rem] font-semibold shadow-[0_1px_2px_rgb(23_24_27/0.08)]">
                    {lead.tag}
                  </span>
                  <span className="rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.75rem] font-semibold shadow-[0_1px_2px_rgb(23_24_27/0.08)]">
                    {lead.readingMinutes} min read
                  </span>
                  <span className="rounded-pill bg-dark px-3 py-1.5 text-[0.75rem] font-semibold text-white">
                    Updated 2026
                  </span>
                </div>

                <span className="absolute right-4 bottom-4 rounded-sm bg-white/90 px-2 py-1 font-mono text-[0.65rem] font-medium sm:top-5 sm:right-5 sm:bottom-auto">
                  illustration · not a photo
                </span>

                <Icon name="bed" className="size-16 text-accent/15" />
              </div>

              <div className="relative z-10 -mt-20 ml-6 flex flex-col gap-4 rounded-card bg-surface p-7 shadow-[var(--shadow-card)] transition duration-200 group-hover:-translate-y-[3px] sm:ml-12 sm:p-10 lg:-mt-40 lg:ml-50 lg:-mr-12">
                <h2 className="text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.02]">
                  {lead.title}
                </h2>
                <p className="serif text-[clamp(1rem,1.5vw,1.19rem)] text-ink-soft">
                  {lead.description}
                </p>
                <span className="inline-flex items-center gap-2 pt-2 text-[0.95rem] font-bold">
                  Read the guide
                  <Icon name="route" className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-6 lg:pt-6">
            {side.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="grid grid-cols-[6rem_minmax(0,1fr)] gap-5 rounded-card border border-line bg-surface p-4 shadow-[var(--shadow-raise)] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgb(23_24_27/0.05),0_20px_40px_-16px_rgb(23_24_27/0.22)] sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-6"
                >
                  <div className="hatch grid aspect-square place-items-center rounded-sm">
                    <Icon name="route" className="size-6 text-ink-muted/60" />
                  </div>
                  <div className="flex flex-col gap-2 py-2 pr-2">
                    <span className="text-[0.72rem] font-bold tracking-[0.14em] text-accent-ink uppercase">
                      {p.tag}
                    </span>
                    <h3 className="text-[clamp(1rem,1.7vw,1.44rem)]">
                      {p.title}
                    </h3>
                    <span className="mt-auto text-[0.8rem] text-ink-muted">
                      {p.readingMinutes} min read · {formatPostDate(p.date)}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal>
              <div className="flex items-center gap-4 rounded-card border border-dashed border-[#c9cbd2] p-6">
                <div className="hatch size-18 shrink-0 rounded-full shadow-[0_0_0_4px_#fff,0_6px_16px_-6px_rgb(23_24_27/0.25)]" />
                <p className="serif text-[1.06rem] text-ink-soft italic">
                  &ldquo;No hotel can buy a place on this list, or a higher
                  one.&rdquo;
                  <span className="mt-1 block font-sans text-[0.82rem] text-ink-muted not-italic">
                    How the ordering works — see{" "}
                    <Link href="/about" className="underline underline-offset-2">
                      About
                    </Link>
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
