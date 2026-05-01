import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { Gift, CreditCard, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Tombstone Specials & Prices — May 2026 | Pullen's Tombstones",
  description:
    "Monthly tombstone specials in KZN. Granite headstones from R3,200. Payment plans available. WhatsApp for a free quote.",
};

const SPECIALS = [
  {
    name: "Prestige P10",
    price: "From R6,500",
    wasPrice: "Was R7,200",
    description: "Our most popular design at a special price",
    image: "/images/specials/prestige-p10.jpg",
  },
  {
    name: "More for Less M2",
    price: "From R3,200",
    wasPrice: null,
    description: "Complete memorial with kerbs & chips",
    image: "/images/specials/more-for-less-m2.jpg",
  },
  {
    name: "Free Photo Engraving",
    price: "Worth R850",
    wasPrice: null,
    description: "On any Signature range memorial this month",
    image: "/images/specials/photo-engraving.jpg",
  },
] as const;

const RANGE_PRICES = [
  { name: "More for Less", price: "From R3,200" },
  { name: "Prestige", price: "From R5,500" },
  { name: "Signature", price: "From R11,500" },
  { name: "Exclusive", price: "Custom quote" },
  { name: "Baby", price: "From R2,800" },
] as const;

const WA = whatsappLink(
  LOCATIONS[0].whatsapp,
  "Hi, I'm interested in your May 2026 tombstone specials."
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "May 2026 Tombstone Specials",
          description:
            "Monthly tombstone specials from Pullen's Tombstones in KwaZulu-Natal",
          provider: {
            "@type": "LocalBusiness",
            name: BRAND.name,
          },
          itemListElement: SPECIALS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Offer",
              name: s.name,
              description: s.description,
              priceCurrency: "ZAR",
            },
          })),
        }}
      />

      {/* Hero */}
      <Section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange mb-2">
          Tombstone prices 2026
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4">
          May 2026 Specials
        </h1>
        <p className="text-lg text-charcoal/80 max-w-xl mx-auto">
          Quality memorials at special prices — this month only
        </p>
      </Section>

      {/* Featured Specials */}
      <Section>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-8 text-center">
          Featured Specials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALS.map((special, i) => (
            <div
              key={special.name}
              className="rounded-lg bg-cream p-6 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.08)]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="aspect-[4/3] rounded-md bg-charcoal/5 mb-4 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={special.image}
                  alt={special.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="font-display text-xl font-bold text-navy mb-1">
                {special.name}
              </h3>
              <p className="text-sm text-charcoal/70 mb-3">
                {special.description}
              </p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-orange">
                  {special.price}
                </span>
                {special.wasPrice && (
                  <span className="text-sm text-charcoal/50 line-through">
                    {special.wasPrice}
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <Button
                  variant="whatsapp"
                  href={whatsappLink(
                    LOCATIONS[0].whatsapp,
                    `Hi, I'd like to claim the ${special.name} special.`
                  )}
                  className="w-full"
                >
                  Claim This Special
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* All Ranges Starting Prices */}
      <Section dark>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">
          All Ranges — Starting Prices
        </h2>
        <div className="max-w-lg mx-auto">
          {RANGE_PRICES.map((range) => (
            <div
              key={range.name}
              className="flex items-center justify-between py-4 border-b border-white/10 last:border-b-0"
            >
              <span className="font-semibold text-lg">{range.name}</span>
              <span className="text-orange font-bold text-lg">
                {range.price}
              </span>
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
          <Gift className="h-10 w-10 text-orange mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
            Interested in a Special?
          </h2>
          <p className="text-charcoal/70 mb-6">
            WhatsApp us now for a free quote or to claim any of our May specials.
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
