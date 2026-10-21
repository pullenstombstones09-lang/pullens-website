import data from "./pricing-data.json";

/* ---------- types ---------- */

export type CoveringKey = "cc" | "kc" | "t" | "ks";

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

/* ---------- settings ---------- */

export const SHOP_SETTINGS = {
  depositPct: 50,
  planDepositPct: 30,
  planMonthsOptions: [3, 6] as const,
  productionAtPct: 50,
  quoteValidityDays: 30,
  currency: "ZAR",
} as const;

export const COVERINGS: Record<CoveringKey, string> = {
  cc: "Head & Base",
  kc: "Kerbs & Chips",
  t: "Tiles",
  ks: "Kerbs & Slab",
};

export const COVERING_ORDER: CoveringKey[] = ["cc", "kc", "t", "ks"];

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

/* ---------- money ---------- */

export function formatZAR(amount: number): string {
  const rounded = Math.round(amount);
  return "R " + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function depositAmount(total: number): number {
  return Math.ceil((total * SHOP_SETTINGS.depositPct) / 100);
}

export function planDeposit(total: number): number {
  return Math.ceil((total * SHOP_SETTINGS.planDepositPct) / 100);
}

export function planMonthly(total: number, months: number): number {
  return Math.ceil((total - planDeposit(total)) / months);
}

/* ---------- helpers ---------- */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
