import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Trade portal session — a signed httpOnly cookie, verified server-side.
 * Server-only module (uses node:crypto and next/headers).
 */

export const TRADE_COOKIE = "pullens_trade";
export const TRADE_SESSION_HOURS = 12;

export interface TradeSession {
  id: string;
  code: string;
  parlour: string;
  phone: string;
  tier: string;
  onAccount: boolean;
  exp: number; // unix ms
}

function secret(): string | null {
  return process.env.TRADE_SESSION_SECRET || null;
}

function hmac(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function signTradeSession(session: TradeSession): string | null {
  const key = secret();
  if (!key) return null;
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${hmac(payload, key)}`;
}

export function verifyTradeToken(token: string | undefined | null): TradeSession | null {
  const key = secret();
  if (!key || !token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(payload, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as TradeSession;
    if (!session.id || !session.code || typeof session.exp !== "number") return null;
    if (Date.now() > session.exp) return null;
    return session;
  } catch {
    return null;
  }
}

/** Read and verify the trade session from the request cookies (server components / route handlers). */
export async function getTradeSession(): Promise<TradeSession | null> {
  const store = await cookies();
  return verifyTradeToken(store.get(TRADE_COOKIE)?.value);
}

import { redirect } from "next/navigation";

/** For protected trade pages: returns the session or redirects to /trade/login. */
export async function requireTradeSession(): Promise<TradeSession> {
  const session = await getTradeSession();
  if (!session) redirect("/trade/login");
  return session;
}
