import type { Metadata } from "next";
import { BRAND, LOCATIONS } from "@/lib/constants";
import { RANGES } from "@/lib/catalogue";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { RangeCard } from "@/components/ui/range-card";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, faqPageSchema } from "@/components/seo/schemas";
import { Star, MapPin, Phone, Truck, Shield, PenTool, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Tombstones Pietermaritzburg & KZN | Cast in Stone Since 1982",
  description:
    "Granite tombstones in Pietermaritzburg and Durban. Over 22,000 installed since 1982. 4.9★ rated. 142 designs. Get a quote on WhatsApp.",
  alternates: { canonical: "https://pullenstombstones.co.za" },
};

const FAQ_ITEMS = [
  {
    question: "How much does a tombstone cost?",
    answer:
      "We have tombstones to suit every budget — from our affordable More for Less range through to our bespoke Exclusive collection. The final price depends on the size, granite type, design complexity, and covering type you choose. WhatsApp us with your budget and we'll recommend the best options. We also offer flexible payment plans.",
  },
  {
    question: "What covering types are available?",
    answer:
      "We offer several covering options: Head & Base (the headstone with a simple base), Kerbs & Chips (bordered area filled with stone chips), Tiles (a tiled surface within the kerbed area), and Kerbs & Slab (a solid granite slab covering). Each option is available across most of our ranges.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. We offer flexible payment plans that allow you to pay off your tombstone in manageable instalments. Start with a deposit and pay the balance before installation. No interest, no hidden fees. Speak to us on WhatsApp.",
  },
  {
    question: "How long does it take from order to installation?",
    answer:
      "A standard tombstone takes approximately 4 to 6 weeks from confirmed inscription to installation. Custom Exclusive designs may take longer. We handle everything — manufacturing, engraving, delivery, and installation at the cemetery.",
  },
];

const RANGE_IMAGES: Record<string, string> = {
  "more-for-less": "/catalogue/M-Range/M1.webp",
  prestige: "/catalogue/P-Range/P2.webp",
  signature: "/catalogue/S-Range/S2.webp",
  exclusive: "/catalogue/EX-Range/EX1.webp",
  baby: "/catalogue/B-Range/B1.webp",
};

