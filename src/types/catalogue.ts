export type RangeSlug = "prestige" | "signature" | "more-for-less" | "exclusive" | "baby";

export type BudgetTier = "Affordable" | "Mid-range" | "Premium" | "Bespoke";

export interface CatalogueItem {
  code: string;
  range: RangeSlug;
  rangeName: string;
  dirName: string;
  imagePath: string;
}

export interface RangeInfo {
  slug: RangeSlug;
  name: string;
  dirName: string;
  description: string;
  sizes: string;
  budgetTier: BudgetTier;
  targetCustomer: string;
  coveringTypes: string[];
}
