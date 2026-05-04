@AGENTS.md

# Pullens Website — Project CLAUDE.md

## What This Is

Public-facing website for Pullen's Tombstones, replacing the WordPress at pullenstombstones.co.za. PWA-ready, SEO/AEO-first, mobile-first, bilingual (EN + isiZulu).

**Master source of truth:** `C:\Users\Annika\Desktop\Archive\_Consolidated_Sources\Pullens-OS-Main\PULLENS_MASTER_SOURCE_OF_TRUTH.md`
**Brand migration note:** `C:\Users\Annika\Desktop\Archive\2026-Campaigns\Pullens-Campaign-Main\MIGRATION_NOTE.md`

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Database | Supabase (shared with pullens-admin) — project eznppvewksorfoedgzpa |
| Auth | None for public pages; PIN login for (os) route group (future) |
| Hosting | Vercel |
| Icons | lucide-react (SVG only) |
| Fonts | Lora (italic + roman headlines), Poppins (UI/labels/marks), Inter (body) |
| Images | Sharp, WebP from /public/catalogue/, Flux heroes via Replicate |
| Testing | Playwright |

## Infrastructure

| Resource | Value |
|---|---|
| Supabase project ref | eznppvewksorfoedgzpa |
| GitHub account | pullenstombstones09-lang |
| Vercel team | pullenstombstones09-langs-projects |
| Meta Pixel ID | 930172350063275 |
| GA4 ID | TBD — create property |
| Live domain | pullenstombstones.co.za (DNS transfer when ready) |
| Staging | pullens-website.vercel.app |
| Replicate token | (env var — do not commit) |
| fal.ai key | (env var — do not commit) |

## Status — 4 May 2026

### DONE (previous sessions)
- [x] 20 pages built and building clean (homepage, 5 ranges, about, contact, FAQ, specials, pinetown, blog x3, sitemap)
- [x] SEO infrastructure — JSON-LD, Meta Pixel, GA4 placeholders
- [x] Catalogue data layer — types, manifest, 5 ranges with metadata
- [x] UI components — Section, Button, TrustBadges, RangeCard, ProductGrid
- [x] Playwright test suite — 18 tests passing
- [x] Pushed to GitHub (pullenstombstones09-lang/pullens-website)
- [x] Three.js viewer prototype (S5 model, covering toggle works)
- [x] Image protection system (no right-click, no print)

### DONE (4 May session)
- [x] **Brand kit 2026 refresh applied:**
  - Fraunces font removed → Lora (italic/roman/bold) + Poppins (UI) loaded
  - Colours updated: antique gold #BF953F, cream #F8F3E9, dark #0F0F14
  - Old orange #FF6B00 removed from constants
  - "Excellence" → "Craftsmanship" in trust badges
- [x] **141 catalogue WebP images** copied from Bria pipeline output into /public/catalogue/
  - B=17, EX=18, M=7, P=62 (incl. 6B, 13B, 13C, 14D, W18), S=37
- [x] **Catalogue code rewritten** — uses actual file lists, handles non-sequential design codes
- [x] **4 Flux hero images generated** via Replicate (hero-homepage, hero-family, hero-workshop, hero-cemetery)
- [x] **Editorial homepage redesign** — full-height hero, CAST IN STONE mark, gold hairlines, dark testimonials, editorial typography, grain textures, layered shadows
- [x] **Header redesigned** — glassmorphic fixed header, Poppins logo, gold WhatsApp CTA
- [x] **Footer redesigned** — editorial dark, brand column + location columns
- [x] **Button component** — gold CTA, border secondary, WhatsApp green, rounded-sm
- [x] **Range card** — dark bg product images, editorial card style, gold underline hover
- [x] **Range card link fixed** — was pointing to /catalogue/ instead of /ranges/
- [x] AI hero images approved by Annika (brand kit rule overridden for heroes)
- [x] Committed at 5a4c2dc

### EXPERIMENTAL (saved in git history, reverted)
- Premium homepage variant with masonry range grid, asymmetric testimonials/locations, cinematic hero, oversized stats — Annika wants to discuss tomorrow before deciding

