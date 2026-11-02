import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireTradeSession } from "@/lib/trade-session";
import { getRangeBySlug, getCatalogueItems } from "@/lib/catalogue";
import { formatZAR, tradeFromPrice } from "@/lib/pricing";
import { Section } from "@/components/ui/section";
import { SamplePricingBadge } from "@/components/trade/sample-pricing-badge";
import type { RangeSlug } from "@/types/catalogue";

export const metadata: Metadata = { title: "Trade catalogue" };

export default async function TradeRangePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireTradeSession();
  const { slug } = await params;
  const range = getRangeBySlug(slug as RangeSlug);
  if (!range) notFound();
  const items = getCatalogueItems(slug as RangeSlug);

  return (
    <Section>
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-6">
        <Link href="/trade/catalogue" className="hover:text-gold transition-colors">
          Trade catalogue
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{range.name}</span>
      </nav>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-8">
        {range.name} Range — trade prices
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const from = tradeFromPrice(item.code);
          return (
            <Link
              key={item.code}
              href={`/trade/catalogue/${item.range}/${item.code}`}
              className="group card-editorial block"
            >
              <div className="relative aspect-[4/3] bg-dark overflow-hidden">
                <Image
                  src={item.imagePath}
                  alt={`Design ${item.code}`}
                  fill
                  loading="lazy"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="px-3 py-3 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="heading-roman text-sm text-ink gold-underline-hover">
                    {item.code}
                  </span>
                  <span className="text-xs text-ink whitespace-nowrap">
                    {from ? `From ${formatZAR(from.amount)}` : "On request"}
                  </span>
                </div>
                {from?.placeholder && <SamplePricingBadge />}
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
