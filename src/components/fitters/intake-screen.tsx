"use client";

import { useState, useSyncExternalStore } from "react";
import { ChevronDown, Lock, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { INTAKE_FOLLOWUP_MESSAGE, INTAKE_PIN } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

/**
 * Internal call screen for the recruitment consultant. Unlisted; gated by a
 * PIN (INTAKE_PIN in constants.ts) that is remembered for the browser session.
 */

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "Free State",
  "Mpumalanga",
  "Limpopo",
  "North West",
  "Northern Cape",
  "KwaZulu-Natal",
];

const OUTCOMES = [
  { value: "interested", label: "Interested" },
  { value: "send contract", label: "Send contract" },
  { value: "follow up", label: "Follow up" },
  { value: "not interested", label: "Not interested" },
] as const;

const SCRIPT: { heading: string; lines: string[] }[] = [
  {
    heading: "Open",
    lines: [
      "Good day, am I speaking to the person who does grave work / tombstone installations?",
      "I'm calling from Pullen's Tombstones. We're a third-generation family business, going since 1982 — we've installed over 30,000 tombstones from our own factory.",
      "We're expanding beyond KwaZulu-Natal and we're looking for one established fitter in your area. You'd install our tombstones in your area — I'd love two minutes to explain how it works.",
    ],
  },
  {
    heading: "The deal (plain words)",
    lines: [
      "We deliver the tombstone and all the materials to a depot near you, or to your yard once you're accredited.",
      "You collect, install at the cemetery, and send us completion photos.",
      "We pay you a fixed fee per installation — not a percentage — within 7 days of the photos passing our quality check.",
      "Steady flow of jobs in your area as orders come in. You stay independent — your own business, your own bakkie, tools and crew.",
      "One standard: a failed installation is fixed at your cost with a warning; a second one ends it. That's how we keep the name worth working under.",
    ],
  },
  {
    heading: "Qualify (capture below while talking)",
    lines: [
      "Do you have your own bakkie? And your own tools and crew?",
      "How many years have you been doing installations or grave work?",
      "Are you installing for any other companies at the moment?",
      "Which towns / cemeteries do you normally work in?",
    ],
  },
  {
    heading: "Close",
    lines: [
      "I'm going to WhatsApp you our fitter page now so you have everything in writing.",
      "If you're keen, I'll send the agreement to read — no obligation until you sign.",
      "First job is a probation installation, paid as normal — pass the quality check and you're our accredited fitter for the area.",
    ],
  },
];

function readPinOk(): boolean {
  try {
    return sessionStorage.getItem("pullens_intake_ok") === "1";
  } catch {
    return false;
  }
}

const subscribeNoop = () => () => {};

export function IntakeScreen() {
  // Session-remembered unlock, hydration-safe (server snapshot: locked).
  const storedOk = useSyncExternalStore(subscribeNoop, readPinOk, () => false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const unlocked = storedOk || justUnlocked;
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pin === INTAKE_PIN) {
      try {
        sessionStorage.setItem("pullens_intake_ok", "1");
      } catch {
        /* session-only fallback */
      }
      setJustUnlocked(true);
    } else {
      setPinError(true);
      setPin("");
    }
  }

  if (!unlocked) {
    return (
      <Section>
        <form onSubmit={tryUnlock} className="max-w-xs mx-auto text-center pt-16 pb-24">
          <Lock className="h-5 w-5 text-gold mx-auto mb-4" aria-hidden />
          <h1 className="heading-roman text-xl text-ink mb-2">Staff only</h1>
          <p className="text-sm text-ink-muted mb-6">Enter the intake PIN to continue.</p>
          <input
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4));
              setPinError(false);
            }}
            inputMode="numeric"
            autoFocus
            aria-label="Intake PIN"
            className="w-full text-center tracking-[0.5em] text-2xl rounded-sm border border-hairline bg-cream px-4 py-3 text-ink focus:border-gold focus:outline-none"
          />
          {pinError && <p className="text-sm text-gold mt-3">Wrong PIN.</p>}
          <Button variant="cta" type="submit" className="w-full mt-5">
            Open intake
          </Button>
        </form>
      </Section>
    );
  }

  return <IntakeForm />;
}

function IntakeForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState(PROVINCES[0]);
  const [ownBakkie, setOwnBakkie] = useState<"yes" | "no">("yes");
  const [experienceYears, setExperienceYears] = useState("");
  const [installingForOthers, setInstallingForOthers] = useState<"yes" | "no">("no");
  const [outcome, setOutcome] = useState<string>("interested");
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [savedFor, setSavedFor] = useState<{ name: string; phone: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scriptOpen, setScriptOpen] = useState(true);

  function reset() {
    setName("");
    setPhone("");
    setTown("");
    setOwnBakkie("yes");
    setExperienceYears("");
    setInstallingForOthers("no");
    setOutcome("interested");
    setFollowUpDate("");
    setNotes("");
    setSavedFor(null);
    setError(null);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !phone.trim() || !town.trim()) {
      setError("Name, phone and town are needed before saving.");
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
          message: notes,
          capturedBy: "intake",
          outcome,
          followUpDate,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not save");
      setSavedFor({ name, phone });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — try again.");
    } finally {
      setBusy(false);
    }
  }

  const followUpMessage = savedFor
    ? INTAKE_FOLLOWUP_MESSAGE.replace("{name}", savedFor.name.split(" ")[0]).replace(
        "{link}",
        "https://pullenstombstones.co.za/fitters"
      )
    : "";

  return (
    <Section>
      <div className="max-w-xl">
        <p className="label-ui text-gold text-[10px] mb-3">Internal — fitter recruitment</p>
        <h1 className="heading-roman text-2xl text-ink mb-6 flex items-center gap-2">
          <Phone className="h-5 w-5 text-gold" aria-hidden /> Call screen
        </h1>

        {/* Call script */}
        <div className="card-editorial mb-8">
          <button
            type="button"
            onClick={() => setScriptOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            aria-expanded={scriptOpen}
          >
            <span className="heading-roman text-base text-ink">Call script</span>
            <ChevronDown
              className={`h-4 w-4 text-gold transition-transform ${scriptOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {scriptOpen && (
            <div className="px-5 pb-5 space-y-4">
              {SCRIPT.map((block) => (
                <div key={block.heading}>
                  <p className="label-ui text-[10px] text-gold mb-1.5">{block.heading}</p>
                  <ul className="space-y-1.5">
                    {block.lines.map((l) => (
                      <li key={l} className="text-sm text-ink-muted leading-relaxed">
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Capture form / after-save */}
        {savedFor ? (
          <div className="rounded-sm border border-hairline bg-dark text-cream p-6 space-y-4" aria-live="polite">
            <h2 className="heading-roman text-xl">Saved — {savedFor.name}</h2>
            <p className="text-sm text-cream/70 leading-relaxed">
              Send the programme page to their WhatsApp now, while you are still fresh in their
              mind.
            </p>
            <Button
              variant="whatsapp"
              href={whatsappLink(savedFor.phone, followUpMessage)}
            >
              <MessageCircle className="h-4 w-4 mr-2" aria-hidden /> WhatsApp {savedFor.name.split(" ")[0]}
            </Button>
            <button
              type="button"
              onClick={reset}
              className="block text-sm text-gold underline-offset-4 hover:underline"
            >
              Next call
            </button>
          </div>
        ) : (
          <form onSubmit={save} className="space-y-5">
            <Input label="Business / full name" value={name} onChange={setName} required />
            <Input label="Phone / WhatsApp" value={phone} onChange={setPhone} required type="tel" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Town" value={town} onChange={setTown} required />
              <label className="block">
                <span className="block text-sm text-ink mb-1">Province</span>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
                >
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Toggle label="Own bakkie?" value={ownBakkie} onChange={setOwnBakkie} />
              <Toggle
                label="Installing for others?"
                value={installingForOthers}
                onChange={setInstallingForOthers}
              />
            </div>
            <Input
              label="Years of experience"
              value={experienceYears}
              onChange={(v) => setExperienceYears(v.replace(/[^0-9]/g, "").slice(0, 2))}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm text-ink mb-1">Outcome</span>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none min-h-12"
                >
                  {OUTCOMES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <Input label="Follow-up date" value={followUpDate} onChange={setFollowUpDate} type="date" />
            </div>
            <label className="block">
              <span className="block text-sm text-ink mb-1">Call notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                rows={4}
                className="w-full rounded-sm border border-hairline bg-cream px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-gold">{error}</p>}
            <Button variant="cta" type="submit" disabled={busy} className="w-full sm:w-auto">
              {busy ? "Saving…" : "Save prospect"}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}

function Input({
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

function Toggle({
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
