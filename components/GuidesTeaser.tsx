import Link from "next/link";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { RuleHead } from "./SectionHead";
import { POSTS_BY_DATE, formatPostDate } from "@/lib/posts";

const [lead, ...rest] = POSTS_BY_DATE;
const side = rest.slice(0, 2);

/** 03 — one big guide, two beside it, and the independence note. */
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

        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="group block">
              <div className="hatch-blue relative grid h-[clamp(16rem,38vw,34rem)] place-items-center rounded-panel">
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  <span className="rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.75rem] font-semibold">
                    {lead.tag}
                  </span>
                  <span className="rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.75rem] font-semibold">
                    {lead.readingMinutes} min read
                  </span>
                  <span className="rounded-pill bg-dark px-3 py-1.5 text-[0.75rem] font-semibold text-white">
                    Updated 2026
                  </span>
                </div>
                <Icon name="bed" className="size-14 text-accent/20" />
              </div>

              {/* the card lifts over the image, as in the reference */}
              <div className="relative z-10 mx-4 -mt-12 flex flex-col gap-4 rounded-card bg-surface p-6 shadow-[var(--shadow-card)] transition duration-200 group-hover:-translate-y-1 sm:mx-8 sm:p-10 lg:-mt-20 lg:ml-16">
                <h2 className="text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.02]">
                  {lead.title}
                </h2>
                <p className="serif text-[clamp(1rem,1.6vw,1.17rem)] text-ink-soft">
                  {lead.description}
                </p>
                <span className="inline-flex items-center gap-2 pt-1 text-[0.95rem] font-bold">
                  Read the guide
                  <Icon name="route" className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-5">
            {side.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="grid grid-cols-[6.5rem_1fr] gap-5 rounded-card border border-line bg-surface p-4 shadow-[var(--shadow-raise)] transition duration-200 hover:-translate-y-1 sm:grid-cols-[10.5rem_1fr]"
                >
                  <div className="hatch grid aspect-square place-items-center rounded-sm">
                    <Icon name="route" className="size-6 text-ink-muted/60" />
                  </div>
                  <div className="flex flex-col gap-2 py-1 pr-1">
                    <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-ink">
                      {p.tag}
                    </span>
                    <h3 className="text-[clamp(1rem,1.8vw,1.35rem)]">
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
                <div className="hatch size-16 shrink-0 rounded-full shadow-[0_0_0_4px_#fff,0_6px_16px_-6px_rgb(23_24_27/0.25)]" />
                <p className="serif text-[1.02rem] italic text-ink-soft">
                  &ldquo;No hotel can buy a place on this list, or a higher
                  one.&rdquo;
                  <span className="mt-1 block font-sans text-[0.8rem] not-italic text-ink-muted">
                    How the ordering works — see About
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
