import data from "./pricing-data.json";
import {
  COVERING_ORDER,
  type CoveringKey,
} from "./pricing-client";

/**
 * SERVER-ONLY pricing data layer.
 *
 * This module imports the full price list, so it must never be imported
 * from a "use client" component on the public site — public visitors get
 * prices only from /api/quote after leaving their name and WhatsApp
 * number. Client-safe helpers live in src/lib/pricing-client.ts.
 */

export {
  COVERINGS,
  COVERING_ORDER,
  SHOP_SETTINGS,
  depositAmount,
  formatZAR,
  planDeposit,
  planMonthly,
  type CoveringKey,
} from "./pricing-client";

/* ---------- types ---------- */

export interface PriceRow {
  code: string | null;
  name: string;
  cat: "memorial" | "extras";
  variant: string | null;
  size: string | null;
  cc: number | null;
  kc: number | null;
  t: number | null;
  ks: number | null;
  complete_only: boolean;
  sort: number;
  trade_price?: number | null;
  trade_price_kerbs_chips?: number | null;
  trade_price_tiles?: number | null;
  trade_price_kerbs_slab?: number | null;
}

export interface Extra {
  id: string;
  name: string;
  price: number | null; // null = price on application
}

/* ---------- data ---------- */

const rows = data as PriceRow[];
const memorials = new Map<string, PriceRow>();
for (const r of rows) {
  if (r.cat === "memorial" && r.code) memorials.set(r.code.toUpperCase(), r);
}

export function getPrice(code: string): PriceRow | undefined {
  return memorials.get(code.toUpperCase());
}

export function availableCoverings(row: PriceRow): CoveringKey[] {
  return COVERING_ORDER.filter((k) => typeof row[k] === "number" && (row[k] as number) > 0);
}

export function fromPrice(code: string): number | null {
  const row = getPrice(code);
  if (!row) return null;
  const vals = availableCoverings(row).map((k) => row[k] as number);
  return vals.length ? Math.min(...vals) : null;
}

/** Lowest Head & Base price across a set of designs — the one public "From R x" per range. */
export function rangeFromPrice(codes: string[]): number | null {
  const vals: number[] = [];
  for (const code of codes) {
    const row = getPrice(code);
    if (row && typeof row.cc === "number" && row.cc > 0) vals.push(row.cc);
  }
  return vals.length ? Math.min(...vals) : null;
}

export function getExtras(): Extra[] {
  return rows
    .filter((r) => r.cat === "extras")
    .sort((a, b) => a.sort - b.sort)
    .map((r) => ({
      id: slugify(r.name),
      name: r.name,
      price: typeof r.cc === "number" && r.cc > 0 ? r.cc : null,
    }));
}

export function getExtraById(id: string): Extra | undefined {
  return getExtras().find((e) => e.id === id);
}

/** Names only — safe to pass to public client components (no prices). */
export function getExtrasPublic(): { id: string; name: string; poa: boolean }[] {
  return getExtras().map((e) => ({ id: e.id, name: e.name, poa: e.price === null }));
}

/* ---------- helpers ---------- */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ---------- trade pricing ---------- */

/* =====================================================================
 * PLACEHOLDER — replace with the real trade price list.
 * Until real trade prices are loaded into the pricelist trade_* columns,
 * trade prices are simulated as retail minus this discount, rounded to
 * the nearest R50, and badged "sample trade pricing" wherever shown.
 * ===================================================================== */
export const TRADE_PLACEHOLDER_DISCOUNT = 0.3;

const TRADE_COLUMNS: Record<CoveringKey, keyof PriceRow> = {
  cc: "trade_price",
  kc: "trade_price_kerbs_chips",
  t: "trade_price_tiles",
  ks: "trade_price_kerbs_slab",
};

export interface TradePrice {
  amount: number;
  /** true while the amount is derived from retail — not the real trade list */
  placeholder: boolean;
}

export function tradePriceFor(row: PriceRow, covering: CoveringKey): TradePrice | null {
  const retail = row[covering];
  if (typeof retail !== "number" || retail <= 0) return null;
  const loaded = row[TRADE_COLUMNS[covering]];
  if (typeof loaded === "number" && loaded > 0) {
    return { amount: loaded, placeholder: false };
  }
  const amount = Math.round((retail * (1 - TRADE_PLACEHOLDER_DISCOUNT)) / 50) * 50;
  return { amount, placeholder: true };
}

export function tradeFromPrice(code: string): TradePrice | null {
  const row = getPrice(code);
  if (!row) return null;
  const prices = availableCoverings(row)
    .map((k) => tradePriceFor(row, k))
    .filter((p): p is TradePrice => p !== null);
  if (!prices.length) return null;
  return prices.reduce((min, p) => (p.amount < min.amount ? p : min));
}
