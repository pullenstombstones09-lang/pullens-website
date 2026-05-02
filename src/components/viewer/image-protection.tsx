"use client";

import { useEffect, type ReactNode } from "react";

interface ImageProtectionProps {
  children: ReactNode;
}

export function ImageProtection({ children }: ImageProtectionProps) {
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div
      className="relative select-none catalogue-canvas"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center" aria-hidden="true">
        <span className="text-white/[0.02] text-6xl font-bold rotate-[-30deg] select-none">
          PULLEN&apos;S TOMBSTONES
        </span>
      </div>
    </div>
  );
}
