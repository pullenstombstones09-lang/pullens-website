"use client";

import dynamic from "next/dynamic";
import { S5_DESIGN } from "@/lib/tombstone/designs/s5";

const TombstoneViewer = dynamic(
  () => import("@/components/viewer/tombstone-viewer").then((m) => ({ default: m.TombstoneViewer })),
  { ssr: false, loading: () => <div className="h-[500px] bg-charcoal/95 rounded-lg animate-pulse" /> }
);

export function S5Viewer() {
  return <TombstoneViewer design={S5_DESIGN} />;
}
