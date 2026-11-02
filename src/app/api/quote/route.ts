import { NextResponse } from "next/server";
import { getPrice, getExtraById, type CoveringKey } from "@/lib/pricing";

export const runtime = "nodejs";

/**
 * Public price reveal. The only way a public visitor gets a stone price:
 * they leave a name and WhatsApp number, we compute the breakdown here
 * server-side and log the quote. Every reveal is a captured lead.
 */

interface Payload {
  name: string;
  phone: string;
  code: string;
  covering: CoveringKey;
  extras?: { id: string }[];
}

function clean(s: unknown, max = 200): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 30);
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Please give us your name and WhatsApp number" },
      { status: 400 }
    );
  }

  const row = getPrice(clean(body.code, 10));
  const stone = row ? row[body.covering] : null;
  if (!row || typeof stone !== "number") {
    return NextResponse.json(
      { ok: false, error: "This design is priced on WhatsApp" },
      { status: 400 }
    );
  }

  const extras = (body.extras ?? [])
    .map((e) => getExtraById(clean(e.id, 80)))
    .filter((e): e is NonNullable<typeof e> => !!e && e.price !== null)
    .map((e) => ({ id: e.id, name: e.name, price: e.price as number }));
  const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
  const total = stone + extrasTotal;

  // Log the reveal as a lead — service key only; skipped silently when not configured.
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (url && key) {
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/web_quotes`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          phone,
          design_code: row.code,
          covering: body.covering,
          extras,
          total,
          source: "web",
        }),
      });
      if (!res.ok) console.error("web_quotes insert failed", res.status, await res.text());
    } catch (err) {
      console.error("web_quotes insert error", err);
    }
  }

  return NextResponse.json({ ok: true, stone, extras, extrasTotal, total });
}
