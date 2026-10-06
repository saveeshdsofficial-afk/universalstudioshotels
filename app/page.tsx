"use client";

import { useState, type CSSProperties } from "react";

/**
 * Exact duplicate of "Theme C v2 - Home.dc.html".
 *
 * Markup, inline styles, copy and state logic are reproduced as supplied.
 * The only substitutions are mechanical ones the format requires:
 *   · the design-canvas font names map to the next/font variables, so the
 *     same three typefaces actually load
 *   · <sc-for> becomes .map(), <sc-if> a conditional, {{ x }} a binding
 *   · style-hover, which is not a real attribute, becomes a CSS rule
 * The 1440px fixed canvas width is kept exactly as specified.
 */

const ARCHIVO = "var(--font-archivo), 'Archivo', sans-serif";
const SANS = "var(--font-public-sans), 'Public Sans', system-ui, sans-serif";
const SERIF = "var(--font-source-serif), 'Source Serif 4', Georgia, serif";

const BLUE_BTN: CSSProperties = {
  background:
    "linear-gradient(180deg,#3A63FF 0%,#1F4BFF 55%,#1A42EC 100%)",
  color: "#FFFFFF",
  textDecoration: "none",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,.28), 0 2px 4px rgba(31,75,255,.25), 0 10px 24px -8px rgba(31,75,255,.55)",
  transition: "transform .15s, box-shadow .15s",
};

const CHIP: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  padding: "3px 8px",
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
};

const NOISE =
  "url(data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27160%27%20height%3D%27160%27%3E%3Cfilter%20id%3D%27n%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%27.85%27%20numOctaves%3D%272%27%20stitchTiles%3D%27stitch%27%2F%3E%3CfeColorMatrix%20values%3D%270%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20.07%200%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23n%29%27%2F%3E%3C%2Fsvg%3E)";

const HATCH = "repeating-linear-gradient(135deg,#ECECE6 0 14px,#E4E4DD 14px 28px)";
const HATCH_BLUE = "repeating-linear-gradient(135deg,#E3E8F7 0 14px,#DAE0F2 14px 28px)";
const HATCH_SM = "repeating-linear-gradient(135deg,#ECECE6 0 8px,#E4E4DD 8px 16px)";

const NOTE: CSSProperties = {
  font: "500 11px ui-monospace,Menlo,monospace",
  background: "rgba(255,255,255,.9)",
  padding: "4px 8px",
  borderRadius: 4,
};

const PILL: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,.92)",
};

