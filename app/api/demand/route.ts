import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side proxy for the Booking.com Demand API.
 *
 * The API key is a bearer credential: it must never be sent to the browser, so
 * it is read here from a server-only env var (no NEXT_PUBLIC_ prefix) and the
 * browser only ever talks to this route.
 *
 * Headers the Demand API requires on every call:
 *   Authorization: Bearer <api key>
 *   X-Affiliate-Id: <affiliate id>
 * https://developers.booking.com/demand/docs/development-guide/authentication
 *
 * Off unless BOOKING_TEST_ENABLED is set, so the deployed site does not expose
 * a route that spends the account's quota.
 */

const HOSTS = {
  sandbox: "https://demandapi-sandbox.booking.com",
  production: "https://demandapi.booking.com",
} as const;

export async function GET() {
  // lets the test page report what is configured without revealing anything
  return NextResponse.json({
    enabled: process.env.BOOKING_TEST_ENABLED === "1",
    hasApiKey: Boolean(process.env.BOOKING_API_KEY),
    hasAffiliateId: Boolean(process.env.BOOKING_AFFILIATE_ID),
    affiliateId: process.env.BOOKING_AFFILIATE_ID ?? null, // public by design
  });
}

export async function POST(req: Request) {
  if (process.env.BOOKING_TEST_ENABLED !== "1") {
    return NextResponse.json(
      { error: "disabled", detail: "Set BOOKING_TEST_ENABLED=1 to use this route." },
      { status: 403 },
    );
  }

  const key = process.env.BOOKING_API_KEY;
  const aid = process.env.BOOKING_AFFILIATE_ID;
  const missing = [
    !key && "BOOKING_API_KEY",
    !aid && "BOOKING_AFFILIATE_ID",
  ].filter(Boolean);
  if (missing.length) {
    return NextResponse.json({ error: "missing_credentials", missing }, { status: 400 });
  }

  let payload: { env?: string; version?: string; path?: string; body?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request", detail: "Body must be JSON." }, { status: 400 });
  }

  const host = HOSTS[(payload.env ?? "sandbox") as keyof typeof HOSTS];
  if (!host) {
    return NextResponse.json({ error: "bad_request", detail: "env must be sandbox or production." }, { status: 400 });
  }

  const version = String(payload.version ?? "3.1").replace(/[^0-9.]/g, "");
  const path = String(payload.path ?? "/accommodations/search");
  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "bad_request", detail: "path must start with /" }, { status: 400 });
  }

  const url = `${host}/${version}${path}`;
  const started = Date.now();

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "X-Affiliate-Id": String(aid),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload.body ?? {}),
      signal: AbortSignal.timeout(30000),
      cache: "no-store",
    });

    const text = await r.text();
    let parsed: unknown;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    return NextResponse.json({
      url,
      status: r.status,
      ok: r.ok,
      ms: Date.now() - started,
      response: parsed,
    });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json(
      { url, error: "request_failed", name: err.name, detail: err.message, ms: Date.now() - started },
      { status: 502 },
    );
  }
}
