import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { AFFILIATE_REL, bookingSearchUrl } from "@/lib/affiliate";

const STEPS = [
  {
    n: "01",
    title: "Work out your radius",
    desc: "Everything within four miles is a short run in. Past ten, you should be getting a better rate or a better room for the drive.",
  },
  {
    n: "02",
    title: "Pick the shape of the stay",
    desc: "A room for a fortnight, a whole house for a crew. Parking, laundry and an early breakfast matter more than star ratings on a long stay.",
  },
  {
    n: "03",
    title: "Ring them, then book",
    desc: "Weekly and monthly rates are negotiated, not published. Call first, then lock it in — most rooms still have free cancellation.",
  },
];

export function PlanSteps() {
  return (
    <section className="section-y relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_85%_0%,rgb(31_75_255/0.22)_0%,rgb(31_75_255/0)_60%)]"
      />
      <div className="wrap relative">
        <Reveal>
          <div className="rule-head mb-6 [&::after]:bg-white/15">
            <span className="rule-num !text-accent-on-dark">06</span>
            <span className="rule-label text-on-dark">Plan your trip</span>
          </div>
          <h2 className="mb-12 max-w-[50rem] text-[clamp(2rem,6vw,4.5rem)] leading-[0.96] lg:mb-16">
            Three steps from idea to booked.
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <Reveal key={s.n} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-panel border border-white/12 bg-[linear-gradient(180deg,rgb(255_255_255/0.07),rgb(255_255_255/0.02))] p-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
                <span
                  className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none font-extrabold tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1.5px #8FA6FF" }}
                >
                  {s.n}
                </span>
                <h3 className="text-[clamp(1.2rem,2.4vw,1.75rem)]">{s.title}</h3>
                <p className="text-[0.98rem] leading-relaxed text-on-dark-dim">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5 lg:mt-16">
          <a
            href={bookingSearchUrl("hotels near Kempston Hardwick, Bedford")}
            target="_blank"
            rel={AFFILIATE_REL}
            className="btn btn-primary btn-lg"
          >
            Search hotels
            <span className="btn-chip">Booking.com</span>
            <Icon name="route" className="size-4" />
          </a>
          <span className="flex items-center gap-2 text-[0.9rem] text-on-dark">
            <Icon name="check" className="size-3.5 text-accent-on-dark" />
            Opens Booking.com in a new tab
          </span>
        </div>
      </div>
    </section>
  );
}
