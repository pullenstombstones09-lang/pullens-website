import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { Gift, CreditCard, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Memorial Specials — May 2026 | Pullen's Tombstones",
  description:
    "Monthly memorial specials in KZN. Choose your budget and we'll recommend the perfect memorial for your family. Payment plans available. WhatsApp for a free quote.",
};

const BUDGET_TIERS = [
  {
    tier: "Affordable",
    label: "I have a tight budget",
    description: "Quality granite memorials that prove dignity doesn't require a fortune. Perfect for families who want a beautiful tribute at an accessible price.",
    ranges: "More for Less, Baby",
    cta: "Hi, I'm looking for an affordable memorial. Can you help?",
  },
  {
    tier: "Mid-range",
    label: "I want quality and variety",
    description: "Our most popular range with 62+ designs. Premium granite, multiple sizes, and all covering types. The sweet spot of craftsmanship and value.",
    ranges: "Prestige",
    cta: "Hi, I'm interested in the Prestige range. What options are available?",
  },
  {
    tier: "Premium",
    label: "I want something exceptional",
    description: "Larger memorials with intricate detail, premium-grade granite, and exceptional attention to craft. For families who want their memorial to make a lasting impression.",
    ranges: "Signature",
    cta: "Hi, I'm interested in the Signature range. Can we discuss options?",
  },
  {
    tier: "Bespoke",
    label: "I want one-of-a-kind",
    description: "Fully custom memorials designed from scratch. Custom materials, unique shapes, and the finest craftsmanship. Each one as individual as the life it celebrates.",
    ranges: "Exclusive",
    cta: "Hi, I'd like to discuss a custom Exclusive memorial.",
  },
] as const;

const SPECIALS = [
  {
    name: "Free Photo Engraving",
    description: "On any Signature range memorial this month",
  },
  {
    name: "Free Delivery in KZN",
    description: "On all orders placed in May 2026",
  },
  {
    name: "Founding Family Discount",
    description: "First-time customers receive a special rate — ask us on WhatsApp",
  },
] as const;

const WA = whatsappLink(
  LOCATIONS[0].whatsapp,
  "Hi, I'm interested in your May 2026 memorial specials."
);

export default function SpecialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Specials", url: "https://pullenstombstones.co.za/specials" },
        ])}
      />

      {/* Hero */}
      <Section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange mb-2">
          May 2026
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4">
          Choose Your Budget
        </h1>
        <p className="text-lg text-charcoal/80 max-w-xl mx-auto">
          Tell us what you can afford and we&apos;ll recommend the perfect memorial for your family. Every budget deserves dignity.
        </p>
      </Section>

      {/* Budget Tiers */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BUDGET_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-lg bg-cream p-6 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-orange mb-1">
                {tier.tier}
              </p>
              <h3 className="font-display text-xl font-bold text-navy mb-2">
                {tier.label}
              </h3>
              <p className="text-sm text-charcoal/70 mb-4 flex-1">
                {tier.description}
              </p>
              <p className="text-xs text-charcoal/50 mb-4">
                Ranges: {tier.ranges}
              </p>
              <Button
                variant="whatsapp"
                href={whatsappLink(LOCATIONS[0].whatsapp, tier.cta)}
                className="w-full"
              >
                Get a Quote
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* This Month's Specials */}
      <Section dark>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">
          This Month&apos;s Specials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SPECIALS.map((special) => (
            <div key={special.name} className="text-center">
              <Gift className="h-8 w-8 text-orange mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-1">{special.name}</h3>
              <p className="text-white/70 text-sm">{special.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Payment Plans */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <CreditCard className="h-10 w-10 text-navy" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-6">
            Flexible Payment Plans Available
          </h2>
          <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
            {[
              "Any deposit amount accepted",
              "Balance due before installation",
              "No interest or hidden fees",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                <span className="text-charcoal/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* WhatsApp CTA */}
      <Section className="bg-cream">
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
            Not sure which budget fits?
          </h2>
          <p className="text-charcoal/70 mb-6">
            WhatsApp us with your budget and we&apos;ll recommend the best options for your family.
          </p>
          <Button variant="whatsapp" href={WA}>
            WhatsApp Us Now
          </Button>
        </div>
      </Section>

      {/* Fine print */}
      <Section>
        <p className="text-center text-sm text-charcoal/50">
          Specials valid for May 2026 only. Subject to availability.
        </p>
      </Section>
    </>
  );
}
