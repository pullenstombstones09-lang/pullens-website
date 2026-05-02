import type { DesignManifest } from "../types";

/**
 * S5 Design — Signature Range
 *
 * Shape: Curved left panel with heart cutout + vertical pillar on right
 * Covering: All types available
 * Ref: F:\Pullens Artwork\Outlined Drawings\S Range\S5.jpg
 */
export const S5_DESIGN: DesignManifest = {
  code: "S5",
  range: "signature",
  name: "S5 Design",
  headstone: {
    outline: [
      { x: 0, y: 0 },
      { x: 0, y: 350 },
      { x: 20, y: 420 },
      { x: 60, y: 470 },
      { x: 120, y: 500 },
      { x: 180, y: 490 },
      { x: 220, y: 480 },
      { x: 220, y: 0 },
    ],
    cutouts: [
      [
        { x: 60, y: 280 },
        { x: 30, y: 350 },
        { x: 60, y: 400 },
        { x: 90, y: 420 },
        { x: 120, y: 400 },
        { x: 150, y: 350 },
        { x: 120, y: 280 },
      ],
    ],
    width_mm: 220,
    height_mm: 500,
    depth_mm: 80,
  },
  subElements: [
    {
      type: "pillar",
      position: { x: 230, y: 0, z: 0 },
      dimensions: { width: 60, height: 520, depth: 60 },
    },
  ],
  base: {
    width_mm: 350,
    depth_mm: 200,
    height_mm: 80,
  },
  kerbs: {
    outer_width_mm: 1200,
    outer_depth_mm: 2400,
    height_mm: 100,
    thickness_mm: 60,
  },
  coveringTypes: ["head-base", "kerbs-chips", "kerbs-tiles", "kerbs-slab"],
  inscription: [
    { text: "In Loving Memory Of", size: "small", style: "serif" },
    { text: "SAMPLE NAME", size: "large", style: "sans" },
    { text: "1960 — 2025", size: "medium", style: "sans" },
    { text: "Rest In Peace", size: "small", style: "serif" },
  ],
  realDimensions: {
    headstone_sizes: ["900x500mm", "1200x600mm", "1500x700mm"],
  },
};
