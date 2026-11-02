/**
 * Client-safe pricing helpers.
 *
 * IMPORTANT: no price data may ever be imported into this file. The full
 * price list lives server-side only (src/lib/pricing.ts) and reaches the
 * public site exclusively through /api/quote after a customer has left
 * their name and WhatsApp number.
 */

export type CoveringKey = "cc" | "kc" | "t" | "ks";

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
