import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { POSTS_BY_DATE } from "@/lib/posts";
import { BASE_URL, KEYWORDS, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: `Guides to staying near ${SITE.park}`,
  description:
    "Practical guides to accommodation near the Universal Studios UK site at Kempston Hardwick — where to stay, how to get there, and how to book a long stay well.",
  path: "/blog",
  keywords: [...KEYWORDS.core, ...KEYWORDS.intent],
});

export default function BlogIndex() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: POSTS_BY_DATE.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
        ])}
      />
      <SiteHeader />
      <main id="top">
        <section className="section-y">
          <div className="wrap">
            <h1 className="max-w-[20ch] text-[clamp(2rem,5.4vw,3rem)]">
              Staying near the Bedford site, explained
            </h1>
            <p className="mt-4 max-w-[60ch] text-[1.08rem] text-ink-muted">
              Everything we have worked out about accommodation around the
              Universal development at Kempston Hardwick — written for the
              people building it, and kept honest about what is still unknown.
            </p>

            <div className="mt-10 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
              {POSTS_BY_DATE.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            <div className="mt-12">
              <Link href="/" className="btn btn-ghost">
                Back to the directory
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
