"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

/**
 * Universal Stay Guide — landing page.
 *
 * Section order is the one set out in the brief: top bar, header, hero with
 * search card, trust strip, featured guide, where to stay by town, hotel
 * picks, park news, latest blog, plan-your-stay band, newsletter, footer.
 *
 * Two rules the brief sets that shape the code:
 *   · the park is only ever "announced" or "planned" — no date is stated as
 *     fact, and every forward-looking line says so
 *   · every Booking.com link carries rel="sponsored nofollow"
 *
 * The wordmark is "Parkline", deliberately: the brief says the name must not
 * imply an official Universal site, so the mark carries no Universal wording.
 */

const ARCHIVO = "var(--font-archivo), 'Archivo', sans-serif";
const SANS = "var(--font-public-sans), 'Public Sans', system-ui, sans-serif";
const SERIF = "var(--font-source-serif), 'Source Serif 4', Georgia, serif";

const INK = "#17181B";
const SOFT = "#3A3B40";
const MUTED = "#5B5D63";
const LINE = "#E4E4DE";
const PAPER = "#FAFAF7";
const TINT = "#EEF2FF";
const TINT_LINE = "#D9E1FF";
const BLUE = "#1F4BFF";
const BLUE_INK = "#1F45E6";

const GUTTER = "max(24px, calc((100vw - 1200px) / 2))";

const SPONSORED = "sponsored nofollow noopener noreferrer";

/** Booking.com search for a town, with the affiliate id when one is set. */
function booking(q: string) {
  const u = new URL("https://www.booking.com/searchresults.html");
  u.searchParams.set("ss", q);
  u.searchParams.set("lang", "en-gb");
  const aid = process.env.NEXT_PUBLIC_BOOKING_AID;
  if (aid) u.searchParams.set("aid", aid);
  return u.toString();
}

const BLUE_BTN: CSSProperties = {
  background: "linear-gradient(180deg,#3A63FF 0%,#1F4BFF 55%,#1A42EC 100%)",
  color: "#FFFFFF",
  textDecoration: "none",
  borderRadius: 999,
  fontWeight: 700,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,.28), 0 2px 4px rgba(31,75,255,.25), 0 14px 32px -10px rgba(31,75,255,.6)",
  transition: "transform .15s, box-shadow .15s",
};

const GHOST_BTN: CSSProperties = {
  background: "#FFFFFF",
  color: INK,
  border: `1px solid ${LINE}`,
  borderRadius: 999,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)",
  transition: "transform .15s, box-shadow .15s",
};

const CHIP: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  padding: "3px 8px",
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
};

const PILL: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,.92)",
  boxShadow: "0 1px 2px rgba(23,24,27,.08)",
};

const NOISE =
  "url(data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27160%27%20height%3D%27160%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%27.85%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20.07%200%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E)";

