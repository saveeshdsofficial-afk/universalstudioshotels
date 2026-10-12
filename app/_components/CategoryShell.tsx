import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ARCHIVO, SANS, SERIF, INK, SOFT, MUTED, LINE, PAPER, CATEGORIES,
} from "../_lib/site";

const GUTTER = "max(24px, calc((100vw - 1200px) / 2))";

/** Shared chrome for the four category pages: header, titled hero, footer. */
export default function CategoryShell({
  slug, title, standfirst, img, alt, children,
}: {
  slug: string;
  title: string;
  standfirst: string;
  img: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: SANS, fontSize: 16, lineHeight: 1.6 }}>
      <style>{`
        .cat a{color:inherit;text-decoration:none}
        .cat .nav a:hover{color:#1F4BFF}
        .cat .on{color:#1F4BFF;font-weight:700}
      `}</style>

      <div className="cat">
        <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, color: "#FFFFFF" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `16px ${GUTTER}` }}>
            <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26, letterSpacing: "-0.04em", lineHeight: 1 }}>
                Ride to Universal<span style={{ color: "#8FA6FF" }}>.</span>
              </span>
            </Link>
            <nav className="nav" style={{ display: "flex", gap: 28, fontSize: 15, fontWeight: 500 }}>
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className={c.slug === slug ? "on" : undefined}>
                  {c.word}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <section style={{ position: "relative", height: 460, display: "flex", alignItems: "flex-end", padding: `0 ${GUTTER} 64px`, overflow: "hidden" }}>
          <Image src={img} alt={alt} fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(23,24,27,.62) 0%,rgba(23,24,27,.32) 40%,rgba(23,24,27,.86) 100%)" }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 16, maxWidth: 820, color: "#FFFFFF" }}>
            <h1 style={{ margin: 0, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 68, lineHeight: 0.98, letterSpacing: "-0.045em", textWrap: "balance" }}>
              {title}
            </h1>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 20, lineHeight: 1.5, maxWidth: 620, color: "#F1F1F3" }}>
              {standfirst}
            </p>
          </div>
        </section>

        <main style={{ padding: `80px ${GUTTER} 112px` }}>{children}</main>

        <footer style={{ background: "#FFFFFF", borderTop: `1px solid ${LINE}`, padding: `48px ${GUTTER}`, display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center", fontSize: 14, color: MUTED }}>
          <Link href="/" style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 22, letterSpacing: "-0.04em", color: INK }}>
            Ride to Universal
          </Link>
          <nav className="nav" style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {CATEGORIES.map((c) => <Link key={c.slug} href={`/${c.slug}`}>{c.title}</Link>)}
            <Link href="/terms">Terms</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}

/** Shared section heading inside a category page. */
export function Band({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: LINE }} />
      </div>
      {children}
    </section>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p style={{ margin: "0 0 20px", fontFamily: SERIF, fontSize: 19, lineHeight: 1.6, color: SOFT, maxWidth: 760 }}>
      {children}
    </p>
  );
}
