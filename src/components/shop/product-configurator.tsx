"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Lock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import {
  COVERINGS,
  SHOP_SETTINGS,
  depositAmount,
  formatZAR,
  planDeposit,
  planMonthly,
  type CoveringKey,
} from "@/lib/pricing-client";
import { whatsappLink } from "@/lib/utils";

/**
 * Public product configurator.
 *
 * Owner decision: the public site shows NO per-stone prices. The customer
 * configures the stone, then unlocks their price by leaving a name and
 * WhatsApp number — the breakdown comes from /api/quote only, so prices are
 * never rendered into the public HTML or shipped in the JS bundle.
 */

interface ExtraOption {
  id: string;
  name: string;
  poa: boolean;
}

interface Props {
  code: string;
  rangeSlug: string;
  rangeName: string;
  imagePath: string;
  coverings: CoveringKey[];
  extrasList: ExtraOption[];
  whatsapp: string;
}

interface QuoteBreakdown {
  stone: number;
  extras: { id: string; name: string; price: number }[];
  extrasTotal: number;
  total: number;
}

const MAX_INSCRIPTION = 300;
const LEAD_KEY = "pullens-lead-v1";

function readLead(): { name: string; phone: string } | null {
  try {
    const raw = window.localStorage.getItem(LEAD_KEY);
    if (!raw) return null;
    const lead = JSON.parse(raw) as { name?: string; phone?: string };
    if (lead.name && lead.phone) return { name: lead.name, phone: lead.phone };
    return null;
  } catch {
    return null;
  }
}

function rememberLead(name: string, phone: string) {
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify({ name, phone }));
  } catch {
    /* storage unavailable — the lead just re-enters details next time */
  }
}

