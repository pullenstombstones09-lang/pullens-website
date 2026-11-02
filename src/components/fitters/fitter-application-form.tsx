"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_RECRUITMENT_NUMBER } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Free State",
  "KwaZulu-Natal",
  "Mpumalanga",
  "Limpopo",
  "North West",
  "Northern Cape",
];

export function FitterApplicationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState(PROVINCES[0]);
  const [ownBakkie, setOwnBakkie] = useState<"yes" | "no">("yes");
  const [experienceYears, setExperienceYears] = useState("");
  const [installingForOthers, setInstallingForOthers] = useState<"yes" | "no">("no");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim() || !town.trim()) {
      setError("Please fill in your name, phone number and town.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/fitters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          town,
          province,
          ownBakkie: ownBakkie === "yes",
          experienceYears,
          installingForOthers: installingForOthers === "yes",
          message,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not send your application");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    const summary =
      `Hi, I applied to install tombstones for Pullen's. ` +
      `Name: ${name}. Area: ${town}, ${province}. ` +
      `Own bakkie: ${ownBakkie}. Experience: ${experienceYears || "—"} years.`;
    return (
      <div className="rounded-sm border border-hairline bg-dark text-cream p-6 space-y-4" aria-live="polite">
        <h2 className="heading-roman text-2xl">Application received</h2>
        <p className="text-sm text-cream/70 leading-relaxed">
          Thank you, {name.split(" ")[0]}. Our partner team will WhatsApp you on {phone}. Want to
          move faster? Send us your application on WhatsApp now.
        </p>
        <Button variant="whatsapp" href={whatsappLink(WHATSAPP_RECRUITMENT_NUMBER, summary)}>
          WhatsApp my application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Business or full name" value={name} onChange={setName} required />
      <Field label="Phone / WhatsApp" value={phone} onChange={setPhone} required type="tel" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Town" value={town} onChange={setTown} required />
        <label className="block">
          <span className="block text-sm text-ink mb-1">Province</span>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <YesNo label="Do you have your own bakkie?" value={ownBakkie} onChange={setOwnBakkie} />
        <YesNo
          label="Currently installing for other companies?"
          value={installingForOthers}
          onChange={setInstallingForOthers}
        />
      </div>
      <Field
        label="Years of installation experience"
        value={experienceYears}
        onChange={(v) => setExperienceYears(v.replace(/[^0-9]/g, "").slice(0, 2))}
        type="text"
      />
      <label className="block">
        <span className="block text-sm text-ink mb-1">Anything else we should know? (optional)</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 500))}
          rows={4}
          className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
        />
      </label>
      {error && <p className="text-sm text-gold">{error}</p>}
      <Button variant="cta" type="submit" disabled={busy} className="w-full sm:w-auto">
        {busy ? "Sending…" : "Apply to install for Pullen's"}
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-ink mb-1">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        type={type}
        className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
      />
    </label>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "yes" | "no";
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <fieldset>
      <legend className="block text-sm text-ink mb-1">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {(["yes", "no"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={
              "rounded-sm border px-4 py-3 min-h-12 text-sm font-medium capitalize transition-colors " +
              (value === v
                ? "border-gold bg-gold/10 text-ink"
                : "border-hairline text-ink hover:border-gold/40")
            }
          >
            {v}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
