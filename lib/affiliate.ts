/**
 * Booking.com affiliate links.
 *
 * The affiliate id is read from the environment, never committed, so you can
 * set it in Vercel → Settings → Environment Variables without a code change:
 *
 *     NEXT_PUBLIC_BOOKING_AID=1234567
 *
 * Until it is set the links still work — they just point at an ordinary
 * Booking.com search and earn nothing. Nothing on the page is faked: the
 * disclosure only claims a commission when `AFFILIATE_LIVE` is true, so the
 * site cannot tell visitors it earns from links it is not earning from.
 */
export const BOOKING_AFFILIATE_ID = process.env.NEXT_PUBLIC_BOOKING_AID ?? "";

export const AFFILIATE_LIVE = BOOKING_AFFILIATE_ID.trim() !== "";

/**
 * A Booking.com search for a named property in a town.
 *
 * We deliberately link to a *search*, not to a specific hotel page: we have no
 * verified Booking.com property ids, and guessing one would send people to the
 * wrong hotel.
 */
export function bookingSearchUrl(query: string) {
  const url = new URL("https://www.booking.com/searchresults.html");
  url.searchParams.set("ss", query);
  url.searchParams.set("lang", "en-gb");
  if (AFFILIATE_LIVE) url.searchParams.set("aid", BOOKING_AFFILIATE_ID.trim());
  return url.toString();
}

/**
 * Google requires monetised links to carry rel="sponsored"; nofollow keeps the
 * link from passing ranking signal. Both go on every affiliate link we render.
 */
export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

/** One sentence, used wherever a monetised link appears. */
export const AFFILIATE_NOTE = AFFILIATE_LIVE
  ? "We may earn a commission if you book through this link, at no extra cost to you. It never changes the order of this list."
  : "Availability links go to Booking.com. We earn nothing from them at present.";
