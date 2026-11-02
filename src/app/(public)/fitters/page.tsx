import type { Metadata } from "next";
import { BadgeCheck, Banknote, Package, Truck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { FitterApplicationForm } from "@/components/fitters/fitter-application-form";

export const metadata: Metadata = {
  title: "Install Tombstones for Pullen's in Your Area",
  description:
    "Independent installation teams: install tombstones for Pullen's in Gauteng, the Western Cape, the Eastern Cape, the Free State and more. Fixed fee per completed installation, paid within 7 days of a passed quality check.",
};

const POINTS = [
  {
    icon: Banknote,
    title: "Fixed fee, paid in 7 days",
    text: "You are paid a fixed fee per completed installation, within 7 days of the installation passing our quality check — never a percentage, never a wait for the customer to pay.",
  },
  {
    icon: Package,
    title: "We supply the stone",
    text: "The tombstone and materials are supplied and freighted by Pullen's. You collect locally, install, and send completion photos.",
  },
  {
    icon: Truck,
    title: "You bring the last mile",
    text: "Your bakkie, your tools, your labour, your local knowledge. Steady flow of installation jobs in your area as orders come in.",
  },
  {
    icon: BadgeCheck,
    title: "One standard",
    text: "Every installation is checked against our quality standard. Two failed installations end the partnership — families get the same Pullen's quality everywhere.",
  },
];

export default function FittersPage() {
  return (
    <>
      <Section>
        <div className="max-w-2xl">
          <p className="label-ui text-gold text-[10px] mb-3">Installation partners</p>
          <h1 className="heading-roman text-4xl sm:text-5xl text-ink mb-4">
            Install tombstones for Pullen&apos;s in your area
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed">
            We are opening Gauteng, the Western Cape, the Eastern Cape, the Free State and more —
            and we need established local installation teams. You install; we handle the stone,
            the customer and the payment.
          </p>
        </div>
      </Section>

      <Section className="bg-cream/50">
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
          {POINTS.map((p) => (
            <div key={p.title} className="card-editorial p-6">
              <p.icon className="h-5 w-5 text-gold mb-3" aria-hidden />
              <h2 className="heading-roman text-lg text-ink mb-2">{p.title}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-xl">
          <h2 className="heading-roman text-2xl text-ink mb-2">Apply now</h2>
          <p className="text-sm text-ink-muted mb-8">
            Tell us who you are and where you work. Our partner team reviews every application and
            comes back to you on WhatsApp.
          </p>
          <FitterApplicationForm />
          <p className="label-ui text-[10px] text-ink-muted mt-10">
            Three generations. One workshop. KZN since 1982.
          </p>
        </div>
      </Section>
    </>
  );
}
