import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { POSTS, POSTS_BY_DATE, formatPostDate, getPost } from "@/lib/posts";
import type { Block } from "@/lib/posts";
import { BASE_URL, breadcrumbLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.metaTitle,
    absoluteTitle: true,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
  });
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose mt-8">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            );
          case "note":
            /* pulled out of the accent family so it reads as an aside */
            return (
              <aside
                key={i}
                className="flex gap-3 rounded-card border border-accent-ring bg-accent-softer p-4 sm:p-5"
              >
                <Icon
                  name="alert"
                  className="mt-0.5 size-4.5 shrink-0 text-accent-ink"
                />
                <p className="!text-[0.96rem] !text-accent-ink">{b.text}</p>
              </aside>
            );
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </div>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS_BY_DATE.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-GB",
    keywords: post.keywords.join(", "),
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    image: `${BASE_URL}/og.jpg`,
    author: { "@type": "Organization", name: SITE.brand, url: BASE_URL },
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
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
              <Link href="/blog" className="hover:text-ink">
                Guides
              </Link>
            </nav>

            <header className="mt-6 max-w-[68ch]">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-pill bg-warm-soft px-2.5 py-1 text-[0.75rem] font-semibold text-warm-ink">
                  {post.tag}
                </span>
                <time dateTime={post.date} className="text-[0.84rem] text-ink-muted">
                  {formatPostDate(post.date)}
                </time>
                <span className="text-[0.84rem] text-ink-muted">
                  · {post.readingMinutes} min read
                </span>
              </div>

              <h1 className="mt-4 text-[clamp(1.9rem,5vw,2.9rem)]">
                {post.title}
              </h1>
              <p className="mt-4 text-[1.12rem] text-ink-soft">
                {post.description}
              </p>
            </header>

            <Body blocks={post.body} />

            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/#listings" className="btn btn-primary">
                See the directory
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                All guides
              </Link>
            </div>
          </div>
        </article>

        {more.length > 0 ? (
          <section className="section-y border-t border-line bg-bg-alt">
            <div className="wrap">
              <h2 className="text-[clamp(1.5rem,3.4vw,2rem)]">More guides</h2>
              <div className="mt-8 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
}
