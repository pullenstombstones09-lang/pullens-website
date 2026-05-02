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
    <header className="bg-navy text-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-bold tracking-wide sm:text-2xl">
            PULLEN&apos;S TOMBSTONES
          </span>
          <span className="text-xs tracking-widest text-cream opacity-80">
            Cast in Stone
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-orange transition-colors min-h-12 flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink(pmb.whatsapp, "Hi, I'd like to enquire about a tombstone.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange/90 transition-colors min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden min-h-12 min-w-12 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium hover:text-orange transition-colors min-h-12 flex items-center"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink(pmb.whatsapp, "Hi, I'd like to enquire about a tombstone.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange/90 transition-colors min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </nav>
      )}
    </header>
  );
}
