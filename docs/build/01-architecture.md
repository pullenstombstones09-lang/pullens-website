# PULLEN'S TOMBSTONES — TECHNICAL ARCHITECTURE BLUEPRINT
**Version:** 2.0 | **Date:** 4 May 2026
**Brand Kit:** 2026 (MIGRATION_NOTE.md locked 2 May 2026)
**Stack:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + Supabase

---

## 1. INFORMATION ARCHITECTURE

### 1.1 Complete Sitemap

```
pullenstombstones.co.za/
├── /                               → Homepage (PMB-default)
├── /pinetown                       → Durban/Pinetown location landing
├── /ranges/
│   ├── /ranges/prestige            → Most popular range
│   ├── /ranges/signature           → Premium granite
│   ├── /ranges/more-for-less       → Affordable positioning
│   ├── /ranges/exclusive           → Custom + bespoke
│   └── /ranges/baby                → Infant memorials
├── /specials                       → Monthly deals WITH prices
├── /about                          → Heritage + team
├── /contact                        → All 4 locations
├── /faq                            → 14+ Q&As
├── /blog/
│   ├── /blog/how-to-choose-tombstone
│   ├── /blog/inscription-ideas
│   └── /blog/covering-types-explained
├── /track/[ref]                    → Order tracking (noindex)
├── /designer                       → Stub (post-launch)
├── /design/[id]                    → Stub (post-launch)
└── /not-found                      → Custom 404
```

### 1.2 Logical Grouping

