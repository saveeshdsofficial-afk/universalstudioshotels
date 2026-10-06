import Image from "next/image";
import { Icon } from "./Icon";
import { AFFILIATE_REL, bookingSearchUrl } from "@/lib/affiliate";
import type { Listing } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ListingCard({
  listing,
  className,
  priority = false,
}: {
  listing: Listing;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={listing.image}
          alt={`Illustration representing a ${listing.type.toLowerCase()} — not a photograph of ${listing.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <span className="absolute top-4 left-4 rounded-pill bg-white/[0.92] px-3 py-1.5 text-[0.75rem] font-semibold">
          {listing.type}
        </span>

        {/* distance takes the slot the mockup gives a review score */}
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-pill bg-dark py-1 pr-3 pl-1 text-white">
          <span className="rounded-pill bg-white px-2 py-1 text-[0.82rem] font-bold text-ink">
            {listing.miles}
          </span>
          <span className="text-[0.74rem] font-semibold">miles out</span>
        </div>

        <span className="absolute bottom-3 left-4 rounded-sm bg-white/90 px-1.5 py-0.5 font-mono text-[0.62rem] font-medium">
          Illustration, not a photo
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-[clamp(1.15rem,2vw,1.45rem)]">{listing.name}</h3>
          <span className="flex flex-wrap items-center gap-1.5 text-[0.86rem] text-ink-muted">
            <Icon name="pin" className="size-3.5 shrink-0" />
            {listing.town} ·{" "}
            <strong className="font-semibold text-ink">
              {listing.postcode}
            </strong>
          </span>
        </div>

        <p className="flex-1 text-[0.94rem] text-ink-soft">{listing.blurb}</p>

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
          <a
            href={bookingSearchUrl(`${listing.name}, ${listing.town}`)}
            target="_blank"
            rel={AFFILIATE_REL}
            className="btn btn-primary w-full"
          >
            Check availability
            <span className="btn-chip">Booking.com</span>
          </a>

          {listing.website ? (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-center text-[0.86rem] font-semibold underline underline-offset-[3px] hover:text-accent"
            >
              Visit the hotel&rsquo;s own site
            </a>
          ) : (
            <span className="text-center text-[0.84rem] text-ink-muted">
              No official link on file yet
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
