import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTradeSession } from "@/lib/trade-session";
import { Section } from "@/components/ui/section";
import { TradeLoginForm } from "@/components/trade/trade-login-form";

export const metadata: Metadata = { title: "Log in" };

export default async function TradeLoginPage() {
  const session = await getTradeSession();
  if (session) redirect("/trade");

  return (
    <Section>
      <div className="max-w-md mx-auto">
        <p className="label-ui text-gold text-[10px] mb-2">For funeral parlours</p>
        <h1 className="heading-roman text-3xl text-ink mb-3">Trade log in</h1>
        <p className="text-sm text-ink-muted mb-8">
          Order tombstones and blank stones at your trade prices, straight into our production
          line. Log in with the account code and PIN from your Pullen&apos;s consultant.
        </p>
        <TradeLoginForm />
      </div>
    </Section>
  );
}
