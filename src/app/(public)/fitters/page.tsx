import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Banknote,
  ClipboardCheck,
  Handshake,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FitterApplicationForm } from "@/components/fitters/fitter-application-form";

export const metadata: Metadata = {
  title: "Install Tombstones for Pullen's in Your Area",
  description:
    "Independent installation teams: install tombstones for Pullen's in Gauteng, the Western Cape, the Eastern Cape, the Free State and more. Fixed fee per completed installation, paid within 7 days of a passed quality check.",
};

const RECRUITING_AREAS = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Free State",
  "North West",
  "Mpumalanga",
  "Limpopo",
];

const STEPS = [
  {
    n: "01",
    icon: ClipboardCheck,
    title: "Apply",
    text: "Tell us who you are, where you work and what you drive. Two minutes, on this page.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Vetting & probation",
    text: "We check your references and you complete one probation installation against our checklist, paid as normal.",
  },
  {
    n: "03",
    icon: BadgeCheck,
    title: "Accredited",
    text: "Pass the probation installation and you are an accredited Pullen's fitter for your area.",
  },
  {
    n: "04",
    icon: Handshake,
    title: "Steady jobs",
    text: "Installations in your area come to you as orders land. Preferred fitters get first call on every job.",
  },
];

const DEAL = [
  {
    icon: Banknote,
    title: "Fixed fee, paid in 7 days",
    text: "A fixed fee per completed installation, tiered by the size of the job — never a percentage. Paid within 7 days of your completion photos passing our quality check.",
  },
  {
    icon: Package,
    title: "We supply the stone",
    text: "The tombstone, kerbs and materials are manufactured in our Mkondeni factory and freighted to a depot near you — or held at your yard once you are accredited.",
  },
  {
    icon: Truck,
    title: "You bring the last mile",
    text: "Your bakkie, your tools, your crew, your local knowledge. We handle the family, the money and the stone.",
  },
  {
    icon: Wrench,
    title: "One standard, two strikes",
    text: "Every installation is checked against the same photo checklist. One failed installation is fixed at your cost with a written warning; a second ends the partnership. Families get the same Pullen's quality everywhere.",
  },
];

export default function FittersPage() {
  return (
    <>
      {/* ═══ HERO — dark, editorial ═══ */}
      <section className="relative min-h-[88svh] flex items-end">
        <Image
          src="/images/heroes/hero-workshop.webp"
          alt="Granite tombstones being finished in the Pullen's workshop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 photo-darken-editorial" />

        <div className="relative z-10 w-full pb-16 pt-32 sm:pb-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-xl">
              <div className="mb-8 animate-fade-in stagger-1">
                <p className="label-ui text-gold tracking-[0.2em] text-[11px]">Cast in Stone</p>
                <div className="hairline-gold mt-2" />
                <p className="label-ui text-gold/70 tracking-[0.2em] text-[10px] mt-2">
                  Since 1982
                </p>
              </div>

              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white animate-fade-in-up stagger-2">
                Install tombstones<br />
                for Pullen&apos;s<br />
                in your area.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/60 max-w-md leading-relaxed animate-fade-in-up stagger-3">
                We are expanding beyond KwaZulu-Natal — and we are not building crews in every
                town. We are finding the best one that already exists. You install; we handle the
                stone, the family and the payment.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up stagger-4">
                <Button variant="cta" href="#apply" className="text-base px-7 py-3.5">
                  Apply to install
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Areas strip */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-dark/60 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center gap-3 overflow-x-auto text-white/50 text-xs sm:text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-gold/70" aria-hidden />
              <span className="whitespace-nowrap label-ui text-[10px] text-gold/70">
                Recruiting now
              </span>
              {RECRUITING_AREAS.map((a) => (
                <span key={a} className="whitespace-nowrap">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section>
        <div className="max-w-2xl mb-12">
          <p className="label-ui text-gold text-[10px] mb-3">How it works</p>
          <h2 className="heading-roman text-3xl sm:text-4xl text-ink">
            From application to accredited fitter
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="card-editorial p-6">
              <div className="flex items-center justify-between mb-4">
                <s.icon className="h-5 w-5 text-gold" aria-hidden />
                <span className="label-ui text-[10px] text-ink-muted">{s.n}</span>
              </div>
              <h3 className="heading-roman text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ THE DEAL — dark band ═══ */}
      <section className="bg-dark text-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-2xl mb-12">
            <p className="label-ui text-gold text-[10px] mb-3">The deal</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-white">
              Plain terms. No percentages.<br />
              No waiting for the customer to pay.
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {DEAL.map((d) => (
              <div key={d.title} className="flex gap-4">
                <d.icon className="h-5 w-5 text-gold shrink-0 mt-1" aria-hidden />
                <div>
                  <h3 className="heading-roman text-lg text-white mb-1.5">{d.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAND ═══ */}
      <Section className="border-b border-hairline">
        <div className="grid gap-10 sm:grid-cols-3 max-w-4xl mx-auto text-center">
          <div>
            <p className="heading-display text-4xl text-ink">30,000+</p>
            <p className="label-ui text-[10px] text-ink-muted mt-2">Tombstones installed</p>
          </div>
          <div>
            <p className="heading-display text-4xl text-ink">1982</p>
            <p className="label-ui text-[10px] text-ink-muted mt-2">
              Established — own factory, Mkondeni
            </p>
          </div>
          <div>
            <p className="heading-display text-4xl text-ink">3rd</p>
            <p className="label-ui text-[10px] text-ink-muted mt-2">Generation family business</p>
          </div>
        </div>
        <p className="text-sm text-ink-muted text-center max-w-2xl mx-auto mt-10 leading-relaxed">
          Today we install across KwaZulu-Natal and parts of the Eastern Cape from four showrooms
          and our own factory. The fitter programme is how we reach the rest of the country —
          with your hands and our stone.
        </p>
      </Section>

      {/* ═══ APPLICATION ═══ */}
      <Section id="apply">
        <div className="max-w-xl">
          <p className="label-ui text-gold text-[10px] mb-3">Apply</p>
          <h2 className="heading-roman text-2xl sm:text-3xl text-ink mb-2">
            Tell us who you are and where you work
          </h2>
          <p className="text-sm text-ink-muted mb-8">
            Our partner team reviews every application and comes back to you on WhatsApp.
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
