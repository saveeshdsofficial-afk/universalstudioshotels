import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

const ARCHIVO = "var(--font-archivo), 'Archivo', sans-serif";
const SANS = "var(--font-public-sans), 'Public Sans', system-ui, sans-serif";
const SERIF = "var(--font-source-serif), 'Source Serif 4', Georgia, serif";
const INK = "#17181B";
const SOFT = "#3A3B40";
const MUTED = "#5B5D63";
const LINE = "#E4E4DE";
const PAPER = "#FAFAF7";
const BLUE = "#1F4BFF";

export const metadata: Metadata = {
  title: "Terms and conditions — Ride to Universal",
  description:
    "How this site works, how affiliate links earn us a commission, and what we do and do not claim about the planned Bedfordshire theme park.",
};

const H2: CSSProperties = {
  margin: "48px 0 12px",
  fontFamily: ARCHIVO,
  fontWeight: 800,
  fontSize: 26,
  letterSpacing: "-0.03em",
};
const P: CSSProperties = {
  margin: "0 0 14px",
  fontFamily: SERIF,
  fontSize: 18,
  lineHeight: 1.6,
  color: SOFT,
};

export default function Terms() {
  return (
    <main
      style={{
        background: PAPER,
        color: INK,
        fontFamily: SANS,
        minHeight: "100vh",
        padding: "72px max(24px, calc((100vw - 760px) / 2)) 120px",
      }}
    >
      <Link href="/" style={{ color: MUTED, fontSize: 14, textDecoration: "none" }}>
        ← Ride to Universal
      </Link>

      <h1
        style={{
          margin: "28px 0 8px",
          fontFamily: ARCHIVO,
          fontWeight: 800,
          fontSize: 52,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
        }}
      >
        Terms and conditions
      </h1>
      <p style={{ margin: "0 0 8px", fontSize: 14, color: MUTED }}>Last updated 8 October 2026</p>

      <h2 style={H2}>Commercial links</h2>
      <p style={P}>
        This site carries no affiliate links and has no commercial partners. Nothing on it earns us a commission, and
        no link here is paid for. If that changes we will say so here first, and label the links themselves.
      </p>

      <h2 style={H2}>How we work</h2>
      <p style={P}>
        We write the guide first. Nobody pays to appear on this site, and no hotel, agency or tourist board has any say
        in what we publish. We do not run sponsored reviews or paid placements.
      </p>
      <p style={P}>
        Where we name a real business, we say only what we can check. We do not print prices or room counts for
        individual hotels, because those change daily and we would rather send you to the live listing than publish a
        number that is already wrong.
      </p>

      <h2 style={H2}>The planned park</h2>
      <p style={P}>
        This site is not affiliated with, endorsed by or connected to Universal Studios, Universal Destinations &amp;
        Experiences or Comcast NBCUniversal. All trademarks belong to their owners.
      </p>
      <p style={P}>
        The park described on this site is announced and planned. At the time of writing, the location has been
        confirmed and the land bought. What gets built, what it costs and when it opens have not been announced. Nothing
        here should be read as confirmation of dates, details or anything else, and we would encourage you not to make
        a non-refundable booking on the strength of it.
      </p>

      <h2 style={H2}>Accuracy</h2>
      <p style={P}>
        We try to keep this site accurate and current, but we cannot guarantee it. Journey times, opening hours and
        availability all change. Check anything that matters with the operator before you rely on it.
      </p>

      <h2 style={H2}>Photographs</h2>
      <p style={P}>
        Photographs are freely licensed images from Wikimedia Commons, cropped to fit. Those whose licence requires the
        photographer to be named are credited at the foot of the home page, and where a licence is share-alike, our crop
        is offered under those same terms.
      </p>

      <h2 style={H2}>Contact</h2>
      <p style={P}>
        Questions, corrections or complaints:{" "}
        <a href="mailto:hello@kainovation.com" style={{ color: BLUE }}>
          hello@kainovation.com
        </a>
        . If we have got something wrong, tell us and we will fix it.
      </p>

      <p style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${LINE}`, fontSize: 13, color: MUTED }}>
        © 2026 Ride to Universal.
      </p>
    </main>
  );
}
