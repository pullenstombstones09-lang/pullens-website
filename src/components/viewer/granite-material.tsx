"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { generateGraniteTexture, generateRoughnessMap } from "@/lib/tombstone/materials";

interface GraniteMaterialProps {
  roughnessOverride?: number;
}

export function GraniteMaterial({ roughnessOverride }: GraniteMaterialProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const textures = useMemo(() => {
    if (typeof document === "undefined") return null;

    const albedoCanvas = generateGraniteTexture(512);
    const roughnessCanvas = generateRoughnessMap(512);

    const albedo = new THREE.CanvasTexture(albedoCanvas);
    albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
    albedo.repeat.set(2, 2);

    const roughness = new THREE.CanvasTexture(roughnessCanvas);
    roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
    roughness.repeat.set(2, 2);

    return { albedo, roughness };
  }, []);

  useEffect(() => {
    return () => {
      textures?.albedo.dispose();
      textures?.roughness.dispose();
    };
  }, [textures]);

  if (!textures) return <meshStandardMaterial color="#0c0c0c" />;

  return (
    <meshStandardMaterial
      ref={matRef}
      map={textures.albedo}
      roughnessMap={roughnessOverride !== undefined ? undefined : textures.roughness}
      roughness={roughnessOverride ?? 0.2}
      metalness={0}
      envMapIntensity={0.8}
    />
  );
}
