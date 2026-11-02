import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { requireTradeSession } from "@/lib/trade-session";
import { RANGES, getCatalogueItems } from "@/lib/catalogue";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Trade catalogue" };

export default async function TradeCataloguePage() {
  await requireTradeSession();

  return (
    <Section>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-8">Trade catalogue</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RANGES.map((range) => {
          const first = getCatalogueItems(range.slug)[0];
          return (
            <Link
              key={range.slug}
              href={`/trade/catalogue/${range.slug}`}
              className="card-editorial block group"
            >
              {first && (
                <div className="relative aspect-[4/3] bg-dark overflow-hidden">
                  <Image
                    src={first.imagePath}
                    alt={`${range.name} range`}
                    fill
                    loading="lazy"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="px-4 py-4">
                <h2 className="heading-roman text-lg text-ink gold-underline-hover">
                  {range.name}
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  {getCatalogueItems(range.slug).length} designs
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
