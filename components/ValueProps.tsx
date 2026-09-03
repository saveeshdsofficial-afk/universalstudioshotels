import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { SITE } from "@/lib/site";

export function ValueProps() {
  return (
    <section className="section-y border-y border-line bg-bg-alt">
      <div className="wrap">
        <Reveal>
          <SectionHead
            eyebrow="Why bother with us"
            title="Put together for people working on site"
            className="mb-0"
          />
        </Reveal>

        <div className="mt-9 grid gap-5.5 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {SITE.valueProps.map((p) => (
            <Reveal
              key={p.title}
              className="card p-7 transition duration-200 hover:-translate-y-1 hover:border-accent-ring hover:shadow-[var(--shadow-mid)]"
            >
              <div className="mb-5 grid size-13 place-items-center rounded-[14px] bg-accent-soft text-accent-ink">
                <Icon name={p.icon} className="size-[25px]" />
              </div>
              <h3 className="text-[1.22rem]">{p.title}</h3>
              <p className="mt-2.5 text-ink-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
