"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function TradeLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/trade/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, pin }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not log in");
      router.push("/trade");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in. Please try again.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="block text-sm text-ink mb-1">Account code</span>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          autoComplete="username"
          autoCapitalize="characters"
          placeholder="e.g. PAR001"
          className="w-full rounded-sm border border-hairline bg-cream px-4 py-4 text-lg tracking-widest text-ink focus:border-gold focus:outline-none min-h-14"
        />
      </label>
      <label className="block">
        <span className="block text-sm text-ink mb-1">PIN</span>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 12))}
          required
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          placeholder="•••••"
          className="w-full rounded-sm border border-hairline bg-cream px-4 py-4 text-lg tracking-[0.5em] text-ink focus:border-gold focus:outline-none min-h-14"
        />
      </label>
      {error && <p className="text-sm text-gold">{error}</p>}
      <Button variant="cta" type="submit" disabled={busy} className="w-full">
        {busy ? "Logging in…" : "Log in"}
      </Button>
      <p className="text-xs text-ink-muted">
        No account yet, or forgotten your PIN? WhatsApp your Pullen&apos;s consultant and we will
        set you up.
      </p>
    </form>
  );
}