const Arrow = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
const Right = ({ s = 16, w = 2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Tick = ({ s = 14, c = BLUE, w = 2 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const SectionRule = ({ n, label, link }: { n: string; label: string; link?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: BLUE }}>{n}</span>
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</span>
    <span style={{ flex: 1, height: 1, background: LINE }} />
    {link ? <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>{link} →</a> : null}
  </div>
);

/* ------------------------------------------------------------------ data */
const TOWNS = [
  { name: "Bedford", img: "/images/towns/bedford.jpg", note: "Closest town to the site", body: "The Embankment, the Great Ouse and the widest choice of rooms within a few miles of Kempston Hardwick.", count: "Most options" },
  { name: "Milton Keynes", img: "/images/towns/milton-keynes.jpg", note: "25 min by road", body: "Big chain hotels, easy parking and a straight run along the A421. Good value when Bedford fills up.", count: "Easiest parking" },
  { name: "Luton", img: "/images/towns/luton.jpg", note: "Airport on the doorstep", body: "Worth a look if you are flying in, or want a cheaper base with a direct train north into Bedford.", count: "Best for flights" },
  { name: "London", img: "/images/towns/london.jpg", note: "Under an hour by train", body: "Make it a city break with a day out in Bedfordshire. Fast services run into Bedford from St Pancras.", count: "City break" },
];

/* Four real Bedfordshire hotels, photographed. Two carry their name on the
   signage, so the caption names all four rather than implying anything. */
const HOTEL_PICS = [
  { src: "/images/hotels/swan.jpg", alt: "The Swan Hotel on Bedford Embankment, seen from across the Great Ouse" },
  { src: "/images/hotels/mill.jpg", alt: "The Mill Hotel, a white-painted corner building in Bedford" },
  { src: "/images/hotels/woodland.jpg", alt: "Woodland Manor Hotel, a stone country house at Clapham near Bedford" },
  { src: "/images/hotels/bell.jpg", alt: "The Bell Hotel, a red-brick coaching inn in Woburn" },
];


const NEWS = [
  { tag: "Planning", img: "/images/news/planning.jpg", title: "What has actually been announced about the Bedfordshire park", meta: "Updated Oct 2026" },
  { tag: "Transport", img: "/images/news/transport.jpg", title: "The roads and rail lines that will carry visitors in", meta: "Updated Sep 2026" },
  { tag: "Timeline", img: "/images/news/timeline.jpg", title: "Why nobody can give you an opening date yet", meta: "Updated Sep 2026" },
];

const POSTS = [
  { cat: "Area guide", img: "/images/guides/bedford-area-guide-where-to-base-yourself.jpg", title: "Which Bedfordshire town to base yourself in", meta: "6 min read" },
  { cat: "Getting there", img: "/images/guides/getting-to-the-universal-uk-site.jpg", title: "Trains, the M1 and the A421: how to reach the site", meta: "5 min read" },
  { cat: "Where to stay", img: "/images/guides/hotels-closest-to-the-site.jpg", title: "Hotels closest to the Kempston Hardwick site", meta: "6 min read" },
  { cat: "Tips", img: "/images/guides/cutting-the-cost-of-a-long-stay.jpg", title: "Cutting the cost of a long stay in Bedfordshire", meta: "6 min read" },
  { cat: "Days out", img: "/images/areas/central-bedford.jpg", title: "A weekend in Bedford that is not just the park", meta: "7 min read" },
  { cat: "Planning", img: "/images/guides/contractor-accommodation-bedford-checklist.jpg", title: "Nine things to check before you book anything", meta: "7 min read" },
];

/* Every photo is a real, freely-licensed image from Wikimedia Commons. Credit is a
   condition of the CC BY and CC BY-SA licences, so it is published, not optional. */
const PHOTOS = [
  { c: "Bedford bridge over the Great Ouse", by: "Jim", lic: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Bedford_Bridge_On_The_River_Great_Ouse.jpg", licUrl: "https://creativecommons.org/licenses/by/2.0/" },
  { c: "Bedford Embankment, beside the Great Ouse", by: "Ronald Saunders from Warrington, UK", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Flickr_-_ronsaunders47_-_BEDFORD_EMBANKMENT..jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "Milton Keynes city centre", by: "John Chryslar", lic: "CC0", url: "https://commons.wikimedia.org/wiki/File:Milton_Keynes_Sainsburys-Hub_Skyline.jpg", licUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  { c: "Luton town centre, seen from the station exit", by: "Robert Eva", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Luton_town_centre_from_the_railway_station_exit._-_geograph.org.uk_-_5432104.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "St Pancras International, London", by: "mattbuck", lic: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:St_Pancras_railway_station_MMB_A7.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  { c: "Elstow Abbey, a mile from the park site", by: "Poliphilo", lic: "CC0", url: "https://commons.wikimedia.org/wiki/File:Elstow_Abbey_from_east.jpg", licUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  { c: "The M1 through Bedfordshire", by: "Lewis Clarke", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Central_Bedfordshire_-_M1_Motorway_(geograph_5733152).jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "Harpur Square market, Bedford", by: "Paul Gillett", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Harpur_Square_Market,_Bedford_-_geograph.org.uk_-_2948619.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "The High Street, Bedford", by: "PAUL FARMER", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:The_Bear,_Public_House,_High_Street,_Bedford_-_geograph.org.uk_-_3283295.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "Elstow village, a mile from the site", by: "Simon Burchell", lic: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Village_Farmhouse,_Elstow.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { c: "The suspension bridge on the Great Ouse, Bedford", by: "Simon Speed", lic: "Public domain", url: "https://commons.wikimedia.org/wiki/File:BedfordSuspensionBridge.JPG", licUrl: "" },
  { c: "The platform at Kempston Hardwick", by: "Bikeboy", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Kempston_Hardwick_railway_station_-_geograph.org.uk_-_4547847.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "The A421 south of Bedford", by: "David Howard", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Roxton_Road_crossing_the_A421_-_geograph.org.uk_-_6947323.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "Ampthill Park, Bedfordshire", by: "Philip Jeffrey", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Ampthill_Park_House_seen_across_the_fields_-_geograph.org.uk_-_3498686.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "The White Lion, a former coaching inn at Elstow", by: "PAUL FARMER", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Former_coaching_Inn_The_White_Lion_High_Street_Elstow_-_geograph.org.uk_-_1675438.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "The Swan, Bedford Embankment", by: "Gary Houston", lic: "CC0", url: "https://commons.wikimedia.org/wiki/File:Swan-Hotel-Bedford-20050921-007.jpg", licUrl: "https://creativecommons.org/publicdomain/zero/1.0/" },
  { c: "The Mill, Bedford", by: "Dave Bevis", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Bedford_-_The_Mill_Hotel_-_geograph.org.uk_-_3832245.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "Woodland Manor, Clapham", by: "Jeff Gogarty", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Woodland_Manor_Hotel,_Clapham_Green,_Bedford_-_geograph.org.uk_-_7575369.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { c: "The Bell, Woburn", by: "Robert Eva", lic: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Bell_Hotel,_Woburn_-_geograph.org.uk_-_5234113.jpg", licUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
];

const STEPS = [
  { n: "01", t: "Pick your base", d: "Bedford for closeness, Milton Keynes for value and parking, Luton if you are flying, London for a city break." },
  { n: "02", t: "Work out the journey", d: "The A421 and the M1 do most of the work by road. Trains run into Bedford from St Pancras and along the Marston Vale line." },
  { n: "03", t: "Book when it suits", d: "Compare live prices on Booking.com. Most rooms still come with free cancellation." },
];

export default function Page() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <style>{`
        body{background:#FAFAF7;margin:0;overflow-x:clip}
        .p a{color:#17181B;text-decoration:none}
        .p a:hover{color:#1F4BFF}
        .p .bb:hover{transform:translateY(-1px);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 3px 6px rgba(31,75,255,.3),0 20px 40px -10px rgba(31,75,255,.7)}
        .p .gb:hover{transform:translateY(-1px);border-color:#1F4BFF;color:#1F4BFF}
        .p .lift:hover{transform:translateY(-4px);box-shadow:0 2px 4px rgba(23,24,27,.05),0 28px 56px -18px rgba(23,24,27,.26)}
        .p .soft:hover{background:#FAFAF7}
      `}</style>

      <div className="p" style={{ width: "100%", background: PAPER, color: INK, fontFamily: SANS, fontSize: 16, lineHeight: 1.6 }}>

        {/* 1 — top bar: the disclosure, above everything */}
        <div style={{ background: INK, color: "#D6D7DB", fontSize: 13, display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "8px 24px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
          </svg>
          <span>Independent guide to the planned Bedfordshire park. Some hotel links earn us a commission.</span>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "underline", textUnderlineOffset: 3 }}>How we work</a>
        </div>

        {/* 2 — header */}
        <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(250,250,247,.86)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(23,24,27,.04), 0 8px 24px -12px rgba(23,24,27,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `16px ${GUTTER}` }}>
            <a href="#" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em", lineHeight: 1 }}>
                Parkline<span style={{ color: BLUE }}>.</span>
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: MUTED }}>Bedfordshire stay guide</span>
            </a>
            <nav style={{ display: "flex", gap: 32, fontSize: 15, fontWeight: 500 }}>
              <a href="#news">Park news</a><a href="#towns">Where to stay</a><a href="#guides">Guides</a><a href="#getting-there">Getting there</a><a href="#blog">Days out</a>
            </nav>
            <a className="gb" href="#guides" style={{ ...GHOST_BTN, display: "inline-flex", alignItems: "center", gap: 10, padding: "11px 20px", fontSize: 14 }}>
              Start planning<Right s={15} />
            </a>
          </div>
        </header>

        {/* 3 — hero: the park is not open, and the page says so first */}
        <section style={{ position: "relative", height: 720, display: "flex", alignItems: "flex-end", padding: `0 ${GUTTER} 128px`, overflow: "hidden" }}>
          <Image src="/images/hero.jpg" alt="" fill priority sizes="1440px" style={{ objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(23,24,27,.58) 0%,rgba(23,24,27,.26) 30%,rgba(23,24,27,.5) 60%,rgba(23,24,27,.9) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 24, maxWidth: 940, color: "#FFFFFF" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", padding: "7px 16px 7px 12px", borderRadius: 999, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.28)", backdropFilter: "blur(8px)", fontSize: 13, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8FA6FF", boxShadow: "0 0 0 4px rgba(143,166,255,.25)" }} />
              Independent guide · Bedfordshire, UK
            </div>
            <h1 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 96, lineHeight: 0.93, letterSpacing: "-0.045em", textWrap: "balance" }}>
              Stay close.<br />Make a trip of it.
            </h1>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 22, lineHeight: 1.5, maxWidth: 620, color: "#F1F1F3" }}>
              The independent guide to Bedfordshire for anyone heading to the planned theme park near Bedford. Where to stay, how to get there, and what else is worth your time while you are in the area.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 8 }}>
              <a className="gb" href="#guides" style={{ ...GHOST_BTN, display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", fontSize: 16 }}>
                Read the guides<Right />
              </a>
              <a href="#news" style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
                What is confirmed so far
              </a>
            </div>
          </div>
        </section>

        {/* 4 — trust strip */}
        <section style={{ padding: `96px ${GUTTER}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))" }}>
            {[
              { b: "4 towns", s: "Bedford, Milton Keynes, Luton and London" },
              { b: "0.6 mi", s: "from the site to the nearest hotel we list" },
              { b: "0", s: "paid placements or sponsored reviews" },
              { b: "Free", s: "to read, no sign-up, no paywall" },
            ].map((t) => (
              <div key={t.s} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 32px", borderLeft: `1px solid ${LINE}` }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 36, letterSpacing: "-0.04em", lineHeight: 1.1 }}>{t.b}</span>
                <span style={{ fontSize: 14, color: MUTED }}>{t.s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5 — featured guide */}
        <section id="guides" style={{ padding: `0 ${GUTTER} 128px` }}>
          <SectionRule n="01" label="Featured guide" link="All guides" />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)", gap: 48, alignItems: "start" }}>
            <a href="#" style={{ position: "relative", display: "block", marginLeft: `calc(-1 * ${GUTTER})` }}>
              <div style={{ position: "relative", height: 600, borderRadius: "0 24px 24px 0", overflow: "hidden" }}>
                <Image src="/images/guides/where-to-stay-near-universal-studios-uk.jpg" alt="" fill sizes="900px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 24, left: `calc(${GUTTER} + 24px)`, display: "flex", gap: 8 }}>
                  <span style={PILL}>Where to stay</span>
                  <span style={PILL}>6 min read</span>
                  <span style={{ ...PILL, background: INK, color: "#fff" }}>Updated 2026</span>
                </div>
              </div>
              <div className="lift" style={{ position: "relative", margin: "-160px -48px 0 200px", background: "#FFFFFF", borderRadius: 16, padding: 40, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 24px 56px -16px rgba(23,24,27,.22)", transition: "transform .2s, box-shadow .2s" }}>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 44, lineHeight: 1.02, letterSpacing: "-0.035em", textWrap: "balance" }}>Where to stay near the Bedfordshire site, town by town</h2>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, color: SOFT }}>Kempston and Elstow sit closest. Bedford gives you a town. Milton Keynes and Luton trade a longer drive for easier parking and cheaper rooms. Here is how they actually compare.</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, paddingTop: 8 }}>Read the guide <Right /></span>
              </div>
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>
              {POSTS.slice(1, 3).map((g) => (
                <a key={g.title} className="lift" href="#" style={{ display: "grid", gridTemplateColumns: "168px minmax(0,1fr)", gap: 24, padding: 16, borderRadius: 16, background: "#FFFFFF", border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)", transition: "transform .2s, box-shadow .2s" }}>
                  <div style={{ position: "relative", height: 168, borderRadius: 8, overflow: "hidden" }}>
                    <Image src={g.img} alt="" fill sizes="168px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 8px 8px 0" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: BLUE_INK }}>{g.cat}</span>
                    <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 23, lineHeight: 1.15, letterSpacing: "-0.025em" }}>{g.title}</h3>
                    <span style={{ marginTop: "auto", fontSize: 13, color: MUTED }}>{g.meta}</span>
                  </div>
                </a>
              ))}
              <div style={{ padding: 24, borderRadius: 16, border: "1px dashed #C9CBD2", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ position: "relative", width: 72, height: 72, flex: "none", borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 0 4px #FFFFFF, 0 6px 16px -6px rgba(23,24,27,.25)" }}>
                  <Image src="/images/avatar.jpg" alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
                </div>
                <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.5, color: SOFT }}>
                  &ldquo;We write the guide first. If a hotel link follows, it is because it fits — never because it pays more.&rdquo;
                  <span style={{ fontFamily: SANS, fontStyle: "normal", fontSize: 13, color: MUTED, display: "block", marginTop: 4 }}>How we work</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 — where to stay by town */}
        <section id="towns" style={{ padding: `112px ${GUTTER} 200px`, backgroundColor: TINT, backgroundImage: NOISE }}>
          <SectionRule n="02" label="Where to stay by town" />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, alignItems: "end", marginBottom: 48, marginTop: -16 }}>
            <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.04em" }}>Start with the town.</h2>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, color: SOFT, maxWidth: 480 }}>Which town suits you depends on what you want from the trip: the shortest drive, the easiest parking, a station on the doorstep, or a city break attached to it. Here is how the four compare.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24 }}>
            {TOWNS.map((t) => (
              <div key={t.name} className="lift" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 8px 24px", borderRadius: 24, background: "#FFFFFF", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.14)", transition: "transform .2s, box-shadow .2s" }}>
                <div style={{ position: "relative", height: 300, borderRadius: 16, overflow: "hidden" }}>
                  <Image src={t.img} alt="" fill sizes="300px" style={{ objectFit: "cover" }} />
                  <span style={{ ...PILL, position: "absolute", top: 12, left: 12 }}>{t.count}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                  <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, letterSpacing: "-0.03em" }}>{t.name}</h3>
                  <span style={{ fontSize: 13, fontWeight: 600, color: BLUE_INK }}>{t.note}</span>
                  <p style={{ margin: "4px 0 0", fontSize: 15, lineHeight: 1.5, color: MUTED }}>{t.body}</p>
                  <a className="bb" href={booking(`${t.name}, UK`)} target="_blank" rel={SPONSORED} style={{ ...BLUE_BTN, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 16px", fontSize: 14, marginTop: 14 }}>
                    View on Booking.com<Arrow s={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 — hotel picks */}
        <section style={{ padding: `0 ${GUTTER} 128px`, backgroundColor: "#FFFFFF", backgroundImage: `linear-gradient(180deg,${TINT} 0,${TINT} 120px,#FFFFFF 120px)` }}>
          <div style={{ position: "relative", top: -104, marginBottom: -104 }}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: BLUE }}>03</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Hotels near the site</span>
              </div>
              <span style={{ fontSize: 13, color: MUTED }}>Real places, photographed — not stock images</span>
            </div>
            <div style={{ borderRadius: 24, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${LINE}`, boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 24px 56px -20px rgba(23,24,27,.24)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 2, background: LINE }}>
                {HOTEL_PICS.map((h) => (
                  <div key={h.src} style={{ position: "relative", height: 320 }}>
                    <Image src={h.src} alt={h.alt} fill sizes="(max-width: 900px) 50vw, 300px" style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
              <div style={{ padding: 32, display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 40, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, color: SOFT }}>
                    Bedford holds the most choice within a few miles of the site, from Georgian hotels on the
                    Embankment to the chains along the A421 at Kempston and Elstow. Prices move daily, so we send you
                    to the live listings rather than print a number that is wrong by the time you read it.
                  </p>
                  <span style={{ fontSize: 13, color: MUTED }}>
                    Pictured, left to right: The Swan on Bedford Embankment, The Mill in Bedford, Woodland Manor at
                    Clapham, and The Bell at Woburn.
                  </span>
                </div>
                <a className="bb" href={booking("Bedford, Bedfordshire, UK")} target="_blank" rel={SPONSORED} style={{ ...BLUE_BTN, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "16px 24px", fontSize: 16, whiteSpace: "nowrap" }}>
                  View hotels<span style={{ ...CHIP, fontSize: 12 }}>Booking.com</span><Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8 — park news */}
        <section id="news" style={{ padding: `112px ${GUTTER} 128px`, background: PAPER, borderTop: `1px solid ${LINE}` }}>
          <SectionRule n="04" label="Park news and updates" link="All updates" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 32 }}>
            {NEWS.map((n) => (
              <a key={n.title} className="lift" href="#" style={{ display: "flex", flexDirection: "column", borderRadius: 24, background: "#FFFFFF", overflow: "hidden", border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)", transition: "transform .2s, box-shadow .2s" }}>
                <div style={{ position: "relative", height: 220 }}>
                  <Image src={n.img} alt="" fill sizes="400px" style={{ objectFit: "cover" }} />
                  <span style={{ ...PILL, position: "absolute", top: 14, left: 14 }}>{n.tag}</span>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 22, lineHeight: 1.18, letterSpacing: "-0.025em" }}>{n.title}</h3>
                  <span style={{ marginTop: "auto", fontSize: 13, color: MUTED }}>{n.meta}</span>
                </div>
              </a>
            ))}
          </div>
          <p style={{ margin: "32px 0 0", fontSize: 14, color: MUTED, maxWidth: 760 }}>
            We only report what has been formally announced. Where a detail is unconfirmed — including anything about an opening date — we say so rather than filling the gap.
          </p>
        </section>

        {/* 9 — latest blog */}
        <section id="blog" style={{ padding: `112px ${GUTTER} 128px`, background: "#FFFFFF" }}>
          <SectionRule n="05" label="Latest from the journal" link="Visit the journal" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "48px 32px" }}>
            {POSTS.map((p) => (
              <a key={p.title} className="soft" href="#" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 8, margin: -8, borderRadius: 24, transition: "background .2s" }}>
                <div style={{ position: "relative", height: 240, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)" }}>
                  <Image src={p.img} alt="" fill sizes="380px" style={{ objectFit: "cover" }} />
                  <span style={{ ...PILL, position: "absolute", top: 12, left: 12 }}>{p.cat}</span>
                </div>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.025em", textWrap: "pretty" }}>{p.title}</h3>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: MUTED }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>{p.meta}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 10 — plan your stay band */}
        <section id="getting-there" style={{ position: "relative", padding: `128px ${GUTTER}`, background: `radial-gradient(ellipse 60% 80% at 85% 0%,rgba(31,75,255,.22) 0%,rgba(31,75,255,0) 60%),${INK}`, color: "#FFFFFF", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#8FA6FF" }}>06</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#D6D7DB" }}>Plan your stay</span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.14)" }} />
          </div>
          <h2 style={{ margin: "0 0 64px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 72, lineHeight: 0.96, letterSpacing: "-0.045em", maxWidth: 900 }}>Three steps to a trip worth the drive.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24, marginBottom: 64 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, borderRadius: 24, background: "linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02))", border: "1px solid rgba(255,255,255,.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 64, lineHeight: 1, letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1.5px #8FA6FF" }}>{s.n}</span>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em" }}>{s.t}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#C5C7CD" }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a className="bb" href={booking("Bedford, UK")} target="_blank" rel={SPONSORED} style={{ ...BLUE_BTN, display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 24px 18px 32px", fontSize: 18 }}>
              Browse stays near Bedford<span style={{ ...CHIP, fontSize: 12 }}>Booking.com</span><Arrow s={18} />
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#D6D7DB" }}>
              <Tick c="#8FA6FF" />Free cancellation on most rooms
            </span>
          </div>
        </section>

        {/* 11 — newsletter */}
        <section style={{ padding: `112px ${GUTTER}`, background: PAPER }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", gap: 64, alignItems: "center", padding: 64, borderRadius: 24, border: `1px solid ${TINT_LINE}`, backgroundColor: TINT, backgroundImage: NOISE, boxShadow: "0 1px 2px rgba(23,24,27,.04), 0 24px 56px -28px rgba(31,75,255,.35)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: BLUE_INK }}>The monthly letter</span>
              <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: "-0.04em" }}>One email a month, when there is news.</h2>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: SOFT }}>Planning milestones, new guides and anything confirmed about the Bedfordshire project. Nothing else.</p>
            </div>
            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = new FormData(e.currentTarget).get("email");
                  /* No mailing-list backend yet, so this opens a real email
                     rather than pretending to have subscribed anyone. */
                  window.location.href = `mailto:hello@kainovation.com?subject=${encodeURIComponent("Newsletter sign-up")}&body=${encodeURIComponent(`Please add ${email ?? ""} to the monthly letter.`)}`;
                  setSent(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={{ display: "flex", gap: 8, padding: 8, borderRadius: 999, background: "#FFFFFF", border: `1px solid ${TINT_LINE}`, boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.14)" }}>
                  <input name="email" type="email" required placeholder="you@example.co.uk" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", padding: "0 16px", fontSize: 16, color: INK, font: "inherit" }} />
                  <button type="submit" style={{ border: 0, borderRadius: 999, background: INK, color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px 24px", cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
                </div>
                <span style={{ fontSize: 13, color: MUTED, paddingLeft: 16 }}>Opens your email app. We never share your address.</span>
              </form>
            ) : (
              <div style={{ padding: 24, borderRadius: 16, background: "#FFFFFF", fontWeight: 600, fontSize: 17 }}>Thanks — send that email and we will add you.</div>
            )}
          </div>
        </section>

        {/* 12 — footer */}
        <footer style={{ background: "#FFFFFF", borderTop: `1px solid ${LINE}`, padding: `80px ${GUTTER} 48px`, display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 28, letterSpacing: "-0.04em", lineHeight: 1 }}>Parkline<span style={{ color: BLUE }}>.</span></span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, maxWidth: 320 }}>An independent journal about Bedfordshire, the planned theme park, and where to stay when you visit.</span>
            </div>
            {[
              { h: "Guides", l: ["Where to stay by town", "Getting there", "Days out", "Where to eat"] },
              { h: "Towns", l: ["Bedford", "Milton Keynes", "Luton", "London"] },
              { h: "The park", l: ["Park news", "What is confirmed", "Timeline"] },
              { h: "About", l: ["About us", "Affiliate disclosure", "Contact", "Privacy"] },
            ].map((c) => (
              <div key={c.h} style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
                <strong style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>{c.h}</strong>
                {c.l.map((x) => <a key={x} href="#" style={{ color: MUTED }}>{x}</a>)}
              </div>
            ))}
          </div>
          <details style={{ paddingTop: 32, borderTop: `1px solid ${LINE}`, fontSize: 13, lineHeight: 1.65, color: MUTED }}>
            <summary style={{ cursor: "pointer", color: INK, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>
              Photo credits
            </summary>
            <p style={{ margin: "16px 0 12px" }}>
              Photographs are freely licensed images from Wikimedia Commons, cropped to fit. Where a photo carries a
              share-alike licence, our crop is offered under that same licence. Illustrations elsewhere on the page are
              drawings, not photographs.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "6px 32px" }}>
              {PHOTOS.map((ph) => (
                <li key={ph.url}>
                  {ph.c} — <a href={ph.url} rel="noopener noreferrer" target="_blank" style={{ color: MUTED, textDecoration: "underline", textUnderlineOffset: 3 }}>{ph.by}</a>
                  {", "}
                  {ph.licUrl
                    ? <a href={ph.licUrl} rel="license noopener noreferrer" target="_blank" style={{ color: MUTED, textDecoration: "underline", textUnderlineOffset: 3 }}>{ph.lic}</a>
                    : ph.lic}
                </li>
              ))}
            </ul>
          </details>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, paddingTop: 32, borderTop: `1px solid ${LINE}`, fontSize: 13, lineHeight: 1.65, color: MUTED }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: INK }}>Affiliate disclosure.</strong> Booking.com is our only partner. When you book through one of our links we may earn a commission, at no extra cost to you. It never decides what we write or which places we recommend. <a href="#" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>Read the full disclosure</a>.
            </p>
            <p style={{ margin: 0 }}>
              Independent site. Not affiliated with, endorsed by or connected to Universal Studios, Universal Destinations &amp; Experiences or Comcast NBCUniversal. All trademarks belong to their owners. The park described here is announced and planned; nothing on this site should be read as confirmation of dates or details. © 2026 Parkline.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
