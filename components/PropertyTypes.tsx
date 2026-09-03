"use client";

import { useDirectory } from "./DirectoryProvider";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { PROPERTY_TYPES, countByType } from "@/lib/listings";
import { cn } from "@/lib/cn";

export function PropertyTypes() {
  const { browseType } = useDirectory();

  return (
    <section id="types" className="section-y border-y border-line bg-bg-alt">
      <div className="wrap">
        <Reveal>
          <SectionHead
            eyebrow="What suits the job"
            title="Pick the kind of place you need"
            sub="The list starts with hotels because those are the ones we could verify. The other categories open up as owners add their own places."
            className="mb-0"
          />
        </Reveal>

        {/* 2 up on phones, 3 at tablet, 6 across on desktop */}
        <div className="mt-9 grid grid-cols-2 gap-3.5 sm:mt-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {PROPERTY_TYPES.map((t) => {
            const count = countByType(t.type);
            const empty = count === 0;

            /* An empty category says so and points at the listing form,
               rather than filtering to a blank page. */
            return (
              <Reveal key={t.type} className="h-full">
                {empty ? (
                  <a
                    href="#providers"
                    className="card flex h-full w-full flex-col items-start border-dashed p-4 text-left opacity-70 transition duration-200 hover:opacity-100 sm:p-5"
                  >
                    <span className="grid size-11 place-items-center rounded-[12px] bg-bg-alt text-ink-muted">
                      <Icon name={t.icon} className="size-[22px]" />
                    </span>
                    <span className="mt-3.5 font-semibold text-ink-soft">
                      {t.label}
                    </span>
                    <span className="mt-1 text-[0.86rem] text-ink-muted">
                      {t.blurb}
                    </span>
                    <span className="mt-3 rounded-pill border border-dashed border-line-strong px-2.5 py-1 text-[0.78rem] text-ink-muted">
                      None yet — add one
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => browseType(t.type)}
                    className={cn(
                      "card flex h-full w-full flex-col items-start p-4 text-left transition duration-200",
                      "hover:-translate-y-1 hover:border-accent-ring hover:shadow-[var(--shadow-mid)] sm:p-5",
                    )}
                  >
                    <span className="grid size-11 place-items-center rounded-[12px] bg-accent-soft text-accent-ink">
                      <Icon name={t.icon} className="size-[22px]" />
                    </span>
                    <span className="mt-3.5 flex items-center gap-1 font-semibold">
                      {t.label}
                      <span aria-hidden="true" className="text-accent-ink">
                        →
                      </span>
                    </span>
                    <span className="mt-1 text-[0.86rem] text-ink-muted">
                      {t.blurb}
                    </span>
                    <span className="mt-3 rounded-pill bg-accent-soft px-2.5 py-1 text-[0.78rem] font-medium text-accent-ink">
                      {count} listed
                    </span>
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
