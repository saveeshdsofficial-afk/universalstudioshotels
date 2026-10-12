import type { Metadata } from "next";
import CategoryShell, { Band, Lede } from "../_components/CategoryShell";
import {
  ARCHIVO, SERIF, INK, SOFT, MUTED, TINT, TINT_LINE, BLUE_INK, SPONSORED, STAYS, booking,
} from "../_lib/site";

export const metadata: Metadata = {
  title: "Where to stay near the Bedfordshire park site",
  description:
    "Seven real hotels near Kempston Hardwick, ordered by straight-line distance from the site, with live prices on Booking.com.",
};

export default function Stay() {
  return (
    <CategoryShell
      slug="stay"
      title="Where to stay"
      standfirst="Seven real hotels near the site at Kempston Hardwick, nearest first. No invented rates, no star ratings we cannot stand behind."
      img="/images/plan/where-to-stay.jpg"
      alt="A made-up double bed and seating in a hotel room"
    >
      <Band label="Hotels, nearest first">
        <Lede>
          Kempston and Elstow put you within a mile of the site. Bedford town centre is two to three miles out and gives
          you somewhere to walk in the evening. Distances below are straight-line from the site, measured from each
          postcode — not driving distance.
        </Lede>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24, marginTop: 32 }}>
          {STAYS.map((h) => (
            <div key={h.pc} style={{ display: "flex", flexDirection: "column", borderRadius: 12, overflow: "hidden", background: "#FFFFFF", border: `1px solid ${TINT_LINE}`, boxShadow: "0 2px 4px rgba(23,24,27,.04), 0 20px 48px -22px rgba(23,24,27,.22)" }}>
              {/* the distance is the useful thing here, so it gets the space a photo would */}
              <div style={{ padding: "26px 28px 20px", background: `linear-gradient(180deg,${TINT} 0%,#FFFFFF 100%)`, borderBottom: `1px solid ${TINT_LINE}`, display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 52, lineHeight: 0.9, letterSpacing: "-0.05em", color: BLUE_INK }}>{h.mi}</span>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 20, letterSpacing: "-0.03em", color: BLUE_INK }}>mi</span>
                <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: MUTED }}>from the site</span>
              </div>
              <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <h2 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 700, fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.025em" }}>{h.name}</h2>
                <span style={{ fontSize: 13, color: MUTED }}>{h.town} · {h.pc}</span>
                <p style={{ margin: "4px 0 0", fontSize: 15, lineHeight: 1.55, color: SOFT }}>{h.note}</p>
                <a
                  href={booking(`${h.name}, ${h.town}, UK`)}
                  target="_blank"
                  rel={SPONSORED}
                  style={{ marginTop: "auto", alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 20px", fontSize: 15, fontWeight: 700, color: "#FFFFFF", borderRadius: 10, textDecoration: "none", background: "linear-gradient(180deg,#3A63FF 0%,#1F4BFF 55%,#1A42EC 100%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.28), 0 2px 4px rgba(31,75,255,.25), 0 14px 32px -10px rgba(31,75,255,.6)" }}
                >
                  Check prices →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Band>

      <Band label="How to read this list">
        <Lede>
          Every entry is a real business. Names, streets and postcodes come from the operator&rsquo;s own listing, and the
          distance is computed from that postcode&rsquo;s ONS coordinates to the site.
        </Lede>
        <Lede>
          You will not find nightly rates, room counts or amenity lists here. They change constantly and we could not
          verify them property by property, so publishing a guess under a real business&rsquo;s name would misrepresent
          it. Follow a link for live prices instead.
        </Lede>
        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: MUTED, maxWidth: 760 }}>
          Links go to Booking.com and may earn us a commission, at no extra cost to you.{" "}
          <a href="/terms" style={{ color: INK, textDecoration: "underline", textUnderlineOffset: 3 }}>Terms</a>.
        </p>
      </Band>
    </CategoryShell>
  );
}
