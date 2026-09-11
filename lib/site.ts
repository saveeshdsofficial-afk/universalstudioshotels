import type { FaqEntry, ValueProp } from "./types";

/**
 * Everything specific to this site lives here.
 *
 * `brandSub` carries "Independent guide" deliberately: the name references a
 * trademark we do not own, so non-affiliation needs to read at a glance in the
 * masthead as well as in the footer disclaimer. Keep it there.
 *
 * The visual theme comes from the single `--accent` custom property in
 * app/globals.css.
 */
/**
 * Every contact route on the site ends here. Defined once so the address
 * cannot drift between the header, the provider section and the footer.
 *
 * These are plain mailto links, which address scrapers do harvest. If the
 * spam becomes a problem, swap these for a contact form — the call sites all
 * read `mailtoLink()`, so it is a one-file change.
 */
export const CONTACT_EMAIL = "hello@kainovation.com";

export function mailtoLink(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** Subjects, so enquiries arrive pre-sorted. */
export const MAIL = {
  listing: mailtoLink("Add a listing — Universal Studios Hotels"),
  enquiry: mailtoLink("Enquiry — Universal Studios Hotels"),
} as const;

/**
 * Photo credit for the hero.
 *
 * The image is CC BY 2.0, which permits commercial use but *requires*
 * attribution — title, author, source and licence. That is not decorative:
 * drop the credit and the licence to use the photo lapses. If you swap the
 * image, swap this with it.
 */
export const HERO_CREDIT = {
  title: "Bedford Bridge On The River Great Ouse",
  author: "Jim",
  licence: "CC BY 2.0",
  licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Bedford_Bridge_On_The_River_Great_Ouse.jpg",
  alt: "Bedford Town Bridge crossing the River Great Ouse, with the spire of St Paul's Church behind it",
} as const;

export const SITE = {
  brand: "Universal Studios Hotels",
  email: CONTACT_EMAIL,
  brandSub: "Independent guide",
  domain: "universalstudioshotels.co.uk",
  /** The development this directory serves. One string, so it is easy to retarget. */
  park: "Universal Studios UK",
  region: "Bedfordshire",

  nav: [
    { label: "The directory", href: "/#listings" },
    { label: "By type", href: "/#types" },
    { label: "Guides", href: "/blog" },
    { label: "Add your place", href: "/#providers" },
    { label: "Questions", href: "/#faq" },
  ],

  hero: {
    h1: ["Hotels and places to stay near ", "the Universal Studios UK site"] as const,
    lede: "An independent list of places within reach of the Bedford build, starting with the hotels closest to it. Every entry shows how far out it sits and links straight to the operator.",
  },

  valueProps: [
    {
      icon: "route",
      title: "Distance on every entry",
      text: "Each place is measured from its own postcode to the Kempston Hardwick site, so you can compare them on the one thing that matters most.",
    },
    {
      icon: "headset",
      title: "Straight to the operator",
      text: "We publish the entry and step back. Dates, terms and money are settled with the property itself — no booking engine, no commission, no paid placement.",
    },
    {
      icon: "calendar",
      title: "Built around the long stay",
      text: "Most people here need eight weeks, not two nights. Rates are quoted by the night, the week and the month so the sums are easy.",
    },
  ] satisfies ValueProp[],

  providers: {
    h2: "Put your place in front of the crews",
    lede: "A hotel, a B&B, a spare double, a whole house — if it is within a sensible drive of the site, the people working there would like to know it exists.",
    points: [
      "We work out the road distance for you",
      "Enquiries land in your inbox, not ours",
      "Price it by the night, the week or the month",
    ],
    cta: "Add your place",
  },

  faq: [
    {
      q: "Is this an official Universal Studios site?",
      a: "No. Despite the name, this site is not run by, owned by or connected to Universal Studios or any company in the NBCUniversal group, and nothing on it is authorised or endorsed by them. It is an independent list of places to stay, put together locally. The name describes what the site is for — finding a hotel near the site — and no listing gets better placement for being a big name.",
    },
    {
      q: "Where does the distance figure come from?",
      a: "We take the property's postcode, look up its coordinates in the Ordnance Survey postcode data, and measure the straight line to the Kempston Hardwick site at 52.1046, -0.4936. It is not road mileage, and the site has no public entrance yet, so use it to compare one place against another rather than to plan a journey. Driving time on the A421 and the A6 varies enormously by hour.",
    },
    {
      q: "Who is actually using this at the moment?",
      a: "Mostly people building the thing: contractors, site teams and crews on rotation who need somewhere for weeks or months at a stretch. Visitor demand will come later, closer to opening, and the list will grow into it.",
    },
    {
      q: "What does it cost to get in touch with a place?",
      a: "Nothing. Enquiries go straight to the owner and we take no commission and handle no money. Whatever you agree on price, deposit and cancellation is between the two of you.",
    },
    {
      q: "How do I get my property on the list?",
      a: "Use the add-your-place form. Have your address, the type of accommodation, a few photographs and your rates ready. We work out the distance to the site and check the entry over before it appears.",
    },
    {
      q: "Where does the information in a listing come from?",
      a: "Names, streets and postcodes come from each operator's own published details, and every postcode is checked against the national postcode database. We do not publish nightly rates or room counts, because those change constantly and we cannot verify them property by property — check those with the hotel directly. The pictures are generic illustrations, not photographs of the buildings.",
    },
    {
      q: "Are the hotels listed here involved with the site?",
      a: "No. They are simply nearby businesses, listed because of where they are. None of them has paid for placement, none has a commercial arrangement with us, and the order they appear in is decided only by distance or alphabetically. If you run one of them and would rather not be listed, get in touch and we will take the entry down.",
    },
    {
      q: "Which hotel is closest to the Universal Studios UK site?",
      a: "Of the properties currently listed, the closest sit on the Kempston and Elstow edge of the site, under a mile out in a straight line, close to the A421. Central Bedford follows at roughly two to three miles, and the northern edge toward Clapham at around four. Because the site has no public entrance yet, treat these as a way to rank properties rather than as door-to-door journeys.",
    },
    {
      q: "Where is the Universal Studios UK site actually being built?",
      a: "On the former brickworks at Kempston Hardwick, a few miles south of Bedford in Bedfordshire, between the A421 and the A6. Kempston, Elstow, Wixams, Stewartby and Marston Moretaine are the settlements immediately around it, with Bedford town to the north.",
    },
    {
      q: "When does Universal Studios UK open?",
      a: "Opening is expected around the start of the 2030s, but no date should be treated as fixed on a construction programme of this length. We are not connected to the development and have no inside information — check the official channels for anything you intend to rely on.",
    },
    {
      q: "How do I get to the Universal Bedford site?",
      a: "By road, the A421 runs east to west across the south of Bedford, linking toward Milton Keynes and the M1 one way and the A1 the other, while the A6 runs north to south through Bedford. By rail, Kempston Hardwick sits on the Marston Vale line between Bedford and Bletchley, and Bedford itself has fast services to London St Pancras. Rail provision in the area is expected to change substantially before the park opens.",
    },
    {
      q: "Is there parking at the hotels near the site?",
      a: "Most properties in this area have parking, but whether it is free, secure, or able to take a van varies a great deal — and a daily parking charge across a long stay can quietly exceed the price difference between two hotels. Ask the property directly, and ask specifically about long-wheelbase vehicles if that applies to you.",
    },
    {
      q: "Can I get a weekly or monthly rate for a long stay?",
      a: "Usually, yes, but it is rarely advertised. Long-stay rates near a large construction project are negotiated rather than published, and they are often well below the nightly rate multiplied out — particularly for several rooms or a repeat booking. Phone the property rather than booking through an aggregator, and lead with the length of stay and the number of rooms.",
    },
    {
      q: "Do you take a commission on bookings?",
      a: "No. We run no booking engine, handle no money and take no commission from anyone. Nobody can pay to appear higher in the list, and the order is decided only by distance or alphabetically.",
    },
  ] satisfies FaqEntry[],

  footer: {
    blurb:
      "An independently run list of hotels and places to stay within reach of the Universal Studios UK build in Bedfordshire. No commission, no booking engine — just the owner's details.",
    columns: [
      {
        title: "Find a place",
        links: [
          { label: "The whole list", href: "/#listings" },
          { label: "By type", href: "/#types" },
          { label: "Nearest first", href: "/#listings" },
          { label: "Guides", href: "/blog" },
        ],
      },
      {
        title: "For owners",
        links: [
          { label: "Add your place", href: "/#providers" },
          { label: "What it costs", href: "#" },
          { label: "Help for owners", href: "#" },
          { label: "Get in touch", href: MAIL.enquiry },
        ],
      },
      {
        title: "Small print",
        links: [
          { label: "Terms", href: "#" },
          { label: "Privacy", href: "#" },
          { label: "Cookies", href: "#" },
          { label: "Accessibility", href: "#" },
        ],
      },
    ],
  },

  disclaimer:
    "This is an independently run directory of places to stay, and it is not an official Universal Studios website. We are not connected to, authorised by, endorsed by or associated with Universal Studios, Universal Destinations & Experiences, or any company in the NBCUniversal group. The site name and any park or company names are used only to describe the location this directory covers. Every entry is supplied by its owner — confirm the details and the price with them before you commit to anything.",
} as const;