| Group | Pages | Auth | Index |
|-------|-------|------|-------|
| Marketing | /, /pinetown, /about, /contact, /specials | None | Yes |
| Catalogue | /ranges/* | None | Yes |
| Content | /blog/*, /faq | None | Yes |
| Functional | /track/[ref] | None (ref = auth) | No |
| Future Tools | /designer, /design/[id] | None | /designer yes, /design no |
| Error | /not-found, error.tsx | None | No |

### 1.3 Breadcrumb Structure

| Page | Breadcrumb |
|------|-----------|
| / | Home |
| /ranges/prestige | Home > Ranges > Prestige |
| /blog/inscription-ideas | Home > Blog > Inscription Ideas |
| /faq | Home > FAQ |
| /contact | Home > Contact |
| /track/PT-2026-0001 | Home > Track Order (noindex, no breadcrumb in schema) |

### 1.4 Error Strategy

**404 (not-found.tsx):**
- Warm tone: "We couldn't find that page."
- Sub-line: "Perhaps you were looking for one of our ranges?"
- Quick links: Homepage, Ranges, Contact, WhatsApp CTA
- Lora Italic headline, cream background, antique gold hairline
- No stock "broken page" illustrations

**500 (error.tsx):**
- "Something went wrong on our end."
- WhatsApp CTA: "Chat with us directly on WhatsApp"
- Retry button
- Logs error to console (no external error service for v1)

---

## 2. USER JOURNEY MAPPING

### Path A: WhatsApp Ad → Quote
```
FB/IG Ad (WhatsApp CTA) → wa.me/27812130772
OR
FB/IG Ad (Website CTA) → / → scroll ranges → /ranges/prestige → "Chat on WhatsApp" → wa.me
```
**Touchpoints:** 2-3 pages, <60s to WhatsApp
**Critical metric:** WhatsApp click rate from range pages

### Path B: Google Search → Quote
```
Google "tombstones pmb" → / (or /ranges/prestige if deep-linked)
→ Browse ranges → Select range → View designs
→ "Chat on WhatsApp for a quote" → wa.me
```
**Touchpoints:** 2-4 pages
**Critical metric:** Organic landing → WhatsApp conversion

### Path C: Returning Customer → Track Order
```
WhatsApp message with tracking link → /track/PT-2026-0001
→ See 11-stage progress bar → Current stage + ETA
→ "Chat on WhatsApp" if questions
```
**Touchpoints:** 1 page (direct link)
**Critical metric:** Zero friction to status

### Path D: Family Share (Future — Stub)
```
WhatsApp group receives /design/[id] link
→ Opens in mobile browser (no app, no login)
→ Stub page: "Our designer tool is being built. Chat on WhatsApp to start designing."
```
**Touchpoints:** 1 page
**Note:** Route exists, real functionality post-launch

### Path E: Bereaved Family → Baby Memorials
```
Google "baby headstones kzn" → /ranges/baby
→ Gentle copy, no pricing pressure, empathetic CTA
→ "We're here when you're ready. Chat on WhatsApp."
```
**Touchpoints:** 1-2 pages
**Critical metric:** Sensitivity of experience (qualitative), WhatsApp clicks

---

## 3. DATA ARCHITECTURE

### 3.1 Existing Tables (Supabase project eznppvewksorfoedgzpa)

These tables exist or will be created for the OS. The website READS from them:

| Table | Website Access | Purpose |
|-------|---------------|---------|
| `customers` | Read (tracking page) | Show first name on /track/[ref] |
| `orders` | Read (tracking page) | Order stage, dates, reference |
| `order_history` | Read (tracking page) | Stage change timestamps |
| `order_line_items` | None (OS only) | — |
| `inscription_versions` | None (OS only) | — |
| `order_comms` | None (OS only) | — |
| `b2b_accounts` | None (OS only) | — |
| `staff` | None (OS only) | — |

### 3.2 New Tables for Website

#### `tombstone_designs`
```sql
CREATE TABLE tombstone_designs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text UNIQUE NOT NULL,          -- 'P1', 'S12', 'B3'
  name            text NOT NULL,                 -- 'Heart with Cross'
  range           text NOT NULL,                 -- 'prestige'|'signature'|'more_for_less'|'exclusive'|'baby'
  description     text,
  thumbnail_url   text NOT NULL,                 -- WebP, 400px wide
  clean_image_url text,                          -- Transparent PNG from Bria pipeline
  model_3d_url    text,                          -- GLB from Meshy (null until generated)
  materials       text[] DEFAULT '{black}',      -- granite colours available
  sizes           jsonb DEFAULT '[]',            -- [{label, dimensions, base_price}]
  inscription_zone jsonb,                        -- {x, y, width, height} as % of image
  sort_order      integer DEFAULT 0,
  featured        boolean DEFAULT false,
  active          boolean DEFAULT true,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

ALTER TABLE tombstone_designs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active designs"
  ON tombstone_designs FOR SELECT
  USING (active = true);
```

#### `design_shares` (future — create table now, don't build UI)
```sql
CREATE TABLE design_shares (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id           uuid REFERENCES tombstone_designs(id),
  inscription_text    text,
  covering_type       text,
  extras              jsonb DEFAULT '{}',
  cemetery_photo_url  text,
  composited_url      text,
  expires_at          timestamptz DEFAULT (now() + interval '90 days'),
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE design_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read shares by ID"
  ON design_shares FOR SELECT
  USING (expires_at > now());
CREATE POLICY "Public can create shares"
  ON design_shares FOR INSERT
  WITH CHECK (true);
```

#### `design_reactions` (future)
```sql
CREATE TABLE design_reactions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id            uuid REFERENCES design_shares(id) ON DELETE CASCADE,
  reaction_type       text NOT NULL,
  session_id          text NOT NULL,
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE design_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read reactions"
  ON design_reactions FOR SELECT USING (true);
CREATE POLICY "Public can add reactions"
  ON design_reactions FOR INSERT WITH CHECK (true);
```

#### `design_comments` (future)
```sql
CREATE TABLE design_comments (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id            uuid REFERENCES design_shares(id) ON DELETE CASCADE,
  anonymous_name      text DEFAULT 'Family',
  text                text NOT NULL CHECK (char_length(text) <= 200),
  session_id          text NOT NULL,
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE design_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read comments"
  ON design_comments FOR SELECT USING (true);
CREATE POLICY "Public can add comments"
  ON design_comments FOR INSERT WITH CHECK (true);
```

### 3.3 Website Write Operations

| Operation | Table | Trigger |
|-----------|-------|---------|
| Quote request | `customers` (upsert by phone) | /api/quote-request |
| Design share | `design_shares` | /api/design-save (future) |
| Reaction | `design_reactions` | /design/[id] page (future) |
| Comment | `design_comments` | /design/[id] page (future) |

---

## 4. API SURFACE

### 4.1 Active Route Handlers

#### `POST /api/quote-request`
- **Input:** `{ name, phone, message?, range?, design_code?, location? }`
- **Action:** Upsert customer in Supabase, trigger n8n webhook for WhatsApp notification to staff
- **Rate limit:** 3 requests per phone per hour (Upstash)
- **Response:** `{ success: true }`

#### `GET /api/track/[ref]`
- **Input:** Order reference from URL (e.g. `PT-2026-0001`)
- **Action:** Query `orders` + `order_history` + `customers.full_name` (first name only)
- **Rate limit:** 10 requests per IP per minute
- **Response:** `{ reference, stage, customer_first_name, history[], location_id }`

### 4.2 Future Route Handlers (Stub — Return 501)

| Route | Purpose |
|-------|---------|
| `POST /api/design-save` | Save design to design_shares |
| `GET /api/design-share/[id]` | Get shared design |
| `POST /api/cemetery-composite` | AI composite |

### 4.3 Webhook Endpoints (Phase 2+)

| Route | Source | Purpose |
|-------|--------|---------|
| `POST /api/webhook/respondio` | Respond.io | Inbound WhatsApp messages |
| `POST /api/webhook/order-update` | n8n | Order stage change |

### 4.4 Rate Limiting

- **Tool:** Upstash Redis (free tier: 10K commands/day)
- **Pattern:** Sliding window, per-IP for reads, per-phone for writes

---

## 5. COMPONENT INVENTORY

### 5.1 Layout (5)

| Component | Props | Purpose |
|-----------|-------|---------|
| `RootLayout` | `{ children }` | App shell — fonts, meta, analytics |
| `Header` | `{ transparent?: boolean }` | Nav — logo + hamburger (mobile) / links (desktop) |
| `Footer` | — | 4 locations, ranges, legal, WhatsApp |
| `Container` | `{ width?: 'narrow'\|'default'\|'wide' }` | Max-width wrapper |
| `MobileWhatsAppBar` | `{ phone, label? }` | Sticky bottom (<1024px) |

### 5.2 Hero (3)

| Component | Props |
|-----------|-------|
| `HeritageHero` | `{ image, h1, subtitle, cta, secondaryCta?, markPosition? }` |
| `RangeHero` | `{ range, h1, subtitle, designCount }` |
| `BlogHero` | `{ title, date, readTime, category }` |

### 5.3 Cards (5)

| Component | Props |
|-----------|-------|
| `RangeCard` | `{ range, title, description, designCount, href, image }` |
| `DesignCard` | `{ design: TombstoneDesign, onClick? }` |
| `TestimonialCard` | `{ name, text, rating, date }` |
| `BlogCard` | `{ title, excerpt, date, href, image? }` |
| `LocationCard` | `{ name, address, phone, whatsapp, mapEmbed?, hours }` |

### 5.4 Forms (2)

| Component | Props |
|-----------|-------|
| `QuoteRequestForm` | `{ defaultRange?, onSuccess }` |
| `ContactForm` | `{ location? }` |

### 5.5 Trust (4)

| Component | Props |
|-----------|-------|
| `GoogleReviewCard` | `{ name, text, rating, date, avatar? }` |
| `StarRating` | `{ rating, count? }` |
| `SinceMarkTypographic` | `{ size?: 'sm'\|'md'\|'lg' }` |
| `TrustStrip` | `{ className? }` |

### 5.6 Content (6)

| Component | Props |
|-----------|-------|
| `RichText` | `{ children }` |
| `FAQItem` | `{ question, answer, defaultOpen? }` |
| `BilingualBlock` | `{ en, zu, layout?: 'inline'\|'stacked' }` |
| `GoldHairline` | `{ width?, className? }` |
| `Section` | `{ eyebrow?, heading?, children }` |
| `Button` | `{ variant: 'primary'\|'whatsapp'\|'ghost', href?, size?, icon? }` |

### 5.7 Tracking (4)

| Component | Props |
|-----------|-------|
| `OrderProgressBar` | `{ currentStage, stages[] }` |
| `StageIndicator` | `{ stage, status: 'complete'\|'current'\|'upcoming' }` |
| `BilingualStageLabel` | `{ en, zu, status }` |
| `ActivityFeed` | `{ events[] }` |

### 5.8 Brand (2)

| Component | Props |
|-----------|-------|
| `LogoLockup` | `{ variant: 'horizontal'\|'stacked', branch?, dark? }` |
| `SinceMarkTypographic` | `{ size?: 'sm'\|'md'\|'lg' }` |

### 5.9 Analytics (2)

| Component | Props |
|-----------|-------|
| `FacebookPixel` | `{ pixelId }` |
| `GoogleAnalytics` | `{ gaId }` |

**All components:**
- Mobile-first responsive (360px base → 640 → 768 → 1024 → 1280)
- Loading: cream-on-cream pulse skeleton
- Error: antique gold hairline + ink-muted text
- Empty: Lora italic centered + faint hairline
- Motion: fadeUp 600ms editorial easing, 80ms stagger

---

## 6. PAGE BLUEPRINTS

### 6.1 Homepage `/`

| Section | Content | CTA | Mobile Height |
|---------|---------|-----|---------------|
| Hero | Full-bleed KZN golden hour photo, asymmetric Lora Italic h1, SINCE 1982 mark top-right | "See Our Ranges" + "Chat on WhatsApp" | 100vh |
| Trust Strip | 4.9★ · 22,000+ Installs · Since 1982 · 4 Locations | — | 48px |
| Ranges Preview | 5 RangeCards (horizontal scroll mobile / grid desktop) | Each card → range | ~400px |
| Heritage Strip | Dark (#0F0F14) bg, Lora Italic headline, GoldHairline, 3 generations copy | "About Our Story" | ~300px |
| Testimonials | 3 Google review cards | "Read More Reviews" | ~350px |
| FAQ Teaser | Top 4 FAQItems | "See All FAQs" | ~400px |
| Locations | 4 LocationCards (2-col desktop) | WhatsApp per location | ~500px |
| Final CTA | Dark strip: "Ready to honour someone you love?" | WhatsApp | ~200px |
| Footer | Standard | — | ~300px |

**Schema:** Organization + LocalBusiness x4 + AggregateRating + WebSite + BreadcrumbList

### 6.2 Pinetown `/pinetown`

Same structure as homepage but Pinetown-focused. WhatsApp: 081 213 8812.
**Schema:** LocalBusiness (Pinetown) + BreadcrumbList

### 6.3 Range Pages `/ranges/[slug]`

| Section | Content | CTA |
|---------|---------|-----|
| Range Hero | Range name, design count, budget tier | "Chat on WhatsApp" |
| Design Grid | All designs (3-col mobile, 4-col tablet, 5-col desktop) | Each: "Learn More" |
| Range Description | 400+ words, covering types, materials | — |
| Trust | 22,000+ installs, 4.9★ | — |
| Cross-sell | 2 other ranges | Links |
| CTA Strip | "Ready to choose?" | WhatsApp |

**Schema:** Product + AggregateOffer + FAQPage + BreadcrumbList
**Pricing:** Budget tier labels only. No Rand amounts.
**Baby exception:** Gentlest tone, no tier labels, CTA: "We're here when you're ready"

### 6.4 Specials `/specials`

Monthly rotating deals WITH prices. Only page showing prices.
**Schema:** Product + Offer (with price) + BreadcrumbList

### 6.5 About `/about`

Heritage story, stats strip, craft section, team, locations.
**Schema:** Organization + LocalBusiness x4 + BreadcrumbList

### 6.6 Contact `/contact`

4 LocationCards with maps, hours, WhatsApp. Contact form.
**Schema:** LocalBusiness x4 (full geo + openingHours) + BreadcrumbList

### 6.7 FAQ `/faq`

14+ expandable Q&As, bilingual where appropriate.
**Schema:** FAQPage + BreadcrumbList

### 6.8 Blog `/blog/[slug]`

1200+ words, Lora headings, Inter body, internal links.
**Schema:** Article + BreadcrumbList

### 6.9 Track `/track/[ref]`

11-stage progress bar, bilingual labels, activity feed, WhatsApp CTA.
**Meta:** `noindex, nofollow`

### 6.10 Designer Stub `/designer`

"Design your memorial" — WhatsApp CTA, range cards. No "coming soon".

### 6.11 Design Share Stub `/design/[id]`

Minimal stub. WhatsApp CTA. `noindex`.

---

## 7. PERFORMANCE BENCHMARKS

| Metric | Target |
|--------|--------|
| LCP | <2.5s desktop, <3s 3G mobile |
| INP | <200ms |
| CLS | <0.1 |
| Initial JS | <200KB |

### Image Strategy
- WebP/AVIF, `next/image` with `sizes`, priority on heroes only, lazy below fold
- Catalogue thumbnails: 400px WebP, ~7MB total for PWA cache

### Font Strategy
- Preload: Lora Italic 400 + Inter Regular 400
- Async: Poppins Bold 700
- Subset: Latin + Latin Extended

### PWA Cache
| Resource | Strategy | TTL |
|----------|----------|-----|
| Catalogue thumbnails | CacheFirst | Weekly refresh |
| Product JSON | StaleWhileRevalidate | 24h |
| Marketing pages | NetworkFirst | 1h |
| Fonts | CacheFirst | 30 days |

---

## 8. SEO FRAMEWORK

### URL Conventions
Lowercase, hyphenated, no trailing slash, no .html. Self-referencing canonicals.

### Meta Title Formulas

| Page Type | Formula |
|-----------|---------|
| Homepage | `Pullen's Tombstones \| Cast in Stone Since 1982` |
| Range | `[Range] Tombstones \| Pullen's KZN` |
| Blog | `[Title] \| Pullen's Tombstones Blog` |
| Location | `Tombstones [City] \| Pullen's Since 1982` |
| FAQ | `Tombstone FAQ South Africa \| Pullen's` |
| Contact | `Contact Pullen's Tombstones \| 4 KZN Locations` |
| Specials | `Tombstone Specials [Month Year] \| Pullen's KZN` |

### Schema.org Markup

- **Homepage:** Organization + LocalBusiness x4 + AggregateRating + WebSite
- **Range pages:** Product + AggregateOffer + FAQPage (2-3 range FAQs)
- **Blog:** Article + BreadcrumbList
- **Contact:** LocalBusiness x4 with full geo + openingHours
- **FAQ:** FAQPage with all 14+ Q&As
- **Track:** noindex (no schema)
- **Designer (future):** WebApplication

### hreflang
v1: no separate /zu/ routes. isiZulu woven into English pages.
Post-launch: add /zu/ if analytics justify.

### robots.txt
```
User-agent: *
Allow: /
Disallow: /track/
Disallow: /design/
Disallow: /api/
Sitemap: https://pullenstombstones.co.za/sitemap.xml
```

### Target Keywords

| Page | Primary | Secondary |
|------|---------|-----------|
| / | tombstones pietermaritzburg | tombstones kzn, memorial headstones pmb |
| /pinetown | tombstones durban | headstones pinetown |
| /ranges/prestige | granite headstone south africa | premium tombstones |
| /ranges/signature | granite memorial headstone | designer tombstone |
| /ranges/more-for-less | affordable tombstones south africa | cheap tombstones durban |
| /ranges/exclusive | custom engraved tombstone south africa | bespoke memorial |
| /ranges/baby | baby headstones kzn | infant memorial south africa |
| /specials | tombstone prices 2026 | tombstone deals kzn |
| /faq | how much does a tombstone cost in sa | tombstone cost, payment plan |
| /blog/how-to-choose | buy tombstone online south africa | choosing a tombstone |
| /blog/inscriptions | tombstone inscription ideas | memorial wording |
| /blog/covering-types | tombstone covering types | kerbs and chips |

---

## 9. TRACKING & ANALYTICS

### Facebook Pixel (3386049621486839)
- `PageView` — all pages
- `ViewContent` — range pages
- `Lead` — WhatsApp click
- `Contact` — form submit

### Google Analytics 4 (TBD)
- `page_view`, `scroll` — automatic
- `whatsapp_click` — custom, includes location + page
- `quote_request` — form submission
- `range_view` — range page visit

### Meta CAPI (Phase 2)
Server-side via n8n or Vercel Edge. Catches ~30% missed events.

---

## 10. APP ROUTER STRUCTURE

```
app/
├── layout.tsx              → RootLayout
├── page.tsx                → Homepage
├── not-found.tsx           → 404
├── error.tsx               → 500
├── sitemap.ts
├── robots.ts
├── manifest.ts
├── pinetown/page.tsx
├── ranges/[slug]/page.tsx
├── specials/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── faq/page.tsx
├── blog/[slug]/page.tsx
├── track/[ref]/page.tsx
├── designer/page.tsx       → Stub
├── design/[id]/page.tsx    → Stub
└── api/
    ├── quote-request/route.ts
    └── track/[ref]/route.ts

components/
├── layout/     → Header, Footer, Container, MobileWhatsAppBar
├── hero/       → HeritageHero, RangeHero, BlogHero
├── cards/      → RangeCard, DesignCard, TestimonialCard, BlogCard, LocationCard
├── forms/      → QuoteRequestForm, ContactForm
├── trust/      → GoogleReviewCard, StarRating, SinceMarkTypographic, TrustStrip
├── content/    → RichText, FAQItem, BilingualBlock, GoldHairline, Section, Button
├── tracking/   → OrderProgressBar, StageIndicator, BilingualStageLabel, ActivityFeed
├── brand/      → LogoLockup, SinceMarkTypographic
└── analytics/  → FacebookPixel, GoogleAnalytics

lib/
├── supabase/   → client.ts, server.ts, types.ts
├── constants/  → locations.ts, ranges.ts, stages.ts, seo.ts
├── motion.ts
└── utils.ts

public/
├── catalogue/thumbnails/   → WebP 400px (~7MB total)
├── catalogue/models/       → GLB files (future)
├── images/heroes/
├── images/team/
├── images/locations/
├── logo.svg
├── logo-white.svg
└── og-default.png

supabase/migrations/
├── 001_create_tombstone_designs.sql
├── 002_create_design_shares.sql
├── 003_create_design_reactions.sql
├── 004_create_design_comments.sql
└── 005_seed_142_designs.sql
```

---

## 11. ENVIRONMENT VARIABLES

| Variable | Source | Public |
|----------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard | No |
| `NEXT_PUBLIC_FB_PIXEL_ID` | 3386049621486839 | Yes |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics | Yes |
| `FAL_KEY` | fal.ai dashboard | No |
| `REPLICATE_API_TOKEN` | Replicate dashboard | No |
| `UPSTASH_REDIS_REST_URL` | Upstash dashboard | No |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash dashboard | No |

---

## 12. DEPLOYMENT

### Staging
Deploy every commit to `pullens-website.vercel.app`.

### DNS Cutover (when ready)
```
A      @      76.76.21.21
CNAME  www    cname.vercel-dns.com
```

### Pre-Cutover Checklist
- [ ] All 17 pages render without console errors
- [ ] Lighthouse >=90 mobile on /, /ranges/prestige, /ranges/baby, /contact
- [ ] Schema validates on all indexed pages
- [ ] WhatsApp links route to correct numbers
- [ ] PWA installs on Android + iOS
- [ ] No "lay-bye" in codebase
- [ ] No "Excellence" in codebase
- [ ] No #FFFFFF backgrounds
- [ ] No orange hex codes
- [ ] Meta Pixel + GA4 firing
- [ ] 404 page styled
- [ ] robots.txt + sitemap.xml correct

---

*End of Architecture Blueprint v2.0 — Prompt 1 complete*
*Next: Prompt 2 (Design System Builder)*
