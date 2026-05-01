import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  breadcrumbSchema,
} from "@/components/seo/schemas";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title:
    "About Us — Over 44 Years of Craftsmanship | Pullen's Tombstones",
  description:
    "Family-owned tombstone manufacturer since 1982. Over 22,000 memorials installed across KwaZulu-Natal. 4.9\u2605 Google rated.",
};

const stats = [
  { value: BRAND.totalInstalls, label: "Memorials Installed" },
  { value: `${BRAND.yearsInBusiness}+`, label: "Years of Service" },
  { value: `${BRAND.googleRating}\u2605`, label: "Google Rating" },
  { value: String(BRAND.googleReviews), label: "Five-Star Reviews" },
  { value: "2", label: "Showroom Locations" },
];

const pillars = [
  {
    title: "Heritage",
    description:
      "Over four decades of continuous operation, serving families through generations.",
  },
  {
    title: "Craftsmanship",
    description:
      "Every memorial is precision-cut and hand-finished by skilled artisans.",
  },
  {
    title: "Care",
    description:
      "We understand that choosing a memorial is deeply personal. We guide every family with patience and respect.",
  },
  {
    title: "Trust",
    description:
      "4.9-star Google rating and 156 five-star reviews from families across KwaZulu-Natal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "About", url: "https://pullenstombstones.co.za/about" },
        ])}
      />

      {/* Heritage Hero */}
      <Section dark className="text-center py-24 sm:py-32">
        <p className="text-gold uppercase tracking-[0.25em] text-sm font-bold mb-4">
          Est. {BRAND.established}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Cast in Stone Since 1982
        </h1>
        <p className="font-display text-xl sm:text-2xl text-gold/80 italic mb-8">
          Amatshe Amathuna
        </p>
        <div className="w-24 h-0.5 bg-gold mx-auto" />
      </Section>

      {/* Our Story */}
      <Section id="story">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
          Our Story
        </h2>
        <div className="max-w-3xl space-y-5 text-charcoal/80 text-lg leading-relaxed">
          <p>
            Pullen&apos;s Tombstones was founded in 1982 in the heart of
            Pietermaritzburg, KwaZulu-Natal. What began as a single workshop
            serving local families has grown into one of the province&apos;s
            most trusted tombstone companies, with over{" "}
            <strong className="text-charcoal">{BRAND.totalInstalls} memorials installed</strong>{" "}
            across KwaZulu-Natal and beyond.
          </p>
          <p>
            For more than {BRAND.yearsInBusiness} years, this family business
            has remained true to its founding principle: every memorial should
            be crafted with the same care and dignity that the person it
            honours deserves. That commitment has earned us a{" "}
            <strong className="text-charcoal">
              {BRAND.googleRating}-star Google rating
            </strong>{" "}
            backed by {BRAND.googleReviews} five-star reviews from families
            who trusted us with their loved ones&apos; legacies.
          </p>
          <p>
            Unlike many tombstone companies in KZN, we control the entire
            production process. Raw granite blocks arrive at our Mkondeni
            factory, where they are cut into slabs, shaped, polished, and
            engraved entirely in-house. This self-supply chain means we
            maintain strict quality control from raw stone to finished
            memorial — and it allows us to offer competitive pricing without
            compromising on craftsmanship.
          </p>
          <p>
            Today we operate from two locations: our{" "}
            <strong className="text-charcoal">Pietermaritzburg head office and factory</strong>{" "}
            on Allandale Drive, and our{" "}
            <strong className="text-charcoal">Pinetown factory and showroom</strong>{" "}
            on Circuit Road in Westmead. Both sites are staffed by experienced
            consultants who speak English and isiZulu, ready to guide families
            through every step — from choosing a design and selecting granite,
            to inscription wording and installation scheduling.
          </p>
          <p>
            We serve families from all walks of life. Our five distinct ranges
            — Prestige, Signature, More for Less, Exclusive, and Baby — cover
            everything from affordable single headstones to fully bespoke
            monuments. Whether it&apos;s a simple plaque or an elaborate
            family memorial, each piece leaves our workshop bearing the same
            standard of finish that has defined Pullen&apos;s for over four
            decades.
          </p>
        </div>

        {/* Brand Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-lg bg-cream p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* By The Numbers */}
      <Section dark className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-12">
          By The Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-gold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Craft */}
      <Section id="craft">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-6">
          Our Craft
        </h2>
        <div className="max-w-3xl space-y-5 text-charcoal/80 text-lg leading-relaxed">
          <p>
            Every Pullen&apos;s memorial begins as a raw granite block. At
            our factory, diamond-tipped saws cut these blocks into precision
            slabs, which are then shaped and polished to a mirror finish.
          </p>
          <p>
            Inscriptions are rendered using a combination of{" "}
            <strong className="text-charcoal">CNC engraving</strong> for
            precise lettering and{" "}
            <strong className="text-charcoal">hand engraving</strong> for
            decorative detail and personalised artwork. Our artisans work with
            a range of granite types and finishes — from classic black granite
            to grey, red, and multi-toned stones — ensuring each memorial
            matches the family&apos;s vision.
          </p>
          <p>
            Quality control is built into every stage: slab thickness is
            measured, edges are inspected, and lettering depth is verified
            before any memorial leaves the workshop. We don&apos;t
            subcontract production — everything is made under our roof, by
            our team, to our standards.
          </p>
        </div>
      </Section>

      {/* Visit Us */}
      <Section dark id="visit">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
          Visit Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.id}
              className="rounded-lg bg-white/5 border border-white/10 p-6 sm:p-8"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {loc.name}
              </h3>
              <p className="text-sm text-gold font-semibold mb-4">
                {loc.type}
              </p>

              <div className="space-y-3 text-white/70 text-sm mb-6">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                  {loc.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                  {loc.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold flex-shrink-0" />
                  {loc.hours}
                </p>
              </div>

              <Button
                variant="whatsapp"
                href={whatsappLink(
                  loc.whatsapp,
                  `Hi, I'd like to visit your ${loc.shortName} showroom. Can you help me?`
                )}
                className="w-full sm:w-auto"
              >
                WhatsApp {loc.shortName}
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
