# PULLEN'S TOMBSTONES — BUILD PLAN
**Version:** 2.0 | **Date:** 4 May 2026
**Ref:** 01-architecture.md, 02-design-system.md, 03-pages.md

---

## PHASE OVERVIEW

| Phase | Name | Produces | Sessions | Depends On |
|-------|------|----------|----------|------------|
| 0 | Bootstrap | Empty shell on Vercel | 1 | Nothing |
| 1 | Design System + Layout | globals.css, Header, Footer, WhatsApp bar, brand components | 1 | Phase 0 |
| 2 | Homepage + Pinetown | / and /pinetown fully styled | 1-2 | Phase 1 |
| 3 | Range Pages | All 5 /ranges/* pages with design grids | 1-2 | Phase 1 |
| 4 | Content Pages | /about, /contact, /faq, /specials, 3 blog posts | 1-2 | Phase 1 |
| 5 | SEO + Analytics | Schema, Pixel, GA4, sitemap, robots, OG images | 1 | Phases 2-4 |
| 6 | Tracking + Stubs | /track/[ref], /designer stub, /design/[id] stub, 404/500 | 1 | Phase 1 |
| 7 | PWA + Performance | Service worker, offline catalogue, Lighthouse audit | 1 | Phases 2-6 |

**Total: 7-10 sessions (1-3 hours each)**

---

## PHASE 0 — PROJECT BOOTSTRAP

### Exit Criteria
- [ ] Next.js 16 project created with App Router
- [ ] All dependencies installed
- [ ] File structure matches 01-architecture.md
- [ ] Empty homepage renders at localhost:3000
- [ ] Pushed to GitHub (pullenstombstones09-lang/pullens-website)
- [ ] Deployed to Vercel — URL responds 200

### Claude Code Prompt

```
TASK: Bootstrap the Pullen's Tombstones website project. FRESH START — ignore any existing code.

IMPORTANT: Read node_modules/next/dist/docs/ FIRST to understand Next.js 16 APIs before writing any code. This version may differ from your training data.

1. Create a new Next.js 16 project at C:\Users\Annika\pullens-website-v2\ (separate from old site):
   npx create-next-app@latest pullens-website-v2 --typescript --tailwind --app --src-dir=false --import-alias="@/*"

2. Install dependencies:
   npm install @supabase/supabase-js lucide-react motion sharp
   npm install -D @types/node

3. Create the file structure from docs/build/01-architecture.md section 10:
   - app/ (all page routes as empty shells)
   - components/ (all component directories with empty index files)
   - lib/ (supabase client, constants, motion, utils)
   - public/ (catalogue, images directories)
   - docs/build/ (copy the 4 spec files)

4. Set up globals.css from docs/build/02-design-system.md section 1 (the complete CSS file)

5. Set up lib/supabase/client.ts and lib/supabase/server.ts:
   - Use @supabase/supabase-js
   - Project: eznppvewksorfoedgzpa
   - Read env vars NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

6. Create .env.local with placeholder values:
   NEXT_PUBLIC_SUPABASE_URL=https://eznppvewksorfoedgzpa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
   NEXT_PUBLIC_FB_PIXEL_ID=3386049621486839
   NEXT_PUBLIC_GA4_ID=placeholder

7. Create a minimal app/layout.tsx that loads Lora + Inter + Poppins fonts and applies the cream background.

8. Create a minimal app/page.tsx that renders "Pullen's Tombstones — Coming" (temporary).

9. Verify: npm run build succeeds, npm run dev shows the page.

10. Create .gitignore, push to GitHub repo pullenstombstones09-lang/pullens-website (overwrite if exists, this is a fresh start).

BRAND RULES — do not violate at any point:
- Fonts: Lora (display), Poppins (UI), Inter (body). NOT Playfair, NOT Fraunces.
- Colours: cream #F8F3E9 bg, ink #1A1A1A text, antique gold #BF953F accent. NO orange. NO pure white #FFFFFF.
- Icons: lucide-react only. NO emoji in UI.
- The word "Excellence" must NEVER appear in any file.
- The word "lay-bye" must NEVER appear in any file.
```

---

## PHASE 1 — DESIGN SYSTEM + LAYOUT

### Exit Criteria
- [ ] globals.css fully implemented with all tokens
- [ ] Header component works (transparent + solid modes, mobile hamburger, desktop nav)
- [ ] Footer component renders 4 locations, ranges links, legal
- [ ] MobileWhatsAppBar sticky on mobile, hidden on desktop
- [ ] SinceMarkTypographic component renders correctly at sm/md/lg
- [ ] LogoLockup component works (horizontal + stacked, dark mode)
- [ ] Button component works (primary, whatsapp, ghost variants)
- [ ] GoldHairline, Section, Container components work
- [ ] motion.ts exports fadeUp, staggerChildren, cardHover, imageHover
- [ ] All components type-safe (TypeScript strict)

### Claude Code Prompt

```
TASK: Build the design system foundation and layout shell for Pullen's Tombstones.

Read docs/build/02-design-system.md for complete specifications.
Read docs/build/01-architecture.md section 5 for component inventory.

BUILD THESE COMPONENTS (in order):

1. GLOBALS.CSS — paste from 02-design-system.md section 1. Must include all CSS variables, base reset, font imports, selection styles, focus-visible, reduced-motion overrides.

2. lib/motion.ts — editorial animation library from 02-design-system.md section 7.

3. lib/constants/locations.ts — 4 locations with name, address, phone, whatsapp, hours, coordinates.
   lib/constants/ranges.ts — 5 ranges with slug, name, description, designCount, budgetTier.
   lib/constants/stages.ts — 11 order stages with EN + isiZulu labels.

4. components/content/Button.tsx — 3 variants (primary/whatsapp/ghost), 3 sizes (sm/md/lg), icon support. 48px min touch target. Poppins Bold uppercase.

5. components/content/GoldHairline.tsx — 1px antique gold, 80px default width.

6. components/content/Section.tsx — Scroll-triggered fadeUp wrapper with section-rhythm padding, optional eyebrow + heading.

7. components/content/Container.tsx — narrow (640px) / default (1024px) / wide (1280px).

8. components/brand/SinceMarkTypographic.tsx — from 02-design-system.md section 5. CAST IN STONE / gold rule / SINCE 1982.

9. components/brand/LogoLockup.tsx — from 02-design-system.md section 6. Horizontal + stacked variants. Dark mode. SA map SVG inline.

10. components/layout/Header.tsx — Logo left, nav right. Mobile: hamburger → full-screen overlay. Desktop: horizontal nav. Transparent mode for heroes. Scroll shadow.

11. components/layout/Footer.tsx — 4 locations, range links, legal links, WhatsApp CTAs, SINCE 1982 mark.

12. components/layout/MobileWhatsAppBar.tsx — Fixed bottom, <1024px only. WhatsApp green. Full-bar tap target. Hide on scroll down, show on scroll up.

13. app/layout.tsx — RootLayout with Header, Footer, MobileWhatsAppBar. Font loading. Meta defaults.

BRAND NON-NEGOTIABLES:
- Lora Italic for headlines, Lora Roman for sub-lines, Poppins Bold for UI/labels, Inter for body
- Cream #F8F3E9 bg, Ink #1A1A1A text, Antique gold #BF953F accent, Bright gold #D4AF37 for mark rules
- NO orange, NO #FFFFFF, NO shadow-md/lg, NO emoji icons, NO "Excellence", NO "lay-bye"
- 48px minimum touch targets
- Mobile-first: base styles for 360px, breakpoints at 640/768/1024/1280

VERIFICATION before claiming done:
- npm run build passes with zero errors
- All components render correctly in dev
- Header works in both transparent and solid modes
- MobileWhatsAppBar visible on mobile, hidden on desktop
- No TypeScript errors in strict mode
```

---

## PHASE 2 — HOMEPAGE + PINETOWN

### Exit Criteria
- [ ] Homepage renders all 8 sections from 03-pages.md
- [ ] HeritageHero with asymmetric layout, fadeUp motion
- [ ] RangeCard component with hover state (lift + gold underline)
- [ ] TrustStrip with stats
- [ ] TestimonialCard with star rating
- [ ] FAQItem with expand/collapse
- [ ] LocationCard with 4 locations
- [ ] Heritage dark strip (#0F0F14)
- [ ] /pinetown page renders with Pinetown WhatsApp number
- [ ] Lighthouse >=80 on mobile (>=90 target in Phase 7)

### Claude Code Prompt

```
TASK: Build the homepage and Pinetown landing page.

Read docs/build/03-pages.md pages 1 and 2 for exact content.
Read docs/build/02-design-system.md for component specs.
Read docs/build/01-architecture.md section 6.1 and 6.2 for blueprints.

BUILD (in order):

1. components/hero/HeritageHero.tsx — Full-bleed photo, bottom darkening gradient, asymmetric text (bottom-left), SINCE 1982 mark (top-right). Props from 01-architecture.md. fadeUp motion on h1/sub/CTA.

2. components/trust/TrustStrip.tsx — Horizontal strip: 4.9★ · 22,000+ · Since 1982 · 4 Locations.
   components/trust/StarRating.tsx — 5 gold stars with numeric rating.

3. components/cards/RangeCard.tsx — Image top (4:3), title (Lora Roman), description, design count (Poppins eyebrow). Hover: lift 4px + gold underline. Full card is link.

4. components/cards/TestimonialCard.tsx — Name, rating (StarRating), review text, date.
   components/trust/GoogleReviewCard.tsx — Wrapper for testimonials.

5. components/content/FAQItem.tsx — Expandable Q&A. Height animation. Gold hairline when open.

6. components/cards/LocationCard.tsx — Map placeholder, name (Lora Roman), address, WhatsApp button, optional badge ("HQ", "Opening Soon").

7. app/page.tsx — Homepage with all 8 sections from 03-pages.md:
   Hero → Trust Strip → Ranges Preview → Heritage Strip → Testimonials → FAQ Teaser → Locations → Final CTA

8. app/pinetown/page.tsx — Same structure, Pinetown-focused, WhatsApp 081 213 8812.

CONTENT: Use exact copy from docs/build/03-pages.md. Do not invent or modify the words.

HERO IMAGES: Use placeholder cream backgrounds for now (photos will be added later). The layout and typography must be correct regardless of whether a photo is present.

VERIFICATION:
- Both pages render all sections without errors
- RangeCard hover state works (lift + gold underline)
- FAQItem expands/collapses
- MobileWhatsAppBar routes to correct number (PMB on homepage, Pinetown on /pinetown)
- No CLS on page load (explicit dimensions on all images/skeletons)
- npm run build passes
```

---

## PHASE 3 — RANGE PAGES

### Exit Criteria
- [ ] /ranges/prestige, /ranges/signature, /ranges/more-for-less, /ranges/exclusive, /ranges/baby all render
- [ ] RangeHero component with range name, design count, budget tier
- [ ] DesignCard component in responsive grid (3/4/5 col)
- [ ] 400+ words of content per range page
- [ ] Baby page uses gentlest tone, no pricing language
- [ ] Cross-sell section with 2 other ranges
- [ ] WhatsApp CTA on every range page

### Claude Code Prompt

```
TASK: Build all 5 range pages.

Read docs/build/03-pages.md pages 3-7 for exact content per range.
Read docs/build/01-architecture.md section 6.3 for blueprint.

BUILD:

1. components/hero/RangeHero.tsx — Range eyebrow, H1 (Lora Italic), sub-line with design count + budget tier, WhatsApp CTA. Lighter than HeritageHero (no full-bleed photo).

2. components/cards/DesignCard.tsx — Tombstone thumbnail, design code, range badge. Grid: 3-col mobile, 4-col tablet, 5-col desktop. Hover: scale 1.02 on image. Lazy-load images.

3. lib/constants/ranges.ts — Update with full range metadata if not already complete.

4. app/ranges/[slug]/page.tsx — Dynamic route. Sections: RangeHero → Design Grid → Range Description → Trust → Cross-sell → CTA Strip.

5. Use PLACEHOLDER thumbnails for designs (grey cream boxes with design codes). Real images come from the Bria pipeline later.

6. BABY PAGE SPECIAL HANDLING:
   - CTA text: "We're here when you're ready" (NOT "Get a quote")
   - No budget tier labels
   - No cross-sell section
   - Gentlest possible tone throughout

CONTENT: Use exact copy from docs/build/03-pages.md.

VERIFICATION:
- All 5 range pages render at their URLs
- Design grid is responsive (3/4/5 col)
- Baby page has softer CTA and no cross-sell
- npm run build passes
- No "lay-bye" or "Excellence" in any file
```

---

## PHASE 4 — CONTENT PAGES

### Exit Criteria
- [ ] /about renders with heritage story, stats strip, craft section, locations
- [ ] /contact renders with 4 LocationCards, maps, contact form
- [ ] /faq renders with 14 FAQItems, all expandable
- [ ] /specials renders with specials grid + prices
- [ ] 3 blog posts render with 1200+ words each
- [ ] BlogHero component works
- [ ] BlogCard component works
- [ ] Contact form submits (or shows success state)

### Claude Code Prompt

```
TASK: Build all content pages — about, contact, FAQ, specials, and 3 blog posts.

Read docs/build/03-pages.md pages 8-14 for exact content.

BUILD:

1. app/about/page.tsx — Hero + Our Story + By the Numbers (stats strip) + Our Craft + Locations. 800+ words.

2. app/contact/page.tsx — Hero + 4 LocationCards with Google Maps embed placeholders + ContactForm.
   components/forms/ContactForm.tsx — Name, phone, message, location dropdown. Client-side validation (SA phone format). Submit to /api/quote-request (or show success state if API not ready).

3. app/faq/page.tsx — Hero + 14 FAQItems. All content from 03-pages.md page 11.

4. app/specials/page.tsx — Hero + Specials Grid (WITH prices in antique gold) + Payment Plan section + Trust strip.

5. components/hero/BlogHero.tsx — Title, date, read time, category. Minimal.
   components/cards/BlogCard.tsx — Title, excerpt, date, link.

6. app/blog/[slug]/page.tsx — Dynamic route for blog posts.
   Create 3 blog pages with full content from 03-pages.md pages 12-14:
   - /blog/how-to-choose-tombstone (1200+ words)
   - /blog/inscription-ideas (1200+ words, 30 inscriptions EN + isiZulu)
   - /blog/covering-types-explained (1200+ words)

7. components/forms/QuoteRequestForm.tsx — Shared form for contact + quote requests.

CONTENT: Use exact copy from docs/build/03-pages.md.

VERIFICATION:
- All pages render without errors
- FAQ items expand/collapse correctly
- Blog posts have 1200+ words
- Contact form validates SA phone numbers
- /specials shows prices in antique gold
- npm run build passes
```

---

## PHASE 5 — SEO + ANALYTICS

### Exit Criteria
- [ ] Schema.org JSON-LD on every indexed page (validated via Google Rich Results Test)
- [ ] Meta titles and descriptions on every page (per 03-pages.md)
- [ ] Open Graph tags on every page
- [ ] Facebook Pixel loading on all pages
- [ ] GA4 loading on all pages
- [ ] sitemap.ts generates correct XML
- [ ] robots.ts generates correct rules
- [ ] BreadcrumbList schema on all pages
- [ ] hreflang considerations documented
- [ ] Canonical URLs set on all pages

### Claude Code Prompt

```
TASK: Implement full SEO infrastructure and analytics tracking.

Read docs/build/01-architecture.md section 8 for SEO framework.
Read docs/build/03-pages.md for per-page metadata.

BUILD:

1. lib/constants/seo.ts — Meta title/description templates per page type.

2. Per-page metadata — Add generateMetadata() to every page.tsx with:
   - Title from 03-pages.md
   - Description from 03-pages.md
   - Open Graph (title, description, image, url)
   - Canonical URL
   - robots: "noindex" for /track/* and /design/*

3. Schema.org JSON-LD — Add to every indexed page:
   - Homepage: Organization + LocalBusiness x4 + AggregateRating + WebSite
   - Range pages: Product + AggregateOffer + BreadcrumbList
   - Blog posts: Article + BreadcrumbList
   - Contact: LocalBusiness x4 + BreadcrumbList
   - FAQ: FAQPage + BreadcrumbList
   Use <script type="application/ld+json"> in page components.

4. components/analytics/FacebookPixel.tsx — Loads pixel 3386049621486839. Fires PageView on route change. Client component.

5. components/analytics/GoogleAnalytics.tsx — Loads GA4 (placeholder ID). Client component.

6. app/sitemap.ts — Dynamic sitemap including all marketing pages and blog posts. Excludes /track/*, /design/*, /api/*.

7. app/robots.ts — Allow all, disallow /track/, /design/, /api/.

8. Custom events:
   - whatsapp_click: fire on every WhatsApp link click (Pixel Lead event + GA4 custom event)
   - quote_request: fire on form submission
   - range_view: fire on range page view (Pixel ViewContent)

VERIFICATION:
- npm run build passes
- Check generated sitemap.xml in browser
- Check robots.txt in browser
- Validate homepage schema via copy-paste into Google Rich Results Test
- Check Facebook Pixel fires via browser console (fbq events)
```

---

## PHASE 6 — TRACKING + STUBS + ERROR PAGES

### Exit Criteria
- [ ] /track/[ref] renders progress bar with 11 bilingual stages
- [ ] /track/[ref] with invalid ref shows empathetic error
- [ ] /designer stub renders with WhatsApp CTA and range cards
- [ ] /design/[id] stub renders with WhatsApp CTA
- [ ] Custom 404 renders with warm tone and range links
- [ ] Custom 500 renders with WhatsApp CTA
- [ ] OrderProgressBar, StageIndicator, BilingualStageLabel, ActivityFeed components work

### Claude Code Prompt

```
TASK: Build order tracking, stub pages, and error pages.

Read docs/build/03-pages.md pages 15-17 for content.
Read docs/build/01-architecture.md section 5.7 for tracking components.
Read docs/build/01-architecture.md section 1.4 for error strategy.

BUILD:

1. components/tracking/OrderProgressBar.tsx — 11 stages. Vertical on mobile, horizontal on desktop. Gold for completed, ink for current (pulse), hairline for upcoming.
   components/tracking/StageIndicator.tsx
   components/tracking/BilingualStageLabel.tsx
   components/tracking/ActivityFeed.tsx

2. app/track/[ref]/page.tsx — Fetch order by ref from Supabase. Show progress bar + current stage + activity feed + WhatsApp CTA.
   - If no Supabase data yet, use MOCK DATA for development:
     { reference: "PT-2026-0001", stage: "in_production", customer_first_name: "Thandi", history: [...] }
   - Invalid ref: empathetic error + WhatsApp CTA
   - noindex meta

3. app/designer/page.tsx — Stub per 03-pages.md page 16. H1 + body + WhatsApp CTA + RangeCards below.

4. app/design/[id]/page.tsx — Stub per 03-pages.md page 17. Minimal. noindex.

5. app/not-found.tsx — "We couldn't find that page." + range links + WhatsApp CTA. Lora Italic headline, cream bg.

6. app/error.tsx — "Something went wrong." + WhatsApp CTA + retry button.

VERIFICATION:
- /track/PT-2026-0001 renders with mock data
- /track/INVALID shows error state
- /designer renders with WhatsApp CTA (no "coming soon")
- /design/test renders with stub
- Navigate to /nonexistent → custom 404 renders
- npm run build passes
```

---

## PHASE 7 — PWA + PERFORMANCE

### Exit Criteria
- [ ] PWA manifest.json correct (name, icons, theme colour)
- [ ] Service worker registers and caches catalogue thumbnails
- [ ] PWA installs on Android Chrome
- [ ] Lighthouse >=90 on mobile for /, /ranges/prestige, /contact
- [ ] LCP <3s on simulated 3G
- [ ] No CLS issues
- [ ] All images use next/image with proper sizes/priority
- [ ] Fonts preloaded correctly
- [ ] JS bundle <200KB initial

### Claude Code Prompt

```
TASK: Add PWA support and optimise performance to hit Lighthouse >=90 on mobile.

BUILD:

1. app/manifest.ts — PWA manifest with:
   - name: "Pullen's Tombstones"
   - short_name: "Pullens"
   - theme_color: "#F8F3E9"
   - background_color: "#F8F3E9"
   - display: "standalone"
   - icons (192x192 + 512x512)

2. Service worker (next-pwa or custom):
   - Cache catalogue thumbnails at install
   - StaleWhileRevalidate for product JSON
   - NetworkFirst for pages
   - CacheFirst for fonts

3. Performance audit and fixes:
   - Ensure all hero images use priority prop
   - Ensure all below-fold images use lazy loading
   - Check for CLS: explicit width/height on all images
   - Font preload: Lora Italic + Inter Regular in layout.tsx <head>
   - Code-split: ensure /track and /designer don't bloat initial bundle
   - Remove any unused dependencies

4. Run Lighthouse audits:
   - Homepage mobile: target >=90
   - /ranges/prestige mobile: target >=90
   - /contact mobile: target >=90
   Fix anything below 90.

VERIFICATION:
- npm run build produces no warnings
- Lighthouse mobile >=90 on 3 key pages
- PWA installs on Android Chrome (test with dev tools)
- Service worker registered (check Application tab)
- No font flash (FOUT controlled via font-display: swap + size-adjust)
```

---

## ENVIRONMENT VARIABLES

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://eznppvewksorfoedgzpa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from Supabase dashboard>
SUPABASE_SERVICE_ROLE_KEY=<get from Supabase dashboard>
NEXT_PUBLIC_FB_PIXEL_ID=3386049621486839
NEXT_PUBLIC_GA4_ID=<create GA4 property>
FAL_KEY=<get from fal.ai dashboard>
REPLICATE_API_TOKEN=<get from replicate.com dashboard>
```

Set in Vercel dashboard for production.

---

## SUPABASE MIGRATIONS

Run in order:

```
supabase/migrations/
├── 001_create_tombstone_designs.sql    → Table + RLS
├── 002_create_design_shares.sql        → Table + RLS (future use)
├── 003_create_design_reactions.sql     → Table + RLS (future use)
├── 004_create_design_comments.sql      → Table + RLS (future use)
└── 005_seed_142_designs.sql            → Populate from pipeline output
```

SQL for each migration is in docs/build/01-architecture.md section 3.2.

---

## PRE-DNS-CUTOVER CHECKLIST

Run ALL of these before pointing pullenstombstones.co.za to Vercel:

- [ ] All 17 pages render without console errors
- [ ] Lighthouse >=90 mobile on /, /ranges/prestige, /ranges/baby, /contact
- [ ] Schema validates on all indexed pages (Google Rich Results Test)
- [ ] WhatsApp links: PMB pages → 081 213 0772, Pinetown → 081 213 8812
- [ ] PWA installs on Android Chrome + iOS Safari
- [ ] /track/[ref] works with real Supabase data
- [ ] Sticky WhatsApp bar: visible mobile, hidden desktop
- [ ] `grep -r "lay-bye" src/` → zero results
- [ ] `grep -r "Excellence" src/` → zero results (case-insensitive)
- [ ] `grep -r "#FFFFFF" src/` → zero results in backgrounds
- [ ] `grep -r "#FF6B00\|#FFA500\|#F97316" src/` → zero results
- [ ] `grep -r "Playfair" src/` → zero results
- [ ] Facebook Pixel fires on all pages (verify with Pixel Helper extension)
- [ ] GA4 receives page_view events (verify in GA4 Realtime)
- [ ] Custom 404 page renders correctly
- [ ] robots.txt blocks /track/ and /design/ and /api/
- [ ] sitemap.xml lists all marketing pages
- [ ] OG images render in social preview tools

## POST-DNS-CUTOVER (first 48 hours)

- Hour 0: DNS propagation check (whatsmydns.net)
- Hour 1: Submit sitemap to Google Search Console
- Hour 4: Verify Rich Results appearing
- Hour 24: Check Core Web Vitals (CrUX)
- Hour 48: Compare GA4 sessions vs WordPress baseline
- Ongoing: Monitor 404 errors (old WordPress URLs → set up redirects)

---

*End of Build Plan v2.0 — This is the runbook.*
*Start with Phase 0. Execute one phase per session.*
