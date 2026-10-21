import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RANGES, getRangeBySlug, getCatalogueItems } from "@/lib/catalogue";
import { LOCATIONS } from "@/lib/constants";
import { getPrice, fromPrice, formatZAR } from "@/lib/pricing";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductConfigurator } from "@/components/shop/product-configurator";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/components/seo/schemas";
import type { RangeSlug } from "@/types/catalogue";

export function generateStaticParams() {
  return RANGES.flatMap((r) =>
    getCatalogueItems(r.slug).map((i) => ({ slug: r.slug, code: i.code }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; code: string }>;
}): Promise<Metadata> {
  const { slug, code } = await params;
  const range = getRangeBySlug(slug as RangeSlug);
  if (!range) return {};
  const from = fromPrice(code);
  return {
    title: `${code} — ${range.name} Range Tombstone`,
    description: from
      ? `Design ${code} from the ${range.name} range, from ${formatZAR(from)} incl. VAT. Choose your covering, extras and inscription, and order online.`
      : `Design ${code} from the ${range.name} range. Ask us for a quote on WhatsApp.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; code: string }>;
}) {
  const { slug, code } = await params;
  const range = getRangeBySlug(slug as RangeSlug);
  if (!range) notFound();
  const item = getCatalogueItems(slug as RangeSlug).find((i) => i.code === code);
  if (!item) notFound();

  const row = getPrice(code);
  const hq = LOCATIONS[0];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Ranges", url: "https://pullenstombstones.co.za/ranges" },
          { name: range.name, url: `https://pullenstombstones.co.za/ranges/${range.slug}` },
          { name: code, url: `https://pullenstombstones.co.za/ranges/${range.slug}/${code}` },
        ])}
      />

      <Section>
        <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-6">
          <Link href="/ranges" className="hover:text-gold transition-colors">Ranges</Link>
          <span className="mx-2">/</span>
          <Link href={`/ranges/${range.slug}`} className="hover:text-gold transition-colors">
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
            <p className="label-ui text-gold text-[10px] mb-2">{range.name} Range</p>
            <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-2">Design {code}</h1>
            {row?.size && (
              <p className="text-sm text-ink-muted mb-6">Headstone {row.size} mm</p>
            )}

            {row ? (
              <ProductConfigurator
                code={code}
                rangeSlug={range.slug}
                rangeName={range.name}
                imagePath={item.imagePath}
                row={row}
                whatsapp={hq.whatsapp}
              />
            ) : (
              <div className="space-y-6">
                <p className="text-ink-muted leading-relaxed">
                  This design is priced on request. Send us a message and a consultant will
                  quote you for your choice of covering and extras.
                </p>
                <Button
                  variant="whatsapp"
                  href={whatsappLink(hq.whatsapp, `Hi, please quote me on design ${code} (${range.name} range)`)}
                >
                  Get a quote on WhatsApp
                </Button>
                <p className="label-ui text-[10px] text-ink-muted">
                  Three generations. One workshop. KZN since 1982.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
