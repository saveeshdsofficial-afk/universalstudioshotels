import { Reveal } from "./Reveal";
import { PostCard } from "./PostCard";
import { RuleHead } from "./SectionHead";
import { POSTS_BY_DATE } from "@/lib/posts";

/** 05 — all six guides, three across, as the reference lays out its blog. */
export function BlogGrid() {
  return (
    <section id="guides-all" className="section-y bg-surface">
      <div className="wrap">
        <Reveal>
          <RuleHead
            n="05"
            label="Latest from the guides"
            link={{ href: "/blog", label: "Visit the blog" }}
            className="mb-12"
          />
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS_BY_DATE.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
