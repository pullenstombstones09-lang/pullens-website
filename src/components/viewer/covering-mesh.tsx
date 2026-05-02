"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { KerbSpec, CoveringType } from "@/lib/tombstone/types";
import { GraniteMaterial } from "./granite-material";

interface CoveringMeshProps {
  covering: CoveringType;
  kerbs: KerbSpec;
  scale: number;
}

/**
 * Generate a gravel/chips texture — small irregular grey stones on dark ground.
 */
function generateChipsTexture(size: number = 512): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Dark ground base
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(0, 0, size, size);

  // Draw hundreds of small irregular stone shapes
  const stoneCount = size * 2;
  for (let i = 0; i < stoneCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const w = Math.random() * 8 + 3;
    const h = Math.random() * 6 + 2;
    const rotation = Math.random() * Math.PI;
    const brightness = Math.floor(Math.random() * 80 + 140);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = `rgb(${brightness}, ${brightness - 5}, ${brightness - 10})`;
    ctx.beginPath();
    // Irregular rounded shape
    ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
    ctx.fill();

    // Slight highlight on top edge
    ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.3, w * 0.6, h * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Add shadow gaps between stones
  for (let i = 0; i < stoneCount * 0.5; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 2 + 0.5;
    ctx.fillStyle = `rgba(20, 20, 20, 0.4)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

/**
 * Generate a tile texture — 7 tiles running side-to-side with visible grout lines.
 */
function generateTileTexture(
  width: number,
  depth: number,
  tileCount: number = 7,
  size: number = 512
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Grout base (dark grey)
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(0, 0, size, size);

  // Calculate tile dimensions in texture space
  // Tiles run across the short side (width), so grout lines run along the depth
  const groutWidth = 3;
  const tileHeight = (size - (tileCount + 1) * groutWidth) / tileCount;

  for (let i = 0; i < tileCount; i++) {
    const y = groutWidth + i * (tileHeight + groutWidth);

    // Tile base colour — dark charcoal ceramic
    const baseBrightness = Math.floor(Math.random() * 15 + 55);
    ctx.fillStyle = `rgb(${baseBrightness}, ${baseBrightness}, ${baseBrightness + 3})`;
    ctx.fillRect(groutWidth, y, size - groutWidth * 2, tileHeight);

    // Subtle surface variation per tile
    for (let j = 0; j < 80; j++) {
      const tx = groutWidth + Math.random() * (size - groutWidth * 2);
      const ty = y + Math.random() * tileHeight;
      const tr = Math.random() * 4 + 1;
      const tv = Math.floor(Math.random() * 20 + baseBrightness - 10);
      ctx.fillStyle = `rgba(${tv}, ${tv}, ${tv}, 0.3)`;
      ctx.beginPath();
      ctx.arc(tx, ty, tr, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return canvas;
}

export function CoveringMesh({ covering, kerbs, scale }: CoveringMeshProps) {
  if (covering === "head-base") return null;

  const innerWidth = kerbs.outer_width_mm - kerbs.thickness_mm * 2;
  const innerDepth = kerbs.outer_depth_mm - kerbs.thickness_mm * 2;
  const s = scale;

  // Chips texture
  const chipsTexture = useMemo(() => {
    if (typeof document === "undefined" || covering !== "kerbs-chips") return null;
    const canvas = generateChipsTexture(512);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 8);
    return tex;
  }, [covering]);

  // Tile texture
  const tileTexture = useMemo(() => {
    if (typeof document === "undefined" || covering !== "kerbs-tiles") return null;
    const canvas = generateTileTexture(innerWidth, innerDepth, 7);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    return tex;
  }, [covering, innerWidth, innerDepth]);

  if (covering === "kerbs-slab") {
    // Solid granite slab — sits above kerb top, slightly inset to avoid z-fighting
    return (
      <mesh
        position={[0, (kerbs.height_mm + 25) * s, 0]}
        scale={[s, s, s]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[innerWidth - 4, 40, innerDepth - 4]} />
        <GraniteMaterial roughnessOverride={0.15} />
      </mesh>
    );
  }

  if (covering === "kerbs-tiles" && tileTexture) {
    return (
      <mesh
        position={[0, (kerbs.height_mm) * s, 0]}
        scale={[s, s, s]}
        receiveShadow
      >
        <boxGeometry args={[innerWidth, 15, innerDepth]} />
        <meshStandardMaterial
          map={tileTexture}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    );
  }

  if (covering === "kerbs-chips" && chipsTexture) {
    // Gravelly stone chips — flush with kerb top
    return (
      <mesh
        position={[0, (kerbs.height_mm) * s, 0]}
        scale={[s, s, s]}
        receiveShadow
      >
        <boxGeometry args={[innerWidth, 8, innerDepth]} />
        <meshStandardMaterial
          map={chipsTexture}
          roughness={0.95}
          metalness={0}
        />
      </mesh>
    );
  }

  // Fallback for SSR
  if (covering === "kerbs-tiles") {
    return (
      <mesh position={[0, (kerbs.height_mm) * s, 0]} scale={[s, s, s]} receiveShadow>
        <boxGeometry args={[innerWidth, 15, innerDepth]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0} />
      </mesh>
    );
  }

  if (covering === "kerbs-chips") {
    return (
      <mesh position={[0, (kerbs.height_mm) * s, 0]} scale={[s, s, s]} receiveShadow>
        <boxGeometry args={[innerWidth, 8, innerDepth]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.95} metalness={0} />
      </mesh>
    );
  }

  return null;
}
