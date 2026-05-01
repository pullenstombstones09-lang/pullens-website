import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { RANGES } from "@/lib/catalogue";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/components/seo/schemas";
import { whatsappLink } from "@/lib/utils";

const pinetown = LOCATIONS[1];

export const metadata: Metadata = {
  title: "Tombstones in Durban & Pinetown | Pullen's Tombstones Showroom",
  description:
    "Visit our Pinetown tombstone showroom at 9 Circuit Road, Westmead. Granite headstones, custom engraving, and dignified service. WhatsApp 081 213 8812.",
};

function pinetownLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: `${BRAND.name} Pinetown showroom — granite tombstones, custom engraving, and dignified service since ${BRAND.established}.`,
    image: "https://pullenstombstones.co.za/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Circuit Road",
      addressLocality: "Westmead, Pinetown",
      postalCode: "3610",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    telephone: pinetown.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: pinetown.gps.lat,
      longitude: pinetown.gps.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BRAND.googleRating,
      reviewCount: BRAND.googleReviews,
    },
    url: "https://pullenstombstones.co.za/pinetown",
  };
}

const whyVisitReasons = [
  "See tombstones in person before deciding",
  "Speak to our team face-to-face",
  "View granite colours and covering types",
  "Get an instant quote",
  "No appointment needed",
];

export default function PinetownPage() {
  const waLink = whatsappLink(
    pinetown.whatsapp,
    "Hi, I'd like to enquire about tombstones at your Pinetown showroom."
  );

  return (
    <>
      <JsonLd data={pinetownLocalBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Pinetown Showroom", url: "https://pullenstombstones.co.za/pinetown" },
        ])}
      />

      {/* ── Local Hero ── */}
      <Section>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Tombstones in Durban &amp; Pinetown
          </h1>
          <p className="text-lg text-charcoal/80 mb-8">
            Serving eThekwini families with dignity since {BRAND.established}
          </p>
          <Button variant="whatsapp" href={waLink}>
            WhatsApp {pinetown.whatsappDisplay}
          </Button>
        </div>
      </Section>

      {/* ── Showroom Info ── */}
      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
              Visit Our Pinetown Showroom
            </h2>

            <div className="space-y-4 text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                <p>9 Circuit Road, Westmead, Pinetown, 3610</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <a
                    href={`tel:${pinetown.phone.replace(/\s/g, "")}`}
                    className="underline hover:text-orange transition-colors"
                  >
                    {pinetown.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                <div>
                  <p>Mon &ndash; Fri: 08:00 &ndash; 17:00</p>
                  <p>Sat: 08:00 &ndash; 13:00</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-white/70 italic">
              Factory + Showroom &mdash; see our full range in person
            </p>

            <div className="mt-6">
              <Button variant="whatsapp" href={waLink}>
                WhatsApp {pinetown.whatsappDisplay}
              </Button>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]">
            <iframe
              title="Pullen's Tombstones Pinetown Showroom Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.5!2d30.8571!3d-29.8063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s9+Circuit+Road%2C+Westmead%2C+Pinetown%2C+3610!5e0!3m2!1sen!2sza!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      {/* ── Range Preview ── */}
      <Section>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-8">
          Browse Our Ranges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RANGES.map((range, i) => (
            <Link
              key={range.slug}
              href={`/ranges/${range.slug}`}
              className="group block rounded-lg bg-cream p-6 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h3 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-orange transition-colors">
                {range.name}
              </h3>
              <p className="text-sm text-charcoal/70 mb-3">{range.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-navy">{range.priceRange}</span>
                <span className="text-orange font-bold group-hover:translate-x-1 transition-transform">
                  View designs &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Why Visit ── */}
      <Section dark>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
          Why Visit Our Pinetown Showroom
        </h2>

        <ul className="space-y-4 max-w-xl">
          {whyVisitReasons.map((reason) => (
            <li key={reason} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-orange mt-0.5 shrink-0" />
              <span className="text-white/90">{reason}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Final CTA ── */}
      <Section>
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
            Can&apos;t visit? WhatsApp us for a free quote
          </h2>
          <Button variant="whatsapp" href={waLink}>
            WhatsApp {pinetown.whatsappDisplay}
          </Button>
        </div>
      </Section>
    </>
  );
}
