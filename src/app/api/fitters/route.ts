import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Fitter (installation partner) applications. Stored in the existing
 * pp_partners table via the service key when configured; the application
 * always succeeds for the applicant — storage is best-effort and the
 * WhatsApp hand-off is the fallback channel.
 */

interface Payload {
  name: string;
  phone: string;
  town: string;
  province: string;
  ownBakkie: boolean;
  experienceYears: string;
  installingForOthers: boolean;
  message?: string;
  /** Set by the internal intake screen (/fitters/intake) only. */
  capturedBy?: string;
  outcome?: string;
  followUpDate?: string;
}

function clean(s: unknown, max = 200): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = clean(body.name, 140);
  const phone = clean(body.phone, 30);
  const town = clean(body.town, 80);
  const province = clean(body.province, 40);
  if (!name || !phone || !town || !province) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, phone, town and province" },
      { status: 400 }
    );
  }

  const capturedBy = clean(body.capturedBy, 20);
  const outcome = clean(body.outcome, 30);
  const followUpDate = clean(body.followUpDate, 20);

  const notes = [
    capturedBy === "intake" ? `Captured by consultant (intake call)` : `Applied via website`,
    outcome ? `Outcome: ${outcome}` : "",
    followUpDate ? `Follow up: ${followUpDate}` : "",
    `Own bakkie: ${body.ownBakkie ? "yes" : "no"}`,
    `Experience: ${clean(body.experienceYears, 20) || "not given"} years`,
    `Installing for other companies: ${body.installingForOthers ? "yes" : "no"}`,
    clean(body.message, 500),
  ]
    .filter(Boolean)
    .join(" · ");

  let stored = false;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (url && key) {
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/pp_partners`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          phone,
          area: `${town}, ${province}`,
          status: outcome === "send contract" ? "contract_sent" : "applied",
          notes,
        }),
      });
      stored = res.ok;
      if (!res.ok) console.error("pp_partners insert failed", res.status, await res.text());
    } catch (err) {
      console.error("pp_partners insert error", err);
    }
  }

  return NextResponse.json({ ok: true, stored });
}
