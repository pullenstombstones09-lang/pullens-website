"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { HeadstoneProfile, SubElement, InscriptionLine } from "@/lib/tombstone/types";
import { buildHeadstoneGeometry } from "@/lib/tombstone/profiles";
import { GraniteMaterial } from "./granite-material";

interface HeadstoneMeshProps {
  profile: HeadstoneProfile;
  subElements: SubElement[];
  inscription: InscriptionLine[];
  scale: number;
}

/**
 * Generate a texture with inscription text on polished black granite.
 * White text on dark surface, simulating sandblasted engraving.
 */
function generateInscriptionTexture(
  inscription: InscriptionLine[],
  width: number,
  height: number
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = Math.round(512 * (height / width));
  const ctx = canvas.getContext("2d")!;

  // Transparent base — the granite material shows through
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render inscription text
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.textAlign = "center";

  const centerX = canvas.width / 2;
  // Start inscriptions in the lower portion of the headstone face
  // (upper area may have heart/decoration)
  let y = canvas.height * 0.35;

  for (const line of inscription) {
    let fontSize: number;
    let fontFamily: string;

    switch (line.size) {
      case "large":
        fontSize = 42;
        break;
      case "medium":
        fontSize = 30;
        break;
      case "small":
        fontSize = 22;
        break;
    }

    fontFamily = line.style === "serif"
      ? '"Lora", "Georgia", serif'
      : '"Inter", "Arial", sans-serif';

    ctx.font = `${line.size === "large" ? "bold " : ""}${fontSize}px ${fontFamily}`;
    ctx.fillText(line.text, centerX, y);
    y += fontSize * 1.4;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  return texture;
}

export function HeadstoneMesh({ profile, subElements, inscription, scale }: HeadstoneMeshProps) {
  const geometry = useMemo(() => buildHeadstoneGeometry(profile), [profile]);

  const inscriptionTexture = useMemo(
    () => generateInscriptionTexture(inscription, profile.width_mm, profile.height_mm),
    [inscription, profile.width_mm, profile.height_mm]
  );

  return (
    <group scale={[scale, scale, scale]}>
      {/* Main headstone panel */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <GraniteMaterial />
      </mesh>

      {/* Inscription overlay on front face */}
      {inscriptionTexture && (
        <mesh
          position={[0, profile.height_mm * 0.5, profile.depth_mm / 2 + 0.5]}
          castShadow={false}
          receiveShadow={false}
        >
          <planeGeometry args={[profile.width_mm * 0.85, profile.height_mm * 0.85]} />
          <meshBasicMaterial
            map={inscriptionTexture}
            transparent
            depthWrite={false}
            side={THREE.FrontSide}
          />
        </mesh>
      )}

      {/* Sub-elements (pillars, wings, etc.) */}
      {subElements.map((el, i) => (
        <mesh
          key={i}
          position={[
            el.position.x - profile.width_mm / 2,
            el.position.y + el.dimensions.height / 2,
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
