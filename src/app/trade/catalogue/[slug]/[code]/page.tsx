import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireTradeSession } from "@/lib/trade-session";
import { getRangeBySlug, getCatalogueItems } from "@/lib/catalogue";
import {
  COVERINGS,
  availableCoverings,
  getExtras,
  getPrice,
  tradePriceFor,
} from "@/lib/pricing";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/utils";
import { LOCATIONS } from "@/lib/constants";
import {
  TradeConfigurator,
  type TradeCoveringOption,
  type TradeExtraOption,
} from "@/components/trade/trade-configurator";
import type { RangeSlug } from "@/types/catalogue";

export const metadata: Metadata = { title: "Trade design" };

export default async function TradeProductPage({
  params,
}: {
  params: Promise<{ slug: string; code: string }>;
}) {
  const session = await requireTradeSession();
  const { slug, code } = await params;
  const range = getRangeBySlug(slug as RangeSlug);
  if (!range) notFound();
  const item = getCatalogueItems(slug as RangeSlug).find((i) => i.code === code);
  if (!item) notFound();

  const row = getPrice(code);
  const hq = LOCATIONS[0];

  const coverings: TradeCoveringOption[] = row
    ? availableCoverings(row).flatMap((k) => {
        const price = tradePriceFor(row, k);
        return price
          ? [{ key: k, label: COVERINGS[k], amount: price.amount, placeholder: price.placeholder }]
          : [];
      })
    : [];

  const extrasList: TradeExtraOption[] = getExtras().map((e) => ({
    id: e.id,
    name: e.name,
    price: e.price,
  }));

  return (
    <Section>
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-6">
        <Link href="/trade/catalogue" className="hover:text-gold transition-colors">
          Trade catalogue
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/trade/catalogue/${range.slug}`} className="hover:text-gold transition-colors">
          {range.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{code}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] bg-dark rounded-sm overflow-hidden lg:sticky lg:top-24">
            <Image
              src={item.imagePath}
              alt={`Design ${code}, ${range.name} range`}
              fill
              priority
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div>
          <p className="label-ui text-gold text-[10px] mb-2">{range.name} Range · Trade</p>
          <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-2">Design {code}</h1>
          {row?.size && <p className="text-sm text-ink-muted mb-6">Headstone {row.size} mm</p>}

          {row && coverings.length > 0 ? (
            <TradeConfigurator
              code={code}
              rangeSlug={range.slug}
              rangeName={range.name}
              imagePath={item.imagePath}
              coverings={coverings}
              extrasList={extrasList}
              onAccount={session.onAccount}
            />
          ) : (
            <div className="space-y-6">
              <p className="text-ink-muted leading-relaxed">
                This design is priced on request for trade. Message us and we will quote your
                account.
              </p>
              <Button
                variant="whatsapp"
                href={whatsappLink(
                  hq.whatsapp,
                  `Hi, trade account ${session.code} — please quote design ${code} (${range.name} range)`
                )}
              >
                Get a trade quote on WhatsApp
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