const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const Right = ({ size = 16, w = 2 }: { size?: number; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Tick = ({ size = 14, color = "#1F4BFF", w = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Pin = ({ size = 14, color = "currentColor", w = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

/* ------------------------------------------------- data, from DCLogic */
const TRUST = [
  { big: "120+", small: "hotels reviewed in person" },
  { big: "Monthly", small: "prices and perks re-checked" },
  { big: "0", small: "paid placements, ever" },
  { big: "Free", small: "to use, no sign-up needed" },
];

const SIDE_GUIDES = [
  { cat: "Tips", title: "Is Express Pass worth it in 2026? We did the maths", meta: "8 min read · Updated Sep 2026" },
  { cat: "Hotels", title: "On-site vs off-site: when the extra $120 a night pays for itself", meta: "10 min read · Updated Oct 2026" },
];

const CATEGORIES = [
  { title: "On-site", desc: "Walk or take the boat to the parks. Early entry for every guest.", count: "8 hotels", img: "portrait · resort pool" },
  { title: "Premier", desc: "Express Pass Unlimited included, so you skip most regular queues.", count: "3 hotels", img: "portrait · lobby detail" },
  { title: "Near the parks", desc: "Under two miles away and often half the price of on-site.", count: "24 hotels", img: "portrait · hotel tower" },
  { title: "Budget", desc: "Clean, safe rooms under $150 a night, with a shuttle.", count: "18 hotels", img: "portrait · simple room" },
];

const HOTELS = [
  { name: "Cabana Bay Beach Resort", tier: "On-site · Best for families", area: "Universal Orlando", dist: "20 min walk", perks: ["Early park entry", "Free shuttle", "Family suites"], rating: "8.5", word: "Excellent", price: "$189", img: "photo · retro pool, families" },
  { name: "Hard Rock Hotel", tier: "Premier · Worth the splurge", area: "Universal Orlando", dist: "5 min walk", perks: ["Express Pass included", "Early park entry", "Water taxi"], rating: "8.9", word: "Fabulous", price: "$419", img: "photo · pool deck, warm light" },
  { name: "DoubleTree at the Entrance", tier: "Near the parks · Best value", area: "Universal Blvd", dist: "0.4 mi to parks", perks: ["Walkable", "Free parking"], rating: "8.3", word: "Very good", price: "$159", img: "photo · tower and pool" },
];

const ORLANDO_LINKS = ["The 4-day itinerary", "Every on-site hotel, compared", "First visit to Epic Universe"];
const HOLLYWOOD_LINKS = ["Universal Hollywood in one day", "Hotels in Universal City", "Getting there without a car"];

const POSTS = [
  { cat: "Seasonal events", title: "Halloween nights 2026: dates, prices and how to do it in one go", meta: "8 min read" },
  { cat: "Where to eat", title: "11 meals worth the queue at CityWalk and in the parks", meta: "10 min read" },
  { cat: "Tips & tricks", title: "Rider switch, single rider and other free queue tricks", meta: "6 min read" },
  { cat: "Hollywood", title: "Where to stay near Universal Hollywood on a budget", meta: "7 min read" },
  { cat: "Itineraries", title: "A rainy-day plan for Orlando that still feels like a holiday", meta: "5 min read" },
  { cat: "Hotels", title: "Which on-site pools are worth a day off from the parks", meta: "9 min read" },
];

const STEPS = [
  { n: "01", title: "Pick your park", desc: "Orlando for a 4–5 day trip with three parks. Hollywood for one or two days alongside LA." },
  { n: "02", title: "Choose your stay", desc: "On-site gets you early entry. Premier adds Express Pass. Off-site saves money if you drive." },
  { n: "03", title: "Book on Booking.com", desc: "Compare live prices for your dates. Most rooms have free cancellation, so you can lock in now." },
];

export default function Page() {
  const [dest, setDest] = useState<"orlando" | "hollywood">("orlando");
  const [subscribed, setSubscribed] = useState(false);

  const destLabel =
    dest === "orlando" ? "Universal Orlando, FL" : "Universal Hollywood, CA";

  return (
    <>
      {/* style-hover from the source, plus the canvas page background */}
      <style>{`
        body{background:#DCDCD6;margin:0}
        .dc a{color:#17181B;text-decoration:none}
        .dc a:hover{color:#1F4BFF}
        .dc .btn-blue:hover{transform:translateY(-1px);color:#FFFFFF;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 3px 6px rgba(31,75,255,.3),0 16px 32px -8px rgba(31,75,255,.65)}
        .dc .lift:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(23,24,27,.04),0 32px 64px -16px rgba(23,24,27,.28)}
        .dc .lift4:hover{transform:translateY(-4px);box-shadow:0 2px 4px rgba(23,24,27,.05),0 24px 48px -16px rgba(31,75,255,.28)}
        .dc .liftcard:hover{transform:translateY(-4px);box-shadow:0 2px 4px rgba(23,24,27,.04),0 32px 64px -20px rgba(23,24,27,.3)}
        .dc .liftsm:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(23,24,27,.05),0 20px 40px -16px rgba(23,24,27,.22)}
        .dc .posthover:hover{background:#FAFAF7}
        .dc .subbtn:hover{background:#3A3B40}
      `}</style>

      <div
        className="dc"
        style={{
          width: 1440,
          margin: "0 auto",
          background: "#FAFAF7",
          color: "#17181B",
          fontFamily: SANS,
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        {/* ---------------------------------------------- disclosure bar */}
        <div style={{ background: "#17181B", color: "#D6D7DB", fontSize: 13, display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "8px 24px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
          </svg>
          <span>Independent travel guide. We may earn a commission from Booking.com links.</span>
          <a href="#" style={{ color: "#FFFFFF", textDecoration: "underline", textUnderlineOffset: 3 }}>How we work</a>
        </div>

        {/* ------------------------------------------------------ header */}
        <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(250,250,247,.86)", backdropFilter: "blur(14px)", borderBottom: "1px solid #E4E4DE", boxShadow: "0 1px 2px rgba(23,24,27,.04), 0 8px 24px -12px rgba(23,24,27,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 120px" }}>
            <a href="#" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em", lineHeight: 1 }}>
                Parkline<span style={{ color: "#1F4BFF" }}>.</span>
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#5B5D63" }}>Park-stay journal</span>
            </a>
            <nav style={{ display: "flex", gap: 32, fontSize: 15, fontWeight: 500 }}>
              <a href="#">Guides</a><a href="#">Where to Stay</a><a href="#">Orlando</a><a href="#">Hollywood</a><a href="#">Tips</a>
            </nav>
            <a className="btn-blue" href="#" style={{ ...BLUE_BTN, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 12px 10px 18px", borderRadius: 999, fontWeight: 700, fontSize: 14 }}>
              Find Hotels<span style={CHIP}>Booking.com</span><Arrow />
            </a>
          </div>
        </header>

        {/* -------------------------------------------------------- hero */}
        <section style={{ position: "relative", height: 760, backgroundImage: "linear-gradient(180deg,rgba(23,24,27,.35) 0%,rgba(23,24,27,0) 28%,rgba(23,24,27,.15) 55%,rgba(23,24,27,.78) 100%),radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(0,0,0,.35) 100%),repeating-linear-gradient(135deg,#2C3344 0 14px,#323A4C 14px 28px)", display: "flex", alignItems: "flex-end", padding: "0 120px 184px" }}>
          <span style={{ ...NOTE, position: "absolute", top: 24, right: 24, color: "#17181B" }}>full-bleed photo · resort lagoon + coaster silhouette at dusk</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900, color: "#FFFFFF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase" }}>
              <span style={{ width: 32, height: 1, background: "#FFFFFF" }} />Orlando · Hollywood · 2026 edition
            </div>
            <h1 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 104, lineHeight: 0.92, letterSpacing: "-0.045em", textWrap: "balance" }}>
              Sleep close.<br />Ride first.
            </h1>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 22, lineHeight: 1.5, maxWidth: 600, color: "#F1F1F3" }}>
              An independent guide to the hotels, park-day plans and small tricks that make a Universal trip in Florida or California go smoothly.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------ search panel */}
        <div style={{ position: "relative", zIndex: 5, margin: "-120px 120px 0", padding: 24, borderRadius: 24, background: "rgba(255,255,255,.80)", backdropFilter: "blur(20px) saturate(140%)", border: "1px solid rgba(255,255,255,.7)", boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 32px 64px -24px rgba(23,24,27,.35)", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 999, background: "rgba(23,24,27,.06)" }}>
              {([["orlando", "Orlando"], ["hollywood", "Hollywood"]] as const).map(([k, l]) => {
                const on = dest === k;
                return (
                  <button key={k} onClick={() => setDest(k)} style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "8px 18px", fontSize: 14, fontWeight: 600, font: "inherit", background: on ? "#FFFFFF" : "transparent", color: on ? "#17181B" : "#3A3B40", boxShadow: on ? "0 1px 2px rgba(23,24,27,.08), 0 4px 12px -4px rgba(23,24,27,.16)" : "none", transition: "background .15s" }}>{l}</button>
                );
              })}
            </div>
            <span style={{ fontSize: 13, color: "#5B5D63" }}>Sample stay · prices in USD</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.2fr .9fr auto", gap: 8, alignItems: "stretch" }}>
            {[
              { icon: <Pin size={20} color="#5B5D63" w={1.5} />, label: "Destination", value: destLabel },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B5D63" strokeWidth={1.5}><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>, label: "Dates", value: "Fri 14 Nov — Mon 17 Nov" },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B5D63" strokeWidth={1.5}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.7 3 2.4 3.5 5.2" /></svg>, label: "Guests", value: "2 adults, 2 kids" },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 16px", borderRadius: 16, background: "#FFFFFF", border: "1px solid #E4E4DE" }}>
                {f.icon}
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#5B5D63" }}>{f.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{f.value}</span>
                </div>
              </div>
            ))}
            <a className="btn-blue" href="#" style={{ ...BLUE_BTN, display: "inline-flex", alignItems: "center", gap: 12, padding: "0 20px 0 28px", borderRadius: 999, fontWeight: 700, fontSize: 17, whiteSpace: "nowrap" }}>
              Search hotels<span style={{ ...CHIP, fontSize: 12 }}>Booking.com</span><Arrow size={18} />
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center", fontSize: 13, color: "#3A3B40" }}>
            <Tick />Free cancellation on most rooms · opens Booking.com in a new tab
          </div>
        </div>

        {/* ------------------------------------------------- trust strip */}
        <section style={{ padding: "48px 120px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))" }}>
            {TRUST.map((t) => (
              <div key={t.small} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 32px", borderLeft: "1px solid #E4E4DE" }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 36, letterSpacing: "-0.04em", lineHeight: 1.1 }}>{t.big}</span>
                <span style={{ fontSize: 14, color: "#5B5D63" }}>{t.small}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------- featured guide */}
        <section style={{ padding: "0 120px 128px", background: "#FAFAF7" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#1F4BFF" }}>01</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Featured guides</span>
            <span style={{ flex: 1, height: 1, background: "#E4E4DE" }} />
            <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>All guides →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)", gap: 48, alignItems: "start" }}>
            <a href="#" style={{ position: "relative", display: "block", marginLeft: -120, textDecoration: "none", color: "#17181B" }}>
              <div style={{ height: 600, borderRadius: "0 24px 24px 0", backgroundImage: `linear-gradient(180deg,rgba(23,24,27,0) 60%,rgba(23,24,27,.25) 100%),${HATCH_BLUE}`, position: "relative" }}>
                <div style={{ position: "absolute", top: 24, left: 144, display: "flex", gap: 8 }}>
                  <span style={{ ...PILL, boxShadow: "0 1px 2px rgba(23,24,27,.08)" }}>Itineraries</span>
                  <span style={{ ...PILL, boxShadow: "0 1px 2px rgba(23,24,27,.08)" }}>12 min read</span>
                  <span style={{ ...PILL, background: "#17181B", color: "#FFFFFF" }}>Updated 2026</span>
                </div>
                <span style={{ ...NOTE, position: "absolute", top: 24, right: 24 }}>photo · family at park gates, early light</span>
              </div>
              <div className="lift" style={{ position: "relative", margin: "-160px -48px 0 200px", background: "#FFFFFF", borderRadius: 16, padding: 40, display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 24px 56px -16px rgba(23,24,27,.22)", transition: "transform .2s, box-shadow .2s" }}>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 44, lineHeight: 1.02, letterSpacing: "-0.035em", textWrap: "balance" }}>Universal Orlando in four days, in the right order</h2>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, color: "#3A3B40" }}>Three theme parks, a water park and one very long walk. We plan each day around early entry so you ride the big ones before the queues build.</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, paddingTop: 8 }}>Read the guide <Right /></span>
              </div>
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>
              {SIDE_GUIDES.map((g) => (
                <a key={g.title} className="liftsm" href="#" style={{ display: "grid", gridTemplateColumns: "168px minmax(0,1fr)", gap: 24, padding: 16, borderRadius: 16, background: "#FFFFFF", border: "1px solid #E4E4DE", textDecoration: "none", color: "#17181B", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)", transition: "transform .2s, box-shadow .2s" }}>
                  <div style={{ height: 168, borderRadius: 8, background: HATCH }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 8px 8px 0" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#1F45E6" }}>{g.cat}</span>
                    <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 23, lineHeight: 1.15, letterSpacing: "-0.025em" }}>{g.title}</h3>
                    <span style={{ marginTop: "auto", fontSize: 13, color: "#5B5D63" }}>{g.meta}</span>
                  </div>
                </a>
              ))}
              <div style={{ padding: 24, borderRadius: 16, border: "1px dashed #C9CBD2", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 72, height: 72, flex: "none", borderRadius: "50%", background: HATCH_SM, boxShadow: "0 0 0 4px #FFFFFF, 0 6px 16px -6px rgba(23,24,27,.25)" }} />
                <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: 17, lineHeight: 1.5, color: "#3A3B40" }}>
                  &quot;We pay for every stay we review. Hotels can&apos;t buy a place on our lists.&quot;
                  <span style={{ fontFamily: SANS, fontStyle: "normal", fontSize: 13, color: "#5B5D63", display: "block", marginTop: 4 }}>Maya Chen, editor</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ where to stay */}
        <section style={{ position: "relative", padding: "112px 120px 200px", backgroundColor: "#EEF2FF", backgroundImage: NOISE }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#1F4BFF" }}>02</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Where to stay</span>
            <span style={{ flex: 1, height: 1, background: "#D9E1FF" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, alignItems: "end", marginBottom: 48 }}>
            <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.04em" }}>Choose a hotel by what your day needs.</h2>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 19, lineHeight: 1.55, color: "#3A3B40", maxWidth: 480 }}>Early entry, a free fast-track pass, a short walk or a low price. Every hotel near the parks fits one of four groups.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24 }}>
            {CATEGORIES.map((c) => (
              <a key={c.title} className="lift4" href="#" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 8px 24px", borderRadius: 24, background: "#FFFFFF", textDecoration: "none", color: "#17181B", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.14)", transition: "transform .2s, box-shadow .2s" }}>
                <div style={{ position: "relative", height: 300, borderRadius: 16, background: HATCH }}>
                  <span style={{ ...PILL, position: "absolute", top: 12, left: 12 }}>{c.count}</span>
                  <span style={{ ...NOTE, font: "500 10px ui-monospace,Menlo,monospace", position: "absolute", bottom: 12, left: 12, padding: "3px 6px" }}>{c.img}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
                  <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, letterSpacing: "-0.03em" }}>{c.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "#5B5D63" }}>{c.desc}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 14, fontWeight: 700, color: "#1F45E6" }}>Browse hotels <Right size={14} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- hotel picks */}
        <section style={{ padding: "0 120px 128px", backgroundColor: "#FFFFFF", backgroundImage: `${NOISE},linear-gradient(180deg,#EEF2FF 0,#EEF2FF 120px,#FFFFFF 120px)`, backgroundSize: "160px 160px,100% 100%", backgroundRepeat: "repeat-x,no-repeat", backgroundPosition: "0 -40px,0 0" }}>
          <div style={{ position: "relative", top: -104, marginBottom: -104 }}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#1F4BFF" }}>03</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Our hotel picks for 2026</span>
              </div>
              <span style={{ fontSize: 13, color: "#5B5D63" }}>Sample &quot;from&quot; prices, checked 1 Oct 2026</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24 }}>
              {HOTELS.map((h) => (
                <div key={h.name} className="liftcard" style={{ display: "flex", flexDirection: "column", borderRadius: 24, background: "#FFFFFF", overflow: "hidden", border: "1px solid #E4E4DE", boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 24px 56px -20px rgba(23,24,27,.24)", transition: "transform .2s, box-shadow .2s" }}>
                  <div style={{ position: "relative", height: 260, background: HATCH }}>
                    <span style={{ ...PILL, position: "absolute", top: 16, left: 16 }}>{h.tier}</span>
                    <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 8, padding: "4px 12px 4px 4px", borderRadius: 999, background: "#17181B", color: "#FFFFFF" }}>
                      <span style={{ fontWeight: 700, fontSize: 14, padding: "4px 8px", borderRadius: 999, background: "#FFFFFF", color: "#17181B" }}>{h.rating}</span>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{h.word}</span>
                    </div>
                    <span style={{ ...NOTE, font: "500 10px ui-monospace,Menlo,monospace", position: "absolute", bottom: 16, left: 16, padding: "3px 6px" }}>{h.img}</span>
                  </div>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.03em" }}>{h.name}</h3>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5B5D63" }}>
                        <Pin />{h.area} · <strong style={{ color: "#17181B", fontWeight: 600 }}>{h.dist}</strong>
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {h.perks.map((p) => (
                        <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, padding: "6px 10px", borderRadius: 999, background: "#EEF2FF", color: "#1838C9" }}>
                          <Tick size={12} color="currentColor" w={2.4} />{p}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid #E4E4DE", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: 14, color: "#5B5D63" }}>from <strong style={{ fontFamily: ARCHIVO, fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", color: "#17181B" }}>{h.price}</strong> / night</span>
                        <a href="#" style={{ fontSize: 14, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>Our review</a>
                      </div>
                      <a className="btn-blue" href="#" style={{ ...BLUE_BTN, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "14px 20px", borderRadius: 999, fontWeight: 700, fontSize: 16, whiteSpace: "nowrap" }}>
                        Check price<span style={{ ...CHIP, fontSize: 12 }}>Booking.com</span><Arrow />
                      </a>
                      <span style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, fontSize: 13, color: "#3A3B40" }}>
                        <Tick size={13} />Free cancellation on most rooms
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- destinations */}
        <section style={{ padding: "112px 120px 128px", background: "#FAFAF7", borderTop: "1px solid #E4E4DE" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#1F4BFF" }}>04</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Two resorts, two very different trips</span>
            <span style={{ flex: 1, height: 1, background: "#E4E4DE" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: 40, padding: 40, borderRadius: 24, background: "#FFFFFF", border: "1px solid #E4E4DE", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)" }}>
              <div style={{ position: "relative" }}>
                <div style={{ height: 360, borderRadius: "999px 999px 16px 16px", background: HATCH_BLUE, boxShadow: "inset 0 0 0 1px rgba(23,24,27,.04)" }} />
                <div style={{ position: "absolute", right: -24, bottom: 24, width: 96, height: 96, borderRadius: "50%", background: HATCH_SM, boxShadow: "0 0 0 6px #FFFFFF, 0 12px 24px -8px rgba(23,24,27,.3)" }} />
                <span style={{ ...NOTE, font: "500 10px ui-monospace,Menlo,monospace", position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)", padding: "3px 6px", whiteSpace: "nowrap" }}>arch crop · lagoon</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F45E6" }}>Florida · plan 4–5 days</span>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: "-0.04em" }}>Universal Orlando</h3>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#3A3B40" }}>Three theme parks, a water park and eight on-site hotels. The bigger trip, and the one where your hotel choice matters most.</p>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 8, borderTop: "1px solid #E4E4DE" }}>
                  {ORLANDO_LINKS.map((l) => (
                    <a key={l} href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #E4E4DE", fontWeight: 600, fontSize: 15 }}>{l}<Right w={1.8} /></a>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: 40, padding: 40, borderRadius: 24, background: "#FFFFFF", border: "1px solid #E4E4DE", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)" }}>
              <div style={{ position: "relative", padding: "0 16px 16px 0" }}>
                <div style={{ position: "absolute", inset: "16px 0 0 16px", borderRadius: 16, border: "1.5px solid #1F4BFF" }} />
                <div style={{ position: "relative", height: 344, borderRadius: 16, background: HATCH, boxShadow: "0 12px 24px -12px rgba(23,24,27,.25)" }}>
                  <span style={{ ...NOTE, font: "500 10px ui-monospace,Menlo,monospace", position: "absolute", top: 12, left: 12, padding: "3px 6px" }}>offset frame · LA hills</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F45E6" }}>California · plan 1–2 days</span>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 44, lineHeight: 1, letterSpacing: "-0.04em" }}>Universal Hollywood</h3>
                <p style={{ margin: 0, fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#3A3B40" }}>One park on a hillside above the city, with the rest of LA on your doorstep. Stay close and skip the morning freeway.</p>
                <div style={{ display: "flex", flexDirection: "column", marginTop: 8, borderTop: "1px solid #E4E4DE" }}>
                  {HOLLYWOOD_LINKS.map((l) => (
                    <a key={l} href="#" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #E4E4DE", fontWeight: 600, fontSize: 15 }}>{l}<Right w={1.8} /></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- blog */}
        <section style={{ padding: "112px 120px 128px", background: "#FFFFFF" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#1F4BFF" }}>05</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Latest from the blog</span>
            <span style={{ flex: 1, height: 1, background: "#E4E4DE" }} />
            <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>Visit the blog →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "48px 32px" }}>
            {POSTS.map((p) => (
              <a key={p.title} className="posthover" href="#" style={{ display: "flex", flexDirection: "column", gap: 16, textDecoration: "none", color: "#17181B", padding: 8, margin: -8, borderRadius: 24, transition: "background .2s" }}>
                <div style={{ position: "relative", height: 240, borderRadius: 16, background: HATCH, boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.12)" }}>
                  <span style={{ ...PILL, position: "absolute", top: 12, left: 12 }}>{p.cat}</span>
                </div>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.025em", textWrap: "pretty" }}>{p.title}</h3>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#5B5D63" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>{p.meta}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* --------------------------------------------- plan your trip */}
        <section style={{ position: "relative", padding: "128px 120px", background: "radial-gradient(ellipse 60% 80% at 85% 0%,rgba(31,75,255,.22) 0%,rgba(31,75,255,0) 60%),#17181B", color: "#FFFFFF", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, color: "#8FA6FF" }}>06</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#D6D7DB" }}>Plan your trip</span>
            <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.14)" }} />
          </div>
          <h2 style={{ margin: "0 0 64px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 72, lineHeight: 0.96, letterSpacing: "-0.045em", maxWidth: 900 }}>Three steps from idea to booked.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24, marginBottom: 64 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, borderRadius: 24, background: "linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02))", border: "1px solid rgba(255,255,255,.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)" }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 64, lineHeight: 1, letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1.5px #8FA6FF" }}>{s.n}</span>
                <h3 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#C5C7CD" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a className="btn-blue" href="#" style={{ ...BLUE_BTN, display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 24px 18px 32px", borderRadius: 999, fontWeight: 700, fontSize: 18, whiteSpace: "nowrap", boxShadow: "inset 0 1px 0 rgba(255,255,255,.28), 0 2px 4px rgba(31,75,255,.25), 0 14px 40px -8px rgba(31,75,255,.75)" }}>
              Search hotels<span style={{ ...CHIP, fontSize: 12 }}>Booking.com</span><Arrow size={18} />
            </a>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#D6D7DB" }}>
              <Tick color="#8FA6FF" />Free cancellation on most rooms
            </span>
          </div>
        </section>

        {/* -------------------------------------------------- newsletter */}
        <section style={{ padding: "112px 120px", background: "#FAFAF7" }}>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)", gap: 64, alignItems: "center", padding: 64, borderRadius: 24, border: "1px solid #D9E1FF", backgroundColor: "#EEF2FF", backgroundImage: NOISE, boxShadow: "0 1px 2px rgba(23,24,27,.04), 0 24px 56px -28px rgba(31,75,255,.35)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#1F45E6" }}>The monthly letter</span>
              <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 48, lineHeight: 1, letterSpacing: "-0.04em" }}>One useful email a month.</h2>
              <p style={{ margin: 0, fontFamily: SERIF, fontSize: 18, lineHeight: 1.55, color: "#3A3B40" }}>Crowd calendar, hotel price drops and new openings. No spam, unsubscribe in one click.</p>
            </div>
            {!subscribed ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 8, padding: 8, borderRadius: 999, background: "#FFFFFF", border: "1px solid #D9E1FF", boxShadow: "0 1px 2px rgba(23,24,27,.05), 0 8px 24px -12px rgba(23,24,27,.14)" }}>
                  <input placeholder="you@example.com" style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", padding: "0 16px", fontSize: 16, color: "#17181B", font: "inherit" }} />
                  <button className="subbtn" onClick={() => setSubscribed(true)} style={{ border: 0, borderRadius: 999, background: "#17181B", color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px 24px", cursor: "pointer", transition: "background .15s", fontFamily: "inherit" }}>Subscribe</button>
                </div>
                <span style={{ fontSize: 13, color: "#5B5D63", paddingLeft: 16 }}>12,400 readers. We never share your email.</span>
              </div>
            ) : (
              <div style={{ padding: 24, borderRadius: 16, background: "#FFFFFF", fontWeight: 600, fontSize: 17 }}>You&apos;re on the list. First letter arrives 1 November.</div>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------ footer */}
        <footer style={{ background: "#FFFFFF", borderTop: "1px solid #E4E4DE", padding: "80px 120px 48px", display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 28, letterSpacing: "-0.04em", lineHeight: 1 }}>Parkline<span style={{ color: "#1F4BFF" }}>.</span></span>
              <span style={{ fontSize: 15, lineHeight: 1.6, color: "#5B5D63", maxWidth: 320 }}>An independent journal about where to stay and how to plan a Universal trip in the US.</span>
            </div>
            {[
              { h: "Plan", links: ["Orlando guide", "Hollywood guide", "Where to stay"] },
              { h: "Read", links: ["Itineraries", "Where to eat", "Tips & tricks", "Seasonal events"] },
              { h: "Hotels", links: ["On-site", "Premier", "Near the parks", "Budget"] },
              { h: "About", links: ["About us", "Affiliate disclosure", "Contact", "Privacy"] },
            ].map((col) => (
              <div key={col.h} style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
                <strong style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>{col.h}</strong>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ color: "#5B5D63" }}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 48, paddingTop: 32, borderTop: "1px solid #E4E4DE", fontSize: 13, lineHeight: 1.65, color: "#5B5D63" }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "#17181B" }}>Affiliate disclosure.</strong> Booking.com is our only partner. When you book through our links we may earn a commission, at no extra cost to you. It never decides which hotels we recommend. <a href="#" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>Read the full disclosure</a>.
            </p>
            <p style={{ margin: 0 }}>Independent site, not affiliated with or endorsed by Universal Studios or Comcast NBCUniversal. All trademarks belong to their owners. © 2026 Parkline.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
