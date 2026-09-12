/**
 * Guides.
 *
 * Bodies are typed blocks rather than markdown so the blog needs no parser
 * and no extra dependency — the stack stays Next + TypeScript + Tailwind.
 *
 * On accuracy: the Universal development at Kempston Hardwick is years from
 * opening and the published plans will change. Anything forward-looking here
 * is written as an expectation, never as a fact, and no post quotes a rate,
 * a room count or an opening date as settled. If you update these, keep that
 * discipline — a guide that guesses confidently is worse than no guide.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "note"; text: string };

export interface Post {
  slug: string;
  /** The on-page H1 and card heading. May run long. */
  title: string;
  /** Search-result title. Kept near 60 characters so it is not truncated. */
  metaTitle: string;
  /** Used as the meta description and the card summary. Keep under ~155 chars. */
  description: string;
  /** Short label for the card. */
  tag: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  keywords: string[];
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "where-to-stay-near-universal-studios-uk",
    metaTitle: "Where to stay near Universal Studios UK | Bedford",
    title: "Where to stay near Universal Studios UK: the closest hotels to the Bedford site",
    description:
      "Which Bedfordshire hotels sit closest to the Universal Studios UK site at Kempston Hardwick, how the distances compare, and what to weigh up before booking.",
    tag: "Where to stay",
    date: "2026-09-09",
    readingMinutes: 6,
    keywords: [
      "hotels near Universal Studios UK",
      "where to stay near Universal Studios UK",
      "closest hotel to Universal UK site",
      "hotels near Kempston Hardwick",
      "Universal Bedford accommodation",
    ],
    body: [
      {
        t: "p",
        text: "The Universal development is going up on the former brickworks at Kempston Hardwick, a few miles south of Bedford. That location decides everything about where it makes sense to stay: the site sits between the A421 and the A6, with Bedford town to the north and a string of villages — Kempston, Elstow, Wixams, Stewartby, Marston Moretaine — wrapped around it.",
      },
      {
        t: "p",
        text: "If you are booking now, you are almost certainly working on the project rather than visiting it. That changes the maths. A visitor optimises for a short, convenient stay. A contractor on an eight-week rotation optimises for parking, laundry, a kettle, and a drive that does not eat forty minutes twice a day.",
      },
      { t: "h2", text: "How close is close?" },
      {
        t: "p",
        text: "Almost everything worth considering sits within about four miles of the site. That sounds tight, and in straight-line terms it is — but Bedfordshire's road network does not run in straight lines, and the difference between a hotel on the A421 and one in the middle of Bedford is far bigger at eight in the morning than a map suggests.",
      },
      {
        t: "ul",
        items: [
          "Under a mile: the Kempston and Elstow edge of the site, right by the A421 junction. Closest by some margin.",
          "Two to three miles: central Bedford, including the Embankment and Riverside. More to do in the evening, more traffic to sit in.",
          "Three to four miles: the northern edge, out past Priory Country Park and toward Clapham. Quieter, greener, a longer run in.",
        ],
      },
      {
        t: "note",
        text: "Every distance in our directory is a straight line measured from the property's postcode to the site, not road mileage. It is a fair way to rank one place against another, but it is not a journey time — and the site has no public entrance yet.",
      },
      { t: "h2", text: "What actually matters on a long stay" },
      {
        t: "p",
        text: "Proximity is the headline, but it is rarely the thing people regret getting wrong. These are the ones that bite:",
      },
      {
        t: "ol",
        items: [
          "Parking, and whether it is free. A nightly parking charge on a two-month stay quietly outgrows the difference between two hotels.",
          "Breakfast timing. Site starts are early. A breakfast service that opens at seven is no use if you need to be on site at seven.",
          "Laundry. Weeks-long stays need a washing machine or a laundry service, and it is the single most common thing missing.",
          "Somewhere to sit that is not the bed. A desk or an armchair matters more than you expect by week three.",
          "Cancellation terms. Construction schedules move. Flexible rates are worth paying a little for.",
        ],
      },
      { t: "h2", text: "Book direct, and ask" },
      {
        t: "p",
        text: "Weekly and monthly rates for long stays are rarely published — they are negotiated. Hotels near a major construction project expect these calls and will often quote something well below the nightly rate multiplied out, particularly for a block of rooms or a repeat booking. It is worth a phone call before you book anything through an aggregator.",
      },
      {
        t: "p",
        text: "That is also why this directory does not publish nightly rates. Any figure we printed would be out of date within days and would not reflect what you would actually be quoted for a long stay. Every listing links to the operator so you can ask them directly.",
      },
    ],
  },

  {
    slug: "getting-to-the-universal-uk-site",
    metaTitle: "Getting to the Universal UK site: roads and rail",
    title: "Getting to the Universal UK site: roads, rail and the Marston Vale line",
    description:
      "How to reach the Universal Studios UK site at Kempston Hardwick by car and by train, which roads matter, and why rail access is expected to change.",
    tag: "Travel",
    date: "2026-09-08",
    readingMinutes: 5,
    keywords: [
      "getting to Universal Studios UK",
      "Universal UK travel guide",
      "Kempston Hardwick station",
      "hotels near A421",
      "how far is Bedford from Universal Studios UK",
    ],
    body: [
      {
        t: "p",
        text: "Kempston Hardwick is not somewhere most people had heard of before the Universal announcement. It is a small place on the Marston Vale line between Bedford and Bletchley, with a station that has historically been one of the quieter stops on the network — and a very large brickworks site next door.",
      },
      { t: "h2", text: "By road" },
      {
        t: "p",
        text: "Two roads do the work. The A421 runs east–west across the south of Bedford, connecting toward Milton Keynes and the M1 in one direction and the A1 in the other. The A6 runs north–south through Bedford and down toward Luton. The site sits close to where they meet, which is why the accommodation clustered around that junction is the closest to it.",
      },
      {
        t: "ul",
        items: [
          "From the M1, come off and take the A421 east. This is the usual approach from the Midlands and the north-west.",
          "From the A1, take the A421 west toward Bedford. This is the approach from the north-east and from Cambridgeshire.",
          "From Luton and the south, the A6 north is the direct route.",
        ],
      },
      {
        t: "p",
        text: "The A421 moves well outside peak hours and much less well inside them. If you are choosing between two places and one of them puts the A421 between you and the site at half past seven in the morning, factor that in properly rather than trusting the mileage.",
      },
      { t: "h2", text: "By rail" },
      {
        t: "p",
        text: "The Marston Vale line links Bedford to Bletchley, where it meets the West Coast Main Line. Bedford itself is on the Midland Main Line with fast services to London St Pancras, which makes the town a practical base if you are coming in from further afield without a car.",
      },
      {
        t: "note",
        text: "Rail provision around the site is expected to change substantially before the park opens — that is a stated part of the transport planning. Treat today's timetables as a guide to getting to work on the build, not as a picture of how visitors will eventually arrive.",
      },
      { t: "h2", text: "Practical advice for now" },
      {
        t: "p",
        text: "For anyone working on the project, a car is close to essential. The villages nearest the site have limited bus provision and the shift patterns on a construction site rarely line up with a rural timetable. If you are staying in central Bedford and driving in, allow more time than the distance suggests, and check whether your accommodation charges separately for parking.",
      },
      {
        t: "p",
        text: "If you are arriving by train for a short visit — a site meeting, an interview, a look around the area — Bedford station is the sensible arrival point, with the town's hotels within a short taxi ride.",
      },
    ],
  },

  {
    slug: "contractor-accommodation-bedford-checklist",
    metaTitle: "Contractor accommodation near Universal Bedford",
    title: "Contractor accommodation near Universal Bedford: a 9-point checklist before you book",
    description:
      "What to check before booking long-stay contractor accommodation near the Universal Bedford site: parking, laundry, breakfast times and cancellation terms.",
    tag: "Tips & tricks",
    date: "2026-09-07",
    readingMinutes: 7,
    keywords: [
      "contractor accommodation Bedford",
      "long stay accommodation Bedford",
      "crew accommodation Universal Bedford",
      "project team accommodation Bedford",
      "what to check before booking a long stay",
    ],
    body: [
      {
        t: "p",
        text: "Booking a room for two nights and booking one for two months are different problems. The second one has failure modes the first one never surfaces. This is the list worth running through before you commit, drawn from the things people most often wish they had asked.",
      },
      { t: "h2", text: "The checklist" },
      {
        t: "ol",
        items: [
          "Is parking included, and is it secure? Ask specifically about vans and long-wheelbase vehicles — plenty of car parks will not take them.",
          "What time does breakfast actually start? If site start is 7am, a 7:30 breakfast is decoration. Ask whether they will do a packed breakfast instead.",
          "Is there laundry on site, or a service? Over eight weeks this is not a nicety.",
          "Can you get an invoice, and in whose name? If your company is paying, sort this before arrival rather than at checkout.",
          "What is the cancellation window? Construction programmes slip. A flexible rate that costs a few pounds more per night can save a fortnight's charges.",
          "Is there a desk, and is the wifi good enough for a video call? Ask for a speed, not a yes.",
          "What is the weekly or monthly rate? It is almost never the nightly rate multiplied out, and it is almost never published.",
          "Is there anywhere to make food? A kettle and a microwave change the economics of a long stay considerably.",
          "How early can you check in and how late can you check out on changeover days? Rotations rarely align with a 3pm check-in.",
        ],
      },
      { t: "h2", text: "Negotiating a long-stay rate" },
      {
        t: "p",
        text: "Phone rather than email, ask for the duty manager or the reservations team rather than the front desk, and lead with the length of stay and the number of rooms. Those two numbers are what move a price. If you are booking for a crew, say so — a block of five rooms for two months is a materially different proposition to one room for a weekend, and it should be priced like one.",
      },
      {
        t: "p",
        text: "Be straightforward about what you need. Somewhere that cannot do early breakfasts would often rather tell you than have five unhappy guests at reception at half six.",
      },
      { t: "h2", text: "A note on booking sites" },
      {
        t: "p",
        text: "Aggregators are good at finding what exists and poor at long stays. The rates they show are nightly, the cancellation terms are often stricter, and the property may not be able to negotiate with you at all once a booking is in through a third party. Use them to build a shortlist, then call the properties directly.",
      },
      {
        t: "note",
        text: "We take no commission and run no booking engine, so we have nothing riding on where you book. Every listing here links straight to the operator.",
      },
    ],
  },

  {
    slug: "universal-studios-uk-what-we-know",
    metaTitle: "Universal Studios UK: what is confirmed so far",
    title: "Universal Studios UK: what is confirmed, what is not, and what it means for accommodation",
    description:
      "A plain summary of what has actually been confirmed about the Universal Studios UK development at Kempston Hardwick, and what it means for staying nearby.",
    tag: "Background",
    date: "2026-09-06",
    readingMinutes: 5,
    keywords: [
      "Universal Studios UK opening date",
      "Universal theme park Bedford",
      "Universal UK Kempston Hardwick",
      "when does Universal UK open",
    ],
    body: [
      {
        t: "p",
        text: "There is a lot of speculation about this project and comparatively little settled fact. It is worth separating the two, because a great deal of accommodation advice floating around is built on the speculative half.",
      },
      { t: "h2", text: "What is reasonably well established" },
      {
        t: "ul",
        items: [
          "The location: the former brickworks site at Kempston Hardwick, south of Bedford in Bedfordshire.",
          "The scale: a large resort development, substantially bigger than anything comparable in the UK, including on-site hotel accommodation as part of the published plans.",
          "The timeline: opening is expected around the start of the 2030s. It is a multi-year construction programme.",
          "The immediate effect: the people needing beds near the site right now are the ones building it.",
        ],
      },
      { t: "h2", text: "What is not settled" },
      {
        t: "p",
        text: "Almost everything else. Final layouts, the exact transport arrangements, the phasing of construction, and the opening date itself are all subject to change on a project of this length. Anyone quoting you a precise opening date as fact is going further than the published information supports.",
      },
      {
        t: "note",
        text: "This site is an independent directory. We are not connected to Universal, we have no inside information, and nothing here should be read as an official statement about the development.",
      },
      { t: "h2", text: "What it means if you need a bed" },
      {
        t: "p",
        text: "In the near term, demand around Bedford is construction demand: long stays, early starts, vans, weekly rates. That is what the accommodation market nearby is currently adapting to, and it is what our listings are oriented around.",
      },
      {
        t: "p",
        text: "Visitor demand is a different market and a later one. When it arrives it will be shorter stays, family rooms, and a very different set of priorities — and by then the on-site hotel will be part of the picture. There is not much point optimising for that now.",
      },
      {
        t: "p",
        text: "If you own accommodation in the area, the practical read is that the useful window is already open, and it is a business-travel window rather than a leisure one.",
      },
    ],
  },

  {
    slug: "bedford-area-guide-where-to-base-yourself",
    metaTitle: "Bedford area guide: where to base yourself",
    title: "Bedford area guide: which town to base yourself in",
    description:
      "Kempston, Elstow, Wixams, central Bedford or further out — an honest comparison of where to base yourself for work near the Universal Bedford site.",
    tag: "Area guide",
    date: "2026-09-05",
    readingMinutes: 6,
    keywords: [
      "Bedford hotels",
      "Kempston hotels",
      "Elstow accommodation",
      "Wixams accommodation",
      "Bedfordshire accommodation",
    ],
    body: [
      {
        t: "p",
        text: "Everywhere within a few miles of the site is technically convenient. They are not, however, the same place to spend two months. Here is the honest version.",
      },
      { t: "h2", text: "Kempston and Elstow" },
      {
        t: "p",
        text: "The closest option to the site, right by the A421. If your priority is the shortest possible commute, this is the answer, and it is not close. The trade-off is that there is not a great deal to do in the evening — this is edge-of-town and village territory, and you will drive for anything beyond a pub and a shop.",
      },
      { t: "h3", text: "Best for" },
      { t: "p", text: "Early starts, long rotations, anyone who would rather be asleep than out." },
      { t: "h2", text: "Central Bedford" },
      {
        t: "p",
        text: "Two to three miles out. You get a proper town: restaurants, the Embankment and the river, a station with fast trains to London, and a reasonable spread of hotels including the more comfortable end of the market. The cost is traffic — you are crossing the town's road network at the two times of day it is busiest.",
      },
      { t: "h3", text: "Best for" },
      {
        t: "p",
        text: "Longer postings where evenings matter, anyone arriving by train, and anyone who wants a choice of somewhere to eat that is not the hotel bar.",
      },
      { t: "h2", text: "Wixams" },
      {
        t: "p",
        text: "A newer settlement immediately south of Bedford and very close to the site. Quiet, modern, and light on amenities — it is a place to sleep rather than a destination. Rail provision here is one of the things expected to develop as the wider area does.",
      },
      { t: "h2", text: "Further out: Ampthill, Flitwick, Milton Keynes" },
      {
        t: "p",
        text: "Once you are past about ten miles the commute stops being trivial, and you should be getting something back for it — a better rate, a better room, or a town you would actually rather be in. Milton Keynes gives you the widest choice of chain hotels and the easiest road access; Ampthill and Flitwick give you smaller, quieter places down the A6.",
      },
      {
        t: "note",
        text: "Whichever you pick, check the parking arrangement before you book. It is the single most common source of unexpected cost on a long stay in this area.",
      },
    ],
  },

  {
    slug: "cutting-the-cost-of-a-long-stay",
    metaTitle: "Cutting the cost of a long stay near Bedford",
    title: "Cutting the cost of a long stay near Bedford: 10 things that actually work",
    description:
      "Practical ways to reduce the cost of long-stay accommodation near the Universal Bedford site, from negotiating weekly rates to avoiding hidden parking charges.",
    tag: "Tips & tricks",
    date: "2026-09-04",
    readingMinutes: 6,
    keywords: [
      "weekly rates hotels Bedford",
      "monthly accommodation Bedfordshire",
      "cheap accommodation near Universal Bedford",
      "negotiating hotel rates Bedford",
    ],
    body: [
      {
        t: "p",
        text: "Long stays are priced differently from short ones, and most of the savings come from asking rather than from searching. In rough order of how much they are worth:",
      },
      {
        t: "ol",
        items: [
          "Ask for a weekly or monthly rate explicitly. It is rarely advertised and is often well below the nightly rate multiplied out.",
          "Book direct. Properties keep more of a direct booking and can therefore discount it — and they can talk to you about terms, which a third party cannot.",
          "Count parking into the nightly figure before comparing anything. A daily charge over two months can exceed the entire price gap between two hotels.",
          "Check whether breakfast is included or added. On a long stay this is a large recurring number either way.",
          "Take a room with a kitchenette if the stay is over a month. Not eating out every night is usually the largest saving available.",
          "Ask about a block rate if there are several of you. Five rooms is a negotiation; one room is a transaction.",
          "Take the flexible rate if the programme is uncertain. Paying slightly more per night beats paying for a fortnight you did not use.",
          "Ask what a repeat booking is worth. If you will be back next month, say so — it is leverage now, not later.",
          "Look one town further out and price the fuel honestly. Sometimes it wins clearly; often it does not, and it is worth knowing which.",
          "Get the invoicing arrangement agreed up front if your employer is paying, so nothing gets stuck on your card.",
        ],
      },
      { t: "h2", text: "What does not work" },
      {
        t: "p",
        text: "Waiting for a late deal does not work for long stays — you are competing for the same rooms as everyone else on the project, and availability near a large construction site tends to tighten rather than loosen. Nor does splitting a two-month stay across several properties to chase individual bargains; you lose the long-stay rate that was the biggest saving on offer.",
      },
      {
        t: "note",
        text: "We do not publish nightly rates anywhere on this site, because any figure we printed would be stale within days and would not reflect what you would be quoted for a long stay. Ask the property.",
      },
    ],
  },
];

export const POSTS_BY_DATE = [...POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
