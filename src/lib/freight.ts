import type { CoveringKey } from "./pricing-client";

/**
 * Freight lanes — DSV Economy road freight, customer collects at the DSV depot.
 * Rates ex VAT, rounded, from the 2026 rate card. Weight basis: a kerbset is
 * ~240 kg; a set with the 50 mm ledger is ~515 kg, which moves it into the
 * heavier band.
 */

export type FreightRegionId =
  | "kzn"
  | "gauteng"
  | "western-cape"
  | "eastern-cape-el"
  | "eastern-cape-pe"
  | "other";

export interface FreightRegion {
  id: FreightRegionId;
  label: string;
  /** Rate for a head-only / kerbset order (null = quoted on WhatsApp). */
  light: number | null;
  /** Rate for an order with a ledger / slab (null = quoted on WhatsApp). */
  heavy: number | null;
  /** Where the customer collects, shown at checkout and on the confirmation. */
  collection: string;
  /** Extra note shown under the lane. */
  note?: string;
}

export const FREIGHT_REGIONS: FreightRegion[] = [
  {
    id: "kzn",
    label: "KwaZulu-Natal — within 50 km of Pietermaritzburg or Pinetown",
    light: 0,
    heavy: 0,
    collection: "Delivered by our own team",
    note: "Free delivery within 50 km of our branches; further KZN towns quoted on WhatsApp",
  },
  {
    id: "gauteng",
    label: "Gauteng",
    light: 1500,
    heavy: 3300,
    collection: "Collect from the DSV Johannesburg depot",
  },
  {
    id: "western-cape",
    label: "Western Cape",
    light: 1700,
    heavy: 3800,
    collection: "Collect from the DSV Cape Town depot",
  },
  {
    id: "eastern-cape-el",
    label: "Eastern Cape — East London",
    light: 1550,
    heavy: 3300,
    collection: "Collect from the DSV East London depot",
  },
  {
    id: "eastern-cape-pe",
    label: "Eastern Cape — Port Elizabeth / Gqeberha",
    light: 1700,
    heavy: 3600,
    collection: "Collect from the DSV Port Elizabeth depot",
  },
  {
    id: "other",
    label: "Other province",
    light: null,
    heavy: null,
    collection: "Collection point confirmed on WhatsApp",
    note: "Freight quoted on WhatsApp",
  },
];

export const DEPOT_COLLECTION_NOTE =
  "Two days' free holding at the depot. Bring your order reference and ID when you collect.";

export function getFreightRegion(id: string | null | undefined): FreightRegion | undefined {
  return FREIGHT_REGIONS.find((r) => r.id === id);
}

const HEAVY_EXTRA = /ledger|slab/i;

/** True when the order moves into the heavier freight band (ledger / slab on the pallet). */
export function isHeavyItem(covering: CoveringKey, extras: { name?: string; id?: string }[]): boolean {
  if (covering === "ks") return true;
  return extras.some((e) => HEAVY_EXTRA.test(e.name ?? "") || HEAVY_EXTRA.test(e.id ?? ""));
}

export interface FreightQuote {
  region: FreightRegion;
  heavy: boolean;
  /** Amount in rand, or null when the lane is quoted on WhatsApp. */
  amount: number | null;
}

/** One freight line per order — the heaviest item in the cart sets the band. */
export function quoteFreight(
  regionId: string | null | undefined,
  items: { covering: CoveringKey; extras: { name?: string; id?: string }[] }[],
): FreightQuote | null {
  const region = getFreightRegion(regionId);
  if (!region) return null;
  const heavy = items.some((i) => isHeavyItem(i.covering, i.extras));
  const amount = heavy ? region.heavy : region.light;
  return { region, heavy, amount };
}

/** Cheapest paid lane, for the "from R x" hint on product pages. */
export function cheapestPaidFreight(): { amount: number; label: string } | null {
  const paid = FREIGHT_REGIONS.filter((r) => typeof r.light === "number" && (r.light as number) > 0);
  if (!paid.length) return null;
  const best = paid.reduce((a, b) => ((a.light as number) <= (b.light as number) ? a : b));
  return { amount: best.light as number, label: best.label.split(" — ")[0] };
}
