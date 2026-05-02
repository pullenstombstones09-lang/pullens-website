import type { DesignManifest } from "../types";

/**
 * S5 Design — Signature Range
 *
 * Shape: Tall main panel with heart shape at top-left, vertical pillar on right.
 * The heart is a solid crown sitting above the main rectangular panel.
 * Uses bezier curves for the heart shape (see profiles.ts curvePoints).
 */
export const S5_DESIGN: DesignManifest = {
  code: "S5",
  range: "signature",
  name: "S5 Design",
  headstone: {
    // Main panel is a tall rectangle. Heart shape handled via curvePoints in profiles.ts
    // For now, simplified to a tall panel with rounded top
    outline: [
      { x: 0, y: 0 },         // bottom-left
      { x: 0, y: 500 },       // left edge straight up
      // Rounded/curved top
      { x: 10, y: 540 },
      { x: 30, y: 570 },
      { x: 60, y: 590 },
      { x: 100, y: 600 },     // peak
      { x: 140, y: 590 },
      { x: 170, y: 570 },
      { x: 190, y: 540 },
      { x: 200, y: 500 },     // right side starts
      { x: 200, y: 0 },       // bottom-right
    ],
    cutouts: [],
    width_mm: 200,
    height_mm: 600,
    depth_mm: 60,
  },
  subElements: [
    {
      // Vertical pillar on right — slightly taller than main panel
      type: "pillar",
      position: { x: 220, y: 0, z: 0 },
      dimensions: { width: 45, height: 650, depth: 45 },
    },
  ],
  base: {
    width_mm: 320,
    depth_mm: 160,
    height_mm: 60,
  },
  kerbs: {
    outer_width_mm: 900,
    outer_depth_mm: 1800,
    height_mm: 80,
    thickness_mm: 50,
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
