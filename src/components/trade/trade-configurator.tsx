"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { formatZAR, type CoveringKey } from "@/lib/pricing-client";
import { SamplePricingBadge } from "@/components/trade/sample-pricing-badge";

/**
 * Trade configurator — full prices visible (behind the PIN login).
 * Prices arrive as props from the server page; placeholder trade prices
 * carry the amber "sample trade pricing" badge.
 */

export interface TradeCoveringOption {
  key: CoveringKey;
  label: string;
  amount: number;
  placeholder: boolean;
}

export interface TradeExtraOption {
  id: string;
  name: string;
  price: number | null; // null = quoted on request
}

interface Props {
  code: string;
  rangeSlug: string;
  rangeName: string;
  imagePath: string;
  coverings: TradeCoveringOption[];
  extrasList: TradeExtraOption[];
  onAccount: boolean;
}

const MAX_INSCRIPTION = 300;

export function TradeConfigurator({
  code,
  rangeSlug,
  rangeName,
  imagePath,
  coverings,
  extrasList,
  onAccount,
}: Props) {
  const router = useRouter();
  const [coveringKey, setCoveringKey] = useState<CoveringKey>(coverings[0].key);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [inscription, setInscription] = useState("");
  const [added, setAdded] = useState(false);

  const covering = useMemo(
    () => coverings.find((c) => c.key === coveringKey) ?? coverings[0],
    [coverings, coveringKey]
  );
  const chosenExtras = extrasList.filter((e) => selectedExtras.includes(e.id) && e.price !== null);
  const extrasTotal = chosenExtras.reduce((s, e) => s + (e.price ?? 0), 0);
  const total = covering.amount + extrasTotal;

  function toggleExtra(id: string) {
    setSelectedExtras((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  }

  function handleAdd() {
    addToCart({
      code,
      rangeSlug,
      rangeName,
      imagePath,
      covering: covering.key,
      coveringLabel: covering.label,
      stoneTotal: covering.amount,
      extras: chosenExtras.map((e) => ({ id: e.id, name: e.name, price: e.price ?? 0 })),
      extrasTotal,
      inscription: inscription.trim(),
      total,
    });
    setAdded(true);
    setTimeout(() => router.push("/trade/checkout"), 400);
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="label-ui text-ink-muted text-[11px] mb-3">Covering</legend>
        <div className="grid grid-cols-2 gap-2">
          {coverings.map((c) => {
            const active = c.key === coveringKey;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setCoveringKey(c.key)}
                className={
                  "text-left rounded-sm border px-4 py-3 min-h-12 transition-colors " +
                  (active ? "border-gold bg-gold/10" : "border-hairline hover:border-gold/40")
                }
                aria-pressed={active}
              >
                <span className="block text-sm font-medium text-ink">{c.label}</span>
                <span className="block text-sm text-ink-muted">{formatZAR(c.amount)}</span>
                {c.placeholder && <SamplePricingBadge />}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-ui text-ink-muted text-[11px] mb-3">
          Extras (standard prices)
        </legend>
        <ul className="divide-y divide-hairline border border-hairline rounded-sm">
          {extrasList.map((e) => {
            const poa = e.price === null;
            const checked = selectedExtras.includes(e.id);
            return (
              <li key={e.id}>
                <label
                  className={
                    "flex items-center justify-between gap-3 px-4 py-3 min-h-12 " +
                    (poa ? "text-ink-muted" : "cursor-pointer hover:bg-gold/5")
                  }
                >
                  <span className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="accent-[#BF953F] h-4 w-4"
                      checked={checked}
                      disabled={poa}
                      onChange={() => toggleExtra(e.id)}
                    />
                    {e.name}
                  </span>
                  <span className="text-sm whitespace-nowrap">
                    {poa ? "Quote on request" : formatZAR(e.price as number)}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div>
        <label htmlFor="inscription" className="label-ui text-ink-muted text-[11px] mb-3 block">
          Inscription (optional now)
        </label>
        <textarea
          id="inscription"
          value={inscription}
          maxLength={MAX_INSCRIPTION}
          onChange={(e) => setInscription(e.target.value)}
          rows={5}
          placeholder={"In Loving Memory of\nName Surname\nBorn – Died\nA short verse"}
          className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
        <p className="mt-2 text-xs text-ink-muted">
          {inscription.length}/{MAX_INSCRIPTION}. A proof of the exact wording and layout goes to
          you for approval before any cutting starts. Leave blank to send wording later.
        </p>
      </div>

      <div className="rounded-sm border border-hairline bg-dark text-cream p-5 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-cream/70">Stone · {covering.label}</span>
          <span className="text-sm">{formatZAR(covering.amount)}</span>
        </div>
        {extrasTotal > 0 && (
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-cream/70">Extras</span>
            <span className="text-sm">{formatZAR(extrasTotal)}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t border-cream/10 pt-4">
          <span className="heading-roman text-lg">Trade total</span>
          <span className="heading-roman text-2xl text-gold">{formatZAR(total)}</span>
        </div>
        {covering.placeholder && <SamplePricingBadge />}
        <p className="text-xs text-cream/50">
          Trade prices include VAT and exclude delivery and installation.{" "}
          {onAccount
            ? "This order goes on your account — invoice to follow."
            : "Confirmed with a 50% EFT deposit."}
        </p>
      </div>

      <Button variant="cta" onClick={handleAdd} className="w-full">
        {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
        {added ? "Added" : "Add to order"}
      </Button>
    </div>
  );
}
