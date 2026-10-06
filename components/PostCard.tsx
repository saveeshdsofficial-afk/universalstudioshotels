import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/posts";
import { cn } from "@/lib/cn";

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("group relative flex h-full flex-col gap-4 rounded-panel p-2 transition duration-200 hover:bg-surface", className)}>
      <div className="relative aspect-3/2 overflow-hidden rounded-card shadow-[var(--shadow-raise)]">
        <Image
          src={`/images/guides/${post.slug}.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.74rem] font-semibold">
          {post.tag}
        </span>
      </div>

      <h3 className="text-[clamp(1.05rem,1.8vw,1.4rem)]">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 group-hover:text-accent-ink"
        >
          {post.title}
        </Link>
      </h3>

      <p className="flex-1 text-[0.92rem] text-ink-soft">{post.description}</p>

      <time
        dateTime={post.date}
        className="block text-[0.8rem] text-ink-muted"
      >
        {post.readingMinutes} min read · {formatPostDate(post.date)}
      </time>
    </article>
  );
}
