import type { Metadata } from "next";
import { Phone, Clock, MapPin, Building2 } from "lucide-react";
import { LOCATIONS, BRAND } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, breadcrumbSchema } from "@/components/seo/schemas";

export const metadata: Metadata = {
  title:
    "Contact Us — Showrooms in Pietermaritzburg & Pinetown | Pullen's Tombstones",
  description:
    "Visit our tombstone showrooms in Pietermaritzburg and Pinetown. WhatsApp us for a free quote. Open Mon-Fri 08:00-17:00, Sat 08:00-13:00.",
};

function mapsEmbedUrl(address: string) {
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`;
}

export default function ContactPage() {
  return (
    <>
      {/* JSON-LD for both locations */}
      {localBusinessSchema().map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Contact", url: "https://pullenstombstones.co.za/contact" },
        ])}
      />

      {/* Hero heading */}
      <Section>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4 text-center">
          Visit Our Showrooms
        </h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-12">
          Walk in and see our full range of granite tombstones and memorials.
          Our teams in Pietermaritzburg and Pinetown are ready to help you
          find the perfect tribute.
        </p>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="rounded-lg bg-cream p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08),0_8px_28px_rgba(0,0,0,0.06)]"
            >
              {/* Location name + type */}
              <div className="flex items-start gap-3 mb-4">
                <Building2 className="h-6 w-6 text-navy shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-display text-xl font-bold text-navy">
                    {loc.name}
                  </h2>
                  <span className="text-sm text-charcoal/60">{loc.type}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="h-5 w-5 text-orange shrink-0 mt-0.5" />
                <p className="text-sm text-charcoal/80">{loc.address}</p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-orange shrink-0" />
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-navy hover:text-orange transition-colors min-h-[48px] flex items-center"
                >
                  {loc.phone}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 mb-5">
                <Clock className="h-5 w-5 text-orange shrink-0" />
                <p className="text-sm text-charcoal/80">{loc.hours}</p>
              </div>

              {/* WhatsApp button */}
              <Button
                variant="whatsapp"
                href={whatsappLink(
                  loc.whatsapp,
                  `Hi, I'd like a quote from your ${loc.shortName} branch.`
                )}
                className="w-full mb-6"
              >
                WhatsApp {loc.whatsappDisplay}
              </Button>

              {/* Google Maps embed */}
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <iframe
                  title={`Map — ${loc.name}`}
                  src={mapsEmbedUrl(loc.address)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Get a Quote CTA */}
      <Section dark>
        <div className="text-center py-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Ready to Get a Quote?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Send us a WhatsApp message with the details of the memorial you
            need. Our team responds within 24 hours — usually much sooner.
          </p>
          <Button
            variant="cta"
            href={whatsappLink(
              LOCATIONS[0].whatsapp,
              "Hi, I'd like a quote for a tombstone please."
            )}
            className="text-lg px-8"
          >
            Get a Free Quote on WhatsApp
          </Button>
        </div>
      </Section>
    </>
  );
}
