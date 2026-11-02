import { NextResponse } from "next/server";
import { TRADE_COOKIE } from "@/lib/trade-session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/trade/login", req.url), 303);
  res.cookies.set(TRADE_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
