# Pullens Tombstones Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the WordPress site at pullenstombstones.co.za with a high-performance Next.js PWA that drives WhatsApp leads, ranks for KZN tombstone keywords, and showcases the full product catalogue.

**Architecture:** Next.js 16 App Router with `(public)` route group for all customer-facing pages. Static-first with ISR for dynamic content (specials, blog). Catalogue images served from `/public/catalogue/` as WebP. SEO/schema baked into every page. Meta Pixel + GA4 tracking from first deploy. Mobile-first, bilingual (EN primary, isiZulu woven in).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, lucide-react (SVG icons), Sharp (image processing), Playwright (testing)

**Source of truth:** `C:\Users\Annika\Desktop\Pullens OS Main\PULLENS_MASTER_SOURCE_OF_TRUTH.md`

**Next.js 16 gotchas:**
- `params` and `searchParams` are async Promises — must `await` them
- Middleware renamed to `proxy.ts` / `export function proxy()`
- Turbopack is default — no webpack config
- `next/legacy/image` removed — use `next/image`

---

## File Structure

```
pullens-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: Lora + Inter fonts, metadata, body structure
│   │   ├── globals.css             # Tailwind v4 imports + brand CSS custom properties
│   │   ├── page.tsx                # Homepage (redirects or renders directly)
│   │   ├── (public)/
│   │   │   ├── layout.tsx          # Public layout: header, footer, sticky WhatsApp bar, pixel scripts
│   │   │   ├── page.tsx            # Homepage: hero, ranges preview, trust, FAQ teaser, CTA
│   │   │   ├── ranges/
│   │   │   │   ├── page.tsx        # All ranges overview
│   │   │   │   ├── prestige/page.tsx
│   │   │   │   ├── signature/page.tsx
│   │   │   │   ├── more-for-less/page.tsx
│   │   │   │   ├── exclusive/page.tsx
│   │   │   │   └── baby/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── specials/page.tsx
│   │   │   ├── pinetown/page.tsx
│   │   │   ├── track/[ref]/page.tsx
│   │   │   ├── designer/page.tsx
│   │   │   └── design/[id]/page.tsx
│   │   └── (os)/                   # Staff OS — future, not in this plan
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx          # Nav bar: logo, links, WhatsApp button
│   │   │   ├── footer.tsx          # Footer: locations, links, social, legal
│   │   │   └── whatsapp-bar.tsx    # Sticky mobile bottom bar with WhatsApp CTA
│   │   ├── ui/
│   │   │   ├── button.tsx          # Brand button (orange CTA, navy secondary)
│   │   │   ├── section.tsx         # Page section wrapper with fade-in animation
│   │   │   ├── trust-badges.tsx    # 4.9 stars, 22K installs, 40+ years, Google reviews
│   │   │   ├── range-card.tsx      # Catalogue card: image, range name, CTA
│   │   │   └── product-grid.tsx    # Grid of tombstone images for range pages
│   │   └── seo/
│   │       ├── json-ld.tsx         # Reusable JSON-LD script component
│   │       └── schemas.ts          # LocalBusiness, Product, FAQ, AggregateRating schema builders
│   ├── lib/
│   │   ├── catalogue.ts           # Catalogue manifest: design codes → range, image path, metadata
│   │   ├── constants.ts           # Brand colours, NAP data, WhatsApp numbers, locations
│   │   ├── tracking.ts            # Meta Pixel + GA4 event helpers
│   │   └── utils.ts               # formatPhone, cn() class merger
│   └── types/
│       └── catalogue.ts           # CatalogueItem, Range, Location types
├── public/
│   ├── catalogue/                  # WebP studio renders (output from batch pipeline)
│   │   ├── B-Range/
│   │   ├── EX-Range/
│   │   ├── M-Range/
│   │   ├── P-Range/
│   │   └── S-Range/
│   ├── fonts/
│   │   ├── Lora-Bold.woff2
│   │   └── Lora-BoldItalic.woff2
│   ├── logo.svg                    # Pullens logo (SVG)
│   ├── badge-40-years.svg          # Gold "Over 40 Years" badge
│   └── og-image.jpg                # Default Open Graph image
├── playwright.config.ts
├── tests/
│   ├── homepage.spec.ts
│   ├── ranges.spec.ts
│   └── seo.spec.ts
└── next.config.ts
```

---

