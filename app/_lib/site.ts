/** Tokens, the Booking.com helper and the verified stay list, shared by the
 *  home page and the four category pages. */

export const ARCHIVO = "var(--font-archivo), 'Archivo', sans-serif";
export const SANS = "var(--font-poppins), 'Poppins', system-ui, sans-serif";
export const SERIF = "var(--font-source-serif), 'Source Serif 4', Georgia, serif";

export const INK = "#17181B";
export const SOFT = "#3A3B40";
export const MUTED = "#5B5D63";
export const LINE = "#E4E4DE";
export const PAPER = "#FAFAF7";
export const TINT = "#EEF2FF";
export const TINT_LINE = "#D9E1FF";
export const BLUE = "#1F4BFF";
export const BLUE_INK = "#1F45E6";

export const SPONSORED = "sponsored nofollow noopener noreferrer";

/** A Booking.com search for one property. Deliberately a search rather than a
 *  /hotel/gb/<slug> URL: the slugs cannot be looked up without scraping, and a
 *  guessed one either 404s or lands on a different hotel. */
export function booking(q: string) {
  const u = new URL("https://www.booking.com/searchresults.html");
  u.searchParams.set("ss", q);
  u.searchParams.set("lang", "en-gb");
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  if (aid) u.searchParams.set("aid", aid);
  return u.toString();
}

/** Real businesses near the site at Kempston Hardwick (52.1046, -0.4936).
 *  Distances are straight-line, computed from each postcode's ONS coordinates
 *  via api.postcodes.io. They rank properties; they are not road distances.
 *  No rates, star ratings or amenity lists: those were never verified, and
 *  guessing them under a real business's name would misrepresent it. */
export const STAYS = [
  { name: "Premier Inn Bedford South (A421)", town: "Kempston, Bedford", pc: "MK42 7FY", mi: 0.6,
    note: "On Fletcher Road in Kempston, just off the A421. The closest hotel on this list to the site." },
  { name: "Holiday Inn Express Bedford", town: "Elstow, Bedford", pc: "MK42 9BF", mi: 0.7,
    note: "At Elstow Interchange, by the A6 and A421 junction south of Bedford." },
  { name: "Premier Inn Bedford Town Centre (Riverside)", town: "Bedford", pc: "MK40 1AS", mi: 2.3,
    note: "On Riverside Square, in the middle of Bedford by the Great Ouse." },
  { name: "Mercure Bedford Centre Hotel", town: "Bedford", pc: "MK42 0AR", mi: 2.3,
    note: "On St Mary's Street, on the south side of the river in central Bedford." },
  { name: "The Bedford Swan Hotel & Thermal Spa", town: "Bedford", pc: "MK40 1RW", mi: 2.4,
    note: "A four-star hotel on The Embankment, with a thermal spa on site." },
  { name: "Premier Inn Bedford (Priory Marina)", town: "Bedford", pc: "MK41 9DJ", mi: 3.0,
    note: "Beside Priory Country Park on Barkers Lane, east of the town centre." },
  { name: "Woodlands Manor Hotel", town: "Clapham, Bedford", pc: "MK41 6EP", mi: 3.8,
    note: "On Green Lane in Clapham, in open country north of Bedford." },
];

/** The four category pages, in the order they appear on the home page. */
export const CATEGORIES = [
  { slug: "stay", word: "Stay", title: "Where to stay", img: "/images/plan/where-to-stay.jpg" },
  { slug: "activities", word: "Activities", title: "What to do", img: "/images/plan/what-to-do.jpg" },
  { slug: "food", word: "Food", title: "Where to eat", img: "/images/plan/where-to-eat.jpg" },
  { slug: "travel", word: "Travel", title: "How to get there", img: "/images/plan/how-to-get-there.jpg" },
];
