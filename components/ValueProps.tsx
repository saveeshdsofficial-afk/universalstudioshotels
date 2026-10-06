import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { RuleHead, SectionHead } from "./SectionHead";
import { SITE } from "@/lib/site";

export function ValueProps() {
  return (
    <section className="section-y bg-surface">
      <div className="wrap">
        <Reveal>
          <RuleHead n="05" label="Why this list" className="mb-6" />
          <SectionHead title="Put together for people working on site" />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {SITE.valueProps.map((p) => (
            <Reveal
              key={p.title}
              className="card h-full p-7 transition duration-200 hover:-translate-y-1"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-card bg-tint text-accent-ink">
                <Icon name={p.icon} className="size-[25px]" />
              </div>
              <h3 className="text-[1.3rem]">{p.title}</h3>
              <p className="mt-2.5 text-[0.95rem] text-ink-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
