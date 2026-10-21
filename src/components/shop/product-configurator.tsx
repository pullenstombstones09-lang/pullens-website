"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import {
  COVERINGS,
  SHOP_SETTINGS,
  availableCoverings,
  depositAmount,
  formatZAR,
  getExtras,
  planDeposit,
  planMonthly,
  type CoveringKey,
  type PriceRow,
} from "@/lib/pricing";
import { whatsappLink } from "@/lib/utils";

interface Props {
  code: string;
  rangeSlug: string;
  rangeName: string;
  imagePath: string;
  row: PriceRow;
  whatsapp: string;
}

const MAX_INSCRIPTION = 300;

export function ProductConfigurator({
  code,
  rangeSlug,
  rangeName,
  imagePath,
  row,
  whatsapp,
}: Props) {
  const router = useRouter();
  const coverings = availableCoverings(row);
  const extras = useMemo(() => getExtras(), []);

  const [covering, setCovering] = useState<CoveringKey>(coverings[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [inscription, setInscription] = useState("");
  const [added, setAdded] = useState(false);

  const stoneTotal = row[covering] as number;
  const chosenExtras = extras.filter(
    (e) => selectedExtras.includes(e.id) && e.price !== null
  );
  const extrasTotal = chosenExtras.reduce((s, e) => s + (e.price ?? 0), 0);
  const total = stoneTotal + extrasTotal;

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
      covering,
      coveringLabel: COVERINGS[covering],
      stoneTotal,
      extras: chosenExtras.map((e) => ({ id: e.id, name: e.name, price: e.price ?? 0 })),
      extrasTotal,
      inscription: inscription.trim(),
      total,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 400);
  }

  return (
    <div className="space-y-8">
      {/* Covering */}
      <fieldset>
        <legend className="label-ui text-ink-muted text-[11px] mb-3">Covering</legend>
        <div className="grid grid-cols-2 gap-2">
          {coverings.map((k) => {
            const active = k === covering;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setCovering(k)}
                className={
                  "text-left rounded-sm border px-4 py-3 min-h-12 transition-colors " +
                  (active
                    ? "border-gold bg-gold/10"
                    : "border-hairline hover:border-gold/40")
                }
                aria-pressed={active}
              >
                <span className="block text-sm font-medium text-ink">{COVERINGS[k]}</span>
                <span className="block text-sm text-ink-muted">
                  {formatZAR(row[k] as number)}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Extras */}
      <fieldset>
        <legend className="label-ui text-ink-muted text-[11px] mb-3">Extras (optional)</legend>
        <ul className="divide-y divide-hairline border border-hairline rounded-sm">
          {extras.map((e) => {
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

      {/* Inscription */}
      <div>
        <label htmlFor="inscription" className="label-ui text-ink-muted text-[11px] mb-3 block">
          Inscription
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
          {inscription.length}/{MAX_INSCRIPTION}. You can change this later — we send you a proof
          of the exact wording and layout to approve before any cutting starts.
        </p>
      </div>

      {/* Totals + payment */}
      <div className="rounded-sm border border-hairline bg-dark text-cream p-5 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-cream/70">Stone · {COVERINGS[covering]}</span>
          <span className="text-sm">{formatZAR(stoneTotal)}</span>
        </div>
        {extrasTotal > 0 && (
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-cream/70">Extras</span>
            <span className="text-sm">{formatZAR(extrasTotal)}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t border-cream/10 pt-4">
          <span className="heading-roman text-lg">Total</span>
          <span className="heading-roman text-2xl text-gold">{formatZAR(total)}</span>
        </div>
        <p className="text-xs text-cream/50">Prices include VAT. Delivery and installation quoted separately.</p>

        <div className="grid gap-2 pt-2 text-sm">
          <PaymentLine label="Pay in full" amount={formatZAR(total)} note="now" />
          <PaymentLine
            label={`${SHOP_SETTINGS.depositPct}% deposit`}
            amount={formatZAR(depositAmount(total))}
            note="now, balance before collection"
          />
          {SHOP_SETTINGS.planMonthsOptions.map((m) => (
            <PaymentLine
              key={m}
              label={`Payment plan · ${m} months`}
              amount={formatZAR(planDeposit(total))}
              note={`now, then ${formatZAR(planMonthly(total, m))} × ${m}`}
            />
          ))}
        </div>
        <p className="text-xs text-cream/50">
          Your stone goes into production once {SHOP_SETTINGS.productionAtPct}% is paid.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="cta" onClick={handleAdd} className="flex-1">
          {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          {added ? "Added" : "Add to cart"}
        </Button>
        <Button
          variant="whatsapp"
          href={whatsappLink(whatsapp, `Hi, I have a question about design ${code} (${rangeName} range)`)}
          className="flex-1"
        >
          Ask on WhatsApp
        </Button>
      </div>

      <p className="label-ui text-[10px] text-ink-muted text-center">
        Three generations. One workshop. KZN since 1982.
      </p>
    </div>
  );
}

function PaymentLine({ label, amount, note }: { label: string; amount: string; note: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-sm bg-cream/5 px-3 py-2">
      <span className="text-cream/80">{label}</span>
      <span className="text-right">
        <span className="text-gold">{amount}</span>
        <span className="block text-xs text-cream/50">{note}</span>
      </span>
    </div>
  );
}
