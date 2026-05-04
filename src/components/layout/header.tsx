"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/ranges", label: "Ranges" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/specials", label: "Specials" },
  { href: "/blog", label: "Guides" },
] as const;

const pmb = LOCATIONS[0];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 sm:px-8 lg:px-12 py-3">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-ui text-[13px] sm:text-sm font-bold tracking-[0.15em] text-white uppercase">
            Pullen&apos;s Tombstones
          </span>
          <span className="text-[9px] tracking-[0.25em] text-gold/60 uppercase font-ui font-medium">
            Cast in Stone
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-white/50 hover:text-white transition-colors px-3 py-2 min-h-12 flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink(pmb.whatsapp, "Hi, I'd like to enquire about a tombstone.")}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-[13px] font-semibold text-dark hover:bg-gold-bright transition-colors min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden min-h-12 min-w-12 flex items-center justify-center text-white/70"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-white/5 bg-dark/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <a
                href={whatsappLink(pmb.whatsapp, "Hi, I'd like to enquire about a tombstone.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-dark hover:bg-gold-bright transition-colors min-h-12"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
