"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-y">
      <div className="wrap grid items-start gap-9 md:grid-cols-[0.7fr_1.3fr] md:gap-12 lg:gap-18">
        <Reveal>
          <span className="eyebrow">Good to know</span>
          <h2 className="mt-3.5 text-[clamp(1.75rem,4.2vw,2.7rem)]">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-[32ch] text-ink-muted">
            Can&rsquo;t find an answer?{" "}
            <a
              href="#"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              Get in touch
            </a>{" "}
            and we&rsquo;ll help.
          </p>
        </Reveal>

        <Reveal className="border-t border-line">
          {SITE.faq.map((item, i) => {
            const open = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;

            return (
              <div key={item.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[1.05rem] font-medium text-ink sm:gap-5 sm:text-[1.12rem]"
                  >
                    <span>{item.q}</span>
                    <span
                      className={cn(
                        "grid size-7.5 shrink-0 place-items-center rounded-[9px] border transition-colors duration-250",
                        open
                          ? "border-accent bg-accent text-on-accent"
                          : "border-line-strong text-accent-ink",
                      )}
                    >
                      <Icon
                        name="plus"
                        className={cn(
                          "size-4 transition-transform duration-250",
                          open && "rotate-45",
                        )}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn("collapse-grid", open && "collapse-open")}
                >
                  <div>
                    <p className="pb-6 text-[1.02rem] text-ink-soft sm:pr-12">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
