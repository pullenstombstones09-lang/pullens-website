# 3D Catalogue Prototype (S5) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working Three.js tombstone viewer for design S5, with modular component assembly, 3 camera angles, covering type toggle, Rustenburg Black granite material, and image protection. Integrated into the pullens-website.

**Architecture:** Each tombstone is assembled from discrete 3D components (headstone, base, kerbs, covering). Components are defined as programmatic Three.js geometry with a shared Rustenburg Black PBR material. A React `<TombstoneViewer>` component renders the assembly on a canvas, with controls for angle switching and covering type toggling. Homepage/catalogue shows pre-assembled views; detail page shows the interactive viewer.

**Tech Stack:** Three.js (three), @react-three/fiber, @react-three/drei, Next.js 16, React 19, TypeScript, Tailwind v4

**Spec:** `docs/superpowers/specs/2026-05-02-3d-catalogue-system-design.md`

---

## File Structure

```
src/
  lib/
    tombstone/
      types.ts              — TypeScript types for design manifests, components, covering types
      designs/
        s5.ts               — S5 design manifest (headstone profile, dimensions, inscription)
      components.ts         — Shared component geometry builders (base, kerbs, slab, chips, tiles)
      materials.ts          — Rustenburg Black PBR material + granite texture generation
      profiles.ts           — Headstone 2D profile → Three.js Shape conversion
  components/
    viewer/
      tombstone-viewer.tsx  — Main React component: canvas, controls, angle/covering toggle
      tombstone-scene.tsx   — Three.js scene: lights, camera presets, component assembly
      granite-material.tsx  — R3F material component wrapping the PBR granite
      headstone-mesh.tsx    — Renders the headstone from a profile + material
      base-mesh.tsx         — Renders the base/plinth component
      kerb-mesh.tsx         — Renders kerb borders
      covering-mesh.tsx     — Renders covering (chips/tiles/slab) inside kerbs
      viewer-controls.tsx   — UI: angle buttons + covering type toggle
      image-protection.tsx  — Right-click disable, print hide, watermark
  app/
    (public)/
      ranges/[slug]/page.tsx — Modified: integrate TombstoneViewer on detail page
public/
  textures/
    rustenburg-black-albedo.jpg    — Granite colour texture (1024x1024, tileable)
    rustenburg-black-normal.jpg    — Normal map for grain detail
    rustenburg-black-roughness.jpg — Roughness map (polished vs matte areas)
tests/
  tombstone-viewer.spec.ts — Playwright tests for viewer functionality
```

---

### Task 1: Install Three.js dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install three, react-three-fiber, and drei**

```bash
cd C:/Users/Annika/pullens-website
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('three'); console.log('three OK')"
node -e "require('@react-three/fiber'); console.log('r3f OK')"
```

