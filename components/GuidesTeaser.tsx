import Link from "next/link";
import { Reveal } from "./Reveal";
import { PostCard } from "./PostCard";
import { POSTS_BY_DATE } from "@/lib/posts";

const LATEST = POSTS_BY_DATE.slice(0, 3);

export function GuidesTeaser() {
  return (
    <section id="guides" className="section-y">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[640px]">
              <h2 className="text-[clamp(1.75rem,4.2vw,2.7rem)]">
                Working it out before you book
              </h2>
              <p className="mt-3.5 text-[1.08rem] text-ink-muted">
                What we have learned about staying near the Bedford build —
                roads, rotations, long-stay rates and the things people wish
                they had asked.
              </p>
            </div>
            <Link href="/blog" className="btn btn-ghost">
              All guides
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
          {LATEST.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
