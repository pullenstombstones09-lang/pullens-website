import type { Metadata } from "next";
import { IntakeScreen } from "@/components/fitters/intake-screen";

export const metadata: Metadata = {
  title: "Fitter intake",
  robots: { index: false, follow: false },
};

export default function FitterIntakePage() {
  return <IntakeScreen />;
}
