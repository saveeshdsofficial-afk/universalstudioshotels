import { cn } from "@/lib/cn";

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
    <div className={cn("mb-9 max-w-[640px] sm:mb-12 lg:mb-14", className)}>
      <h2 className="text-[clamp(1.75rem,4.2vw,2.7rem)]">{title}</h2>
      {sub ? <p className="mt-3.5 text-[1.08rem] text-ink-muted">{sub}</p> : null}
    </div>
  );
}
