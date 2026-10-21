"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { clearCart, getReferral, rememberReferral, useCart } from "@/lib/cart";
import {
  SHOP_SETTINGS,
  depositAmount,
  formatZAR,
  planDeposit,
  planMonthly,
} from "@/lib/pricing";

const BRANCHES = ["Pietermaritzburg", "Pinetown / Westmead", "Church Street", "Ladysmith"];

type PaymentMode = "full" | "deposit" | "plan3" | "plan6";

export function CheckoutForm() {
  const router = useRouter();
  const { items, total, count } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cemetery, setCemetery] = useState("");
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [mode, setMode] = useState<PaymentMode>("deposit");
  const [referral, setReferral] = useState(() => {
    if (typeof window === "undefined") return "";
    const fromUrl = new URLSearchParams(window.location.search).get("ref");
    if (fromUrl) rememberReferral(fromUrl);
    return getReferral();
  });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dueNow =
    mode === "full" ? total : mode === "deposit" ? depositAmount(total) : planDeposit(total);
  const planMonths = mode === "plan3" ? 3 : mode === "plan6" ? 6 : null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim()) {
      setError("Please give us your name and a phone number we can WhatsApp.");
      return;
    }
    if (!consent) {
      setError("Please accept the conditions of sale to continue.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, phone, email, cemetery, branch },
          paymentMode: mode === "full" ? "full" : mode === "deposit" ? "deposit" : "payment_plan",
          planMonths,
          referral: referral.trim() || null,
          items,
        }),
      });
      const data = (await res.json()) as { ok: boolean; ref?: string; error?: string };
      if (!res.ok || !data.ok || !data.ref) throw new Error(data.error || "Could not place order");
      clearCart();
      router.push(`/order/${data.ref}?due=${dueNow}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (count === 0) {
    return (
      <Section>
        <h1 className="heading-roman text-3xl text-ink mb-6">Checkout</h1>
        <p className="text-ink-muted mb-6">Your cart is empty.</p>
        <Button variant="cta" href="/ranges">Browse the ranges</Button>
      </Section>
    );
  }

  return (
    <Section>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="label-ui text-ink-muted text-[11px] mb-2">Your details</legend>
            <Field label="Full name" value={name} onChange={setName} required />
            <Field label="Phone (WhatsApp)" value={phone} onChange={setPhone} required type="tel" />
            <Field label="Email (optional)" value={email} onChange={setEmail} type="email" />
            <Field label="Cemetery / town" value={cemetery} onChange={setCemetery} />
            <label className="block">
              <span className="block text-sm text-ink mb-1">Nearest branch</span>
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
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="label-ui text-ink-muted text-[11px] mb-2">How would you like to pay?</legend>
            <PayOption
              id="full" current={mode} onPick={setMode}
              label="Pay in full" detail={`${formatZAR(total)} now`}
            />
            <PayOption
              id="deposit" current={mode} onPick={setMode}
              label={`${SHOP_SETTINGS.depositPct}% deposit`}
              detail={`${formatZAR(depositAmount(total))} now, balance before collection`}
            />
            <PayOption
              id="plan3" current={mode} onPick={setMode}
              label="Payment plan · 3 months"
              detail={`${formatZAR(planDeposit(total))} now, then ${formatZAR(planMonthly(total, 3))} × 3`}
            />
            <PayOption
              id="plan6" current={mode} onPick={setMode}
              label="Payment plan · 6 months"
              detail={`${formatZAR(planDeposit(total))} now, then ${formatZAR(planMonthly(total, 6))} × 6`}
            />
            <p className="text-xs text-ink-muted pt-1">
              Your stone goes into production once {SHOP_SETTINGS.productionAtPct}% is paid.
            </p>
          </fieldset>

          <Field label="Referral code (optional)" value={referral} onChange={(v) => setReferral(v.toUpperCase())} />

          <label className="flex items-start gap-3 text-sm text-ink">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="accent-[#BF953F] mt-1 h-4 w-4" />
            <span>
              I accept the conditions of sale. Inscription wording is confirmed by proof before cutting; natural granite varies in colour and grain; delivery and installation are quoted separately.
            </span>
          </label>

          {error && <p className="text-sm text-gold">{error}</p>}
        </div>

        <aside className="rounded-sm border border-hairline bg-dark text-cream p-5 h-fit space-y-4 lg:sticky lg:top-24">
          <ul className="space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="text-cream/80">{i.code} · {i.coveringLabel}</span>
                <span>{formatZAR(i.total)}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-baseline justify-between border-t border-cream/10 pt-4">
            <span className="text-sm text-cream/70">Order total</span>
            <span className="heading-roman text-xl">{formatZAR(total)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-cream/70">Due now</span>
            <span className="heading-roman text-2xl text-gold">{formatZAR(dueNow)}</span>
          </div>
          <Button variant="cta" type="submit" disabled={busy} className="w-full">
            {busy ? "Placing order…" : "Place order"}
          </Button>
          <p className="text-xs text-cream/50">
            No card details are taken here. We confirm your order on WhatsApp with banking details and a secure pay-online link.
          </p>
        </aside>
      </form>
    </Section>
  );
}

function Field({
  label, value, onChange, required, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="block text-sm text-ink mb-1">{label}{required && <span className="text-gold"> *</span>}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
      />
    </label>
  );
}

function PayOption({
  id, current, onPick, label, detail,
}: { id: PaymentMode; current: PaymentMode; onPick: (m: PaymentMode) => void; label: string; detail: string }) {
  const active = id === current;
  return (
    <label
      className={
        "flex items-center gap-3 rounded-sm border px-4 py-3 min-h-12 cursor-pointer transition-colors " +
        (active ? "border-gold bg-gold/10" : "border-hairline hover:border-gold/40")
      }
    >
      <input type="radio" name="pay" checked={active} onChange={() => onPick(id)} className="accent-[#BF953F] h-4 w-4" />
      <span className="flex-1">
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="block text-xs text-ink-muted">{detail}</span>
      </span>
    </label>
  );
}
