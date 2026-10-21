"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { removeFromCart, useCart } from "@/lib/cart";
import { depositAmount, formatZAR } from "@/lib/pricing";

export function CartView() {
  const { items, total, count } = useCart();

  return (
    <Section>
      <h1 className="heading-roman text-3xl sm:text-4xl text-ink mb-8">Your cart</h1>

      {count === 0 ? (
        <div className="space-y-6">
          <p className="text-ink-muted">Your cart is empty.</p>
          <Button variant="cta" href="/ranges">Browse the ranges</Button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="card-editorial flex gap-4 p-4">
                <div className="relative h-24 w-32 shrink-0 bg-dark rounded-sm overflow-hidden">
                  <Image src={item.imagePath} alt={`Design ${item.code}`} fill className="object-contain p-2" sizes="128px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/ranges/${item.rangeSlug}/${item.code}`} className="heading-roman text-lg text-ink gold-underline-hover">
                        Design {item.code}
                      </Link>
                      <p className="text-sm text-ink-muted">{item.rangeName} · {item.coveringLabel}</p>
                    </div>
                    <span className="heading-roman text-lg text-ink whitespace-nowrap">{formatZAR(item.total)}</span>
                  </div>
                  {item.extras.length > 0 && (
                    <p className="mt-2 text-xs text-ink-muted">
                      Extras: {item.extras.map((e) => e.name).join(", ")}
                    </p>
                  )}
                  {item.inscription && (
                    <p className="mt-2 text-xs text-ink-muted whitespace-pre-line line-clamp-3">
                      {item.inscription}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-ink-muted hover:text-gold min-h-8"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="rounded-sm border border-hairline bg-dark text-cream p-5 h-fit space-y-4 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-cream/70">{count} {count === 1 ? "item" : "items"}</span>
              <span className="heading-roman text-2xl text-gold">{formatZAR(total)}</span>
            </div>
            <p className="text-xs text-cream/50">
              Deposit from {formatZAR(depositAmount(total))}. Prices include VAT; delivery and installation quoted separately.
            </p>
            <Button variant="cta" href="/checkout" className="w-full">Checkout</Button>
            <Link href="/ranges" className="block text-center text-xs text-cream/60 hover:text-cream">
              Keep browsing
            </Link>
          </aside>
        </div>
      )}
    </Section>
  );
}
