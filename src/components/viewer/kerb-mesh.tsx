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

  const strips: { pos: [number, number, number]; size: [number, number, number] }[] = [
    { pos: [0, h / 2, d / 2 - t / 2], size: [w, h, t] },
    { pos: [0, h / 2, -(d / 2 - t / 2)], size: [w, h, t] },
    { pos: [-(w / 2 - t / 2), h / 2, 0], size: [t, h, d - t * 2] },
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
