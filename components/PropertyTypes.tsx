"use client";

import { useDirectory } from "./DirectoryProvider";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { RuleHead, SectionHead } from "./SectionHead";
import { PROPERTY_TYPES, countByType } from "@/lib/listings";
import { cn } from "@/lib/cn";

export function PropertyTypes() {
  const { browseType } = useDirectory();

  /* Deep bottom padding: the hotel grid below climbs back into this band. */
  return (
    <section id="types" className="noise bg-tint pt-20 pb-36 lg:pt-28 lg:pb-50">
      <div className="wrap">
        <Reveal>
          <RuleHead n="02" label="Where to stay" className="mb-6" />
          <SectionHead
            title="Choose a place by what your stay needs."
            sub="A room for a fortnight or a whole house for the crew. The list starts with hotels because those are the ones we could verify."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-3 xl:grid-cols-6">
          {PROPERTY_TYPES.map((t) => {
            const count = countByType(t.type);
            const empty = count === 0;
            const Tag = empty ? "a" : "button";

            return (
              <Reveal key={t.type} className="h-full">
                <Tag
                  {...(empty
                    ? { href: "#providers" }
                    : { type: "button" as const, onClick: () => browseType(t.type) })}
                  className={cn(
                    "flex h-full w-full flex-col gap-3 rounded-panel bg-surface p-2 pb-5 text-left transition duration-200 hover:-translate-y-1",
                    empty
                      ? "border border-dashed border-[#c9cbd2] bg-transparent opacity-80 hover:opacity-100"
                      : "shadow-[var(--shadow-raise)] hover:shadow-[0_2px_4px_rgb(23_24_27/0.05),0_24px_48px_-16px_rgb(31_75_255/0.28)]",
                  )}
                >
                  <div
                    className={cn(
                      "relative grid aspect-4/3 place-items-center rounded-card",
                      empty ? "bg-white/50" : "hatch",
                    )}
                  >
                    <Icon
                      name={t.icon}
                      className={cn(
                        "size-8",
                        empty ? "text-ink-muted/50" : "text-ink-muted/70",
                      )}
                    />
                    <span className="absolute top-3 left-3 rounded-pill bg-white/[0.92] px-2.5 py-1 text-[0.72rem] font-semibold">
                      {empty ? "None yet" : `${count} listed`}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 px-3">
                    <h3 className="text-[1.15rem]">{t.label}</h3>
                    <p className="text-[0.86rem] leading-snug text-ink-muted">
                      {t.blurb}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-accent-text">
                      {empty ? "Add yours" : "Browse"}
                      <Icon name="route" className="size-3.5" />
                    </span>
                  </div>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