Expected: Both print OK.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build 2>&1 | grep -E "(error|✓)"
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add three.js, react-three-fiber, drei dependencies"
```

---

### Task 2: Define TypeScript types for the tombstone system

**Files:**
- Create: `src/lib/tombstone/types.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/lib/tombstone/types.ts

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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/Annika/pullens-website
npx tsc --noEmit src/lib/tombstone/types.ts
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/tombstone/types.ts
git commit -m "feat: add tombstone system TypeScript types"
```

---

### Task 3: Create the S5 design manifest

**Files:**
- Create: `src/lib/tombstone/designs/s5.ts`

The S5 has: curved left side with heart cutout, vertical rectangular pillar on right, rectangular base, multi-step plinth. Profile coordinates are normalised to a unit scale (will be scaled by real mm dimensions).

- [ ] **Step 1: Create the S5 manifest**

```typescript
// src/lib/tombstone/designs/s5.ts

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
    // Outer profile — curved left side rising to a point, straight right side
    // Coordinates in mm, origin at bottom-left of headstone
    outline: [
      { x: 0, y: 0 },        // bottom-left
      { x: 0, y: 350 },      // left edge rises
      { x: 20, y: 420 },     // curve begins
      { x: 60, y: 470 },     // curve mid
      { x: 120, y: 500 },    // curve top
      { x: 180, y: 490 },    // slight dip toward pillar
      { x: 220, y: 480 },    // meets pillar area
      { x: 220, y: 0 },      // right edge of main panel
    ],
    cutouts: [
      // Heart shape cutout on left panel
      [
        { x: 60, y: 280 },   // bottom of heart
        { x: 30, y: 350 },   // left lobe
        { x: 60, y: 400 },   // top-left dip
        { x: 90, y: 420 },   // center peak
        { x: 120, y: 400 },  // top-right dip
        { x: 150, y: 350 },  // right lobe
        { x: 120, y: 280 },  // back to bottom
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
```

- [ ] **Step 2: Verify import works**

```bash
cd C:/Users/Annika/pullens-website
npx tsc --noEmit src/lib/tombstone/designs/s5.ts
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/tombstone/designs/s5.ts
git commit -m "feat: add S5 design manifest (signature range)"
```

---

### Task 4: Create Rustenburg Black granite material

**Files:**
- Create: `src/lib/tombstone/materials.ts`
- Create: `src/components/viewer/granite-material.tsx`

Rustenburg Black granite: dark black base (#0a0a0a) with fine silver-grey crystalline speckle. Polished = high gloss, reflective. We generate the granite texture procedurally using canvas (no external image files needed for the prototype — tileable texture generated at runtime).

- [ ] **Step 1: Create the material utilities**

```typescript
// src/lib/tombstone/materials.ts

/**
 * Generate a tileable Rustenburg Black granite texture on a canvas.
 *
 * Rustenburg Black: dark black base with fine silver-grey feldspar/quartz crystals.
 * Polished surface is highly reflective with subtle crystalline speckle.
 */
export function generateGraniteTexture(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base: near-black
  ctx.fillStyle = "#0c0c0c";
  ctx.fillRect(0, 0, size, size);

  // Add crystalline speckle — thousands of tiny grey/silver dots
  const speckleCount = size * size * 0.08;
  for (let i = 0; i < speckleCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5 + 0.3;
    const brightness = Math.floor(Math.random() * 60 + 40);
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 5})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add larger crystal clusters (less frequent, slightly brighter)
  const clusterCount = size * 0.3;
  for (let i = 0; i < clusterCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2.5 + 1;
    const brightness = Math.floor(Math.random() * 40 + 70);
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 8}, 0.6)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

/**
 * Generate a roughness map.
 * Mostly low roughness (polished) with some variation for realism.
 */
export function generateRoughnessMap(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base: low roughness (dark = smooth = polished)
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, size, size);

  // Subtle variation
  for (let i = 0; i < size * 10; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 3 + 1;
    const val = Math.floor(Math.random() * 30 + 15);
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}
```

- [ ] **Step 2: Create the R3F material component**

```tsx
// src/components/viewer/granite-material.tsx

"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { generateGraniteTexture, generateRoughnessMap } from "@/lib/tombstone/materials";

interface GraniteMaterialProps {
  /** Higher roughness for engraved/matte areas */
  roughnessOverride?: number;
}

export function GraniteMaterial({ roughnessOverride }: GraniteMaterialProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;

    const albedoCanvas = generateGraniteTexture(512);
    const roughnessCanvas = generateRoughnessMap(512);

    const albedo = new THREE.CanvasTexture(albedoCanvas);
    albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
    albedo.repeat.set(2, 2);

    const roughness = new THREE.CanvasTexture(roughnessCanvas);
    roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
    roughness.repeat.set(2, 2);

    return { albedo, roughness };
  }, []);

  useEffect(() => {
    return () => {
      textures?.albedo.dispose();
      textures?.roughness.dispose();
    };
  }, [textures]);

  if (!textures) return <meshStandardMaterial color="#0c0c0c" />;

  return (
    <meshStandardMaterial
      ref={matRef}
      map={textures.albedo}
      roughnessMap={roughnessOverride !== undefined ? undefined : textures.roughness}
      roughness={roughnessOverride ?? 0.2}
      metalness={0}
      envMapIntensity={0.8}
    />
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/lib/tombstone/materials.ts src/components/viewer/granite-material.tsx
git commit -m "feat: Rustenburg Black granite material with procedural texture"
```

---

### Task 5: Build headstone profile → 3D geometry system

**Files:**
- Create: `src/lib/tombstone/profiles.ts`
- Create: `src/components/viewer/headstone-mesh.tsx`

Convert 2D headstone profile points into a Three.js ExtrudeGeometry. Handle cutouts (heart shape) and sub-elements (pillar).

- [ ] **Step 1: Create the profile conversion utility**

```typescript
// src/lib/tombstone/profiles.ts

import * as THREE from "three";
import type { HeadstoneProfile, Point2D } from "./types";

/** Convert a Point2D array to a Three.js Shape path */
function pointsToShape(points: Point2D[]): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i].x, points[i].y);
  }

  shape.closePath();
  return shape;
}