export function ProductConfigurator({
  code,
  rangeSlug,
  rangeName,
  imagePath,
  coverings,
  extrasList,
  whatsapp,
}: Props) {
  const router = useRouter();

  const [covering, setCovering] = useState<CoveringKey>(coverings[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [inscription, setInscription] = useState("");
  const [added, setAdded] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extrasKey = useMemo(() => selectedExtras.slice().sort().join(","), [selectedExtras]);

  const fetchQuote = useCallback(
    async (leadName: string, leadPhone: string) => {
      setBusy(true);
      setError(null);
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadName,
            phone: leadPhone,
            code,
            covering,
            extras: selectedExtras.map((id) => ({ id })),
          }),
        });
        const data = (await res.json()) as { ok: boolean; error?: string } & QuoteBreakdown;
        if (!res.ok || !data.ok) throw new Error(data.error || "Could not get your price");
        setQuote({ stone: data.stone, extras: data.extras, extrasTotal: data.extrasTotal, total: data.total });
        rememberLead(leadName, leadPhone);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not get your price. Please try again.");
      } finally {
        setBusy(false);
      }
    },
    [code, covering, selectedExtras]
  );

  // A returning customer who already left their details gets their price straight away.
  useEffect(() => {
    const lead = readLead();
    if (!lead) return;
    const t = setTimeout(() => {
      setName(lead.name);
      setPhone(lead.phone);
      void fetchQuote(lead.name, lead.phone);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once unlocked, keep the breakdown in step with the configuration.
  useEffect(() => {
    if (!quote) return;
    const lead = readLead();
    if (!lead) return;
    const t = setTimeout(() => void fetchQuote(lead.name, lead.phone), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [covering, extrasKey]);

  function toggleExtra(id: string) {
    setSelectedExtras((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please give us your name and WhatsApp number to see your price.");
      return;
    }
    void fetchQuote(name.trim(), phone.trim());
  }

  function handleAdd() {
    if (!quote) return;
    addToCart({
      code,
      rangeSlug,
      rangeName,
      imagePath,
      covering,
      coveringLabel: COVERINGS[covering],
      stoneTotal: quote.stone,
      extras: quote.extras,
      extrasTotal: quote.extrasTotal,
      inscription: inscription.trim(),
      total: quote.total,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 400);
  }

  const quoteSummary = quote
    ? `Hi, I priced design ${code} (${rangeName} range) online: ${COVERINGS[covering]}${
        quote.extras.length ? ` + ${quote.extras.map((e) => e.name).join(", ")}` : ""
      } — ${formatZAR(quote.total)}. My name is ${name}.`
    : `Hi, I have a question about design ${code} (${rangeName} range)`;

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
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Extras */}
      <fieldset>
        <legend className="label-ui text-ink-muted text-[11px] mb-3">Extras (optional)</legend>
        <ul className="divide-y divide-hairline border border-hairline rounded-sm">
          {extrasList.map((e) => {
            const checked = selectedExtras.includes(e.id);
            return (
              <li key={e.id}>
                <label
                  className={
                    "flex items-center justify-between gap-3 px-4 py-3 min-h-12 " +
                    (e.poa ? "text-ink-muted" : "cursor-pointer hover:bg-gold/5")
                  }
                >
                  <span className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="accent-[#BF953F] h-4 w-4"
                      checked={checked}
                      disabled={e.poa}
                      onChange={() => toggleExtra(e.id)}
                    />
                    {e.name}
                  </span>
                  {e.poa && (
                    <span className="text-sm whitespace-nowrap">Quote on request</span>
                  )}
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

      {/* Price: locked until the customer leaves their details */}
      {!quote ? (
        <form
          onSubmit={handleUnlock}
          className="rounded-sm border border-hairline bg-dark text-cream p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-gold" aria-hidden />
            <h2 className="heading-roman text-lg">Get my price now</h2>
          </div>
          <p className="text-sm text-cream/70">
            Tell us who to send it to and your price for this exact stone appears right here —
            and we WhatsApp you the quote to keep. Valid {SHOP_SETTINGS.quoteValidityDays} days.
          </p>
          <label className="block">
            <span className="block text-sm text-cream/80 mb-1">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-sm border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none min-h-12"
            />
          </label>
          <label className="block">
            <span className="block text-sm text-cream/80 mb-1">WhatsApp number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="w-full rounded-sm border border-cream/20 bg-cream/5 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none min-h-12"
            />
          </label>
          {error && <p className="text-sm text-gold">{error}</p>}
          <Button variant="cta" type="submit" disabled={busy} className="w-full">
            {busy ? "Getting your price…" : "Get my price now"}
          </Button>
          <p className="text-xs text-cream/50">
            No spam — one of our consultants may follow up on WhatsApp to help with your quote.
          </p>
        </form>
      ) : (
        <div className="rounded-sm border border-hairline bg-dark text-cream p-5 space-y-4" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-cream/70">Stone · {COVERINGS[covering]}</span>
            <span className="text-sm">{formatZAR(quote.stone)}</span>
          </div>
          {quote.extras.map((e) => (
            <div key={e.id} className="flex items-baseline justify-between">
              <span className="text-sm text-cream/70">{e.name}</span>
              <span className="text-sm">{formatZAR(e.price)}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between border-t border-cream/10 pt-4">
            <span className="heading-roman text-lg">Total</span>
            <span className="heading-roman text-2xl text-gold">
              {busy ? "…" : formatZAR(quote.total)}
            </span>
          </div>
          <p className="text-xs text-cream/50">
            Prices include VAT. Freight: free within 50 km of our KZN branches, otherwise added
            at checkout by region. Installation quoted separately. Quote valid{" "}
            {SHOP_SETTINGS.quoteValidityDays} days.
          </p>

          <div className="grid gap-2 pt-2 text-sm">
            <PaymentLine label="Pay in full" amount={formatZAR(quote.total)} note="now" />
            <PaymentLine
              label={`${SHOP_SETTINGS.depositPct}% deposit`}
              amount={formatZAR(depositAmount(quote.total))}
              note="now, balance before collection"
            />
            {SHOP_SETTINGS.planMonthsOptions.map((m) => (
              <PaymentLine
                key={m}
                label={`Payment plan · ${m} months`}
                amount={formatZAR(planDeposit(quote.total))}
                note={`now, then ${formatZAR(planMonthly(quote.total, m))} × ${m}`}
              />
            ))}
          </div>
          <p className="text-xs text-cream/50">
            Your stone goes into production once {SHOP_SETTINGS.productionAtPct}% is paid.
          </p>
          {error && <p className="text-sm text-gold">{error}</p>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {quote && (
          <Button variant="cta" onClick={handleAdd} className="flex-1" disabled={busy}>
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? "Added" : "Add to cart"}
          </Button>
        )}
        <Button variant="whatsapp" href={whatsappLink(whatsapp, quoteSummary)} className="flex-1">
          {quote ? "Send my quote on WhatsApp" : "Ask on WhatsApp"}
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
