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
    position: [0, 4, 10],
    target: [0, 2, -1],
    label: "Front",
  },
  "three-quarter-left": {
    position: [-7, 4.5, 8],
    target: [0, 1.5, -1],
    label: "Left",
  },
  "three-quarter-right": {
    position: [7, 4.5, 8],
    target: [0, 1.5, -1],
    label: "Right",
  },
};

interface TombstoneSceneProps {
  design: DesignManifest;
  covering: CoveringType;
  angle: CameraAngle;
}

const SCALE = 1 / 150;

export function TombstoneScene({ design, covering, angle }: TombstoneSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const preset = CAMERA_PRESETS[angle];
  camera.position.set(...preset.position);
  (camera as THREE.PerspectiveCamera).lookAt(new THREE.Vector3(...preset.target));

  const showKerbs = covering !== "head-base";
  const baseY = showKerbs ? design.kerbs.height_mm * SCALE : 0;
  const headstoneY = baseY + design.base.height_mm * SCALE;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#f0e8e0" />
      <directionalLight
        position={[5, 10, 6]}
        intensity={1.5}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-4, 6, -3]} intensity={0.6} color="#d0d8e8" />
      <directionalLight position={[0, 3, -8]} intensity={0.3} color="#ffffff" />

      <Environment preset="city" environmentIntensity={0.4} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#f0ede6" roughness={0.95} />
      </mesh>

      <group ref={groupRef}>
        {/* Kerbs and covering */}
        {showKerbs && <KerbMesh spec={design.kerbs} scale={SCALE} />}
        {showKerbs && <CoveringMesh covering={covering} kerbs={design.kerbs} scale={SCALE} />}

        {/* Base + headstone image at the HEAD end */}
        <group position={[0, 0, -(design.kerbs.outer_depth_mm / 2 - design.base.depth_mm) * SCALE]}>
          <BaseMesh spec={design.base} scale={SCALE} yOffset={showKerbs ? design.kerbs.height_mm : 0} />
          <group position={[0, headstoneY, 0]}>
            <HeadstoneMesh
              imagePath={design.headstoneImage}
              width={design.headstone.width_mm * SCALE}
              height={design.headstoneHeight_mm * SCALE}
            />
          </group>
        </group>
      </group>
    </>
  );
}

export { CAMERA_PRESETS };
