"use client";

import type { CameraAngle, CoveringType } from "@/lib/tombstone/types";
import { cn } from "@/lib/utils";

interface ViewerControlsProps {
  angle: CameraAngle;
  onAngleChange: (angle: CameraAngle) => void;
  covering: CoveringType;
  onCoveringChange: (covering: CoveringType) => void;
  availableCoverings: CoveringType[];
}

const ANGLE_LABELS: Record<CameraAngle, string> = {
  front: "Front",
  "three-quarter-left": "Left",
  "three-quarter-right": "Right",
};

const COVERING_LABELS: Record<CoveringType, string> = {
  "head-base": "Head & Base",
  "kerbs-chips": "Kerbs & Chips",
  "kerbs-tiles": "Tiles",
  "kerbs-slab": "Kerbs & Slab",
};

export function ViewerControls({
  angle,
  onAngleChange,
  covering,
  onCoveringChange,
  availableCoverings,
}: ViewerControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-2 font-semibold">View</p>
        <div className="flex gap-2">
          {(Object.keys(ANGLE_LABELS) as CameraAngle[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onAngleChange(a)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]",
                angle === a ? "bg-navy text-white" : "bg-cream text-charcoal/70 hover:bg-charcoal/10"
              )}
            >
              {ANGLE_LABELS[a]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-2 font-semibold">Covering Type</p>
        <div className="flex flex-wrap gap-2">
          {availableCoverings.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCoveringChange(c)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px]",
                covering === c ? "bg-orange text-white" : "bg-cream text-charcoal/70 hover:bg-charcoal/10"
              )}
            >
              {COVERING_LABELS[c]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
