import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KEYWORDS, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `Questions about staying near the ${SITE.park} site`,
  description:
    "Answers on the hotels closest to the Universal Studios UK site at Kempston Hardwick, how distances are measured, opening timing, parking and long-stay rates.",
  path: "/faq",
  keywords: [...KEYWORDS.core, ...KEYWORDS.intent],
});

export default function FaqPage() {
  return (
    <>
      {/* the full set lives here, so this page carries the full schema */}
      <JsonLd data={faqLd(SITE.faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Questions", path: "/faq" },
        ])}
      />
      <SiteHeader />

      <main id="top">
        <div className="wrap pt-10 sm:pt-14">
          <nav aria-label="Breadcrumb" className="text-[0.88rem] text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="text-ink-soft">Questions</span>
          </nav>
        </div>

        <Faq />

        <section className="section-y border-t border-line bg-bg-alt">
          <div className="wrap">
            <h2 className="text-[clamp(1.5rem,3.4vw,2rem)]">
              Still working it out?
            </h2>
            <p className="mt-3.5 max-w-[58ch] text-[1.08rem] text-ink-muted">
              The guides go further than these answers — how the roads behave,
              which town to base yourself in, and what to ask before booking a
              long stay.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/blog" className="btn btn-primary">
                Read the guides
              </Link>
              <Link href="/#listings" className="btn btn-ghost">
                See the directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
