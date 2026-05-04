import type { RangeSlug, RangeInfo, CatalogueItem } from "@/types/catalogue";

export const RANGES: RangeInfo[] = [
  {
    slug: "more-for-less",
    name: "More for Less",
    dirName: "M-Range",
    description: "Quality granite memorials at an affordable price. Our More for Less range proves that honouring your loved one doesn't have to cost a fortune.",
    sizes: "600x300mm / 900x300mm",
    budgetTier: "Affordable",
    targetCustomer: "Budget-conscious families",
    coveringTypes: ["Head & Base", "Kerbs & Chips"],
  },
  {
    slug: "prestige",
    name: "Prestige",
    dirName: "P-Range",
    description: "Our most popular range. Premium granite with a wide variety of designs to suit every family\u2019s vision. The Prestige range balances quality craftsmanship with value.",
    sizes: "700x400 / 900x500 / 1200x600mm",
    budgetTier: "Mid-range",
    targetCustomer: "Mid-market families",
    coveringTypes: ["Head & Base", "Kerbs & Chips", "Tiles", "Kerbs & Slab"],
  },
  {
    slug: "signature",
    name: "Signature",
    dirName: "S-Range",
    description: "For families who want something truly special. The Signature range features larger memorials with intricate designs, premium granite, and exceptional attention to detail.",
    sizes: "900x500 / 1200x600 / 1500x700mm",
    budgetTier: "Premium",
    targetCustomer: "High-end families",
    coveringTypes: ["Kerbs & Chips", "Tiles", "Kerbs & Slab"],
  },
  {
    slug: "exclusive",
    name: "Exclusive",
    dirName: "EX-Range",
    description: "Bespoke memorials for those who want a one-of-a-kind tribute. Custom materials, unique designs, and the finest craftsmanship \u2014 each Exclusive memorial is as individual as the life it celebrates.",
    sizes: "Custom",
    budgetTier: "Bespoke",
    targetCustomer: "Affluent families, unique requests",
    coveringTypes: ["Kerbs & Chips", "Tiles", "Kerbs & Slab"],
  },
  {
    slug: "baby",
    name: "Baby",
    dirName: "B-Range",
    description: "Gentle, dignified memorials for the smallest lives. Our Baby range is crafted with extra care and sensitivity, offering families a beautiful way to remember their little one.",
    sizes: "400x250 / 600x350mm",
    budgetTier: "Affordable",
    targetCustomer: "Infant memorials",
    coveringTypes: ["Head & Base", "Kerbs & Chips"],
  },
];

// Actual design codes per range (from processed catalogue images)
const DESIGN_CODES: Record<string, string[]> = {
  "B-Range": ["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B15","B16","B17","B18"],
  "EX-Range": ["EX1","EX2","EX3","EX4","EX5","EX6","EX7","EX8","EX9","EX10","EX11","EX12","EX13","EX15","EX16","EX17","EX18","EX19"],
  "M-Range": ["M1","M2","M3","M4","M5","M6","M9"],
  "P-Range": ["P1","P2","P3","P4","P5","P6","P8","P9","P10","P11","P12","P13","P14","P15","P16","P17","P18","P19","P20","P21","P22","P23","P24","P25","P26","P27","P28","P29","P30","P31","P32","P33","P34","P35","P36","P37","P38","P39","P40","P41","P42","P43","P44","P45","P46","P47","P48","P49","P50","P51","P52","P53","P55","P56","P57","P60","P61","6B","13B","13C","14D","W18"],
  "S-Range": ["S1","S2","S3","S4","S5","S6","S7","S8","S9","S10","S11","S12","S13","S14","S15","S16","S17","S18","S19","S20","S21","S22","S23","S24","S25","S26","S27","S28","S29","S30","S31","S32","S33","S34","S35","S36","S37"],
};

export function getRangeBySlug(slug: RangeSlug): RangeInfo | undefined {
  return RANGES.find((r) => r.slug === slug);
}

export function getCatalogueItems(slug: RangeSlug): CatalogueItem[] {
  const range = getRangeBySlug(slug);
  if (!range) return [];

  const codes = DESIGN_CODES[range.dirName] || [];
  return codes.map((code) => ({
    code,
    range: slug,
    rangeName: range.name,
    dirName: range.dirName,
    imagePath: `/catalogue/${range.dirName}/${code}.webp`,
  }));
}

export function getAllItems(): CatalogueItem[] {
  return RANGES.flatMap((r) => getCatalogueItems(r.slug));
}
