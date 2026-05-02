import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tombstone Covering Types Explained: Head & Base vs Kerbs vs Slab",
  description:
    "Understand the difference between tombstone covering options — Head & Base, Kerbs & Chips, Tiles, and Kerbs & Slab — so you can choose the right one.",
  alternates: { canonical: "https://pullenstombstones.co.za/blog/covering-types-explained" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tombstone Covering Types Explained",
  author: { "@type": "Organization", name: "Pullen's Tombstones" },
  publisher: { "@type": "Organization", name: "Pullen's Tombstones" },
  datePublished: "2026-05-01",
  description: "A clear explanation of tombstone covering options available in South Africa.",
};

const COVERING_TYPES = [
  {
    name: "Head & Base",
    description:
      "The headstone is mounted on a simple granite base at the head of the grave. The grave itself is left as-is (usually grassed by the cemetery). This is the most affordable option and works well for families who want a clean, dignified memorial without additional covering.",
    pros: ["Most affordable", "Simple and dignified", "Quick to install"],
    cons: ["Grave surface not covered (grass maintenance needed)", "Less visual impact from a distance"],
    bestFor: "Families on a budget, or cemeteries where full coverings are not permitted.",
    ranges: "Available in More for Less, Prestige, and Baby ranges.",
  },
  {
    name: "Kerbs & Chips",
    description:
      "Granite kerbs (borders) are installed around the perimeter of the grave, creating a defined rectangular area. This area is then filled with decorative stone chips (usually white or grey). The headstone sits at the head of the kerbed area.",
    pros: ["Clean, defined look", "Low maintenance (no grass to cut)", "Mid-range pricing"],
    cons: ["Chips may need occasional topping up", "Weeds can occasionally grow through"],
    bestFor: "Families wanting a neat, well-defined memorial without the cost of a full slab.",
    ranges: "Available in all ranges.",
  },
  {
    name: "Tiles",
    description:
      "Granite kerbs border the grave, and the area within is covered with ceramic or porcelain tiles. This creates a smooth, finished surface that is easy to maintain and looks polished.",
    pros: ["Low maintenance", "Smooth, clean appearance", "No weeds"],
    cons: ["Tiles can crack over time in extreme weather", "Higher cost than chips"],
    bestFor: "Families wanting a finished, polished look without the cost of solid granite.",
    ranges: "Available in Prestige, Signature, and Exclusive ranges.",
  },
  {
    name: "Kerbs & Slab",
    description:
      "The premium option. Granite kerbs surround the grave, topped with a solid granite slab covering the entire grave surface. This creates the most substantial and impressive memorial — a full granite platform with the headstone at the head.",
    pros: ["Most impressive appearance", "Zero maintenance", "No weeds ever", "Extremely durable"],
    cons: ["Highest cost", "Heaviest to install (crane may be required)"],
    bestFor: "Families wanting the finest, most lasting tribute with maximum visual presence.",
    ranges: "Available in Prestige, Signature, and Exclusive ranges.",
  },
];

export default function CoveringTypesPage() {
  const wa = whatsappLink(LOCATIONS[0].whatsapp, "Hi, I'd like to know more about covering types.");

  return (
    <>
      <JsonLd data={articleSchema} />
      <Section>
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-charcoal/50 hover:text-navy transition-colors">
            &larr; Back to Guides
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-6 mb-4">
            Tombstone Covering Types Explained
          </h1>
          <p className="text-charcoal/60 text-sm mb-8">Published 1 May 2026</p>

          <div className="space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              When ordering a tombstone, one of the most important decisions is the
              &ldquo;covering type&rdquo; — what covers or surrounds the grave beneath the
              headstone. Here&apos;s a clear breakdown of each option we offer.
            </p>

            {COVERING_TYPES.map((type) => (
              <div key={type.name} className="mt-10">
                <h2 className="font-display font-bold text-2xl text-navy mb-3">
                  {type.name}
                </h2>
                <p className="mb-4">{type.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 mb-3">
                  <div className="bg-cream rounded-lg p-4">
                    <p className="font-bold text-navy text-sm mb-2">Advantages</p>
                    <ul className="text-sm space-y-1">
                      {type.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">&#10003;</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-cream rounded-lg p-4">
                    <p className="font-bold text-navy text-sm mb-2">Considerations</p>
                    <ul className="text-sm space-y-1">
                      {type.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className="text-orange mt-0.5">&#8226;</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm"><strong>Best for:</strong> {type.bestFor}</p>
                <p className="text-sm text-charcoal/60">{type.ranges}</p>
              </div>
            ))}

            <div className="mt-10 bg-cream rounded-lg p-6">
              <h2 className="font-display font-bold text-xl text-navy mb-3">
                Which should I choose?
              </h2>
              <p className="text-sm text-charcoal/80">
                The right covering depends on your budget, the cemetery&apos;s rules (some restrict
                certain types), and your personal preference. If you&apos;re unsure, send us a
                WhatsApp message with the cemetery name and we&apos;ll advise on what&apos;s permitted
                and what looks best.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="cta" href={wa} className="text-lg px-8 py-4">
              Ask About Covering Types on WhatsApp
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}
