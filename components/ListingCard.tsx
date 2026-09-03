import Image from "next/image";
import { Icon } from "./Icon";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ListingCard({
  listing,
  className,
  priority = false,
}: {
  listing: Listing;
  className?: string;
  /** Set on cards above the fold so their image is not lazy-loaded. */
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "card group flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-accent-ring hover:shadow-[var(--shadow-mid)]",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden bg-bg-alt">
        <Image
          src={listing.image}
          alt={`Illustration representing a ${listing.type.toLowerCase()} — not a photograph of ${listing.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/*
          These are generic illustrations. Say so on the card — letting a
          drawing pass as a photo of a real hotel would mislead people.
        */}
        <span className="absolute bottom-2 left-2 rounded-pill bg-ink/70 px-2 py-0.5 text-[0.7rem] font-medium text-bg backdrop-blur-sm">
          Illustration
        </span>

        <span className="absolute top-3 right-3 rounded-pill bg-surface/90 px-2.5 py-1 text-[0.75rem] font-semibold text-ink-soft shadow-[var(--shadow-soft)] backdrop-blur-sm">
          {listing.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.1rem] leading-snug">{listing.name}</h3>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-[0.86rem] text-ink-muted">
          <Icon name="pin" className="size-3.5 shrink-0" />
          {listing.town}
          <span className="font-mono text-[0.8rem]">· {listing.postcode}</span>
        </p>

        {/* grows so the distance row and link line up across a row of cards */}
        <p className="mt-3 flex-1 text-[0.94rem] text-ink-soft">{listing.blurb}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent-soft px-3 py-1.5 font-mono text-[0.8rem] whitespace-nowrap text-accent-ink">
            <Icon name="route" className="size-3.5" />
            {listing.miles} mi
          </span>
          <span className="text-[0.8rem] text-ink-muted">
            straight line to the site
          </span>
        </div>

        {listing.website ? (
          <a
            href={listing.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn btn-ghost mt-4 w-full group-hover:border-accent group-hover:text-accent-ink"
          >
            Visit official site
          </a>
        ) : (
          <p className="mt-4 rounded-card bg-bg-alt px-3 py-2.5 text-center text-[0.84rem] text-ink-muted">
            No official link on file yet
          </p>
        )}
      </div>
    </article>
  );
}