## Task 1: Brand Foundation — Fonts, Colours, Layout Shell

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/lib/constants.ts`
- Create: `src/lib/utils.ts`
- Create: `src/app/(public)/layout.tsx`
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/layout/whatsapp-bar.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Configure next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    localPatterns: [
      { pathname: "/catalogue/**" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Set up brand constants**

Create `src/lib/constants.ts` with all NAP data, colours, WhatsApp numbers, locations from the source of truth.

```ts
export const BRAND = {
  name: "Pullen's Tombstones",
  legal: "Amazon Creek Trading (Pty) Ltd",
  tagline: "Cast in Stone",
  taglineZulu: "Amatshe Amathuna",
  established: 1982,
  yearsInBusiness: new Date().getFullYear() - 1982,
  totalInstalls: "22,000+",
  googleRating: 4.9,
  googleReviews: 156,
  facebookFollowers: "4,423",
  vatNumber: "4910290305",
  cipc: "2011/105461/23",
} as const;

export const COLOURS = {
  navy: "#0d2d5e",
  blue: "#1B4B8A",
  orange: "#FF6B00",
  charcoal: "#1A1A1A",
  offWhite: "#FAFAF8",
  gold: "#B8860B",
  cream: "#FDF6E3",
} as const;

export const LOCATIONS = [
  {
    id: "allandale",
    name: "Pietermaritzburg (Head Office)",
    shortName: "PMB",
    address: "46 Allandale Drive, Allandale, Pietermaritzburg, 3201, KwaZulu-Natal, South Africa",
    phone: "033 387 8913",
    whatsapp: "+27812130772",
    whatsappDisplay: "081 213 0772",
    type: "HQ + Factory" as const,
    hours: "Mon-Fri 08:00-17:00, Sat 08:00-13:00",
    gps: { lat: -29.5868, lng: 30.3797 },
  },
  {
    id: "pinetown",
    name: "Pinetown (Factory + Showroom)",
    shortName: "Pinetown",
    address: "9 Circuit Road, Westmead, Pinetown, 3610, KwaZulu-Natal, South Africa",
    phone: "068 111 5782",
    whatsapp: "+27812138812",
    whatsappDisplay: "081 213 8812",
    type: "Factory + Showroom" as const,
    hours: "Mon-Fri 08:00-17:00, Sat 08:00-13:00",
    gps: { lat: -29.8063, lng: 30.8571 },
  },
] as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/PullensTombstones",
  instagram: "https://www.instagram.com/_pullenstombstones_/",
} as const;

export const META_PIXEL_ID = "3386049621486839";
```

- [ ] **Step 3: Create utility functions**

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}

export function whatsappLink(number: string, message?: string): string {
  const clean = number.replace(/[^0-9+]/g, "");
  const base = `https://wa.me/${clean.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatPhone(phone: string): string {
  return phone;
}
```

- [ ] **Step 4: Set up Tailwind globals.css with brand tokens**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0d2d5e;
  --color-blue: #1B4B8A;
  --color-orange: #FF6B00;
  --color-charcoal: #1A1A1A;
  --color-off-white: #FAFAF8;
  --color-gold: #B8860B;
  --color-cream: #FDF6E3;

  --font-display: "Lora", serif;
  --font-body: "Inter", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-charcoal);
  background-color: var(--color-off-white);
}

/* Progressive reveal animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
```

