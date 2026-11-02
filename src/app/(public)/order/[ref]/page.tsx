import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/constants";
import { formatZAR } from "@/lib/pricing";
import { whatsappLink } from "@/lib/utils";
import { DEPOT_COLLECTION_NOTE, getFreightRegion } from "@/lib/freight";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ ref: string }>;
  searchParams: Promise<{ due?: string; region?: string; freight?: string }>;
}) {
  const { ref } = await params;
  const { due, region: regionId, freight } = await searchParams;
  const dueNow = due && !Number.isNaN(Number(due)) ? Number(due) : null;
  const region = getFreightRegion(regionId);
  const freightTotal = freight === "quote" ? null : freight && !Number.isNaN(Number(freight)) ? Number(freight) : null;
  const hq = LOCATIONS[0];
  const safeRef = ref.replace(/[^A-Z0-9-]/gi, "").toUpperCase();

  return (
    <Section>
      <div className="max-w-2xl">
        <p className="label-ui text-gold text-[10px] mb-3">Order received</p>
        <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-4">
          Thank you. Your order number is {safeRef}.
        </h1>
        <p className="text-ink-muted leading-relaxed mb-8">
          A consultant will confirm your order on WhatsApp within one working day. Keep this
          number — you will use it as your payment reference and to follow your stone through
          production.
        </p>

        <div className="rounded-sm border border-hairline bg-dark text-cream p-5 space-y-3 mb-8">
          {dueNow !== null && (
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-cream/70">Due now</span>
              <span className="heading-roman text-2xl text-gold">{formatZAR(dueNow)}</span>
            </div>
          )}
          {region && (
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-cream/70">Freight · {region.label.split(" — ")[0]}</span>
              <span className="text-sm">
                {freightTotal === null ? "to be quoted" : freightTotal === 0 ? "free" : formatZAR(freightTotal)}
              </span>
            </div>
          )}
          <p className="text-sm text-cream/70">
            Banking details and the pay-online link will be sent to you on WhatsApp. Please use{" "}
            <span className="text-cream">{safeRef}</span> as your reference.
          </p>
        </div>

        {region && (
          <div className="rounded-sm border border-hairline p-5 mb-8 text-sm space-y-1">
            <p className="label-ui text-[10px] text-ink-muted mb-2">Collection</p>
            <p className="text-ink">{region.collection}.</p>
            {region.id !== "kzn" && region.id !== "other" && (
              <p className="text-ink-muted">{DEPOT_COLLECTION_NOTE}</p>
            )}
            {region.note && <p className="text-ink-muted">{region.note}.</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="whatsapp"
            href={whatsappLink(hq.whatsapp, `Hi, I've placed order ${safeRef}`)}
          >
            Message us about this order
          </Button>
          <Button variant="secondary" href="/ranges">Back to the ranges</Button>
        </div>

        <p className="label-ui text-[10px] text-ink-muted mt-10">
          Three generations. One workshop. KZN since 1982.
        </p>
      </div>
    </Section>
  );
}
