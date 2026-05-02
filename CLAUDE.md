@AGENTS.md

# Pullens Website — Project CLAUDE.md

## What This Is

Public-facing website for Pullen's Tombstones, replacing the WordPress at pullenstombstones.co.za. PWA-ready, SEO/AEO-first, mobile-first, bilingual (EN + isiZulu).

**Master source of truth:** `C:\Users\Annika\Desktop\Pullens OS Main\PULLENS_MASTER_SOURCE_OF_TRUTH.md`

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Database | Supabase (shared with pullens-admin) — project eznppvewksorfoedgzpa |
| Auth | None for public pages; PIN login for (os) route group (future) |
| Hosting | Vercel |
| Icons | lucide-react (SVG only) |
| Images | Sharp (build-time processing), WebP served from /public/catalogue/ |
| Testing | Playwright |

## Infrastructure

| Resource | Value |
|---|---|
| Supabase project ref | eznppvewksorfoedgzpa |
| GitHub account | pullenstombstones09-lang |
| Vercel team | pullenstombstones09-langs-projects |
| Meta Pixel ID | 3386049621486839 |
| GA4 ID | TBD — create property |
| Live domain | pullenstombstones.co.za (DNS transfer when ready) |
| Staging | pullens-website.vercel.app (not yet deployed) |

## Status — 2 May 2026

### DONE
- [x] Task 1: Brand foundation — fonts (Lora + Inter), colours, layout shell, header, footer, WhatsApp bar
- [x] Task 2: SEO infrastructure — JSON-LD (LocalBusiness, Product, FAQ, Breadcrumb, Organization), Meta Pixel, GA4
- [x] Task 3: Catalogue data layer — types, manifest, 5 ranges with metadata
- [x] Task 4: UI components — Section (scroll fade-in), Button (3 variants), TrustBadges, RangeCard, ProductGrid
- [x] Task 5: Homepage — hero, ranges preview, heritage strip, trust, FAQ teaser, locations, CTA
- [x] Task 6: Range pages — overview + 5 individual pages (Prestige, Signature, More for Less, Exclusive, Baby)
- [x] Task 7: FAQ page — 12 Q&As with FAQPage schema
- [x] Task 8: Contact page — 2 locations, maps, WhatsApp CTAs, LocalBusiness schema
- [x] Task 9: About page — heritage story, stats, craft section, locations
- [x] Task 10: Specials page — May 2026 deals, price grid, payment plans
- [x] Task 11: Pinetown page — local landing page for Durban/Pinetown
- [x] Task 12: Playwright test suite — 18 tests (navigation, SEO, mobile), all passing
- [x] Task 13: Pushed to GitHub (pullenstombstones09-lang/pullens-website)
- [x] Blog pages — /blog index + 3 articles (how-to-choose, inscription-ideas, covering-types)
- [x] PWA manifest.json + OG metadata + robots.txt + dynamic sitemap.ts

### NOT YET DONE
- [ ] Deploy to Vercel (connect repo, set env vars, assign domain)
- [ ] Task 14: Copy catalogue images (batch pipeline partially done — 36/141 processed)
- [ ] Review all pages visually in browser
- [ ] Track/[ref] order tracking page (future)
- [ ] Designer tool page (future)
- [ ] Design/[id] family sharing page (future)
- [ ] Service worker for offline (future)
- [ ] Lora font woff2 files in /public/fonts/ (currently using next/font/google)
- [ ] Logo SVG file
- [ ] OG image (actual graphic — placeholder metadata in place)
- [ ] Design polish pass (user noted style is bland — revisit after functional completion)

### IMAGE PIPELINE
- Replicate API token active (account "annika catalogue")
- Model: `bria/remove-background` (tested, approved)
- Post-process: gradient bg (#0f0f0f → #2a2a2a), shadow, padding, sharpen, WebP output
- Batch script: `C:\Users\Annika\Desktop\Pullens OS Main\batch-pipeline.mjs`
- Output: `C:\Users\Annika\Desktop\Pullens OS Main\catalogue-output/`
- Progress: 36/141 images done (B-Range complete, EX-Range complete, M-Range partial)
- Script has skip-if-exists logic — just re-run to resume

## Build Plan
Full plan at: `docs/superpowers/plans/2026-05-01-pullens-website.md`

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
  track/[ref]/      → /track/[ref] (future)
  designer/         → /designer (future)
  design/[id]/      → /design/[id] (future)
(os)/               → Staff OS (future, separate from pullens-admin)
```

## Brand Rules (DO NOT VIOLATE)
1. NO shadow-md — use layered diffused shadows
2. NO emoji as UI icons — SVG only (lucide-react)
3. NO pure white #ffffff backgrounds — use off-white #FAFAF8 or cream #FDF6E3
4. NO "lay-bye" — always "payment plan"
5. NO "coming soon" placeholders
6. Lora Bold for headings, Inter for body
7. Orange (#FF6B00) for CTAs, Navy (#0d2d5e) for secondary
8. 48px minimum touch targets
9. Mobile-first always
10. Progressive reveal animations (fadeInUp)

## Locked Decisions
1. Fresh scaffold (not reusing old partial code)
2. Single repo with route groups: (public) + (os)
3. Project at C:\Users\Annika\pullens-website
4. Bria for image pipeline (not rembg)
5. Next.js 16 + React 19 + Tailwind v4