- [ ] **Step 5: Update root layout.tsx with Lora + Inter fonts**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Lora for display headings
const lora = localFont({
  src: [
    { path: "../../public/fonts/Lora-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Lora-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pullen's Tombstones — Cast in Stone Since 1982",
    template: "%s | Pullen's Tombstones",
  },
  description:
    "KZN's most trusted tombstone manufacturer. Over 22,000 memorials installed. Granite headstones, custom engraving, and dignified service since 1982.",
  metadataBase: new URL("https://pullenstombstones.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Pullen's Tombstones",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
```

Note: Download Lora Bold and BoldItalic woff2 files from Google Fonts and place in `public/fonts/`. If unavailable, fall back to `next/font/google` Lora import.

- [ ] **Step 6: Create header component**

Create `src/components/layout/header.tsx` — mobile-first nav with logo, hamburger menu, WhatsApp CTA button.

- [ ] **Step 7: Create footer component**

Create `src/components/layout/footer.tsx` — both locations NAP, social links, legal text, "Cast in Stone" tagline.

- [ ] **Step 8: Create sticky WhatsApp bar**

Create `src/components/layout/whatsapp-bar.tsx` — fixed bottom bar on mobile with WhatsApp icon + "Chat on WhatsApp" CTA. Routes to nearest location number.

- [ ] **Step 9: Create public layout**

Create `src/app/(public)/layout.tsx` that wraps all public pages with header, footer, WhatsApp bar, and tracking scripts.

- [ ] **Step 10: Verify dev server runs**

```bash
cd /c/Users/Annika/pullens-website && npm run dev
```

Open http://localhost:3000 — should see header + footer shell with brand colours.

- [ ] **Step 11: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/lib/constants.ts src/lib/utils.ts src/app/(public)/layout.tsx src/components/layout/ next.config.ts public/fonts/
git commit -m "feat: brand foundation — fonts, colours, layout shell with header/footer/WhatsApp bar"
```

---

## Task 2: SEO Infrastructure — Schema, JSON-LD, Tracking

**Files:**
- Create: `src/components/seo/json-ld.tsx`
- Create: `src/components/seo/schemas.ts`
- Create: `src/lib/tracking.ts`
- Modify: `src/app/(public)/layout.tsx` (add tracking scripts)

- [ ] **Step 1: Create JSON-LD component**

```tsx
// src/components/seo/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Create schema builders**

Create `src/components/seo/schemas.ts` with functions that return structured data objects for:
- `localBusinessSchema()` — both locations, NAP, hours, geo, aggregateRating (4.9/156)
- `productSchema(range, designs)` — Product schema per range
- `faqPageSchema(items)` — FAQPage schema from Q&A pairs
- `breadcrumbSchema(items)` — BreadcrumbList
- `organizationSchema()` — Organization with sameAs links to Facebook, Instagram

All data pulled from `constants.ts`.

- [ ] **Step 3: Create tracking helpers**

Create `src/lib/tracking.ts`:
- `fbPixelScript(pixelId)` — returns Meta Pixel base code string
- `trackEvent(name, params)` — fires both `fbq('track', ...)` and `gtag('event', ...)`
- Event types: `PageView`, `ViewContent`, `Lead` (WhatsApp tap), `DesignCreated`, `DesignShared`

- [ ] **Step 4: Add tracking scripts to public layout**

Add Meta Pixel script and GA4 script to `(public)/layout.tsx` `<head>` via `<Script>` component.

- [ ] **Step 5: Commit**

```bash
git add src/components/seo/ src/lib/tracking.ts src/app/(public)/layout.tsx
git commit -m "feat: SEO infrastructure — JSON-LD schemas, Meta Pixel, GA4 tracking"
```

---

## Task 3: Catalogue Data Layer

**Files:**
- Create: `src/types/catalogue.ts`
- Create: `src/lib/catalogue.ts`

- [ ] **Step 1: Define catalogue types**

```ts
// src/types/catalogue.ts
export type RangeSlug = "prestige" | "signature" | "more-for-less" | "exclusive" | "baby";

export interface CatalogueItem {
  code: string;        // "P1", "S12", "B3", etc.
  range: RangeSlug;
  rangeName: string;    // "Prestige", "Signature", etc.
  imageDir: string;     // "P-Range", "S-Range", etc.
  imagePath: string;    // "/catalogue/P-Range/P1.webp"
}

export interface RangeInfo {
  slug: RangeSlug;
  name: string;
  dirName: string;      // folder name in public/catalogue/
  description: string;
  sizes: string;
  priceRange: string;
  targetCustomer: string;
  designCount: number;
}
```

- [ ] **Step 2: Build catalogue manifest**

Create `src/lib/catalogue.ts` that reads the `public/catalogue/` directory structure and exports:
- `RANGES: RangeInfo[]` — metadata for each range
- `getCatalogueItems(range: RangeSlug): CatalogueItem[]` — all items for a range
- `getAllItems(): CatalogueItem[]` — all 141 items

This uses the actual file listing from the catalogue-output folder. Map folder names to range slugs:
- `B-Range` → `baby`
- `EX-Range` → `exclusive`
- `M-Range` → `more-for-less`
- `P-Range` → `prestige`
- `S-Range` → `signature`

Range metadata (sizes, price ranges, descriptions, target customer) comes from the source of truth PRODUCTS and PRICING ENGINE sections.

- [ ] **Step 3: Commit**

```bash
git add src/types/catalogue.ts src/lib/catalogue.ts
git commit -m "feat: catalogue data layer — types, manifest, range metadata"
```

---

## Task 4: UI Components — Section, Button, Trust Badges, Cards

**Files:**
- Create: `src/components/ui/section.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/trust-badges.tsx`
- Create: `src/components/ui/range-card.tsx`
- Create: `src/components/ui/product-grid.tsx`

- [ ] **Step 1: Create Section wrapper with scroll-triggered fade-in**

```tsx
// src/components/ui/section.tsx
"use client";
import { useRef, useEffect, useState } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

export function Section({ children, className = "", dark, id }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`px-4 py-16 md:py-24 ${dark ? "bg-charcoal text-white" : ""} ${visible ? "animate-fade-in-up" : "opacity-0"} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Create Button component**

Orange CTA variant, navy secondary variant, WhatsApp variant with icon. All 48px min touch target.

- [ ] **Step 3: Create Trust Badges component**

4.9 stars (SVG stars), "22,000+ Memorials", "Over 40 Years", "156 Google Reviews". Horizontal scroll on mobile, grid on desktop.

- [ ] **Step 4: Create Range Card**

Catalogue card: tombstone image, range name, price hint ("From R3,200"), WhatsApp CTA. Layered shadow (not shadow-md). Hover lift.

- [ ] **Step 5: Create Product Grid**

Grid of tombstone images for range pages. 2-col mobile, 3-col tablet, 4-col desktop. Lazy loaded with blur placeholder.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: UI components — section, button, trust badges, range card, product grid"
```

---

## Task 5: Homepage

**Files:**
- Modify: `src/app/(public)/page.tsx`
- Modify: `src/app/page.tsx` (redirect to public)

**Target keyword:** "tombstones pietermaritzburg"

- [ ] **Step 1: Set up root page redirect**

`src/app/page.tsx` should redirect to or render the `(public)` homepage. Simplest: move homepage content to `(public)/page.tsx` and have root `page.tsx` do a redirect or re-export.

- [ ] **Step 2: Build homepage with these sections (in order):**

1. **Hero** — Full-width warm photo background (or gradient placeholder), Lora headline "Amatshe Amathuna — Cast in Stone", sub-headline "KZN's most trusted tombstone manufacturer since 1982", orange WhatsApp CTA button, trust badges row below
2. **Ranges Preview** — 5 range cards in a horizontal scroll (mobile) or grid (desktop), linking to each range page
3. **Heritage Strip** — Dark section (#1A1A1A). Gold accents. "Over 40 Years of Excellence" badge. Short brand story paragraph. Bilingual (EN + isiZulu).
4. **Trust Section** — Google rating (4.9 stars), review count, total installs, years in business. Pull-quote from a real Google review if available.
5. **FAQ Teaser** — Top 4 FAQ questions with expandable answers. Links to full /faq page. Uses FAQPage schema.
6. **Two Locations** — Side-by-side cards for PMB and Pinetown with address, phone, WhatsApp button each.
7. **Final CTA** — "Ready to honour your loved one?" + WhatsApp button

- [ ] **Step 3: Add homepage metadata**

```tsx
export const metadata: Metadata = {
  title: "Tombstones Pietermaritzburg & KZN — Pullen's Tombstones | Cast in Stone Since 1982",
  description: "Granite tombstones and headstones in Pietermaritzburg and Durban. Over 22,000 memorials installed. 4.9★ rated. Get a quote on WhatsApp.",
  alternates: { canonical: "https://pullenstombstones.co.za" },
};
```

- [ ] **Step 4: Add LocalBusiness + Organization JSON-LD to homepage**

- [ ] **Step 5: Verify — dev server, mobile view, all sections render**

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/(public)/page.tsx
git commit -m "feat: homepage — hero, ranges, heritage, trust, FAQ teaser, locations, CTA"
```

---

## Task 6: Range Pages (5 pages)

**Files:**
- Create: `src/app/(public)/ranges/page.tsx` (overview)
- Create: `src/app/(public)/ranges/prestige/page.tsx`
- Create: `src/app/(public)/ranges/signature/page.tsx`
- Create: `src/app/(public)/ranges/more-for-less/page.tsx`
- Create: `src/app/(public)/ranges/exclusive/page.tsx`
- Create: `src/app/(public)/ranges/baby/page.tsx`

- [ ] **Step 1: Create ranges overview page**

Grid of 5 range cards with hero image per range, name, price hint, CTA.

- [ ] **Step 2: Create a shared range page template**

Each range page follows the same structure:
1. Hero with range name + Lora headline + 1-2 sentence positioning
2. Product grid (all designs in that range from catalogue manifest)
3. 300+ words of real content (covering types, what makes this range unique, who it's for)
4. FAQ section (3-4 range-specific Q&As)
5. Monthly special callout (if applicable)
6. WhatsApp CTA with pre-filled message: "Hi, I'm interested in the [Range] range"

- [ ] **Step 3: Build Prestige page**

Target keyword: "granite headstone south africa". 62 designs. Most popular range. Mid-market positioning. 300+ words about premium granite, design variety, covering options.

- [ ] **Step 4: Build Signature page**

Target keyword: "granite memorial headstone". 37 designs. High-end positioning.

- [ ] **Step 5: Build More for Less page**

Target keyword: "cheap tombstones south africa". 7 designs. Reframe as "affordable" — never cheap. Price anchor "From R3,200".

- [ ] **Step 6: Build Exclusive page**

Target keyword: "custom engraved tombstone south africa". 18 designs. Bespoke, custom materials.

- [ ] **Step 7: Build Baby page**

Target keyword: "baby headstones kzn". 17 designs. **Sensitive tone.** Empathetic language. No hard-sell. Gentle CTA.

- [ ] **Step 8: Add Product schema + BreadcrumbList to each range page**

- [ ] **Step 9: Commit**

```bash
git add src/app/(public)/ranges/
git commit -m "feat: 5 range pages — catalogue grids, 300+ word content, FAQ, schema"
```

---

## Task 7: FAQ Page

**Files:**
- Create: `src/app/(public)/faq/page.tsx`

**Target keyword:** "how much does a tombstone cost in sa"

- [ ] **Step 1: Build FAQ page with 12+ Q&As**

Q&As from the source of truth + common customer questions:
1. How much does a tombstone cost in South Africa?
2. What granite colours are available?
3. What are the different covering types? (kerbs & chips, tiles, slab)
4. How long does a tombstone take to make?
5. Do you offer payment plans?
6. What areas do you deliver to?
7. How does the inscription process work?
8. What is a tombstone unveiling ceremony?
9. Can I customise my tombstone design?
10. Do you do baby memorials?
11. Where are your showrooms?
12. How do I get a quote?

Each answer 50-100 words. Price anchors where appropriate ("Our ranges start from R3,200").

- [ ] **Step 2: Add FAQPage schema**

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/faq/
git commit -m "feat: FAQ page — 12 Q&As with FAQPage schema, price anchors"
```

---

## Task 8: Contact Page

**Files:**
- Create: `src/app/(public)/contact/page.tsx`

**Target keyword:** "tombstone showroom pietermaritzburg"

- [ ] **Step 1: Build contact page**

- Two location cards side-by-side (mobile: stacked)
- Each card: address, phone (clickable), WhatsApp button (clickable), hours, embedded Google Map
- "Get a Quote" section with WhatsApp CTA
- Directions/landmarks for each location

- [ ] **Step 2: Add LocalBusiness schema for both locations**

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/contact/
git commit -m "feat: contact page — 2 locations, maps, WhatsApp CTAs, LocalBusiness schema"
```

---

## Task 9: About Page

**Files:**
- Create: `src/app/(public)/about/page.tsx`

**Target keyword:** "tombstone company kzn"

- [ ] **Step 1: Build about page**

- Heritage hero: "Cast in Stone Since 1982" + gold accents
- Brand story (44 years, family business, 22K installs)
- Team section (placeholder for future team photos)
- Factory/showroom section (use existing photos if available)
- YouTube embed placeholder (for video #8 "The Pullens Story")
- Trust badges + Google rating

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/about/
git commit -m "feat: about page — heritage story, trust signals, team section"
```

---

## Task 10: Specials Page

**Files:**
- Create: `src/app/(public)/specials/page.tsx`

**Target keyword:** "tombstone prices 2026"

- [ ] **Step 1: Build specials page**

- Monthly rotating deals WITH prices (captures price-search SEO)
- Featured product card with image, price, "WhatsApp to Claim" CTA
- "Payment plan available" note (never "lay-bye")
- Content refreshed monthly — structure supports easy updates

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/specials/
git commit -m "feat: specials page — monthly deals with price anchors"
```

---

## Task 11: Pinetown Location Page

**Files:**
- Create: `src/app/(public)/pinetown/page.tsx`

**Target keyword:** "tombstones durban"

- [ ] **Step 1: Build dedicated Pinetown landing page**

- Local hero: "Tombstones in Durban & Pinetown"
- Showroom info, address, map
- WhatsApp to Randhir (Pinetown number)
- Range preview grid
- Local testimonials if available

- [ ] **Step 2: Commit**

```bash
git add src/app/(public)/pinetown/
git commit -m "feat: pinetown location page — local SEO for Durban/Pinetown"
```

---

## Task 12: Playwright Test Suite

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/homepage.spec.ts`
- Create: `tests/ranges.spec.ts`
- Create: `tests/seo.spec.ts`

- [ ] **Step 1: Configure Playwright**

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
  projects: [
    { name: "Mobile", use: { ...devices["Pixel 5"] } },
    { name: "Desktop", use: { ...devices["Desktop Chrome"] } },
  ],
});
```

- [ ] **Step 2: Write homepage tests**

- Page loads, H1 contains target keyword
- WhatsApp button visible and links to correct number
- Trust badges render (4.9 stars, 22K)
- All 5 range cards visible
- Meta Pixel script present in DOM
- LocalBusiness JSON-LD present

- [ ] **Step 3: Write range page tests**

- Each range page loads
- Product grid renders images
- H1 contains range name
- WhatsApp CTA present
- Product schema JSON-LD present

- [ ] **Step 4: Write SEO tests**

- Every page has unique title and description
- Every page has exactly one H1
- No page has missing alt text on images
- JSON-LD is valid JSON on every page
- Canonical URL set on every page

- [ ] **Step 5: Run tests**

```bash
npx playwright install chromium
npx playwright test
```

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/
git commit -m "feat: Playwright test suite — homepage, ranges, SEO validation"
```

---

## Task 13: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
cd /c/Users/Annika/pullens-website
git remote add origin https://github.com/pullenstombstones09-lang/pullens-website.git
git push -u origin main
```

(Create repo on GitHub first under `pullenstombstones09-lang` account)

- [ ] **Step 2: Connect to Vercel**

Import project on Vercel under `pullenstombstones09-langs-projects` team. Framework preset: Next.js.

- [ ] **Step 3: Set environment variables on Vercel**

- `NEXT_PUBLIC_META_PIXEL_ID`: `3386049621486839`
- `NEXT_PUBLIC_GA4_ID`: (create GA4 property first, then add)

- [ ] **Step 4: Verify deployment**

- Check pullens-website.vercel.app loads
- Check all pages render
- Check Meta Pixel fires PageView (use Facebook Pixel Helper extension)
- Mobile view looks correct

- [ ] **Step 5: Commit any fixes**

---

## Task 14: Copy Catalogue Images to Public Directory

- [ ] **Step 1: Resume the batch pipeline**

```bash
cd "/c/Users/Annika/Desktop/Pullens OS Main"
REPLICATE_API_TOKEN=<your-token> node batch-pipeline.mjs
```

Wait for all 141 images to process.

- [ ] **Step 2: Copy WebP files to website public directory**

```bash
cp -r "/c/Users/Annika/Desktop/Pullens OS Main/catalogue-output/B-Range/"*.webp /c/Users/Annika/pullens-website/public/catalogue/B-Range/
cp -r "/c/Users/Annika/Desktop/Pullens OS Main/catalogue-output/EX-Range/"*.webp /c/Users/Annika/pullens-website/public/catalogue/EX-Range/
cp -r "/c/Users/Annika/Desktop/Pullens OS Main/catalogue-output/M-Range/"*.webp /c/Users/Annika/pullens-website/public/catalogue/M-Range/
cp -r "/c/Users/Annika/Desktop/Pullens OS Main/catalogue-output/P-Range/"*.webp /c/Users/Annika/pullens-website/public/catalogue/P-Range/
cp -r "/c/Users/Annika/Desktop/Pullens OS Main/catalogue-output/S-Range/"*.webp /c/Users/Annika/pullens-website/public/catalogue/S-Range/
```

- [ ] **Step 3: Verify images load on range pages**

- [ ] **Step 4: Commit**

```bash
git add public/catalogue/
git commit -m "feat: add 141 catalogue images (WebP studio renders)"
```

---

## Execution Order

Tasks 1-4 are foundation — must be sequential.
Tasks 5-11 are pages — can be parallelised (subagent per page).
Task 12 runs after pages exist.
Task 13 can happen after Task 5 (homepage) is done — deploy early, iterate.
Task 14 runs whenever the batch pipeline finishes.

**Recommended:** Subagent-driven — dispatch Tasks 5-11 in parallel after foundation is built.
