"use client";

import { useEffect, useState } from "react";

/* A console for the Booking.com Demand API. Not linked from anywhere and
   noindexed: it exists to prove the credentials work before any of this
   touches the real pages. */

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const INK = "#17181B";
const MUTED = "#5B5D63";
const LINE = "#E4E4DE";
const PAPER = "#FAFAF7";
const BLUE = "#1F4BFF";

type Config = { enabled: boolean; hasApiKey: boolean; hasAffiliateId: boolean; affiliateId: string | null };

const EXAMPLES: Record<string, string> = {
  "/accommodations/search": JSON.stringify(
    {
      booker: { country: "gb", platform: "desktop" },
      checkin: "2026-11-20",
      checkout: "2026-11-22",
      city: -2601889,
      guests: { number_of_adults: 2, number_of_rooms: 1 },
      currency: "GBP",
      extras: ["extra_charges", "products"],
      rows: 10,
    },
    null,
    2,
  ),
  "/accommodations/details": JSON.stringify(
    { accommodations: [10004], extras: ["description", "photos", "facilities"], languages: ["en-gb"] },
    null,
    2,
  ),
  "/common/locations/cities": JSON.stringify({ countries: ["gb"], languages: ["en-gb"], rows: 20 }, null, 2),
};

export default function BookingTest() {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [env, setEnv] = useState("sandbox");
  const [version, setVersion] = useState("3.1");
  const [path, setPath] = useState("/accommodations/search");
  const [body, setBody] = useState(EXAMPLES["/accommodations/search"]);
  const [out, setOut] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/demand").then((r) => r.json()).then(setCfg).catch(() => setCfg(null));
  }, []);

  async function run() {
    setBusy(true);
    setOut("");
    try {
      const parsed = JSON.parse(body);
      const r = await fetch("/api/demand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ env, version, path, body: parsed }),
      });
      setOut(JSON.stringify(await r.json(), null, 2));
    } catch (e) {
      setOut(`Could not send the request.\n\n${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  const ready = cfg?.enabled && cfg?.hasApiKey && cfg?.hasAffiliateId;
  const field: React.CSSProperties = {
    font: `14px ${MONO}`, padding: "10px 12px", borderRadius: 8,
    border: `1px solid ${LINE}`, background: "#FFFFFF", color: INK,
  };

  return (
    <main style={{ minHeight: "100vh", background: PAPER, color: INK, fontFamily: "var(--font-poppins), system-ui, sans-serif", padding: "48px max(24px, calc((100vw - 1100px) / 2)) 96px" }}>
      <h1 style={{ margin: "0 0 6px", fontSize: 30, letterSpacing: "-0.02em" }}>Demand API test console</h1>
      <p style={{ margin: "0 0 28px", color: MUTED, fontSize: 15 }}>
        Not linked from the site and not indexed. The API key stays on the server — the browser only ever calls{" "}
        <code style={{ font: `13px ${MONO}` }}>/api/demand</code>.
      </p>

      {/* what is configured, without printing the secret */}
      <section style={{ border: `1px solid ${LINE}`, borderRadius: 10, background: "#FFFFFF", padding: 20, marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" }}>Configuration</h2>
        {cfg === null ? (
          <p style={{ margin: 0, color: MUTED, fontSize: 14 }}>Checking…</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.9 }}>
            <li><strong>BOOKING_TEST_ENABLED</strong> — {cfg.enabled ? "on" : "not set (route refuses to call out)"}</li>
            <li><strong>BOOKING_API_KEY</strong> — {cfg.hasApiKey ? "present" : "missing"}</li>
            <li><strong>BOOKING_AFFILIATE_ID</strong> — {cfg.hasAffiliateId ? `present (${cfg.affiliateId})` : "missing"}</li>
          </ul>
        )}
        {cfg && !ready ? (
          <p style={{ margin: "12px 0 0", fontSize: 14, color: "#8A2F2F" }}>
            Set the missing values in Vercel → Settings → Environment Variables, then redeploy.
          </p>
        ) : null}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 12 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
          Environment
          <select value={env} onChange={(e) => setEnv(e.target.value)} style={field}>
            <option value="sandbox">sandbox</option>
            <option value="production">production</option>
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
          Version
          <input value={version} onChange={(e) => setVersion(e.target.value)} style={field} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, gridColumn: "span 2" }}>
          Endpoint
          <select
            value={path}
            onChange={(e) => { setPath(e.target.value); if (EXAMPLES[e.target.value]) setBody(EXAMPLES[e.target.value]); }}
            style={field}
          >
            {Object.keys(EXAMPLES).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
      </section>

      <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, marginBottom: 16 }}>
        Request body (JSON) — edit freely if the schema differs from the example
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={14} spellCheck={false} style={{ ...field, resize: "vertical", lineHeight: 1.5 }} />
      </label>

      <button
        type="button"
        onClick={run}
        disabled={busy}
        style={{ font: "600 15px inherit", padding: "13px 24px", borderRadius: 8, border: 0, cursor: busy ? "wait" : "pointer", background: BLUE, color: "#FFFFFF" }}
      >
        {busy ? "Calling…" : "Send request"}
      </button>

      {out ? (
        <pre style={{ marginTop: 24, padding: 20, borderRadius: 10, border: `1px solid ${LINE}`, background: "#FFFFFF", font: `13px ${MONO}`, lineHeight: 1.55, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 620, overflow: "auto" }}>
          {out}
        </pre>
      ) : null}
    </main>
  );
}
