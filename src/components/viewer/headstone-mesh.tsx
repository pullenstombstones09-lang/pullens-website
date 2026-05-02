"use client";

import { useMemo } from "react";
import type { HeadstoneProfile, SubElement } from "@/lib/tombstone/types";
import { buildHeadstoneGeometry } from "@/lib/tombstone/profiles";
import { GraniteMaterial } from "./granite-material";

interface HeadstoneMeshProps {
  profile: HeadstoneProfile;
  subElements: SubElement[];
  scale: number;
}

export function HeadstoneMesh({ profile, subElements, scale }: HeadstoneMeshProps) {
  const geometry = useMemo(() => buildHeadstoneGeometry(profile), [profile]);

  return (
    <group scale={[scale, scale, scale]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <GraniteMaterial />
      </mesh>

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
