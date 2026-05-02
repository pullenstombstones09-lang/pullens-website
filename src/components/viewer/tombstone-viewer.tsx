"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { DesignManifest, CoveringType, CameraAngle } from "@/lib/tombstone/types";
import { TombstoneScene } from "./tombstone-scene";
import { ViewerControls } from "./viewer-controls";
import { ImageProtection } from "./image-protection";

interface TombstoneViewerProps {
  design: DesignManifest;
  defaultCovering?: CoveringType;
  interactive?: boolean;
  heightClass?: string;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-charcoal/95">
      <div className="text-cream/60 text-sm">Loading 3D view...</div>
    </div>
  );
}

export function TombstoneViewer({
  design,
  defaultCovering = "kerbs-slab",
  interactive = true,
  heightClass = "h-[400px] sm:h-[500px]",
}: TombstoneViewerProps) {
  const [covering, setCovering] = useState<CoveringType>(defaultCovering);
  const [angle, setAngle] = useState<CameraAngle>("three-quarter-left");

  return (
    <div className="space-y-4">
      <ImageProtection>
        <div className={`${heightClass} w-full rounded-lg overflow-hidden bg-[#1a1a1a]`}>
          <Suspense fallback={<LoadingFallback />}>
            <Canvas
              shadows
              camera={{ fov: 35, near: 0.1, far: 100 }}
              gl={{ antialias: true, preserveDrawingBuffer: false }}
            >
              <TombstoneScene design={design} covering={covering} angle={angle} />
            </Canvas>
          </Suspense>
        </div>
      </ImageProtection>

      {interactive && (
        <ViewerControls
          angle={angle}
          onAngleChange={setAngle}
          covering={covering}
          onCoveringChange={setCovering}
          availableCoverings={design.coveringTypes}
        />
      )}
    </div>
  );
}
