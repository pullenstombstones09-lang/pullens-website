"use client";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import type { DesignManifest, CoveringType, CameraAngle, CameraPreset } from "@/lib/tombstone/types";
import { HeadstoneMesh } from "./headstone-mesh";

const CAMERA_PRESETS: Record<CameraAngle, CameraPreset> = {
  front: {
    position: [0, 3, 6],
    target: [0, 1.5, 0],
    label: "Front",
  },
  "three-quarter-left": {
    position: [-4, 3, 5],
    target: [0, 1.5, 0],
    label: "Left",
  },
  "three-quarter-right": {
    position: [4, 3, 5],
    target: [0, 1.5, 0],
    label: "Right",
  },
};

interface TombstoneSceneProps {
  design: DesignManifest;
  covering: CoveringType;
  angle: CameraAngle;
}

export function TombstoneScene({ design, covering, angle }: TombstoneSceneProps) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const preset = CAMERA_PRESETS[angle];
  camera.position.set(...preset.position);
  (camera as THREE.PerspectiveCamera).lookAt(new THREE.Vector3(...preset.target));

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

      {/* 3D tombstone model from Meshy AI */}
      <group ref={groupRef}>
        <HeadstoneMesh modelPath={design.headstoneImage} scale={4} />
      </group>
    </>
  );
}

export { CAMERA_PRESETS };