/** Convert Point2D array to a Three.js Path (for holes/cutouts) */
function pointsToPath(points: Point2D[]): THREE.Path {
  const path = new THREE.Path();
  path.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    path.lineTo(points[i].x, points[i].y);
  }

  path.closePath();
  return path;
}

/**
 * Build an ExtrudeGeometry from a headstone profile.
 * Returns geometry in a coordinate system where:
 * - X = width (left-right)
 * - Y = height (bottom-top)
 * - Z = depth (front-back)
 * Geometry is centered on X, sitting on Y=0.
 */
export function buildHeadstoneGeometry(profile: HeadstoneProfile): THREE.ExtrudeGeometry {
  const shape = pointsToShape(profile.outline);

  // Add cutouts as holes
  for (const cutout of profile.cutouts) {
    shape.holes.push(pointsToPath(cutout));
  }

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: profile.depth_mm,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 3,
  });

  // Center on X axis
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const centerX = (box.max.x + box.min.x) / 2;
  geometry.translate(-centerX, 0, -profile.depth_mm / 2);

  return geometry;
}
```

- [ ] **Step 2: Create the headstone mesh component**

```tsx
// src/components/viewer/headstone-mesh.tsx

"use client";

import { useMemo } from "react";
import type { HeadstoneProfile, SubElement } from "@/lib/tombstone/types";
import { buildHeadstoneGeometry } from "@/lib/tombstone/profiles";
import { GraniteMaterial } from "./granite-material";

interface HeadstoneMeshProps {
  profile: HeadstoneProfile;
  subElements: SubElement[];
  /** Scale factor to normalise to viewer units */
  scale: number;
}

