import type { DesignManifest } from "../types";

/**
 * S5 Design — Signature Range
 *
 * Shape: Tall rectangular main panel with a heart shape crown at the top-left,
 * vertical pillar on the right (taller than main panel).
 * The heart is NOT a cutout — it's a solid heart shape sitting on top of the panel.
 *
 * Ref: F:\Pullens Artwork\Outlined Drawings\S Range\S5.jpg
 * Ref: F:\Pullens Artwork\Artwork from catalogues\S Range for Whatsapp Scenic\S Range for Whatsapp SCENIC5.jpg
 */
export const S5_DESIGN: DesignManifest = {
  code: "S5",
  range: "signature",
  name: "S5 Design",
  headstone: {
    // Main panel — tall narrow rectangle with curved top-left flowing into heart crown
    // Heart is part of the outline (solid), not a cutout
    outline: [
      { x: 0, y: 0 },         // bottom-left of main panel
      { x: 0, y: 400 },       // left edge rises straight
      // Heart shape crown at top-left
      { x: -10, y: 440 },     // slight outward curve starting heart
      { x: -20, y: 490 },     // left lobe of heart
      { x: -10, y: 540 },     // top of left lobe
      { x: 20, y: 560 },      // inner dip between lobes
      { x: 50, y: 580 },      // center peak of heart
      { x: 80, y: 560 },      // inner dip right side
      { x: 110, y: 540 },     // top of right lobe
      { x: 120, y: 490 },     // right lobe of heart
      { x: 110, y: 440 },     // heart meets panel top
      // Top of main panel (straight across to right edge)
      { x: 110, y: 420 },     // panel top-right area
      { x: 180, y: 420 },     // top edge continues to pillar
      { x: 180, y: 0 },       // right edge of main panel down
    ],
    cutouts: [],               // No cutouts — heart is solid, not a hole
    width_mm: 180,
    height_mm: 580,
    depth_mm: 70,
  },
  subElements: [
    {
      // Vertical pillar on right — taller than main panel
      type: "pillar",
      position: { x: 200, y: 0, z: 0 },
      dimensions: { width: 50, height: 620, depth: 50 },
    },
  ],
  base: {
    width_mm: 300,
    depth_mm: 180,
    height_mm: 70,
  },
  kerbs: {
    outer_width_mm: 1100,
    outer_depth_mm: 2200,
    height_mm: 90,
    thickness_mm: 55,
  },
  coveringTypes: ["head-base", "kerbs-chips", "kerbs-tiles", "kerbs-slab"],
  inscription: [
    { text: "Isikhumbuzo Sika", size: "small", style: "serif" },
    { text: "Mama Wethu", size: "medium", style: "serif" },
    { text: "MAGGIE SIHLE", size: "large", style: "sans" },
    { text: "Wazala 10.03.1948", size: "small", style: "sans" },
    { text: "Washona 09.06.2010", size: "small", style: "sans" },
  ],
  realDimensions: {
    headstone_sizes: ["900x500mm", "1200x600mm", "1500x700mm"],
  },
};
