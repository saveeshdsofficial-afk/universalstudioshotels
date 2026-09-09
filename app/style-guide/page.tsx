import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/site";

/** Internal reference. Kept out of the index — see app/robots.ts too. */
export const metadata: Metadata = {
  title: "Brand & style guide",
  description:
    "Internal brand reference for the Universal Studios Hotels directory: colour tokens, type scale, buttons, surfaces and voice.",
  robots: { index: false, follow: false },
};

const SWATCHES: { name: string; token: string; use: string; className: string }[] = [
  {
    name: "Violet",
    token: "--brand-violet",
    use: "Primary. Headline accent, primary buttons, active states.",
    className: "bg-accent",
  },
  {
    name: "Violet ink",
    token: "--color-accent-ink",
    use: "Violet text on light backgrounds — passes contrast where the raw brand colour would not.",
    className: "bg-accent-ink",
  },
  {
    name: "Violet soft",
    token: "--color-accent-soft",
    use: "Chips, icon plates, quiet fills.",
    className: "bg-accent-soft",
  },
  {
    name: "Violet softer",
    token: "--color-accent-softer",
    use: "Section washes and the hero gradient.",
    className: "bg-accent-softer",
  },
  {
    name: "Amber",
    token: "--brand-amber",
    use: "Secondary. Editorial only — guide tags. Never a primary action.",
    className: "bg-warm",
  },
  {
    name: "Amber ink",
    token: "--color-warm-ink",
    use: "Amber text on the soft amber fill.",
    className: "bg-warm-ink",
  },
  {
    name: "Amber soft",
    token: "--color-warm-soft",
    use: "The tag background on guide cards.",
    className: "bg-warm-soft",
  },
];

const NEUTRALS: { name: string; token: string; className: string }[] = [
  { name: "Ink", token: "--color-ink", className: "bg-ink" },
  { name: "Ink soft", token: "--color-ink-soft", className: "bg-ink-soft" },
  { name: "Ink muted", token: "--color-ink-muted", className: "bg-ink-muted" },
  { name: "Line", token: "--color-line", className: "bg-line" },
  { name: "Line strong", token: "--color-line-strong", className: "bg-line-strong" },
  { name: "Background", token: "--color-bg", className: "bg-bg" },
  { name: "Background alt", token: "--color-bg-alt", className: "bg-bg-alt" },
  { name: "Footer", token: "--color-footer", className: "bg-footer" },
];

function Section({
  title,
  children,
  note,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-10">
      <h2 className="text-[clamp(1.4rem,3vw,1.9rem)]">{title}</h2>
      {note ? <p className="mt-2 max-w-[62ch] text-ink-muted">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function StyleGuide() {
  return (
    <main className="section-y">
      <div className="wrap grid gap-12">
        <header>
          <span className="eyebrow">Internal reference</span>
          <h1 className="mt-3.5 text-[clamp(2rem,5vw,2.8rem)]">
            {SITE.brand} — brand &amp; style
          </h1>
          <p className="mt-4 max-w-[66ch] text-[1.08rem] text-ink-muted">
            Every colour on the site derives from two values in{" "}
            <code className="font-mono text-[0.94em] text-accent-ink">
              app/globals.css
            </code>
            . Change those and the whole site follows — nothing is hand-tuned
            per component.
          </p>
        </header>

        <Section
          title="Brand colours"
          note="Violet carries the product; amber is editorial only. Keeping them in separate jobs is what stops the palette turning into confetti."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SWATCHES.map((s) => (
              <div key={s.token} className="card overflow-hidden">
                <div className={`h-20 ${s.className}`} />
                <div className="p-4">
                  <div className="font-semibold">{s.name}</div>
                  <code className="mt-0.5 block font-mono text-[0.8rem] text-ink-muted">
                    {s.token}
                  </code>
                  <p className="mt-2 text-[0.9rem] text-ink-soft">{s.use}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Neutrals"
          note="A cool-tinted slate rather than pure grey, so the neutrals sit under the violet without looking muddy."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NEUTRALS.map((n) => (
              <div key={n.token} className="card overflow-hidden">
                <div className={`h-14 ${n.className}`} />
                <div className="p-3">
                  <div className="text-[0.92rem] font-semibold">{n.name}</div>
                  <code className="font-mono text-[0.76rem] text-ink-muted">
                    {n.token}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Type"
          note="Geist for everything, Geist Mono for eyebrows, postcodes and distances — anything that reads as data rather than prose."
        >
          <div className="card grid gap-5 p-6">
            <div>
              <span className="eyebrow">Eyebrow — mono, tracked, uppercase</span>
              <h1 className="mt-3 text-[clamp(2.1rem,6.4vw,3.5rem)]">
                Heading one
              </h1>
            </div>
            <h2 className="text-[clamp(1.75rem,4.2vw,2.7rem)]">Heading two</h2>
            <h3 className="text-[1.22rem]">Heading three</h3>
            <p className="max-w-[62ch] text-ink-soft">
              Body copy runs at 16px on phones and 17px from the small
              breakpoint up, so iOS never zooms a focused input. Line height is
              1.65 and paragraphs are capped near 68 characters.
            </p>
            <p className="font-mono text-[0.86rem] text-ink-muted">
              MK42 7FY · 0.6 mi · mono for data
            </p>
          </div>
        </Section>

        <Section
          title="Buttons"
          note="Primary is violet and there is only ever one per view. Everything else is a ghost. Minimum target height is 44px."
        >
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary">
              <Icon name="key" className="size-[17px]" />
              Primary
            </button>
            <button type="button" className="btn btn-ghost">
              Ghost
            </button>
            <button type="button" className="btn btn-primary btn-lg">
              Primary large
            </button>
            <button type="button" className="btn btn-ghost btn-lg">
              Ghost large
            </button>
          </div>
        </Section>

        <Section
          title="Surfaces"
          note="One card treatment throughout: white, hairline border, 22px radius. Depth comes from three shadow tokens, never from heavier borders."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card p-5 shadow-[var(--shadow-soft)]">
              <div className="font-semibold">Soft</div>
              <code className="font-mono text-[0.8rem] text-ink-muted">
                --shadow-soft
              </code>
            </div>
            <div className="card p-5 shadow-[var(--shadow-mid)]">
              <div className="font-semibold">Mid</div>
              <code className="font-mono text-[0.8rem] text-ink-muted">
                --shadow-mid
              </code>
            </div>
            <div className="card p-5 shadow-[var(--shadow-tall)]">
              <div className="font-semibold">Tall</div>
              <code className="font-mono text-[0.8rem] text-ink-muted">
                --shadow-tall
              </code>
            </div>
          </div>
        </Section>

        <Section
          title="Voice"
          note="How the writing on this site is meant to sound."
        >
          <ul className="grid gap-3 text-ink-soft">
            <li>
              <strong className="text-ink">Plain and specific.</strong> &ldquo;0.6
              miles, straight line&rdquo; beats &ldquo;superbly located&rdquo;.
            </li>
            <li>
              <strong className="text-ink">Say what is not known.</strong> The
              opening date is not settled and the copy says so.
            </li>
            <li>
              <strong className="text-ink">No sales pressure.</strong> No
              countdowns, no &ldquo;only 2 left&rdquo;, no paid placement — and
              the site says that outright.
            </li>
            <li>
              <strong className="text-ink">Independence is stated, not implied.</strong>{" "}
              The masthead, the FAQ and the footer all carry it.
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
