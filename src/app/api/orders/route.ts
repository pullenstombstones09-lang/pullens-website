import { NextResponse } from "next/server";
import { getPrice, getExtraById, tradePriceFor, SHOP_SETTINGS, type CoveringKey } from "@/lib/pricing";
import { quoteFreight } from "@/lib/freight";
import { getTradeSession } from "@/lib/trade-session";

export const runtime = "nodejs";

interface IncomingItem {
  code: string;
  covering: CoveringKey;
  extras: { id: string }[];
  inscription?: string;
}

interface Payload {
  customer: { name: string; phone: string; email?: string; cemetery?: string; branch?: string };
  freightRegion?: string | null;
  /** Trade only: collect from a Pullen's branch instead of freight. */
  branchCollect?: boolean;
  /** Trade only: family / deceased reference for the invoice. */
  tradeReference?: string | null;
  paymentMode: "full" | "deposit" | "payment_plan";
  planMonths: number | null;
  referral: string | null;
  items: IncomingItem[];
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeRef(): string {
  let s = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) s += ALPHABET[b % ALPHABET.length];
  return `PW-${s}`;
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

  // A valid trade cookie switches the order to the trade channel and trade pricing.
  const trade = await getTradeSession();

  const name = clean(body.customer?.name, 120) || (trade ? trade.parlour : "");
  const phone = clean(body.customer?.phone, 30) || (trade ? trade.phone : "");
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 400 });
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty" }, { status: 400 });
  }

  // Re-price everything server-side from the price list — never trust client totals.
  const lines = [];
  for (const it of body.items) {
    const row = getPrice(clean(it.code, 10));
    let stone: number | null = null;
    if (row) {
      if (trade) {
        stone = tradePriceFor(row, it.covering)?.amount ?? null;
      } else {
        const retail = row[it.covering];
        stone = typeof retail === "number" ? retail : null;
      }
    }
    if (!row || typeof stone !== "number") {
      return NextResponse.json({ ok: false, error: `Design ${it.code} cannot be ordered online` }, { status: 400 });
    }
    const extras = (it.extras ?? [])
      .map((e) => getExtraById(clean(e.id, 80)))
      .filter((e): e is NonNullable<typeof e> => !!e && e.price !== null)
      .map((e) => ({ id: e.id, name: e.name, price: e.price as number }));
    const extrasTotal = extras.reduce((s, e) => s + e.price, 0);
    lines.push({
      design_code: row.code as string,
      covering: it.covering,
      extras,
      inscription: clean(it.inscription, 400) || null,
      stone_total: stone,
      extras_total: extrasTotal,
      order_total: stone + extrasTotal,
    });
  }

  // Freight is computed here from the region and the cart — the client never sets the amount.
  // Trade accounts may instead collect from a Pullen's branch at no freight.
  const branchCollect = !!trade && body.branchCollect === true;
  const freight = branchCollect
    ? null
    : quoteFreight(clean(body.freightRegion, 40), lines.map((l) => ({ covering: l.covering, extras: l.extras })));
  if (!branchCollect && !freight) {
    return NextResponse.json({ ok: false, error: "Please choose a collection / delivery region" }, { status: 400 });
  }
  const freightTotal = freight?.amount ?? 0;
  const freightRegionId = branchCollect ? "branch-collect" : freight!.region.id;

  const onAccount = !!trade && trade.onAccount;
  const paymentMode = trade
    ? onAccount
      ? "account"
      : "deposit"
    : body.paymentMode === "full" || body.paymentMode === "payment_plan"
      ? body.paymentMode
      : "deposit";
  const planMonths = paymentMode === "payment_plan" && (body.planMonths === 3 || body.planMonths === 6) ? body.planMonths : null;
  const pct =
    paymentMode === "account" ? 0 : paymentMode === "full" ? 100 : paymentMode === "deposit" ? SHOP_SETTINGS.depositPct : SHOP_SETTINGS.planDepositPct;

  const ref = makeRef();
  // One freight line per order, carried on the first row so a multi-stone order is never double-charged.
  const rows = lines.map((l, idx) => ({
    ref,
    channel: trade ? "trade" : "public",
    trade_account_id: trade ? trade.id : null,
    customer_name: name,
    customer_phone: phone,
    customer_email: clean(body.customer?.email, 120) || null,
    cemetery: clean(body.customer?.cemetery, 120) || null,
    branch: clean(body.customer?.branch, 60) || null,
    notes: clean(body.tradeReference, 200) || null,
    freight_region: freightRegionId,
    freight_total: idx === 0 ? freightTotal : 0,
    payment_mode: paymentMode,
    plan_months: planMonths,
    referral_code: clean(body.referral, 40).toUpperCase() || null,
    status: "new",
    ...l,
    order_total: l.order_total + (idx === 0 ? freightTotal : 0),
    deposit_due: Math.ceil(((l.order_total + (idx === 0 ? freightTotal : 0)) * pct) / 100),
  }));

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  let stored = false;
  if (url && key) {
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/web_orders`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(rows),
      });
      stored = res.ok;
      if (!res.ok) console.error("web_orders insert failed", res.status, await res.text());
    } catch (err) {
      console.error("web_orders insert error", err);
    }
  } else {
    console.warn("SUPABASE_URL / SUPABASE_SERVICE_KEY not set — order not stored", ref);
  }

  const total = rows.reduce((s, r) => s + r.order_total, 0);
  const dueNow = rows.reduce((s, r) => s + r.deposit_due, 0);
  return NextResponse.json({
    ok: true,
    ref,
    stored,
    total,
    dueNow,
    freightRegion: freightRegionId,
    freightTotal: branchCollect ? 0 : freight!.amount,
  });
}