export default function HomePage() {
  const hqLocation = LOCATIONS[0];
  const whatsappUrl = whatsappLink(
    hqLocation.whatsapp,
    "Hi, I'd like a free quote on a tombstone please."
  );

  return (
    <>
      {localBusinessSchema().map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* ═══ HERO — Full viewport, editorial asymmetry ═══ */}
      <section className="relative min-h-[100svh] flex items-end">
        <Image
          src="/images/heroes/hero-homepage.webp"
          alt="Black granite tombstone at golden hour in a KwaZulu-Natal cemetery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 photo-darken-editorial" />

        <div className="relative z-10 w-full pb-16 pt-32 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-xl">
              {/* CAST IN STONE mark */}
              <div className="mb-8 animate-fade-in stagger-1">
                <p className="label-ui text-gold tracking-[0.2em] text-[11px]">
                  Cast in Stone
                </p>
                <div className="hairline-gold mt-2" />
                <p className="label-ui text-gold/70 tracking-[0.2em] text-[10px] mt-2">
                  Since 1982
                </p>
              </div>

              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white animate-fade-in-up stagger-2">
                Three generations.<br />
                One workshop.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/60 max-w-md leading-relaxed animate-fade-in-up stagger-3">
                Honouring KwaZulu-Natal families with dignity since 1982.
                Over {BRAND.totalInstalls} granite tombstones handcrafted in our workshop.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up stagger-4">
                <Button variant="cta" href={whatsappUrl} className="text-base px-7 py-3.5">
                  Get a Free Quote
                </Button>
                <Button variant="secondary" href="/ranges" className="text-base px-7 py-3.5 !bg-white/8 !text-white/90 !border-white/15 hover:!bg-white/15 backdrop-blur-sm">
                  Browse 142 Designs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip at bottom of hero */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-dark/60 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center justify-between gap-6 overflow-x-auto text-white/50 text-xs sm:text-sm">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                </div>
                <span className="text-white/80 font-semibold">{BRAND.googleRating}</span>
                <span>Google</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <span className="whitespace-nowrap">{BRAND.totalInstalls} installed</span>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <span className="whitespace-nowrap">{BRAND.yearsInBusiness}+ years</span>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <span className="whitespace-nowrap">4 locations in KZN</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST INDICATORS ═══ */}
      <section className="bg-cream border-b border-hairline">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck className="h-5 w-5" />, title: "Free Delivery", desc: "Within 50km of our factories" },
              { icon: <Shield className="h-5 w-5" />, title: "Lifetime Guarantee", desc: "On all granite tombstones" },
              { icon: <PenTool className="h-5 w-5" />, title: "Free Inscription", desc: "Up to 80 characters included" },
              { icon: <Clock className="h-5 w-5" />, title: "4-6 Week Delivery", desc: "From confirmed inscription" },
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-gold">{t.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-ink">{t.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MOTHER'S DAY — editorial strip ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="label-ui text-gold/80 text-[10px] tracking-[0.25em] mb-3">This Mother&apos;s Day</p>
              <p className="heading-display text-2xl sm:text-3xl text-cream-headline">
                She gave everything. Give her a legacy.
              </p>
              <p className="text-white/40 text-sm mt-2">Honour her memory with a tombstone that endures.</p>
            </div>
            <Button variant="cta" href={whatsappUrl} className="shrink-0">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ RANGES — editorial grid ═══ */}
      <Section id="ranges">
        <div className="text-center mb-12 sm:mb-16">
          <p className="label-ui text-gold text-[10px] tracking-[0.25em] mb-4">Our Collections</p>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            142 designs, five ranges
          </h2>
          <div className="hairline-gold-wide mx-auto mt-5" />
          <p className="text-ink-muted mt-5 max-w-md mx-auto leading-relaxed">
            From affordable to bespoke. Every tombstone handcrafted from solid granite in our KZN workshop.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {RANGES.map((range) => (
            <RangeCard
              key={range.slug}
              range={range}
              featuredImage={RANGE_IMAGES[range.slug] || ""}
            />
          ))}
        </div>
      </Section>

      {/* ═══ FEATURED — asymmetric hero ═══ */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[500px]">
            {/* Image side */}
            <div className="relative min-h-[350px] lg:min-h-full bg-dark">
              <Image
                src="/catalogue/S-Range/S1.webp"
                alt="Signature S1 tombstone — cross design with kerbs and slab"
                fill
                className="object-contain p-8 sm:p-12 lg:p-16"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Content side */}
            <div className="bg-dark px-6 sm:px-10 lg:px-14 py-12 lg:py-16 flex flex-col justify-center">
              <p className="label-ui text-gold/80 text-[10px] tracking-[0.25em] mb-4">Featured Design</p>
              <h2 className="heading-display text-3xl sm:text-4xl text-cream-headline mb-5">
                Signature S1
              </h2>
              <div className="hairline-gold mb-6" />
              <p className="text-white/50 leading-relaxed mb-3">
                Our Signature range is for families who want something truly special. Larger tombstones with intricate designs, premium granite, and exceptional attention to detail.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Cross design with kerbs and slab covering. Available in black, grey, and blue pearl granite.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="cta" href={whatsappLink(hqLocation.whatsapp, "Hi, I'm interested in the Signature S1 tombstone.")}>
                  Get a Quote
                </Button>
                <Button variant="secondary" href="/ranges/signature" className="!bg-white/8 !text-white/80 !border-white/15 hover:!bg-white/15">
                  View Range
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF — editorial strip ═══ */}
      <Section id="trust" className="!py-20 sm:!py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 sm:gap-12 text-center mb-12">
            <div>
              <p className="text-3xl sm:text-5xl font-bold text-ink tracking-tight">{BRAND.totalInstalls}</p>
              <p className="text-xs sm:text-sm text-ink-muted mt-2">Tombstones Installed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-bold text-ink tracking-tight">{BRAND.yearsInBusiness}+</p>
              <p className="text-xs sm:text-sm text-ink-muted mt-2">Years of Craftsmanship</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold" />)}
              </div>
              <p className="text-3xl sm:text-5xl font-bold text-ink tracking-tight">{BRAND.googleRating}</p>
              <p className="text-xs sm:text-sm text-ink-muted mt-2">{BRAND.googleReviews} Google Reviews</p>
            </div>
          </div>

          <div className="hairline-gold-wide mx-auto mb-12" />

          <blockquote className="text-center">
            <p className="heading-display text-xl sm:text-2xl lg:text-3xl text-ink/80 leading-snug max-w-2xl mx-auto">
              The most trusted name in tombstones across KwaZulu-Natal.
            </p>
          </blockquote>
        </div>
      </Section>

      {/* ═══ HERITAGE — full-bleed photo ═══ */}
      <section className="relative min-h-[500px] sm:min-h-[550px] flex items-end">
        <Image
          src="/images/heroes/hero-family.webp"
          alt="A family gathered around a granite memorial at golden hour in KZN"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 photo-darken-bottom" />
        <div className="relative z-10 w-full py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-lg">
              <p className="label-ui text-gold/80 text-[10px] tracking-[0.25em] mb-4">
                Established {BRAND.established}
              </p>
              <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Three Generations.<br />One Workshop.
              </h2>
              <div className="hairline-gold mt-5 mb-5" />
              <p className="text-white/60 leading-relaxed max-w-md">
                What began as a small family workshop in Pietermaritzburg in 1982 has
                grown into KwaZulu-Natal&apos;s most trusted name in granite tombstones.
                Over four decades, we have handcrafted more than {BRAND.totalInstalls}{" "}
                tombstones for families across the province.
              </p>
              <div className="mt-6">
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright transition-colors">
                  Our Story <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="process" className="!py-20 sm:!py-24">
        <div className="text-center mb-12">
          <p className="label-ui text-gold text-[10px] tracking-[0.25em] mb-4">The Process</p>
          <h2 className="heading-display text-3xl sm:text-4xl text-ink">
            Four simple steps
          </h2>
          <div className="hairline-gold-wide mx-auto mt-5" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { step: "01", title: "Choose Your Design", desc: "Browse 142 designs across five ranges. Find the tombstone that feels right." },
            { step: "02", title: "Personalise", desc: "Choose granite colour, covering type, and write your inscription." },
            { step: "03", title: "Approve & Engrave", desc: "We send a WhatsApp preview. You confirm every letter before we begin." },
            { step: "04", title: "Delivered With Care", desc: "Installed at the cemetery by our team. Free within 50km." },
          ].map((s) => (
            <div key={s.step} className="text-center sm:text-left">
              <span className="heading-display text-4xl sm:text-5xl text-hairline">{s.step}</span>
              <h3 className="heading-roman text-lg text-ink mt-3 mb-2">{s.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-dark relative texture-grain overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="text-center mb-12">
            <p className="label-ui text-gold/80 text-[10px] tracking-[0.25em] mb-4">Testimonials</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-cream-headline">
              What families say
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { q: "From the first WhatsApp message to installation day, they treated us like family. The tombstone is more beautiful than we imagined.", n: "Nomsa M.", l: "Pietermaritzburg" },
              { q: "My father deserved the best. Pullen's delivered exactly that. The inscription is perfect — every letter.", n: "Thabo K.", l: "Pinetown" },
              { q: "They were so patient — we changed the inscription three times and they never complained. That's real care.", n: "Sarah P.", l: "Hilton" },
            ].map((t, i) => (
              <div key={i} className="border border-white/8 rounded-sm p-6 sm:p-7 bg-white/[0.02]">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(j => <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  &ldquo;{t.q}&rdquo;
                </p>
                <div className="hairline-gold mb-4" style={{ width: 40 }} />
                <p className="text-sm font-semibold text-cream-headline">{t.n}</p>
                <p className="text-xs text-white/30 mt-0.5">{t.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WORKSHOP PHOTO — full bleed ═══ */}
      <section className="relative h-[300px] sm:h-[400px]">
        <Image
          src="/images/heroes/hero-workshop.webp"
          alt="Craftsman engraving a granite tombstone in the Pullens workshop"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/30" />
      </section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="!py-20 sm:!py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="label-ui text-gold text-[10px] tracking-[0.25em] mb-4">Common Questions</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-ink">
              Frequently asked
            </h2>
            <div className="hairline-gold-wide mx-auto mt-5" />
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group border border-hairline rounded-sm overflow-hidden">
                <summary className="cursor-pointer px-6 py-5 font-semibold text-ink text-sm flex items-center justify-between list-none hover:bg-cream/50 transition-colors">
                  {item.question}
                  <span className="ml-3 text-gold transition-transform duration-200 group-open:rotate-45 text-lg leading-none shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 text-ink-muted text-sm leading-relaxed border-t border-hairline pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-bright transition-colors">
              View all FAQs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* ═══ LOCATIONS ═══ */}
      <section className="bg-cream border-t border-hairline">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="text-center mb-12">
            <p className="label-ui text-gold text-[10px] tracking-[0.25em] mb-4">Find Us</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-ink">
              Four locations across KZN
            </h2>
            <div className="hairline-gold-wide mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="card-editorial p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="heading-roman text-lg text-ink">{loc.name}</h3>
                    <p className="text-xs text-ink-muted mt-0.5">{loc.type}</p>
                  </div>
                  {loc.status === "opening-soon" && (
                    <span className="label-ui text-gold text-[9px] bg-gold/10 px-2 py-1 rounded-sm">Opening Soon</span>
                  )}
                </div>
                <div className="space-y-2.5 text-sm text-ink-muted mt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 mt-0.5 text-gold/60 flex-shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  {loc.status === "open" && (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-gold/60 flex-shrink-0" />
                        <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-ink transition-colors">{loc.phone}</a>
                      </div>
                      <p className="text-xs text-ink-muted/60 pl-[26px]">{loc.hours}</p>
                    </>
                  )}
                </div>
                {loc.status === "open" && (
                  <div className="mt-5">
                    <Button variant="whatsapp" href={whatsappLink(loc.whatsapp, `Hi, I'd like to enquire about tombstones at your ${loc.shortName} branch.`)}>
                      WhatsApp {loc.whatsappDisplay}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative overflow-hidden texture-grain">
        <div className="absolute inset-0 bg-dark" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6 sm:px-8 py-20 sm:py-28">
          <p className="label-ui text-gold/80 text-[10px] tracking-[0.25em] mb-5">Ready?</p>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-cream-headline mb-5">
            Every tombstone we craft tells a story.
          </h2>
          <div className="hairline-gold-wide mx-auto mb-6" />
          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
            Let us help you tell yours.
          </p>
          <Button variant="cta" href={whatsappUrl} className="text-lg px-10 py-4">
            Get a Free Quote on WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
