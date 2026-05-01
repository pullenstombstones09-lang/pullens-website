export type RangeSlug = "prestige" | "signature" | "more-for-less" | "exclusive" | "baby";

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
  priceRange: string;
  targetCustomer: string;
  coveringTypes: string[];
}
