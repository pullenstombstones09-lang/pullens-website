import type { Metadata } from "next";
import Link from "next/link";
import { RANGES } from "@/lib/catalogue";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/components/seo/schemas";

export const metadata: Metadata = {
  title: "Tombstone Ranges | Pullen's Tombstones",
  description:
    "Browse our 5 granite tombstone ranges — from affordable memorials to bespoke Exclusive designs. Over 140 designs across Prestige, Signature, More for Less, Exclusive, and Baby ranges.",
};

export default function RangesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Ranges", url: "https://pullenstombstones.co.za/ranges" },
        ])}
      />

      <Section>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
          Our Memorial Ranges
        </h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mb-12">
          Every family deserves a memorial that reflects the life it honours.
          We offer five distinct ranges — each crafted from quality granite and
          backed by over four decades of experience. Whether you need an
          affordable tribute or a fully bespoke design, there is a range that
          fits your vision and your budget.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RANGES.map((range, i) => (
            <Link
              key={range.slug}
              href={`/ranges/${range.slug}`}
              className="group block rounded-lg bg-cream p-6 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <h2 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-orange transition-colors">
                {range.name}
              </h2>
              <p className="text-sm text-charcoal/70 mb-3">{range.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-navy">{range.budgetTier}</span>
                <span className="text-orange font-bold group-hover:translate-x-1 transition-transform">
                  View designs &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