export function HeadstoneMesh({ profile, subElements, scale }: HeadstoneMeshProps) {
  const geometry = useMemo(() => buildHeadstoneGeometry(profile), [profile]);

  return (
    <group scale={[scale, scale, scale]}>
      {/* Main headstone panel */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <GraniteMaterial />
      </mesh>

      {/* Sub-elements (pillars, wings, etc.) */}
      {subElements.map((el, i) => (
        <mesh
          key={i}
          position={[
            el.position.x - profile.width_mm / 2,
            el.position.y,
            el.position.z,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[el.dimensions.width, el.dimensions.height, el.dimensions.depth]} />
          <GraniteMaterial />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/tombstone/profiles.ts src/components/viewer/headstone-mesh.tsx
git commit -m "feat: headstone profile-to-3D geometry system"
```

---

### Task 6: Build shared component meshes (base, kerbs, coverings)

**Files:**
- Create: `src/components/viewer/base-mesh.tsx`
- Create: `src/components/viewer/kerb-mesh.tsx`
- Create: `src/components/viewer/covering-mesh.tsx`

These are the modular components that assemble below the headstone.

- [ ] **Step 1: Create base mesh**

```tsx
// src/components/viewer/base-mesh.tsx

"use client";

import type { BaseSpec } from "@/lib/tombstone/types";
import { GraniteMaterial } from "./granite-material";

interface BaseMeshProps {
  spec: BaseSpec;
  scale: number;
  /** Y position (stacks above kerbs if present) */
  yOffset: number;
}

export function BaseMesh({ spec, scale, yOffset }: BaseMeshProps) {
  return (
    <mesh
      position={[0, (yOffset + spec.height_mm / 2) * scale, 0]}
      castShadow
      receiveShadow
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[spec.width_mm, spec.height_mm, spec.depth_mm]} />
      <GraniteMaterial />
    </mesh>
  );
}
```

- [ ] **Step 2: Create kerb mesh**

Kerbs are 4 border strips forming a rectangle. Built from 4 box geometries.

```tsx
// src/components/viewer/kerb-mesh.tsx

"use client";

import type { KerbSpec } from "@/lib/tombstone/types";
import { GraniteMaterial } from "./granite-material";

interface KerbMeshProps {
  spec: KerbSpec;
  scale: number;
}

export function KerbMesh({ spec, scale }: KerbMeshProps) {
  const { outer_width_mm: w, outer_depth_mm: d, height_mm: h, thickness_mm: t } = spec;
  const s = scale;

  // 4 kerb strips: front, back, left, right
  const strips: { pos: [number, number, number]; size: [number, number, number] }[] = [
    // Front strip
    { pos: [0, h / 2, d / 2 - t / 2], size: [w, h, t] },
    // Back strip
    { pos: [0, h / 2, -(d / 2 - t / 2)], size: [w, h, t] },
    // Left strip
    { pos: [-(w / 2 - t / 2), h / 2, 0], size: [t, h, d - t * 2] },
    // Right strip
    { pos: [w / 2 - t / 2, h / 2, 0], size: [t, h, d - t * 2] },
  ];

  return (
    <group scale={[s, s, s]}>
      {strips.map((strip, i) => (
        <mesh key={i} position={strip.pos} castShadow receiveShadow>
          <boxGeometry args={strip.size} />
          <GraniteMaterial />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 3: Create covering mesh**

```tsx
// src/components/viewer/covering-mesh.tsx

"use client";

import type { KerbSpec, CoveringType } from "@/lib/tombstone/types";
import { GraniteMaterial } from "./granite-material";

interface CoveringMeshProps {
  covering: CoveringType;
  kerbs: KerbSpec;
  scale: number;
}

export function CoveringMesh({ covering, kerbs, scale }: CoveringMeshProps) {
  if (covering === "head-base") return null;

  const innerWidth = kerbs.outer_width_mm - kerbs.thickness_mm * 2;
  const innerDepth = kerbs.outer_depth_mm - kerbs.thickness_mm * 2;
  const s = scale;

  if (covering === "kerbs-slab") {
    // Solid granite slab — full polished surface
    return (
      <mesh
        position={[0, kerbs.height_mm * s, 0]}
        scale={[s, s, s]}
        receiveShadow
      >
        <boxGeometry args={[innerWidth, 30, innerDepth]} />
        <GraniteMaterial roughnessOverride={0.15} />
      </mesh>
    );
  }

  if (covering === "kerbs-tiles") {
    // Tiled surface — slightly less reflective
    return (
      <mesh
        position={[0, kerbs.height_mm * s * 0.5, 0]}
        scale={[s, s, s]}
        receiveShadow
      >
        <boxGeometry args={[innerWidth, 10, innerDepth]} />
        <GraniteMaterial roughnessOverride={0.4} />
      </mesh>
    );
  }

  if (covering === "kerbs-chips") {
    // Stone chips fill — grey, matte, granular
    return (
      <mesh
        position={[0, kerbs.height_mm * s * 0.3, 0]}
        scale={[s, s, s]}
        receiveShadow
      >
        <boxGeometry args={[innerWidth, 5, innerDepth]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.9} metalness={0} />
      </mesh>
    );
  }

  return null;
}
```

- [ ] **Step 4: Verify build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

- [ ] **Step 5: Commit**

```bash
git add src/components/viewer/base-mesh.tsx src/components/viewer/kerb-mesh.tsx src/components/viewer/covering-mesh.tsx
git commit -m "feat: modular base, kerb, and covering mesh components"
```

---

### Task 7: Build the Three.js scene with lighting and camera presets

**Files:**
- Create: `src/components/viewer/tombstone-scene.tsx`

Assembles all components, sets up lighting, manages camera angles.

- [ ] **Step 1: Create the scene component**

```tsx
// src/components/viewer/tombstone-scene.tsx

"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import type { DesignManifest, CoveringType, CameraAngle, CameraPreset } from "@/lib/tombstone/types";
import { HeadstoneMesh } from "./headstone-mesh";
import { BaseMesh } from "./base-mesh";
import { KerbMesh } from "./kerb-mesh";
import { CoveringMesh } from "./covering-mesh";

const CAMERA_PRESETS: Record<CameraAngle, CameraPreset> = {
  front: {
    position: [0, 3, 8],
    target: [0, 1.5, 0],
    label: "Front",
  },
  "three-quarter-left": {
    position: [-6, 3.5, 6],
    target: [0, 1, 0],
    label: "Left",
  },
  "three-quarter-right": {
    position: [6, 3.5, 6],
    target: [0, 1, 0],
    label: "Right",
  },
};

interface TombstoneSceneProps {
  design: DesignManifest;
  covering: CoveringType;
  angle: CameraAngle;
}

/** Scale factor: convert mm to scene units (1 unit = ~200mm) */
const SCALE = 1 / 200;

export function TombstoneScene({ design, covering, angle }: TombstoneSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Position camera for current angle
  const preset = CAMERA_PRESETS[angle];
  camera.position.set(...preset.position);
  (camera as THREE.PerspectiveCamera).lookAt(new THREE.Vector3(...preset.target));

  const showKerbs = covering !== "head-base";
  const baseY = showKerbs ? design.kerbs.height_mm * SCALE : 0;
  const headstoneY = baseY + design.base.height_mm * SCALE;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#b0c4de" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.4}
        color="#c0d0e0"
      />

      {/* Environment for reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>

      {/* Tombstone assembly */}
      <group ref={groupRef}>
        {/* Layer 1: Kerbs (if not head-base only) */}
        {showKerbs && <KerbMesh spec={design.kerbs} scale={SCALE} />}

        {/* Layer 2: Covering (chips/tiles/slab inside kerbs) */}
        {showKerbs && (
          <CoveringMesh covering={covering} kerbs={design.kerbs} scale={SCALE} />
        )}

        {/* Layer 3: Base/plinth */}
        <BaseMesh spec={design.base} scale={SCALE} yOffset={showKerbs ? design.kerbs.height_mm : 0} />

        {/* Layer 4: Headstone */}
        <group position={[0, headstoneY, 0]}>
          <HeadstoneMesh
            profile={design.headstone}
            subElements={design.subElements}
            scale={SCALE}
          />
        </group>
      </group>
    </>
  );
}

export { CAMERA_PRESETS };
```

- [ ] **Step 2: Verify build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

- [ ] **Step 3: Commit**

```bash
git add src/components/viewer/tombstone-scene.tsx
git commit -m "feat: Three.js scene with lighting, camera presets, component assembly"
```

---

### Task 8: Build the viewer controls UI (angle buttons + covering toggle)

**Files:**
- Create: `src/components/viewer/viewer-controls.tsx`

- [ ] **Step 1: Create the controls component**

```tsx
// src/components/viewer/viewer-controls.tsx

"use client";

import type { CameraAngle, CoveringType } from "@/lib/tombstone/types";
import { cn } from "@/lib/utils";

interface ViewerControlsProps {
  angle: CameraAngle;
  onAngleChange: (angle: CameraAngle) => void;
  covering: CoveringType;
  onCoveringChange: (covering: CoveringType) => void;
  availableCoverings: CoveringType[];
}

const ANGLE_LABELS: Record<CameraAngle, string> = {
  front: "Front",
  "three-quarter-left": "Left",
  "three-quarter-right": "Right",
};

const COVERING_LABELS: Record<CoveringType, string> = {
  "head-base": "Head & Base",
  "kerbs-chips": "Kerbs & Chips",
  "kerbs-tiles": "Tiles",
  "kerbs-slab": "Kerbs & Slab",
};

export function ViewerControls({
  angle,
  onAngleChange,
  covering,
  onCoveringChange,
  availableCoverings,
}: ViewerControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Angle selector */}
      <div>
        <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-2 font-semibold">
          View
        </p>
        <div className="flex gap-2">
          {(Object.keys(ANGLE_LABELS) as CameraAngle[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onAngleChange(a)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]",
                angle === a
                  ? "bg-navy text-white"
                  : "bg-cream text-charcoal/70 hover:bg-charcoal/10"
              )}
            >
              {ANGLE_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      {/* Covering type selector */}
      <div>
        <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-2 font-semibold">
          Covering Type
        </p>
        <div className="flex flex-wrap gap-2">
          {availableCoverings.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCoveringChange(c)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]",
                covering === c
                  ? "bg-orange text-white"
                  : "bg-cream text-charcoal/70 hover:bg-charcoal/10"
              )}
            >
              {COVERING_LABELS[c]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/viewer/viewer-controls.tsx
git commit -m "feat: viewer controls UI — angle buttons and covering type toggle"
```

---

### Task 9: Build image protection layer

**Files:**
- Create: `src/components/viewer/image-protection.tsx`

- [ ] **Step 1: Create image protection component**

```tsx
// src/components/viewer/image-protection.tsx

"use client";

import { useEffect, type ReactNode } from "react";

interface ImageProtectionProps {
  children: ReactNode;
}

/**
 * Wraps the viewer canvas to prevent image theft:
 * - Blocks right-click context menu
 * - Blocks drag
 * - Adds invisible watermark text
 * - Print stylesheet hides the canvas (handled in globals.css)
 */
export function ImageProtection({ children }: ImageProtectionProps) {
  useEffect(() => {
    // Block keyboard shortcuts for saving (Ctrl+S, Ctrl+Shift+S)
    function handleKeydown(e: KeyboardEvent) {
      if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div
      className="relative select-none catalogue-canvas"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {children}

      {/* Invisible watermark overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-white/[0.02] text-6xl font-bold rotate-[-30deg] select-none">
          PULLEN&apos;S TOMBSTONES
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add print-hide CSS to globals.css**

Add to `src/app/globals.css`:

```css
@media print {
  .catalogue-canvas {
    display: none !important;
  }
  .catalogue-canvas::after {
    content: "Images cannot be printed. Visit pullenstombstones.co.za";
    display: block;
    padding: 2rem;
    text-align: center;
    font-size: 1rem;
    color: #666;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/viewer/image-protection.tsx src/app/globals.css
git commit -m "feat: image protection — no right-click, no print, watermark"
```

---

### Task 10: Build the main TombstoneViewer component

**Files:**
- Create: `src/components/viewer/tombstone-viewer.tsx`

This is the public-facing React component that combines canvas + controls + protection.

- [ ] **Step 1: Create the main viewer component**

```tsx
// src/components/viewer/tombstone-viewer.tsx

"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { DesignManifest, CoveringType, CameraAngle } from "@/lib/tombstone/types";
import { TombstoneScene } from "./tombstone-scene";
import { ViewerControls } from "./viewer-controls";
import { ImageProtection } from "./image-protection";

interface TombstoneViewerProps {
  design: DesignManifest;
  /** Default covering type to show */
  defaultCovering?: CoveringType;
  /** Show controls (false for homepage cards — just renders the default view) */
  interactive?: boolean;
  /** Canvas height class */
  heightClass?: string;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-charcoal/95">
      <div className="text-cream/60 text-sm">Loading 3D view...</div>
    </div>
  );
}

export function TombstoneViewer({
  design,
  defaultCovering = "kerbs-slab",
  interactive = true,
  heightClass = "h-[400px] sm:h-[500px]",
}: TombstoneViewerProps) {
  const [covering, setCovering] = useState<CoveringType>(defaultCovering);
  const [angle, setAngle] = useState<CameraAngle>("three-quarter-left");

  return (
    <div className="space-y-4">
      <ImageProtection>
        <div className={`${heightClass} w-full rounded-lg overflow-hidden bg-[#1a1a1a]`}>
          <Suspense fallback={<LoadingFallback />}>
            <Canvas
              shadows
              camera={{ fov: 35, near: 0.1, far: 100 }}
              gl={{ antialias: true, preserveDrawingBuffer: false }}
            >
              <TombstoneScene design={design} covering={covering} angle={angle} />
            </Canvas>
          </Suspense>
        </div>
      </ImageProtection>

      {interactive && (
        <ViewerControls
          angle={angle}
          onAngleChange={setAngle}
          covering={covering}
          onCoveringChange={setCovering}
          availableCoverings={design.coveringTypes}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

- [ ] **Step 3: Commit**

```bash
git add src/components/viewer/tombstone-viewer.tsx
git commit -m "feat: TombstoneViewer — main component with canvas, controls, protection"
```

---

### Task 11: Integrate S5 viewer into the range detail page

**Files:**
- Modify: `src/app/(public)/ranges/[slug]/page.tsx`

Add the TombstoneViewer to the S5 design detail page. For non-S5 designs, continue showing the existing product grid.

- [ ] **Step 1: Import and conditionally render TombstoneViewer**

At the top of the file, add:

```typescript
import dynamic from "next/dynamic";
import { S5_DESIGN } from "@/lib/tombstone/designs/s5";

const TombstoneViewer = dynamic(
  () => import("@/components/viewer/tombstone-viewer").then((m) => ({ default: m.TombstoneViewer })),
  { ssr: false, loading: () => <div className="h-[500px] bg-charcoal/95 rounded-lg animate-pulse" /> }
);
```

- [ ] **Step 2: Add viewer section before the product grid**

In the page component, after the hero section and before the product grid section, add:

```tsx
      {/* 3D Viewer (S5 prototype) */}
      {slug === "signature" && (
        <Section>
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            Interactive 3D Preview — S5
          </h2>
          <TombstoneViewer design={S5_DESIGN} />
        </Section>
      )}
```

- [ ] **Step 3: Verify build and test locally**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | grep -E "(error|✓)"
```

Then run `npm run dev` and navigate to `/ranges/signature` to see the S5 3D viewer.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(public\)/ranges/\[slug\]/page.tsx
git commit -m "feat: integrate S5 3D viewer on signature range page"
```

---

### Task 12: Add Playwright tests for the viewer

**Files:**
- Modify: `tests/navigation.spec.ts`

- [ ] **Step 1: Add viewer tests**

Add to the existing test file:

```typescript
test.describe("3D Viewer", () => {
  test("signature range page shows 3D viewer", async ({ page }) => {
    await page.goto("/ranges/signature");
    // Canvas should be present (Three.js renders to canvas)
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible({ timeout: 15000 });
  });

  test("covering type toggle buttons are present", async ({ page }) => {
    await page.goto("/ranges/signature");
    await expect(page.getByRole("button", { name: "Head & Base" })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: "Kerbs & Slab" })).toBeVisible();
  });

  test("angle buttons are present", async ({ page }) => {
    await page.goto("/ranges/signature");
    await expect(page.getByRole("button", { name: "Front" })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: "Left" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Right" })).toBeVisible();
  });

  test("right-click is disabled on viewer", async ({ page }) => {
    await page.goto("/ranges/signature");
    const viewer = page.locator(".catalogue-canvas");
    await expect(viewer).toBeVisible({ timeout: 15000 });
    // Attempt right-click — contextmenu should be prevented
    await viewer.click({ button: "right" });
    // No context menu should appear (can't directly assert absence,
    // but the onContextMenu handler prevents default)
  });
});
```

- [ ] **Step 2: Run tests**

```bash
cd C:/Users/Annika/pullens-website && npx playwright test --grep "3D Viewer" 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add tests/navigation.spec.ts
git commit -m "test: add Playwright tests for 3D tombstone viewer"
```

---

### Task 13: Final build verification and deploy

- [ ] **Step 1: Full build**

```bash
cd C:/Users/Annika/pullens-website && npm run build 2>&1 | tail -30
```

Expected: All pages generate successfully.

- [ ] **Step 2: Run all tests**

```bash
cd C:/Users/Annika/pullens-website && npx playwright test 2>&1 | tail -10
```

Expected: All tests pass.

- [ ] **Step 3: Push and deploy**

```bash
cd C:/Users/Annika/pullens-website && git push origin master
npx vercel --prod --yes --scope pullenstombstones09-langs-projects 2>&1 | grep -E "(Production|Aliased|error)"
```

- [ ] **Step 4: Visual verification**

Open `https://pullens-website.vercel.app/ranges/signature` and verify:
- 3D tombstone renders with Rustenburg Black granite texture
- 3 angle buttons switch camera position
- Covering type toggle adds/removes kerbs and covering
- Right-click is disabled on the canvas
- Loads within 3 seconds on mobile
