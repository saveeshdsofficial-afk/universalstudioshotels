import { Brand } from "./SiteHeader";
import { Icon } from "./Icon";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-footer pt-14 text-footer-text sm:pt-18 lg:pt-21">
      <div className="wrap">
        {/* 1 col on phones → 2 at tablet → brand + 3 link columns on desktop */}
        <div className="grid gap-8 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Brand tone="dark" />
            <p className="mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed">
              {SITE.footer.blurb}
            </p>
            <div className="mt-5 flex gap-2.5">
              {(["facebook", "instagram"] as const).map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name[0].toUpperCase() + name.slice(1)}
                  className="grid size-11 place-items-center rounded-[10px] border border-white/15 transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  <Icon name={name} className="size-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {SITE.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-3.5 font-mono text-[0.82rem] font-medium tracking-[0.1em] text-white uppercase">
                {col.title}
              </h2>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block py-2 text-[0.95rem] text-footer-text transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="py-6.5">
          <div className="flex items-start gap-3.5 rounded-card border border-white/10 bg-footer-raised p-5">
            <Icon
              name="alert"
              className="mt-0.5 size-5 shrink-0 text-[oklch(0.7_0.05_80)]"
            />
            <p className="text-[0.9rem] leading-relaxed">
              <b className="font-semibold text-white">
                Independent directory — not an official site.
              </b>{" "}
              {SITE.disclaimer}
            </p>
          </div>
        </div>

        <div className="safe-b flex flex-col gap-4 pt-6 pb-10 text-[0.88rem] text-footer-dim sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.brand} {SITE.brandSub}. An
            independent accommodation directory.
          </span>
          <div className="flex flex-wrap gap-x-5.5 gap-y-2">
            {["Privacy", "Cookies", "Terms", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#"
                className="inline-flex min-h-11 items-center transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
