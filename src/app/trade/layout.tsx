import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { getTradeSession } from "@/lib/trade-session";

export const metadata: Metadata = {
  title: { default: "Trade Portal — Pullen's Tombstones", template: "%s — Pullen's Trade" },
  robots: { index: false, follow: false },
};

export default async function TradeLayout({ children }: { children: React.ReactNode }) {
  const session = await getTradeSession();

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-dark text-cream border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          <Link href="/trade" className="min-h-10 flex flex-col justify-center">
            <span className="font-ui text-sm font-bold tracking-[0.15em] uppercase">
              Pullen&apos;s Tombstones
            </span>
            <span className="text-[9px] tracking-[0.25em] text-gold uppercase font-ui font-medium">
              Trade Portal
            </span>
          </Link>
          {session && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-cream/70 hidden sm:block">{session.parlour}</span>
              <form action="/api/trade/logout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm text-cream/80 hover:text-gold transition-colors min-h-10 px-3 rounded-sm border border-cream/15 hover:border-gold/40 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Log out
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-dark text-cream/40 text-center text-xs py-6 px-6">
        Trade prices exclude delivery and installation · Cast in Stone · Since 1982
      </footer>
    </div>
  );
}
