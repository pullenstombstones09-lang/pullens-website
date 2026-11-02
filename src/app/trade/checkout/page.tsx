import type { Metadata } from "next";
import { requireTradeSession } from "@/lib/trade-session";
import { TradeCheckoutForm } from "@/components/trade/trade-checkout-form";

export const metadata: Metadata = { title: "Place your order" };

export default async function TradeCheckoutPage() {
  const session = await requireTradeSession();
  return <TradeCheckoutForm parlour={session.parlour} onAccount={session.onAccount} />;
}
