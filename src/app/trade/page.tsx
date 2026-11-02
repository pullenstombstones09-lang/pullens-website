import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { requireTradeSession } from "@/lib/trade-session";
import { RANGES } from "@/lib/catalogue";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Dashboard" };

export default async function TradeDashboard() {
  const session = await requireTradeSession();

  return (
    <Section>
      <p className="label-ui text-gold text-[10px] mb-2">Trade account {session.code}</p>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-3">
        Welcome, {session.parlour}
      </h1>
      <p className="text-ink-muted max-w-2xl mb-10">
        Prices shown in the trade catalogue are your trade prices and exclude delivery and
        installation.{" "}
        {session.onAccount
          ? "Your orders are placed on account — the invoice follows on your statement."
          : "Orders are confirmed with a 50% EFT deposit using your order number as reference."}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mb-12">
        <Link
          href="/trade/catalogue"
          className="card-editorial block p-6 group"
        >
          <ShoppingBag className="h-5 w-5 text-gold mb-3" aria-hidden />
          <h2 className="heading-roman text-xl text-ink mb-1">Trade catalogue</h2>
          <p className="text-sm text-ink-muted">
            Every design at your trade price — configure, add to cart and order.
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-gold mt-3">
            Browse <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
        <Link href="/trade/checkout" className="card-editorial block p-6 group">
          <ArrowRight className="h-5 w-5 text-gold mb-3" aria-hidden />
          <h2 className="heading-roman text-xl text-ink mb-1">Your cart</h2>
          <p className="text-sm text-ink-muted">
            Review the stones in your cart and place the order.
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-gold mt-3">
            Checkout <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </div>

      <h2 className="label-ui text-ink-muted text-[11px] mb-4">Ranges</h2>
      <ul className="flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/trade/catalogue/${r.slug}`}
              className="inline-block rounded-sm border border-hairline px-4 py-2 text-sm text-ink hover:border-gold/40 hover:text-gold transition-colors min-h-10"
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
