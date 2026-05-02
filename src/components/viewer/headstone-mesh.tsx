"use client";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface HeadstoneMeshProps {
  /** Path to the background-removed product image */
  imagePath: string;
  /** Width of the billboard in scene units */
  width: number;
  /** Height of the billboard in scene units */
  height: number;
}

/**
 * Renders the headstone as a textured billboard using the actual product image.
 * The image has its background removed (from Bria pipeline), so only the
 * headstone is visible. Positioned at the head end of the grave.
 */
export function HeadstoneMesh({ imagePath, width, height }: HeadstoneMeshProps) {
  const texture = useLoader(THREE.TextureLoader, imagePath);

  // Calculate aspect ratio from the loaded texture
  const imgAspect = texture.image
    ? texture.image.width / texture.image.height
    : 1;

  // Size the plane to fit the desired height while maintaining aspect ratio
  const planeHeight = height;
  const planeWidth = planeHeight * imgAspect;

  return (
    <mesh position={[0, planeHeight / 2, 0]} castShadow={false} receiveShadow={false}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.1}
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
}
