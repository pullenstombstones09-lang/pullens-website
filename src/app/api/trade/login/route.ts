import { NextResponse } from "next/server";
import { scryptSync, timingSafeEqual } from "crypto";
import {
  TRADE_COOKIE,
  TRADE_SESSION_HOURS,
  signTradeSession,
  type TradeSession,
} from "@/lib/trade-session";

export const runtime = "nodejs";

/** Naive in-memory rate limit: 5 failed attempts per account code per 15 minutes. */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; first: number }>();

function tooManyFailures(code: string): boolean {
  const entry = failures.get(code);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(code);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(code: string) {
  const entry = failures.get(code);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    failures.set(code, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

function verifyPin(pin: string, stored: string): boolean {
  // Format: scrypt$<salt-hex>$<hash-hex>  (see scripts/hash-pin.mjs)
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    const actual = scryptSync(pin, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

interface AccountRow {
  id: string;
  account_code: string;
  parlour_name: string;
  phone: string;
  pin_hash: string;
  price_tier: string;
  on_account: boolean;
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key || !process.env.TRADE_SESSION_SECRET) {
    return NextResponse.json(
      { ok: false, error: "The trade portal is not yet connected. Please WhatsApp us to order." },
      { status: 503 }
    );
  }

  let body: { code?: string; pin?: string };
  try {
    body = (await req.json()) as { code?: string; pin?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const code = (body.code ?? "").trim().toUpperCase().slice(0, 20);
  const pin = (body.pin ?? "").trim().slice(0, 12);
  if (!code || !pin) {
    return NextResponse.json({ ok: false, error: "Enter your account code and PIN" }, { status: 400 });
  }
  if (tooManyFailures(code)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in 15 minutes or WhatsApp us." },
      { status: 429 }
    );
  }

  const base = url.replace(/\/$/, "");
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  let account: AccountRow | undefined;
  try {
    const res = await fetch(
      `${base}/rest/v1/trade_accounts?account_code=eq.${encodeURIComponent(code)}&active=is.true` +
        `&select=id,account_code,parlour_name,phone,pin_hash,price_tier,on_account&limit=1`,
      { headers, cache: "no-store" }
    );
    if (res.ok) account = ((await res.json()) as AccountRow[])[0];
    else console.error("trade_accounts lookup failed", res.status, await res.text());
  } catch (err) {
    console.error("trade_accounts lookup error", err);
  }

  if (!account || !verifyPin(pin, account.pin_hash)) {
    recordFailure(code);
    return NextResponse.json({ ok: false, error: "Account code or PIN incorrect" }, { status: 401 });
  }
  failures.delete(code);

  // Best-effort last_login stamp
  fetch(`${base}/rest/v1/trade_accounts?id=eq.${account.id}`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ last_login: new Date().toISOString() }),
  }).catch(() => undefined);

  const session: TradeSession = {
    id: account.id,
    code: account.account_code,
    parlour: account.parlour_name,
    phone: account.phone,
    tier: account.price_tier,
    onAccount: account.on_account,
    exp: Date.now() + TRADE_SESSION_HOURS * 60 * 60 * 1000,
  };
  const token = signTradeSession(session);
  if (!token) {
    return NextResponse.json({ ok: false, error: "The trade portal is not yet connected." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true, parlour: account.parlour_name });
  res.cookies.set(TRADE_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: TRADE_SESSION_HOURS * 60 * 60,
  });
  return res;
}
