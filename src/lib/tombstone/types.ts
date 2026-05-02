/** 2D point for headstone profile paths */
export interface Point2D {
  x: number;
  y: number;
}

/** Covering type options */
export type CoveringType = "head-base" | "kerbs-chips" | "kerbs-tiles" | "kerbs-slab";

/** Camera angle presets */
export type CameraAngle = "front" | "three-quarter-left" | "three-quarter-right";

/** Headstone profile definition — 2D shape that gets extruded */
export interface HeadstoneProfile {
  /** Outer silhouette points (closed path) */
  outline: Point2D[];
  /** Cutout shapes (hearts, crosses, etc.) */
  cutouts: Point2D[][];
  /** Width in mm */
  width_mm: number;
  /** Height in mm */
  height_mm: number;
  /** Depth/thickness in mm */
  depth_mm: number;
}

/** Sub-element attached to headstone (pillars, wings) */
export interface SubElement {
  type: "pillar" | "wing" | "cross";
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number; depth: number };
}

/** Base/plinth dimensions */
export interface BaseSpec {
  width_mm: number;
  depth_mm: number;
  height_mm: number;
}

/** Kerb border dimensions */
export interface KerbSpec {
  outer_width_mm: number;
  outer_depth_mm: number;
  height_mm: number;
  thickness_mm: number;
}

/** Inscription line */
export interface InscriptionLine {
  text: string;
  size: "large" | "medium" | "small";
  style: "serif" | "sans";
}

/** Complete design manifest */
export interface DesignManifest {
  code: string;
  range: "prestige" | "signature" | "more-for-less" | "exclusive" | "baby";
  name: string;
  headstone: HeadstoneProfile;
  subElements: SubElement[];
  base: BaseSpec;
  kerbs: KerbSpec;
  coveringTypes: CoveringType[];
  inscription: InscriptionLine[];
  /** Real-world dimensions for print pipeline */
  realDimensions: {
    headstone_sizes: string[];
  };
}

/** Camera preset position */
export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  label: string;
}
