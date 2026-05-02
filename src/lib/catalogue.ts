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

// Design counts per range (from actual catalogue)
const DESIGN_COUNTS: Record<string, number> = {
  "B-Range": 17,
  "EX-Range": 18,
  "M-Range": 7,
  "P-Range": 62,
  "S-Range": 37,
};

export function getRangeBySlug(slug: RangeSlug): RangeInfo | undefined {
  return RANGES.find((r) => r.slug === slug);
}

export function getCatalogueItems(slug: RangeSlug): CatalogueItem[] {
  const range = getRangeBySlug(slug);
  if (!range) return [];

  const count = DESIGN_COUNTS[range.dirName] || 0;
  const items: CatalogueItem[] = [];

  // Generate items based on known file naming patterns
  const prefix = range.dirName.replace("-Range", "");
  for (let i = 1; i <= count; i++) {
    items.push({
      code: `${prefix}${i}`,
      range: slug,
      rangeName: range.name,
      dirName: range.dirName,
      imagePath: `/catalogue/${range.dirName}/${prefix}${i}.webp`,
    });
  }

  return items;
}

// Note: P-Range has some non-standard names (13B, 13C, 14D, 6B)
// These will be handled when actual image files are copied in Task 14

export function getAllItems(): CatalogueItem[] {
  return RANGES.flatMap((r) => getCatalogueItems(r.slug));
}
