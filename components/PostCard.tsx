import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/posts";
import { cn } from "@/lib/cn";

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("card group relative flex h-full flex-col p-6 transition duration-200 hover:-translate-y-1 hover:border-accent-ring hover:shadow-[var(--shadow-mid)]", className)}>
      <div className="flex flex-wrap items-center gap-2.5">
        {/* amber is the editorial half of the palette — guides only */}
        <span className="rounded-pill bg-warm-soft px-2.5 py-1 text-[0.75rem] font-semibold text-warm-ink">
          {post.tag}
        </span>
        <span className="text-[0.8rem] text-ink-muted">
          {post.readingMinutes} min read
        </span>
      </div>

      <h3 className="mt-4 text-[1.15rem] leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 group-hover:text-accent-ink"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2.5 flex-1 text-[0.94rem] text-ink-soft">
        {post.description}
      </p>

      <time
        dateTime={post.date}
        className="mt-5 block border-t border-line pt-4 text-[0.82rem] text-ink-muted"
      >
        {formatPostDate(post.date)}
      </time>
    </article>
  );
}
