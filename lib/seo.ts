import type { Metadata } from "next";
import { SITE } from "./site";

export const BASE_URL = `https://${SITE.domain}`;

/**
 * Keyword sets.
 *
 * A note on the `keywords` meta tag: Google has ignored it since 2009 and
 * Bing treats it as a spam signal, so it earns nothing on its own. It is
 * emitted because it costs nothing and some smaller crawlers still read it —
 * but the terms below matter because they shape titles, headings, slugs and
 * body copy, which is what actually ranks. Keep them honest: every phrase
 * here should describe something the page genuinely covers.
 */
export const KEYWORDS = {
  core: [
    "hotels near Universal Studios UK",
    "hotels near Universal UK",
    "Universal Studios UK hotels",
    "accommodation near Universal Bedford",
    "where to stay near Universal Studios UK",
    "hotels near Kempston Hardwick",
    "Universal Bedford accommodation",
    "hotels near Universal theme park Bedford",
  ],
  place: [
    "Bedford hotels",
    "Bedfordshire accommodation",
    "Kempston hotels",
    "Elstow accommodation",
    "Wixams accommodation",
    "Marston Moretaine accommodation",
    "Milton Keynes hotels",
    "hotels near A421",
    "hotels near A6 Bedford",
  ],
  audience: [
    "contractor accommodation Bedford",
    "long stay accommodation Bedford",
    "weekly rates hotels Bedford",
    "monthly accommodation Bedfordshire",
    "crew accommodation Universal Bedford",
    "project team accommodation Bedford",
  ],
  intent: [
    "closest hotel to Universal UK site",
    "how far is Bedford from Universal Studios UK",
    "Universal Studios UK opening date",
    "getting to Universal Studios UK",
    "Universal UK travel guide",
    "independent Universal UK hotel guide",
  ],
} as const;

/**
 * Clusters from the content plan. These are *candidates*: the plan's own rule
 * is that tickets, parking and resort facilities get described only once
 * confirmed, so several of these are deliberately not yet page topics. They
 * sit here to steer research and future pages, not to be stuffed into a tag.
 */
export const KEYWORD_CLUSTERS = {
  resort: [
    "universal studios uk",
    "universal studios bedford",
    "universal theme park uk",
    "universal uk resort",
    "where is universal studios uk",
  ],
  openingUpdates: [
    "universal studios uk opening date",
    "when will universal studios uk open",
    "universal bedford opening date",
    "universal uk construction updates",
  ],
  hotelsNearby: [
    "hotels near universal studios bedford",
    "hotels near universal uk",
    "accommodation near universal bedford",
    "best hotels near universal uk",
    "cheap hotels near universal bedford",
    "bed and breakfast near universal bedford",
  ],
  bedfordKempston: [
    "bedford hotels for universal uk",
    "family hotels bedford",
    "bedford hotels with parking",
    "hotels near kempston hardwick",
    "bedford town centre hotels",
    "bedford hotels near train station",
  ],
  wixamsStewartby: [
    "hotels near wixams",
    "accommodation near wixams",
    "hotels near stewartby",
    "wixams to universal bedford",
  ],
  miltonKeynes: [
    "milton keynes hotels for universal uk",
    "milton keynes to universal bedford",
    "bedford or milton keynes for universal uk",
    "hotels between milton keynes and bedford",
  ],
  lutonAirport: [
    "luton airport to universal bedford",
    "hotels near luton airport for universal uk",
    "luton airport to bedford train",
  ],
  london: [
    "london to universal uk",
    "universal uk day trip from london",
    "london to bedford train for universal uk",
  ],
  trainTransfers: [
    "universal uk nearest train station",
    "how to get to universal bedford by train",
    "bedford station to universal uk",
    "universal bedford public transport",
  ],
  familyAccessibility: [
    "family hotels near universal uk",
    "bedford hotels with family rooms",
    "accessible hotels bedford",
    "pet friendly hotels bedford",
  ],
  budgetGroups: [
    "budget hotels near universal bedford",
    "group accommodation near universal uk",
    "apartments near universal bedford",
    "self catering near universal uk",
  ],
  tripPlanning: [
    "universal uk trip planner",
    "how many days for universal uk",
    "universal uk travel guide",
    "best time to visit universal uk",
  ],
  nearbyActivities: [
    "things to do near universal bedford",
    "bedford family attractions",
    "places to eat near universal bedford",
  ],
} as const;

export const ALL_KEYWORDS: string[] = [
  ...new Set([
    ...KEYWORDS.core,
    ...KEYWORDS.place,
    ...KEYWORDS.audience,
    ...KEYWORDS.intent,
    ...Object.values(KEYWORD_CLUSTERS).flat(),
  ]),
];

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE.brand} — independent guide to staying near the ${SITE.park} site`,
};

/** Shared shape for every page's metadata, so no page forgets canonical or OG. */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  /** Skip the "| Brand" suffix — used where the title is already at length. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...(keywords ?? ALL_KEYWORDS)],
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.brand,
      locale: "en_GB",
      images: [OG_IMAGE],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/* ---------------------------------------------------------------- JSON-LD */

/**
 * Structured data is the part of this file that search engines actually act
 * on — rich results for the FAQ, article cards for the guides, and a clear
 * statement that this organisation is unaffiliated with Universal.
 */
export function organisationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: SITE.brand,
    url: BASE_URL,
    description: SITE.footer.blurb,
    disambiguatingDescription: SITE.disclaimer,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${SITE.region}, United Kingdom`,
    },
    knowsAbout: [...KEYWORDS.core],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE.brand,
    inLanguage: "en-GB",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

export function faqLd(faq: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.path === "/" ? BASE_URL : `${BASE_URL}${t.path}`,
    })),
  };
}
