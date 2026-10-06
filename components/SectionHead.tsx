import Link from "next/link";
import { cn } from "@/lib/cn";

/** The numbered rule that opens every section in this theme. */
export function RuleHead({
  n,
  label,
  link,
  className,
}: {
  n: string;
  label: string;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("rule-head", className)}>
      <span className="rule-num">{n}</span>
      <span className="rule-label">{label}</span>
      {link ? (
        <Link
          href={link.href}
          className="order-last shrink-0 text-[0.88rem] font-semibold hover:text-accent"
        >
          {link.label} →
        </Link>
      ) : null}
    </div>
  );
}

export function SectionHead({
  title,
  sub,
  className,
}: {
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12",
        className,
      )}
    >
      <h2 className="text-[clamp(1.9rem,5vw,4rem)]">{title}</h2>
      {sub ? (
        <p className="serif max-w-[30rem] text-[clamp(1.02rem,1.6vw,1.19rem)] text-ink-soft">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
