"use client";

import type { BaseSpec } from "@/lib/tombstone/types";
import { GraniteMaterial } from "./granite-material";

interface BaseMeshProps {
  spec: BaseSpec;
  scale: number;
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