### TO DO NEXT SESSION
- [ ] **Design direction decision** — Annika to review current vs premium variant, pick direction
- [ ] **Other pages need 2026 brand refresh** — about, contact, faq, specials, pinetown, blog pages still use old navy/orange Tailwind classes (they work because aliases updated in globals.css, but content and layout haven't been redesigned)
- [ ] **OG image** — create actual graphic for social sharing
- [ ] **Favicon** — create proper favicon.ico + icon-192.png
- [ ] **3D viewer** — fix GLB model scaling/camera, integrate into range pages
- [ ] **Deploy to Vercel** — push latest to GitHub, verify on pullens-website.vercel.app
- [ ] **PSD files on E: drive** — 338 PSDs in E:\Images of Range\ (source art, layered). Pipeline already processed these. Annika may want to discuss using PSDs for something specific.
- [ ] Track/[ref] order tracking page
- [ ] Designer tool, family sharing, cemetery placement (all post-launch)
- [ ] Service worker for offline PWA

### IMAGE PIPELINE — COMPLETE
- Replicate API (Bria remove-background) — **all 141 designs processed**
- Output: `C:\Users\Annika\Desktop\Archive\_Consolidated_Sources\Pullens-OS-Main\catalogue-output/`
- All WebP files copied into project at `/public/catalogue/[Range]/`
- Pipeline source images on E: drive (338 PSDs + 146 PNGs/JPGs) — not needed for website
- Hero images: 4 Flux-generated + 6 old Gemini (kept as backup)

## Route Structure
```
(public)/           → Customer-facing website
  page.tsx          → Homepage (/)
  ranges/           → /ranges, /ranges/[slug]
  faq/              → /faq
  contact/          → /contact
  about/            → /about
  specials/         → /specials
  pinetown/         → /pinetown
  blog/             → /blog + 3 articles
  track/[ref]/      → /track/[ref] (future)
  designer/         → /designer (future)
  design/[id]/      → /design/[id] (future)
(os)/               → Staff OS (future, separate from pullens-admin)
```

## Brand Kit 2026 (LOCKED — from MIGRATION_NOTE.md)

### Colours
| Token | Hex | Usage |
|---|---|---|
| --ink | #1A1A1A | Body text, CTA backgrounds |
| --dark | #0F0F14 | Hero/section backgrounds |
| --cream | #F8F3E9 | Page background |
| --gold | #BF953F | Heritage accent, marks, dividers |
| --gold-bright | #D4AF37 | Secondary gold, rules |
| --hairline | #E8DFCF | Borders on cream |
| --whatsapp | #25D366 | WhatsApp CTAs only |

### Fonts
- **Lora Italic** — emotional/heritage headlines
- **Lora Roman** — sub-lines, product titles
- **Poppins Bold** — UI marks, labels (CAST IN STONE / SINCE 1982)
- **Inter** — body text

### BANNED
1. NO orange (#FF6B00 or any orange) — belongs to YeboPro
2. NO pure white #FFFFFF backgrounds
3. NO the word "Excellence" — anywhere
4. NO "lay-bye" — always "payment plan"
5. NO shadow-md/shadow-lg — use layered diffused shadows
6. NO emoji as UI icons — lucide-react SVG only
7. NO Playfair Display or Fraunces — not part of this brand
8. NO scrolling tickers/marquees — use static rotating fade
9. NO "coming soon" placeholders
10. NO curly quotes by default — optional per-design only

### Trust Mark
Stacked typographic mark (NOT the old circular medallion):
- CAST IN STONE (Poppins Bold small caps, antique gold)
- Gold rule (bright gold, 80px)
- SINCE 1982 (Poppins Bold small caps, antique gold)

### Long Tagline
"Three generations. One workshop. KZN since 1982."

## Locked Decisions
1. Single repo with route groups: (public) + (os)
2. Project at C:\Users\Annika\pullens-website
3. Bria for image pipeline (not rembg)
4. Next.js 16 + React 19 + Tailwind v4
5. AI hero images approved for use
6. 5-prompt chain at C:\Users\Annika\Downloads\Pullens_Website_5_Prompt_Chain_v2.md — NOT running fresh start, fixing existing code instead
7. Designer tool / family sharing / cemetery placement are POST-LAUNCH
