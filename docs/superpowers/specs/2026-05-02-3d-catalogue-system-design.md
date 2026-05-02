# 3D Catalogue System — Design Spec

**Date:** 2 May 2026
**Project:** Pullens Website (pullens-website)
**Status:** Approved for prototype

---

## 1. Problem

The current website has placeholder images. The old catalogue (WordPress + scenic renders) had two problems:
1. Every design shown from one angle only — customers can't visualise the tombstone properly
2. Mixed backgrounds, inconsistent quality, competitor-friendly (easy to screenshot and steal)

The source material available (F:\Pullens Artwork) contains scenic renders, outlined line drawings, and individual component renders — but no unified, professional catalogue image system exists.

## 2. Solution

A **modular 3D component assembly system** built with Three.js. Each tombstone is assembled from reusable components — mirroring how Pullen's actually manufactures them. Customers see a complete tombstone on the homepage/catalogue grid, then can configure covering types on the detail page.

## 3. Architecture

### 3.1 Component Model

A tombstone is assembled from discrete components, layered bottom-up:

```
Layer 4:  HEADSTONE  (unique per design — 141 shapes)
Layer 3:  BASE       (horizontal plinth the headstone sits on — ~5 types by range)
Layer 2:  COVERING   (what fills inside the kerbs — chips | tiles | slab)
Layer 1:  KERBS      (border strips around the grave — ~3 sizes by range)
Layer 0:  FOUNDATION (concrete base — standard, not visible in most views)
```

**Covering type toggle builds up from components:**
- **Head & Base** = Layer 4 + Layer 3 only
- **Kerbs & Chips** = Layer 4 + Layer 3 + Layer 1 + chips fill
- **Kerbs & Tiles** = Layer 4 + Layer 3 + Layer 1 + tiled surface
- **Kerbs & Slab** = Layer 4 + Layer 3 + Layer 1 + solid granite slab

Each component is a separate Three.js mesh that snaps together based on the design's dimensions.

### 3.2 Component Library

| Component | Count | Unique per | Notes |
|---|---|---|---|
| Headstone shapes | 141 | Design (P1, S5, B3, etc.) | The only truly unique piece. Defined by 2D profile extruded to depth. |
| Bases | ~5 | Range size bracket | Rectangular plinth. Dimensions vary by range. |
| Kerbs | ~3 | Range size bracket | Border strips. Width/depth matches range. |
| Slab covering | ~3 | Range size bracket | Solid granite slab inside kerbs. |
| Tile covering | ~3 | Range size bracket | Tiled surface inside kerbs. |
| Chip covering | ~3 | Range size bracket | Grey stone chip fill inside kerbs. |

**Total unique 3D assets:** ~141 headstones + ~20 shared components = ~161 (vs 1,200+ if modelled individually per covering type per angle).

### 3.3 Design Data Model

Each design is defined in a JSON manifest:

```json
{
  "code": "S5",
  "range": "signature",
  "name": "S5 Design",
  "headstone": {
    "profile": "s5-profile",
    "width_mm": 900,
    "height_mm": 500,
    "depth_mm": 80,
    "features": ["heart-cutout", "vertical-pillar"]
  },
  "base": {
    "type": "signature-standard",
    "width_mm": 1000,
    "depth_mm": 200,
    "height_mm": 100
  },
  "coveringTypes": ["head-base", "kerbs-chips", "kerbs-tiles", "kerbs-slab"],
  "inscription": {
    "lines": ["In Loving Memory Of", "SAMPLE NAME", "1960 - 2025", "Rest In Peace"],
    "font": "serif",
    "position": "center"
  },
  "dimensions": {
    "headstone_sizes": ["900x500mm", "1200x600mm", "1500x700mm"],
    "real_scale": true
  }
}
```

### 3.4 Headstone Profile System

Each headstone shape is defined as a 2D profile (SVG path or point array) that gets extruded to the design's depth. The profile captures:
- Outer silhouette (curves, angles, shaped tops)
- Cutouts (hearts, crosses, arches)
- Sub-elements (pillars, wings, split panels)

