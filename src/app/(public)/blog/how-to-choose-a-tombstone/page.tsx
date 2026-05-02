import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Choose a Tombstone: A Complete Guide for KZN Families",
  description:
    "From granite type to size, covering options, and budget — everything KZN families need to know before ordering a tombstone.",
  alternates: { canonical: "https://pullenstombstones.co.za/blog/how-to-choose-a-tombstone" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Choose a Tombstone: A Complete Guide for KZN Families",
  author: { "@type": "Organization", name: "Pullen's Tombstones" },
  publisher: { "@type": "Organization", name: "Pullen's Tombstones" },
  datePublished: "2026-05-01",
  description: "Everything you need to know before ordering a tombstone in KwaZulu-Natal.",
};

export default function HowToChoosePage() {
  const wa = whatsappLink(LOCATIONS[0].whatsapp, "Hi, I need help choosing a tombstone.");

  return (
    <>
      <JsonLd data={articleSchema} />
      <Section>
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-charcoal/50 hover:text-navy transition-colors">
            &larr; Back to Guides
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-6 mb-4">
            How to Choose a Tombstone: A Complete Guide for KZN Families
          </h1>
          <p className="text-charcoal/60 text-sm mb-8">Published 1 May 2026</p>

          <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              Choosing a tombstone is one of the most meaningful decisions a family makes. It&apos;s a
              permanent tribute — a way to honour a life, tell a story, and give loved ones a place
              to remember. This guide walks you through everything you need to consider.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              1. Choose Your Range
            </h2>
            <p>
              At Pullen&apos;s, we offer five distinct ranges to suit every family&apos;s needs and budget:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>More for Less</strong> — Quality granite at an affordable price. Ideal for families wanting a dignified memorial within a tight budget.</li>
              <li><strong>Prestige</strong> — Our most popular range. Premium granite with wide design variety. The sweet spot of craftsmanship and value.</li>
              <li><strong>Signature</strong> — Larger memorials with intricate detail and premium craftsmanship for families who want something exceptional.</li>
              <li><strong>Exclusive</strong> — Fully custom, one-of-a-kind memorials designed from scratch.</li>
              <li><strong>Baby</strong> — Gentle, sensitive memorials for the smallest lives.</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              2. Select a Covering Type
            </h2>
            <p>
              The &ldquo;covering&rdquo; refers to what surrounds or sits beneath the headstone at the grave site:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Head &amp; Base</strong> — The headstone mounted on a simple base. Most affordable option.</li>
              <li><strong>Kerbs &amp; Chips</strong> — A bordered area filled with stone chips. Clean and dignified.</li>
              <li><strong>Tiles</strong> — A tiled surface within the kerbed area. Low maintenance.</li>
              <li><strong>Kerbs &amp; Slab</strong> — A solid granite slab covering. The premium option.</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              3. Consider the Size
            </h2>
            <p>
              Headstone sizes range from 400x250mm (Baby range) up to 1500x700mm (Signature range).
              The right size depends on the cemetery&apos;s regulations, the covering type, and your
              personal preference. We&apos;ll advise you on what works best for your chosen cemetery.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              4. Personalise the Design
            </h2>
            <p>
              Every memorial can be personalised with inscriptions, photos (ceramic or laser-etched),
              decorative elements, and custom shapes. Our design team works with you to create
              something that truly reflects your loved one&apos;s life.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              5. Payment Plans
            </h2>
            <p>
              We believe honouring a loved one shouldn&apos;t be limited by budget. We offer flexible
              payment plans across all our ranges — speak to us and we&apos;ll find an arrangement
              that works for your family.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              6. Timeline
            </h2>
            <p>
              A standard memorial takes approximately 6–8 weeks from confirmed order to installation.
              We handle everything: manufacturing, engraving, delivery, and installation at the cemetery.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button variant="cta" href={wa} className="text-lg px-8 py-4">
              Get a Free Quote on WhatsApp
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}
