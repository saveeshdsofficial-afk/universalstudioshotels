import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

/** Shared shell for the trust pages, so they cannot drift apart. */
export function LegalPage({
  title,
  intro,
  path,
  updated,
  children,
}: {
  title: string;
  intro: string;
  path: string;
  /** ISO date this page was last reviewed. */
  updated: string;
  children: React.ReactNode;
}) {
  const shown = new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <SiteHeader />
      <main id="top">
        <article className="section-y">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="text-[0.88rem] text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span aria-hidden="true" className="px-2">
                /
              </span>
              <span className="text-ink-soft">{title}</span>
            </nav>

            <header className="mt-6 max-w-[68ch]">
              <h1 className="text-[clamp(1.9rem,5vw,2.9rem)]">{title}</h1>
              <p className="mt-4 text-[1.12rem] text-ink-soft">{intro}</p>
              <p className="mt-3 text-[0.86rem] text-ink-muted">
                Last reviewed{" "}
                <time dateTime={updated}>{shown}</time>
              </p>
            </header>

            <div className="prose mt-8">{children}</div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
