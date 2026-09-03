import type { Listing, PropertyType, PropertyTypeCard } from "./types";

/**
 * Real properties near the Universal UK site at Kempston Hardwick, Bedford.
 *
 * Every entry is a real business and carries only facts checked against a
 * source:
 *   · name, street and postcode — from the operator's own listing
 *   · miles — straight-line distance computed from the postcode's ONS
 *     coordinates (api.postcodes.io) to the site at 52.1046, -0.4936. It is
 *     NOT road distance, and the site has no public entrance yet, so treat it
 *     as a way to rank properties rather than a promise about a journey.
 *   · website — only where the official URL was confirmed
 *
 * Deliberately absent: nightly rates, room counts and amenity lists. Those
 * change constantly and could not be verified per property; publishing
 * guesses under a real business's name would misrepresent it. Add them as
 * each owner confirms their own details.
 *
 * The images are illustrations, not photographs of these buildings —
 * ListingCard labels them as such.
 */
export const LISTINGS: Listing[] = [
  {
    slug: "premier-inn-bedford-south-a421",
    name: "Premier Inn Bedford South (A421)",
    type: "Hotel",
    town: "Kempston, Bedford",
    postcode: "MK42 7FY",
    blurb:
      "On Fletcher Road in Kempston, just off the A421. The closest hotel on this list to the site.",
    image: "/images/listings/premier-inn-bedford-south-a421.jpg",
    miles: 0.6,
    website:
      "https://www.premierinn.com/gb/en/hotels/england/bedfordshire/bedford/bedford-south-a421.html",
  },
  {
    slug: "holiday-inn-express-bedford",
    name: "Holiday Inn Express Bedford",
    type: "Hotel",
    town: "Elstow, Bedford",
    postcode: "MK42 9BF",
    blurb:
      "At Elstow Interchange, by the A6 and A421 junction south of Bedford.",
    image: "/images/listings/holiday-inn-express-bedford.jpg",
    miles: 0.7,
    website:
      "https://www.ihg.com/holidayinnexpress/hotels/gb/en/bedford/xqdbf/hoteldetail",
  },
  {
    slug: "premier-inn-bedford-town-centre",
    name: "Premier Inn Bedford Town Centre (Riverside)",
    type: "Hotel",
    town: "Bedford",
    postcode: "MK40 1AS",
    blurb: "On Riverside Square, in the middle of Bedford by the Great Ouse.",
    image: "/images/listings/premier-inn-bedford-town-centre.jpg",
    miles: 2.3,
    website:
      "https://www.premierinn.com/gb/en/hotels/england/bedfordshire/bedford/bedford-town-centre-riverside.html",
  },
  {
    slug: "mercure-bedford-centre",
    name: "Mercure Bedford Centre Hotel",
    type: "Hotel",
    town: "Bedford",
    postcode: "MK42 0AR",
    blurb:
      "On St Mary's Street, on the south side of the river in central Bedford.",
    image: "/images/listings/mercure-bedford-centre.jpg",
    miles: 2.3,
  },
  {
    slug: "bedford-swan-hotel",
    name: "The Bedford Swan Hotel & Thermal Spa",
    type: "Hotel",
    town: "Bedford",
    postcode: "MK40 1RW",
    blurb: "A four-star hotel on The Embankment, with a thermal spa on site.",
    image: "/images/listings/bedford-swan-hotel.jpg",
    miles: 2.4,
  },
  {
    slug: "premier-inn-bedford-priory-marina",
    name: "Premier Inn Bedford (Priory Marina)",
    type: "Hotel",
    town: "Bedford",
    postcode: "MK41 9DJ",
    blurb:
      "Beside Priory Country Park on Barkers Lane, east of the town centre.",
    image: "/images/listings/premier-inn-bedford-priory-marina.jpg",
    miles: 3.0,
    website:
      "https://www.premierinn.com/gb/en/hotels/england/bedfordshire/bedford.html",
  },
  {
    slug: "woodlands-manor-hotel",
    name: "Woodlands Manor Hotel",
    type: "Hotel",
    town: "Clapham, Bedford",
    postcode: "MK41 6EP",
    blurb: "On Green Lane in Clapham, in open country north of Bedford.",
    image: "/images/listings/woodlands-manor-hotel.jpg",
    miles: 3.8,
  },
];

export const PROPERTY_TYPES: PropertyTypeCard[] = [
  {
    type: "Hotel",
    label: "Hotels",
    icon: "bed",
    blurb: "Serviced rooms, nightly or by contract",
  },
  {
    type: "Apartment",
    label: "Apartments",
    icon: "suitcase",
    blurb: "Self-contained, for longer stays",
  },
  {
    type: "House",
    label: "Houses",
    icon: "key",
    blurb: "Whole homes for teams and families",
  },
  {
    type: "B&B",
    label: "B&Bs",
    icon: "utensils",
    blurb: "Small guest houses with breakfast",
  },
  {
    type: "Room",
    label: "Rooms",
    icon: "sun",
    blurb: "Single rooms in shared homes",
  },
  {
    type: "Other",
    label: "Other stays",
    icon: "sparkles",
    blurb: "Lodges, studios, barns and parks",
  },
];

export const ALL_TYPES: PropertyType[] = [
  "Hotel",
  "Apartment",
  "House",
  "B&B",
  "Room",
  "Other",
];

/** The development every distance on this site is measured to. */
export const SITE_POINT = {
  label: "Kempston Hardwick",
  lat: 52.1046,
  lon: -0.4936,
} as const;

export function countByType(type: PropertyType) {
  return LISTINGS.filter((l) => l.type === type).length;
}
