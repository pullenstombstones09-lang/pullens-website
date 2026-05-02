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
    return (
      <mesh position={[0, kerbs.height_mm * s, 0]} scale={[s, s, s]} receiveShadow>
        <boxGeometry args={[innerWidth, 30, innerDepth]} />
        <GraniteMaterial roughnessOverride={0.15} />
      </mesh>
    );
  }

  if (covering === "kerbs-tiles") {
    return (
      <mesh position={[0, kerbs.height_mm * s * 0.5, 0]} scale={[s, s, s]} receiveShadow>
        <boxGeometry args={[innerWidth, 10, innerDepth]} />
        <GraniteMaterial roughnessOverride={0.4} />
      </mesh>
    );
  }

  if (covering === "kerbs-chips") {
    return (
      <mesh position={[0, kerbs.height_mm * s * 0.3, 0]} scale={[s, s, s]} receiveShadow>
        <boxGeometry args={[innerWidth, 5, innerDepth]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.9} metalness={0} />
      </mesh>
    );
  }

  return null;
}
