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
 * The wordmark is "Ride to Universal" at the owner's request. The supplied
 * brief asked for a name that does not imply an official Universal site, so
 * the footer disclaimer carries that weight on its own now.
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
  borderRadius: 10,
  fontWeight: 700,
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,.28), 0 2px 4px rgba(31,75,255,.25), 0 14px 32px -10px rgba(31,75,255,.6)",
  transition: "transform .15s, box-shadow .15s",
};

const GHOST_BTN: CSSProperties = {
  background: "#FFFFFF",
  color: INK,
  border: `1px solid ${LINE}`,
  borderRadius: 10,
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

const SectionRule = ({ label, link }: { label: string; link?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</span>
    <span style={{ flex: 1, height: 1, background: LINE }} />
    {link ? <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>{link} →</a> : null}
  </div>
);

/* ------------------------------------------------------------------ data */




const POSTS = [
  { cat: "Area guide", img: "/images/guides/bedford-area-guide-where-to-base-yourself.jpg", title: "Which Bedfordshire town to base yourself in", meta: "6 min read" },
  { cat: "Getting there", img: "/images/guides/getting-to-the-universal-uk-site.jpg", title: "Trains, the M1 and the A421: how to reach the site", meta: "5 min read" },
  { cat: "Where to stay", img: "/images/guides/hotels-closest-to-the-site.jpg", title: "Hotels closest to the Kempston Hardwick site", meta: "6 min read" },
  { cat: "Tips", img: "/images/guides/cutting-the-cost-of-a-long-stay.jpg", title: "Cutting the cost of a long stay in Bedfordshire", meta: "6 min read" },
  { cat: "Days out", img: "/images/areas/central-bedford.jpg", title: "A weekend in Bedford that is not just the park", meta: "7 min read" },
  { cat: "Planning", img: "/images/guides/contractor-accommodation-bedford-checklist.jpg", title: "Nine things to check before you book anything", meta: "7 min read" },
  { cat: "Area guide", img: "/images/blog/villages.jpg", title: "Six Bedfordshire villages worth the detour", meta: "8 min read" },
  { cat: "Days out", img: "/images/blog/london-day.jpg", title: "Doing London in a day from a Bedford base", meta: "6 min read" },
  { cat: "Seasonal", img: "/images/blog/christmas.jpg", title: "Christmas in Milton Keynes and around Bedford", meta: "5 min read" },
];


const FOOTER_HREF: Record<string, string> = { "Terms and conditions": "/terms" };

const PLAN = [
  { word: "Stay", title: "Where to stay", img: "/images/plan/where-to-stay.jpg",
    alt: "A made-up double bed and seating in a hotel room",
    body: "Kempston and Elstow sit closest to the site. Bedford gives you a town to walk around, and Milton Keynes or Luton trade a longer drive for easier parking.",
    cta: "Read the stay guide", href: "#blog" },
  { word: "Activities", title: "What to do", img: "/images/plan/what-to-do.jpg",
    alt: "A rollercoaster track silhouetted against an evening sky",
    body: "Woburn, the Shuttleworth Collection, the Great Ouse and a county full of villages. Enough for a weekend before a theme park is anywhere near it.",
    cta: "Days out nearby", href: "#blog" },
  { word: "Food", title: "Where to eat", img: "/images/plan/where-to-eat.jpg",
    alt: "A freshly baked pizza on a tray beside a stone oven",
    body: "Riverside pubs in Bedford, the restaurant quarter in Milton Keynes, and the village inns in between. Where we would actually book a table.",
    cta: "Eating out", href: "#blog" },
  { word: "Travel", title: "How to get there", img: "/images/plan/how-to-get-there.jpg",
    alt: "A black cab waiting in traffic on a city street",
    body: "Thameslink runs into Bedford from St Pancras in under an hour, and the Marston Vale line passes the site itself at Kempston Hardwick. By road it is the A421 between the M1 and the A1.",
    cta: "Routes and journey times", href: "#blog" },
];


export default function Page() {
  const [allPosts, setAllPosts] = useState(false);

  return (
    <>
      <style>{`
        body{background:#FAFAF7;margin:0;overflow-x:clip}
        .p a{color:#17181B;text-decoration:none}
        .p a:hover{color:#1F4BFF}
        .p header a{color:#FFFFFF}
        .p header a:hover{color:#C9D4FF}
        .p header .gb{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.35);color:#FFFFFF}
        .p header .gb:hover{background:rgba(255,255,255,.22);border-color:#FFFFFF;color:#FFFFFF}
        .p .bb:hover{transform:translateY(-1px);color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 3px 6px rgba(31,75,255,.3),0 20px 40px -10px rgba(31,75,255,.7)}
        .p .gb:hover{transform:translateY(-1px);border-color:#1F4BFF;color:#1F4BFF}
        .p .lift:hover{transform:translateY(-4px);box-shadow:0 2px 4px rgba(23,24,27,.05),0 28px 56px -18px rgba(23,24,27,.26)}
        .p .soft:hover{background:#FAFAF7}
        .p .tile .scrim{opacity:0;transition:opacity .28s ease}
        .p .tile:hover .scrim,.p .tile:focus-visible .scrim{opacity:1}
        /* collapses to nothing while idle, so the word sits on the tile's centre line */
        .p .tile .metawrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s ease}
        .p .tile:hover .metawrap,.p .tile:focus-visible .metawrap{grid-template-rows:1fr}
        .p .tile .meta{min-height:0;overflow:hidden;opacity:0;transition:opacity .28s ease}
        .p .tile:hover .meta,.p .tile:focus-visible .meta{opacity:1}
        /* no hover on touch, so never hide the copy behind one */
        @media (hover:none){.p .tile .scrim,.p .tile .meta{opacity:1}.p .tile .metawrap{grid-template-rows:1fr}}
      `}</style>

      <div className="p" style={{ width: "100%", background: PAPER, color: INK, fontFamily: SANS, fontSize: 16, lineHeight: 1.6 }}>

        {/* 2 — header */}
        <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, background: "transparent", color: "#FFFFFF" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `16px ${GUTTER}` }}>
            <a href="#" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em", lineHeight: 1 }}>
                Ride to Universal<span style={{ color: BLUE }}>.</span>
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: MUTED }}>Bedfordshire stay guide</span>
            </a>
            <nav style={{ display: "flex", gap: 32, fontSize: 15, fontWeight: 500 }}>
              <a href="#guides">Where to stay</a><a href="#guides">Guides</a><a href="#blog">Days out</a>
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
            <h1 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 96, lineHeight: 0.93, letterSpacing: "-0.045em", textWrap: "balance" }}>
              Stay close.<br />Make a trip of it.
            </h1>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 22, lineHeight: 1.5, maxWidth: 620, color: "#F1F1F3" }}>
              The independent guide to Bedfordshire for anyone heading to the planned theme park near Bedford. Where to stay, how to get there, and what else is worth your time while you are in the area.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 8 }}>
              <a className="gb" href="#guides" style={{ ...GHOST_BTN, display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", fontSize: 16 }}>
                Plan your ride<Right />
              </a>
              <a href="#the-park" style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 }}>
                What is confirmed so far
              </a>
            </div>
          </div>
        </section>

        {/* 4b — the park is not open yet, so say what is and is not known */}
        <section id="the-park" style={{ padding: `112px ${GUTTER}`, background: PAPER, borderBottom: `1px solid ${LINE}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 64, alignItems: "start" }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 56, lineHeight: 1, letterSpacing: "-0.04em", textWrap: "balance" }}>
                A Universal park is coming to Bedfordshire.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 8 }}>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 20, lineHeight: 1.55, color: SOFT }}>
                The site is farmland at Kempston Hardwick, a few miles south of Bedford, beside the Marston Vale railway
                line. Universal has confirmed the location and bought the land. Everything after that — what gets built,
                what it costs, and the day the gates open — has not been announced.
              </p>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 20, lineHeight: 1.55, color: SOFT }}>
                So this guide is about Bedfordshire as it stands today: a county worth a weekend on its own, which will
                one day have a theme park in it. When there is something firm to report, it goes in the park news below.
              </p>
            </div>
          </div>
        </section>

        {/* 5 — plan your visit: three ways in */}
        <section id="guides" style={{ padding: `112px ${GUTTER} 128px` }}>
          <SectionRule label="Plan your Universal adventure" link="All guides" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 24 }}>
            {PLAN.map((c) => (
              <a key={c.title} className="tile" href={c.href} style={{ position: "relative", display: "block", height: 400, borderRadius: 12, overflow: "hidden", color: "#FFFFFF" }}>
                <Image src={c.img} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 580px" style={{ objectFit: "cover" }} />
                {/* a constant wash keeps the word legible before any hover */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(23,24,27,.12) 0%,rgba(23,24,27,.55) 100%)" }} />
                <div className="scrim" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(23,24,27,.55) 0%,rgba(23,24,27,.86) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span className="word" style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: "-0.04em" }}>{c.word}</span>
                  <div className="metawrap">
                    <div className="meta" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 14 }}>
                      <p style={{ margin: 0, fontFamily: SERIF, fontSize: 17, lineHeight: 1.55, color: "#ECECEF", maxWidth: 420 }}>{c.body}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15 }}>{c.cta}<Right /></span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 9 — latest blog */}
        <section id="blog" style={{ padding: `112px ${GUTTER} 128px`, background: "#FFFFFF" }}>
          <SectionRule label="Latest from the journal" link="Visit the journal" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "48px 32px" }}>
            {(allPosts ? POSTS : POSTS.slice(0, 3)).map((p) => (
              <a key={p.title} className="soft" href="#" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 8, margin: -8, borderRadius: 12, transition: "background .2s" }}>
                <div style={{ position: "relative", height: 240, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)" }}>
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
          {!allPosts && POSTS.length > 3 ? (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: 56 }}>
              <button type="button" onClick={() => setAllPosts(true)} className="gb" style={{ ...GHOST_BTN, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", fontSize: 16 }}>
                More from the journal<Arrow s={15} />
              </button>
            </div>
          ) : null}
        </section>

        {/* 12 — footer */}
        <footer style={{ background: "#FFFFFF", borderTop: `1px solid ${LINE}`, padding: `80px ${GUTTER} 48px`, display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 28, letterSpacing: "-0.04em", lineHeight: 1 }}>Ride to Universal<span style={{ color: BLUE }}>.</span></span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, maxWidth: 320 }}>An independent journal about Bedfordshire, the planned theme park, and where to stay when you visit.</span>
            </div>
            {[
              { h: "Guides", l: ["Where to stay", "Getting there", "Days out", "Where to eat"] },
              { h: "Towns", l: ["Bedford", "Milton Keynes", "Luton", "London"] },
              { h: "The park", l: ["What is confirmed", "Getting there"] },
              { h: "About", l: ["About us", "Terms and conditions", "Contact", "Privacy"] },
            ].map((c) => (
              <div key={c.h} style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
                <strong style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>{c.h}</strong>
                {c.l.map((x) => <a key={x} href={FOOTER_HREF[x] ?? "#"} style={{ color: MUTED }}>{x}</a>)}
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 32, borderTop: `1px solid ${LINE}`, fontSize: 13, lineHeight: 1.65, color: MUTED, maxWidth: 820 }}>
            <p style={{ margin: 0 }}>
              Independent site. Not affiliated with, endorsed by or connected to Universal Studios, Universal Destinations &amp; Experiences or Comcast NBCUniversal. All trademarks belong to their owners. The park described here is announced and planned; nothing on this site should be read as confirmation of dates or details. © 2026 Ride to Universal.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
