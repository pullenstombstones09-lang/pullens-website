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

const SCALE = 1 / 200;

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
      <ambientLight intensity={0.3} color="#b0c4de" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#c0d0e0" />

      <Environment preset="city" environmentIntensity={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0ede6" roughness={0.95} />
      </mesh>

      <group ref={groupRef}>
        {showKerbs && <KerbMesh spec={design.kerbs} scale={SCALE} />}
        {showKerbs && <CoveringMesh covering={covering} kerbs={design.kerbs} scale={SCALE} />}
        <BaseMesh spec={design.base} scale={SCALE} yOffset={showKerbs ? design.kerbs.height_mm : 0} />
        <group position={[0, headstoneY, 0]}>
          <HeadstoneMesh profile={design.headstone} subElements={design.subElements} scale={SCALE} />
        </group>
      </group>
    </>
  );
}

export { CAMERA_PRESETS };
