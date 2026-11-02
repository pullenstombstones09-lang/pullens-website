"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { clearCart, removeFromCart, useCart } from "@/lib/cart";
import { depositAmount, formatZAR } from "@/lib/pricing-client";
import { FREIGHT_REGIONS, type FreightRegionId } from "@/lib/freight";

const BRANCHES = ["Pietermaritzburg", "Pinetown / Westmead", "Church Street", "Ladysmith"];

interface Props {
  parlour: string;
  onAccount: boolean;
}

export function TradeCheckoutForm({ parlour, onAccount }: Props) {
  const router = useRouter();
  const { items, total: stoneTotal, count } = useCart();

  const [fulfilment, setFulfilment] = useState<"branch" | "freight">("branch");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [region, setRegion] = useState<FreightRegionId | "">("");
  const [tradeReference, setTradeReference] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (fulfilment === "freight" && !region) {
      setError("Please choose the freight region.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: parlour, phone: "", branch: fulfilment === "branch" ? branch : "" },
          branchCollect: fulfilment === "branch",
          freightRegion: fulfilment === "freight" ? region : null,
          tradeReference: tradeReference.trim() || null,
          paymentMode: "deposit",
          planMonths: null,
          referral: null,
          items,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean; ref?: string; error?: string; dueNow?: number; freightRegion?: string; freightTotal?: number | null;
      };
      if (!res.ok || !data.ok || !data.ref) throw new Error(data.error || "Could not place the order");
      clearCart();
      const q = new URLSearchParams({ due: String(data.dueNow ?? 0) });
      if (fulfilment === "freight" && data.freightRegion) {
        q.set("region", data.freightRegion);
        q.set(
          "freight",
          data.freightTotal === null || data.freightTotal === undefined ? "quote" : String(data.freightTotal)
        );
      }
      router.push(`/order/${data.ref}?${q.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (count === 0) {
    return (
      <Section>
        <h1 className="heading-roman text-3xl text-ink mb-6">Your order</h1>
        <p className="text-ink-muted mb-6">Nothing in your cart yet.</p>
        <Button variant="cta" href="/trade/catalogue">Browse the trade catalogue</Button>
      </Section>
    );
  }

  return (
    <Section>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-8">Place your order</h1>
      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <fieldset className="space-y-3">
            <legend className="label-ui text-ink-muted text-[11px] mb-2">Reference</legend>
            <label className="block">
              <span className="block text-sm text-ink mb-1">
                Family / deceased reference (shows on your invoice)
              </span>
              <input
                value={tradeReference}
                onChange={(e) => setTradeReference(e.target.value)}
                placeholder="e.g. Dlamini funeral, 14 Dec unveiling"
                className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
              />
            </label>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="label-ui text-ink-muted text-[11px] mb-2">Collection</legend>
            <div className="grid grid-cols-2 gap-2">
              <FulfilmentOption
                active={fulfilment === "branch"}
                onPick={() => setFulfilment("branch")}
                label="Collect from a branch"
              />
              <FulfilmentOption
                active={fulfilment === "freight"}
                onPick={() => setFulfilment("freight")}
                label="Freight to a depot"
              />
            </div>
            {fulfilment === "branch" ? (
              <label className="block">
                <span className="block text-sm text-ink mb-1">Branch</span>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="block">
                <span className="block text-sm text-ink mb-1">Freight region</span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as FreightRegionId | "")}
                  className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
                >
                  <option value="">Choose a region</option>
                  {FREIGHT_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </label>
            )}
          </fieldset>

          <div className="rounded-sm border border-hairline px-4 py-3 text-sm text-ink-muted">
            {onAccount
              ? "This order is placed on your account — the invoice follows on your statement within 24 hours."
              : "This order is confirmed with a 50% EFT deposit. Banking details follow on WhatsApp with your order number as reference."}
          </div>

          {error && <p className="text-sm text-gold">{error}</p>}
          <Button variant="cta" type="submit" disabled={busy} className="w-full sm:w-auto">
            {busy ? "Placing order…" : onAccount ? "Place order on account" : "Place order"}
          </Button>
        </div>

        <aside className="space-y-3">
          <h2 className="label-ui text-ink-muted text-[11px]">Your order · {parlour}</h2>
          <ul className="divide-y divide-hairline border border-hairline rounded-sm">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 p-3">
                <div className="relative h-16 w-20 bg-dark rounded-sm overflow-hidden shrink-0">
                  <Image src={item.imagePath} alt={item.code} fill className="object-contain p-1" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink font-medium">
                    {item.code} · {item.coveringLabel}
                  </p>
                  {item.extras.length > 0 && (
                    <p className="text-xs text-ink-muted truncate">
                      {item.extras.map((e) => e.name).join(", ")}
                    </p>
                  )}
                  <p className="text-sm text-ink mt-1">{formatZAR(item.total)}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.code}`}
                  onClick={() => removeFromCart(item.id)}
                  className="text-ink-muted hover:text-gold transition-colors min-h-10 min-w-10 flex items-center justify-center cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <div className="rounded-sm border border-hairline bg-dark text-cream p-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-cream/70">Stones &amp; extras</span>
              <span className="text-sm">{formatZAR(stoneTotal)}</span>
            </div>
            <p className="text-xs text-cream/50">
              Freight (if chosen) is added by region and shown on your confirmation.
            </p>
            {!onAccount && (
              <div className="flex items-baseline justify-between border-t border-cream/10 pt-2">
                <span className="text-sm text-cream/70">50% deposit on stones</span>
                <span className="heading-roman text-xl text-gold">{formatZAR(depositAmount(stoneTotal))}</span>
              </div>
            )}
          </div>
        </aside>
      </form>
    </Section>
  );
}

function FulfilmentOption({
  active,
  onPick,
  label,
}: {
  active: boolean;
  onPick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={active}
      className={
        "text-left rounded-sm border px-4 py-3 min-h-12 text-sm font-medium transition-colors " +
        (active ? "border-gold bg-gold/10 text-ink" : "border-hairline text-ink hover:border-gold/40")
      }
    >
      {label}
    </button>
  );
}