**Source:** Outlined line drawings from `F:\Pullens Artwork\Outlined Drawings\{Range}\`

**Process for prototype (S5):** Hand-model from line drawing.
**Process for scale (141 designs):** Build a profile editor/tracer tool, or define profiles as parametric shape variants within each range.

## 4. Material: Rustenburg Black Granite

All components use a single PBR (Physically Based Rendering) material:

- **Base colour:** Dark black (#0a0a0a) with fine silver-grey crystalline speckle pattern
- **Normal map:** Granite grain texture — tileable, sourced from real Rustenburg Black photography
- **Roughness:** Low (0.15-0.25) for polished surfaces — high gloss, reflective
- **Metalness:** 0 (stone, not metal)
- **Specular highlights:** Yes — polished Rustenburg Black is highly reflective, almost mirror-like

**Key material truth:** All components are the same stone. No colour variation between headstone, base, kerbs, and slab — they come from the same quarry. The crystalline speckle (silver-grey feldspar/quartz crystals against dark base) is uniform.

**Engraved areas:** Sandblasted inscriptions appear as lighter, matte regions against the polished face. Render as a roughness variation on the headstone surface (higher roughness = matte = engraved text).

## 5. Camera & Rendering

### 5.1 Three Camera Presets

| View | Camera position | Purpose |
|---|---|---|
| **Front** | Straight-on, slightly elevated | Default view. Shows inscription face clearly. |
| **3/4 Left** | 45deg left, elevated | Shows depth and covering type. |
| **3/4 Right** | 45deg right, elevated | Alternative perspective. |

User clicks between the 3 views. No free-rotate. Simple, fast, works on mobile.

### 5.2 Lighting

- **Key light:** Warm directional light from upper-right (simulates sunlight)
- **Fill light:** Cool ambient from left (prevents harsh shadows)
- **Environment map:** Subtle neutral HDR for realistic reflections on polished granite
- **Background:** Solid dark charcoal (#1A1A1A) — matches site brand, no distracting backgrounds

### 5.3 Render Context

| Context | What's shown | Image |
|---|---|---|
| **Homepage range cards** | Full assembled tombstone (headstone + default covering), front 3/4 view | Canvas render, fill-frame |
| **Catalogue grid** | Full assembled tombstone, front view | Canvas render, fill-frame |
| **Design detail page** | Interactive — 3 angle buttons + covering type toggle | Live Three.js canvas |
| **Line drawing tab** | Static outlined drawing from source artwork | Regular image (watermarked) |

Homepage and catalogue grid show **pre-assembled** complete tombstones — customers see a finished product at first glance. The component build-up is only exposed on the detail page via the covering type toggle.

## 6. Image Protection

Canvas-based rendering means there is no image URL to download. Additional protections:

- **Right-click disabled** on canvas elements (contextmenu event prevention)
- **CSS `user-select: none`** and `pointer-events` control
- **Print stylesheet** hides all catalogue images (`@media print { .catalogue-canvas { display: none; } }`)
- **Invisible watermark** rendered into the canvas (Pullen's Tombstones + design code)
- **No `<img>` tags** for product images — everything rendered via `<canvas>`
- **Line drawings** (the one non-canvas image) served with visible watermark overlay

## 7. Dimensions & Print Pipeline

Every design stores real-world millimetre dimensions. Two render modes:

| Mode | Scale | Output | Used for |
|---|---|---|---|
| **Web** | Fill-frame (normalised to canvas size) | Canvas render | Website catalogue |
| **Print** | 1:1 true-to-scale (mm-accurate) | High-res PNG export | Vinyl printing, brochures, A4 catalogues (future) |

The print pipeline is not built in v1 — but the dimension data is stored from day one so it's ready when needed.

## 8. v2 Features (Parked)

These are NOT in scope for v1 but the architecture supports them:

- **Vase component** — add-on vase positioned at headstone base
- **Photo plaque component** — ceramic or laser-etched photo on headstone face
- **Custom inscription input** — customer types name/dates, sees it rendered live (feeds into `/designer` page)
- **Multiple granite colours** — swap material texture (grey, red, blue-pearl)
- **AR view** — export 3D model for phone-based AR preview at cemetery

## 9. Prototype Scope

**Design:** S5 (Signature range — heart cutout + vertical pillar + multi-level base)

**Deliverables:**
1. S5 headstone 3D profile modelled from line drawing
2. Signature-range base, kerbs, slab, chips, tile components
3. Rustenburg Black PBR material with granite texture
4. 3 camera angle presets (front, 3/4 left, 3/4 right)
5. Covering type toggle (Head & Base → Kerbs & Chips → Kerbs & Slab)
6. Sample inscription rendered on headstone face
7. Image protection (canvas-only, no right-click, print hiding)
8. Integrated into the pullens-website `/ranges/[slug]` detail page

**Success criteria:**
- Looks like a real Rustenburg Black tombstone, not a cartoon
- Covering type toggle works smoothly
- 3 angles are distinct and useful
- Loads in under 3 seconds on mobile
- Cannot be screenshot/saved easily
- Annika approves the visual quality before scaling to 141 designs

## 10. Tech Stack

| Layer | Choice |
|---|---|
| 3D engine | Three.js (r168+) |
| Material system | Three.js PBR (MeshStandardMaterial) |
| Texture maps | Rustenburg Black — albedo, normal, roughness (tileable, 1024x1024) |
| Model format | Programmatic geometry (ExtrudeGeometry from 2D profiles) |
| Design data | JSON manifests per design |
| Integration | React component `<TombstoneViewer>` in Next.js |
| Bundle impact | ~150kb (Three.js core, tree-shaken) |
| Line drawings | Static images from `F:\Pullens Artwork\Outlined Drawings\` (watermarked) |
