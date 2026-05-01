import type { Metadata } from "next";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { RANGES } from "@/lib/catalogue";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TrustBadges } from "@/components/ui/trust-badges";
import { RangeCard } from "@/components/ui/range-card";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, faqPageSchema } from "@/components/seo/schemas";
import { Star, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tombstones Pietermaritzburg & KZN | Cast in Stone Since 1982",
  description:
    "Granite tombstones and headstones in Pietermaritzburg and Durban. Over 22,000 memorials installed. 4.9★ rated. Get a quote on WhatsApp.",
  alternates: { canonical: "https://pullenstombstones.co.za" },
};

const FAQ_ITEMS = [
  {
    question: "How much does a tombstone cost?",
    answer:
      "Our ranges start from R3,200 for the More for Less range, with options through to our Exclusive custom-quoted memorials. The final price depends on the size, granite type, design complexity, and covering type you choose. We offer flexible payment plans to suit every family's budget.",
  },
  {
    question: "What covering types are available?",
    answer:
      "We offer several covering options: Head & Base (the headstone with a simple base), Kerbs & Chips (bordered area filled with stone chips), Tiles (a tiled surface within the kerbed area), and Kerbs & Slab (a solid granite slab covering). Each option is available across most of our ranges.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. We understand that honouring a loved one shouldn't be limited by budget. We offer flexible payment plans that allow you to pay off your memorial in manageable instalments. Speak to us on WhatsApp and we'll find an arrangement that works for your family.",
  },
  {
    question: "How long does it take from order to installation?",
    answer:
      "A standard memorial takes approximately 6 to 8 weeks from confirmed order to installation. Custom Exclusive designs may take longer depending on complexity. We handle everything — manufacturing, engraving, delivery, and installation at the cemetery.",
  },
];

export default function HomePage() {
  const hqLocation = LOCATIONS[0];
  const whatsappUrl = whatsappLink(
    hqLocation.whatsapp,
    "Hi, I'd like a free quote on a tombstone please."
  );

  return (
    <>
      {/* JSON-LD for each location */}
      {localBusinessSchema().map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* ─── 1. Hero ─── */}
      <section className="bg-gradient-to-b from-cream to-off-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold font-display text-lg tracking-wide mb-3">
            {BRAND.taglineZulu}
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight">
            Cast in Stone
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-charcoal/80 max-w-2xl mx-auto">
            Honouring KwaZulu-Natal families with dignity since 1982.
            {" "}
            {BRAND.name} has crafted over {BRAND.totalInstalls} granite
            memorials — each one a lasting tribute to a life well lived.
          </p>
          <div className="mt-8">
            <Button variant="cta" href={whatsappUrl} className="text-lg px-8 py-4">
              Get a Free Quote on WhatsApp
            </Button>
          </div>
          <div className="mt-12">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* ─── 2. Ranges Preview ─── */}
      <Section id="ranges">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-10">
          Our Memorial Ranges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RANGES.map((range) => {
            const prefix = range.dirName.replace("-Range", "");
            return (
              <RangeCard
                key={range.slug}
                range={range}
                featuredImage={`/catalogue/${range.dirName}/${prefix}1.webp`}
              />
            );
          })}
        </div>
      </Section>

      {/* ─── 3. Heritage Strip ─── */}
      <Section dark id="heritage">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold font-display text-sm tracking-widest uppercase mb-4">
            Established {BRAND.established}
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
            Over {BRAND.yearsInBusiness} Years of Excellence
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            What began as a small family workshop in Pietermaritzburg in 1982 has
            grown into KwaZulu-Natal's most trusted name in granite memorials.
            Over four decades, we have handcrafted more than {BRAND.totalInstalls}{" "}
            tombstones for families across the province — each one manufactured
            with care, installed with precision, and built to stand for
            generations. <em className="text-gold">Siyabakhumbula</em> — we
            remember them.
          </p>
        </div>
      </Section>

      {/* ─── 4. Trust Section ─── */}
      <Section id="trust" className="bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-orange text-orange" />
            ))}
          </div>
          <p className="text-4xl font-bold text-navy">{BRAND.googleRating}</p>
          <p className="text-charcoal/60 mt-1 mb-8">Google Reviews</p>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-navy">
                {BRAND.totalInstalls}
              </p>
              <p className="text-sm text-charcoal/60 mt-1">Memorials Installed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-navy">
                {BRAND.yearsInBusiness}+
              </p>
              <p className="text-sm text-charcoal/60 mt-1">Years</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-navy">
                {BRAND.googleReviews}
              </p>
              <p className="text-sm text-charcoal/60 mt-1">Reviews</p>
            </div>
          </div>

          <blockquote className="mt-10 text-xl sm:text-2xl font-display italic text-navy/80 border-l-4 border-gold pl-6 text-left max-w-xl mx-auto">
            &ldquo;The most trusted name in tombstones across KwaZulu-Natal.&rdquo;
          </blockquote>
        </div>
      </Section>

      {/* ─── 5. FAQ Teaser ─── */}
      <Section id="faq">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group bg-cream rounded-lg overflow-hidden"
            >
              <summary className="cursor-pointer px-6 py-4 font-bold text-navy flex items-center justify-between list-none">
                {item.question}
                <span className="ml-2 text-gold transition-transform duration-200 group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <div className="px-6 pb-4 text-charcoal/80 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-navy font-bold hover:text-gold transition-colors duration-200"
          >
            View all FAQs &rarr;
          </Link>
        </div>
      </Section>

      {/* ─── 6. Two Locations ─── */}
      <Section className="bg-cream" id="locations">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-10">
          Visit Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="bg-off-white rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <h3 className="font-display font-bold text-xl text-navy mb-1">
                {loc.name}
              </h3>
              <p className="text-sm text-charcoal/60 mb-4">{loc.type}</p>

              <div className="space-y-3 text-sm text-charcoal/80">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="hover:text-navy transition-colors"
                  >
                    {loc.phone}
                  </a>
                </div>
                <p className="text-charcoal/50 text-xs">{loc.hours}</p>
              </div>

              <div className="mt-5">
                <Button
                  variant="whatsapp"
                  href={whatsappLink(
                    loc.whatsapp,
                    `Hi, I'd like to enquire about tombstones at your ${loc.shortName} branch.`
                  )}
                >
                  WhatsApp {loc.whatsappDisplay}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 7. Final CTA ─── */}
      <Section dark id="cta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to honour your loved one?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Every memorial we craft tells a story. Let us help you tell yours.
          </p>
          <Button variant="cta" href={whatsappUrl} className="text-lg px-8 py-4">
            Get a Free Quote on WhatsApp
          </Button>
        </div>
      </Section>
    </>
  );
}
