# Universal Studios Hotels

A mobile-first accommodation directory for the Universal UK development in
Bedfordshire — hotels, B&Bs, rentals and long stays, with the road distance to
the site shown on every entry.

Built from the standalone `Visitor Guide Template` HTML file, restructured as a
searchable directory. The brand, copy and listings are all original placeholder
content — see **Before launch** below.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.x, App Router, React 19.2.x |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4.3.x (CSS-first `@theme`, no `tailwind.config.js`) |
| Fonts | Geist + Geist Mono via `next/font/google` (self-hosted, no layout shift) |
| Deps | `clsx` + `tailwind-merge` for the `cn()` helper. Nothing else. |

Fully server-rendered and prerendered as static content.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Content

**`lib/site.ts`** — brand, nav, hero copy, value props, provider CTA, FAQ,
footer and the independence disclaimer. Everything site-specific lives here.

`brandSub` is deliberately "Independent guide" — the name references a mark
you do not own, so non-affiliation needs to be visible in the masthead as well
as the footer. Keep it there.

**`lib/listings.ts`** — the directory itself.

> The listings are **invented placeholder data**. The towns are real places
> around the Bedfordshire site so the distances read sensibly, but every
> property name, description and rate is made up. Replace this file with your
> real listings source.

Each listing carries a type, town, blurb, road distance, sleeps, indicative
nightly rate, featured flag and feature tags:

```ts
{
  slug: "the-old-granary",
  name: "The Old Granary",
  type: "House",
  town: "Wixams, Bedfordshire",
  miles: 0.9,
  featured: true,
  sleeps: 6,
  fromPrice: 145,
  addedDaysAgo: 4,
  features: ["Parking for 4", "Washer & dryer", "Weekly rates"],
}
```

## How search works

`components/DirectoryProvider.tsx` holds one piece of state — query, type,
sort, featured-only — and derives the filtered list from it. The hero search
panel, the property-type cards and the results section all read and write that
same state, so tapping **B&Bs** in the type grid filters the results below and
scrolls to them. Filtering is client-side over an in-memory array; swap the
`useMemo` for a fetch when the data moves to an API.

Sorts: featured first (then nearest), closest to site, newest on the list,
cheapest first.

## Theming

The entire visual theme derives from **one** custom property:

```css
/* app/globals.css */
:root {
  --accent: oklch(0.52 0.16 300);
}
```

Every tint, hover, ring and soft background is computed from it with
`color-mix()` in `@theme`. Change that line to re-skin the site.

## Layout

```
app/
  layout.tsx        fonts, metadata, viewport, DirectoryProvider
  page.tsx          section composition
  globals.css       design tokens + component/utility layers
  icon.svg          favicon
components/
  SiteHeader        sticky header + mobile menu panel
  Hero              headline + SearchPanel + at-a-glance stats
  SearchPanel       query / type / sort controls
  PropertyTypes     6 type cards, each filters the results
  FeaturedListings  featured rail (scroll-snap on mobile, grid on desktop)
  ListingsExplorer  results, active-filter chips, empty state
  ValueProps        why use the directory
  ProviderCta       "add your place" band
  Faq               accordion
  SiteFooter        columns, disclaimer, legal
lib/
  site.ts           all site copy
  listings.ts       directory data + property types
  icons.ts          24x24 stroked icon paths
  types.ts          content model
```

## Responsive behaviour

Mobile-first, verified in Chrome under device emulation at 375, 390, 412, 768
and 1280px — no horizontal page scroll at any width.

- Card grids run 1 → 2 → 3 columns; property types 2 → 3 → 6; footer 1 → 2 → 4.
- The featured rail is a scroll-snap carousel on phones and a plain grid from
  `lg` up, so cards never get squeezed.
- The search panel stacks on phones and becomes a single row on desktop.
- Mobile menu is a full panel with `Escape` to close, background scroll lock,
  and auto-close when the viewport reaches the desktop breakpoint.
- Touch targets are at least 44px. Body text is 16px on mobile (17px from `sm`)
  so iOS does not zoom on focus.
- Anchor scrolling clears the sticky header via `scroll-padding-top`.
- FAQ uses a `grid-template-rows` transition rather than measuring
  `scrollHeight`, so it reflows correctly on rotate.
- Pinch-zoom stays enabled, `prefers-reduced-motion` is respected, and the
  scroll-reveal always ends visible even if `IntersectionObserver` never fires.

## Not included

No CMS, database or auth. **Log in**, **Add your place** and the individual
listing pages are links to `#` — wire them up when you have a backend.

## Before launch

Checked against the code on 11 September 2026. Roughly in the order that
blocks going live.

### Blocking

- [ ] **Point `universalstudioshotels.co.uk` at the project.** The domain is
      bought but not attached — `vercel domains ls` shows only
      `kainovation.com` on the account, so the site is currently reachable
      only at `universalstudioshotels.vercel.app`. Vercel → Project →
      Settings → Domains.
- [ ] **Write Privacy and Terms.** Both are linked twice in the footer and
      both go nowhere. The site sets no cookies and runs no analytics, so a
      cookie policy may be unnecessary — but if that changes, it is not.

### Legal

- [ ] **Have a solicitor read the disclaimer** against the actual position.
      The name is built from a trademark that is not ours; the masthead,
      hero, FAQ and footer all state non-affiliation, but that is mitigation,
      not clearance.
- [ ] **Stand up the removal route.** The FAQ promises a listed hotel can ask
      to be taken down. That now reaches `hello@kainovation.com` — make sure
      somebody reads it.

### Content

- [ ] **Three listings have no official link:** Mercure Bedford Centre, The
      Bedford Swan, Woodlands Manor. They show "No official link on file yet"
      rather than a guessed URL.
- [ ] **Seven entries, all hotels.** Five of the six property types show
      "None yet". Growing it means sourcing addresses the same way — postcode
      verified against api.postcodes.io — or getting owners to submit.
- [ ] **No rates, room counts or amenities**, by design: unverifiable per
      property. They arrive when owners confirm their own details.
- [ ] **Photography.** Card images are generated illustrations and are
      labelled "Illustration" so they cannot pass as the real building.

### Dead links still in the footer

`What it costs`, `Help for owners`, the Facebook and Instagram icons, and the
four legal links. Either give them destinations or remove them.

### Infrastructure

- [ ] **Auto-deploy.** Pushing to GitHub does not deploy; each release is
      `vercel deploy --prod` by hand. Fixing it needs the Vercel GitHub App
      authorised on the `saveeshdsofficial-afk` account — the Vercel login
      (`shayeny`) is a different identity, which is why `vercel git connect`
      returns "need admin or write access".
- [ ] **Submit the sitemap** to Google Search Console and Bing Webmaster
      Tools once the real domain resolves. `sitemap.xml` and `robots.txt` are
      already live.

### Done

Real listings with verified postcodes and computed distances · six guides at
`/blog` · 14-entry FAQ with FAQPage schema · full metadata, OpenGraph, JSON-LD,
sitemap and robots · brand tokens and `/style-guide` · every contact CTA wired
to email · mobile-responsive and verified at 375–1280px.
