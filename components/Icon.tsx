import { ICONS, type IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * The icon set is a fixed map of static path data we author ourselves,
 * so injecting it as markup is safe and keeps the set to one small file.
 */
export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("size-[1em] shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-accent", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className="size-[17px] fill-current" />
      ))}
    </span>
  );
}
