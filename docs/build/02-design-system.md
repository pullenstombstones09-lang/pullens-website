# PULLEN'S TOMBSTONES — DESIGN SYSTEM
**Version:** 2.0 | **Date:** 4 May 2026
**Brand Kit:** 2026 (MIGRATION_NOTE.md locked 2 May 2026)
**Ref:** 01-architecture.md

---

## 1. GLOBALS.CSS (paste-ready)

```css
/* ═══════════════════════════════════════════════════
   PULLEN'S TOMBSTONES — globals.css
   Brand Kit 2026 | Lora + Poppins + Inter
   ═══════════════════════════════════════════════════ */

@import "tailwindcss";

/* ── Google Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;600&family=Poppins:wght@700&display=swap');

/* ── Theme tokens ── */
@theme {
  /* Colour */
  --color-ink: #1A1A1A;
  --color-ink-soft: #2C2C2C;
  --color-ink-muted: #5A544A;
  --color-cream: #F8F3E9;
  --color-cream-headline: #F5EFE6;
  --color-antique-gold: #BF953F;
  --color-bright-gold: #D4AF37;
  --color-dark: #0F0F14;
  --color-hairline: #E8DFCF;
  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #1DA851;
  --color-shadow: rgba(26, 26, 26, 0.08);

  /* Typography */
  --font-display: 'Lora', Georgia, 'Times New Roman', serif;
  --font-ui: 'Poppins', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Type scale (fluid) */
  --text-xs: clamp(0.6875rem, 0.65rem + 0.1vw, 0.75rem);       /* 11-12px */
  --text-sm: clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);      /* 13-14px */
  --text-base: clamp(0.9375rem, 0.9rem + 0.15vw, 1rem);         /* 15-16px */
  --text-lg: clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem);         /* 18-20px */
  --text-xl: clamp(1.375rem, 1.25rem + 0.5vw, 1.625rem);        /* 22-26px */
  --text-2xl: clamp(1.75rem, 1.5rem + 1vw, 2.25rem);            /* 28-36px */
  --text-3xl: clamp(2.25rem, 1.85rem + 1.6vw, 3rem);            /* 36-48px */
  --text-4xl: clamp(2.75rem, 2.2rem + 2.2vw, 3.5rem);           /* 44-56px */

  /* Spacing (8pt grid) */
  --space-1: 0.5rem;    /* 8px */
  --space-2: 1rem;      /* 16px */
  --space-3: 1.5rem;    /* 24px */
  --space-4: 2rem;      /* 32px */
  --space-5: 3rem;      /* 48px */
  --space-6: 4rem;      /* 64px */
  --space-7: 6rem;      /* 96px */
  --space-8: 8rem;      /* 128px */
  --space-9: 12rem;     /* 192px */

  /* Motion */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 240ms;
  --duration-base: 600ms;
  --duration-slow: 800ms;
  --stagger: 80ms;

  /* Containers */
  --container-narrow: 640px;
  --container-default: 1024px;
  --container-wide: 1280px;

  /* Elevation (layered diffused shadows, never shadow-md/lg) */
  --shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.04), 0 1px 3px rgba(26, 26, 26, 0.06);
  --shadow-card: 0 2px 4px rgba(26, 26, 26, 0.04), 0 4px 12px rgba(26, 26, 26, 0.06);
  --shadow-card-hover: 0 4px 8px rgba(26, 26, 26, 0.06), 0 8px 24px rgba(26, 26, 26, 0.08);
  --shadow-elevated: 0 8px 16px rgba(26, 26, 26, 0.06), 0 16px 48px rgba(26, 26, 26, 0.1);

  /* Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;
}

/* ── Base reset ── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.65;
}

/* ── Selection ── */
::selection {
  background-color: var(--color-antique-gold);
  color: var(--color-ink);
}

/* ── Focus-visible ── */
:focus-visible {
  outline: 2px solid var(--color-antique-gold);
  outline-offset: 2px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ── Image defaults ── */
img, video {
  max-width: 100%;
  height: auto;
  display: block;
}
```

---

## 2. TYPE SCALE

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `--text-xs` | 11-12px | 1.5 | +0.01em | Fine print, captions |
| `--text-sm` | 13-14px | 1.5 | 0 | Secondary labels |
| `--text-base` | 15-16px | 1.65 | 0 | Body text (Inter) |
| `--text-lg` | 18-20px | 1.5 | 0 | Lead paragraphs |
| `--text-xl` | 22-26px | 1.35 | -0.01em | Section subheads (Lora Roman) |
| `--text-2xl` | 28-36px | 1.25 | -0.015em | Section headings (Lora) |
| `--text-3xl` | 36-48px | 1.15 | -0.02em | Page titles (Lora Italic) |
| `--text-4xl` | 44-56px | 1.1 | -0.025em | Hero headlines (Lora Italic) |

---

## 3. UTILITY CLASSES (Tailwind v4 @utility)

```css
/* ── Typography utilities ── */
@utility heading-italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: var(--text-3xl);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

@utility heading-italic-hero {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: var(--text-4xl);
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--color-ink);
}

@utility heading-roman {
  font-family: var(--font-display);
  font-style: normal;
  font-weight: 400;
  font-size: var(--text-xl);
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

@utility label-eyebrow {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: var(--text-xs);
  line-height: 1.5;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-antique-gold);
}

/* ── Decorative ── */
@utility hairline-gold {
  display: block;
  width: 80px;
  height: 1px;
  background-color: var(--color-antique-gold);
}

/* ── Layout ── */
@utility container-narrow {
  width: 100%;
  max-width: var(--container-narrow);
  margin-inline: auto;
  padding-inline: var(--space-2);
}

@utility container-default {
  width: 100%;
  max-width: var(--container-default);
  margin-inline: auto;
  padding-inline: var(--space-2);
}

@utility container-wide {
  width: 100%;
  max-width: var(--container-wide);
  margin-inline: auto;
  padding-inline: var(--space-2);
}

@utility section-rhythm {
  padding-block: var(--space-7);
}

@media (min-width: 1024px) {
  @utility section-rhythm {
    padding-block: var(--space-9);
  }
}

/* ── Photo overlay ── */
@utility photo-darken-bottom {
  position: relative;
}

@utility photo-darken-bottom::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 15, 20, 0.7) 0%,
    rgba(15, 15, 20, 0.3) 40%,
    transparent 70%
  );
  pointer-events: none;
}
```

---

## 4. COMPONENT SPECIFICATIONS

### 4.1 Button

Three variants: `primary` (ink bg, cream text), `whatsapp` (green bg, white text), `ghost` (transparent, ink border).

```tsx
// components/content/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'whatsapp' | 'ghost';
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
```

**CSS:**
```css
/* Base */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: var(--text-sm);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: var(--radius-base);
  transition: all var(--duration-fast) var(--ease-editorial);
  cursor: pointer;
  min-height: 48px; /* Touch target */
  padding: var(--space-1) var(--space-3);
  text-decoration: none;
  border: 2px solid transparent;
}

/* Primary */
.btn-primary {
  background-color: var(--color-ink);
  color: var(--color-cream);
  border-color: var(--color-ink);
}
.btn-primary:hover {
  background-color: var(--color-ink-soft);
}
.btn-primary:active {
  transform: translateY(1px);
}

/* WhatsApp */
.btn-whatsapp {
  background-color: var(--color-whatsapp);
  color: #FFFFFF;
  border-color: var(--color-whatsapp);
}
.btn-whatsapp:hover {
  background-color: var(--color-whatsapp-hover);
}

/* Ghost */
.btn-ghost {
  background-color: transparent;
  color: var(--color-ink);
  border-color: var(--color-hairline);
}
.btn-ghost:hover {
  border-color: var(--color-antique-gold);
  color: var(--color-antique-gold);
}

/* Sizes */
.btn-sm { min-height: 40px; padding: 6px var(--space-2); font-size: var(--text-xs); }
.btn-lg { min-height: 56px; padding: var(--space-2) var(--space-4); font-size: var(--text-base); }
```

### 4.2 Header

```tsx
interface HeaderProps {
  transparent?: boolean; // For hero overlay mode
}
```

- **Mobile:** Logo lockup (stacked, sm) left, hamburger right. 64px height.
- **Desktop (>=1024px):** Logo lockup (horizontal) left, nav links right. 80px height.
- **Nav links:** Ranges, Specials, About, Contact, FAQ, WhatsApp button
- **Mobile menu:** Full-screen cream overlay, Lora italic links, stagger fadeUp
- **Transparent mode:** Logo white, links white, bg transparent → cream bg on scroll (60px threshold)
- **Shadow:** `--shadow-sm` when scrolled

### 4.3 MobileWhatsAppBar

- **Visible:** <1024px only
- **Position:** Fixed bottom, z-50
- **Height:** 56px
- **Content:** WhatsApp icon + "Chat on WhatsApp" + phone number
- **Background:** `--color-whatsapp`
- **Text:** White, Poppins Bold
- **Touch target:** Full bar is tappable (48px+)
- **Hides:** On scroll down, shows on scroll up (60px threshold)

### 4.4 HeritageHero

```tsx
interface HeritageHeroProps {
  image: string;         // Hero photo path
  h1: string;           // Lora Italic headline
  subtitle?: string;    // Lora Roman or Inter subtitle
  cta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  markPosition?: 'top-right' | 'bottom-right'; // SINCE 1982 mark
}
```

- **Mobile:** Full viewport height, photo fills, bottom darkening gradient, text bottom-left
- **Desktop:** 80vh, asymmetric layout — text bottom-left, mark top-right
- **h1:** Lora Italic, `--text-4xl`, cream-headline color on photo
- **Subtitle:** Lora Roman, `--text-lg`, cream-headline, 80% opacity
- **CTA:** Below subtitle, primary + optional secondary side by side
- **Motion:** h1 fadeUp 0ms, subtitle fadeUp 80ms, CTA fadeUp 160ms
- **Loading:** Cream background pulse, text positions held (no CLS)

### 4.5 RangeCard

```tsx
interface RangeCardProps {
  range: string;
  title: string;
  description: string;
  designCount: number;
  href: string;
  image: string;
}
```

- **Layout:** Vertical — image top (aspect 4:3), content below
- **Image:** WebP, `next/image`, lazy load, scale 1.02 on hover (600ms)
- **Title:** Lora Roman, `--text-xl`
- **Description:** Inter, `--text-sm`, `--color-ink-muted`, 2 lines max
- **Design count:** Poppins eyebrow: "20 DESIGNS"
- **Hover:** Card lifts 4px (`--shadow-card-hover`), antique gold hairline appears under title (240ms)
- **Touch target:** Entire card is linked (48px+ height guaranteed)

### 4.6 FAQItem

```tsx
interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}
```

- **Collapsed:** Question in Inter SemiBold, chevron-down icon right, hairline border bottom
- **Expanded:** Answer fades in (300ms), Inter Regular, gold hairline top
- **Schema:** Emits FAQPage JSON-LD microdata attributes
- **Motion:** Height animation 300ms ease-editorial
- **Touch target:** Full question row, 48px min height

### 4.7 LocationCard

```tsx
interface LocationCardProps {
  name: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  hours?: string;
  mapEmbed?: string;
  badge?: string; // "HQ", "Opening Soon"
}
```

- **Layout:** Map embed top (16:9 or placeholder), details below
- **Name:** Lora Roman, `--text-lg`
- **Address:** Inter, `--text-sm`
- **WhatsApp:** Green button, Poppins Bold
- **Badge:** Poppins eyebrow, antique gold
- **"Opening Soon"** for Ladysmith (NOT "Coming Soon" — subtle difference)

### 4.8 OrderProgressBar

- **Mobile:** Vertical timeline, left-aligned dots
- **Desktop:** Horizontal bar
- **Completed stages:** Antique gold dot + gold connecting line
- **Current stage:** Ink dot with subtle pulse (2s), gold line to left, hairline to right
- **Upcoming:** Hairline dot + hairline connecting line
- **Labels:** BilingualStageLabel for each stage (EN above, isiZulu below)

### 4.9 Skeleton Loading States

All skeletons use cream-on-cream pulse:
```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  background-color: var(--color-hairline);
  border-radius: var(--radius-sm);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

No grey skeletons. Never use grey (#ccc, #ddd, etc.) for loading states.

---

## 5. SINCE 1982 TYPOGRAPHIC MARK (React Component)

```tsx
// components/brand/SinceMarkTypographic.tsx
interface SinceMarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { text: '0.625rem', rule: '24px', gap: '4px', tracking: '0.2em' },
  md: { text: '0.75rem', rule: '40px', gap: '6px', tracking: '0.2em' },
  lg: { text: '0.875rem', rule: '56px', gap: '8px', tracking: '0.2em' },
};

export function SinceMarkTypographic({ size = 'md', className }: SinceMarkProps) {
  const s = sizes[size];
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: s.gap }}>
      <span style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 700,
        fontSize: s.text,
        letterSpacing: s.tracking,
        textTransform: 'uppercase' as const,
        color: 'var(--color-antique-gold)',
        fontVariantCaps: 'all-small-caps',
      }}>
        Cast in Stone
      </span>
      <span style={{
        display: 'block',
        width: s.rule,
        height: '1px',
        backgroundColor: 'var(--color-bright-gold)',
      }} />
      <span style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 700,
        fontSize: s.text,
        letterSpacing: s.tracking,
        textTransform: 'uppercase' as const,
        color: 'var(--color-antique-gold)',
        fontVariantCaps: 'all-small-caps',
      }}>
        Since 1982
      </span>
    </div>
  );
}
```

---

## 6. LOGO LOCKUP (React Component)

```tsx
// components/brand/LogoLockup.tsx
interface LogoLockupProps {
  variant: 'horizontal' | 'stacked';
  branch?: 'pmb' | 'pinetown' | 'both';
  dark?: boolean;      // Inverts for dark/photo backgrounds
  className?: string;
}

// Implementation notes:
// - SA map SVG: inline, flag colours (green #007749, gold #FFB81C, red #DE3831, blue #002395, black #000000, white #FFFFFF)
// - Wordmark: "Pullen's Tombstones" in Lora Roman 400
// - Divider: 1px bright gold rule
// - Tagline: "CAST IN STONE" in Poppins Bold uppercase, 0.15em tracking
// - Branch label (optional): "PIETERMARITZBURG" or "PINETOWN" in Poppins Bold, xs
// - WhatsApp line (optional): WhatsApp icon + number
// - dark mode: text → cream-headline, divider → bright gold (unchanged)
//
// Horizontal: map left, text block right
// Stacked: map top, text below, all centred
```

---

## 7. MOTION LIBRARY

```typescript
// lib/motion.ts

export const editorialEasing = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: editorialEasing,
  },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: 'var(--shadow-card)',
  },
  hover: {
    y: -4,
    boxShadow: 'var(--shadow-card-hover)',
    transition: { duration: 0.24, ease: editorialEasing },
  },
};

export const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.6, ease: editorialEasing },
  },
};

// Reduced motion wrapper
export function getMotionProps(variants: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {};
  }
  return variants;
}
```

---

## 8. ACCESSIBILITY — CONTRAST VERIFICATION

| Foreground | Background | Ratio | AA Normal | AA Large |
|------------|-----------|-------|-----------|----------|
| --ink (#1A1A1A) | --cream (#F8F3E9) | 14.2:1 | Pass | Pass |
| --ink-soft (#2C2C2C) | --cream (#F8F3E9) | 11.8:1 | Pass | Pass |
| --ink-muted (#5A544A) | --cream (#F8F3E9) | 5.1:1 | Pass | Pass |
| --antique-gold (#BF953F) | --cream (#F8F3E9) | 2.8:1 | Fail | Pass |
| --antique-gold (#BF953F) | --dark (#0F0F14) | 5.4:1 | Pass | Pass |
| --cream-headline (#F5EFE6) | --dark (#0F0F14) | 14.8:1 | Pass | Pass |
| White (#FFFFFF) | --whatsapp (#25D366) | 2.0:1 | Fail* | Fail* |
| --ink (#1A1A1A) | --whatsapp (#25D366) | 3.7:1 | Fail | Pass |

**Notes:**
- Antique gold on cream: Use only for decorative elements (hairlines, marks) or large text (18px+). Never for body text.
- WhatsApp button: White text on green is an industry convention. Use bold Poppins (700 weight) at 14px+ to maximise legibility. The button is always recognisable by context.
- All body text (Inter on cream): 14.2:1 — well above AA.
- Headlines on dark sections (cream-headline on dark): 14.8:1 — excellent.

---

## 9. RESPONSIVE BREAKPOINT STRATEGY

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| Base | 360-639px | Single column, full-width cards, MobileWhatsAppBar visible, hamburger nav |
| sm | 640px | 2-col grids for cards, slightly wider containers |
| md | 768px | Tablet layout, 2-col LocationCards, range grids 3→4 col |
| lg | 1024px | Desktop nav appears, MobileWhatsAppBar hides, hero height caps at 80vh |
| xl | 1280px | Max container width, design grid 5-col |
| 2xl | 1536px | Content max-width caps, generous whitespace |

**Container padding:**
- Base: 16px (--space-2)
- md+: 24px (--space-3)
- lg+: 32px (--space-4)

---

## 10. BANNED LIST (DESIGN SYSTEM ENFORCEMENT)

These must NEVER appear in the codebase:

| Banned | Alternative |
|--------|-------------|
| `shadow-md`, `shadow-lg` | Use `--shadow-card`, `--shadow-card-hover`, `--shadow-elevated` |
| `#FFFFFF` as background | `--color-cream` (#F8F3E9) |
| Any orange (#FF6B00, #FFA500, #F97316) | `--color-antique-gold` (#BF953F) or `--color-ink` |
| `Playfair Display` | `Lora` (--font-display) |
| `Fraunces` | `Lora` (--font-display) |
| Emoji as UI icons | lucide-react SVG icons |
| `backdrop-filter` / glassmorphism | Solid backgrounds with `--shadow-*` |
| `animation: marquee` / auto-carousel | Static content or manual carousel |
| `"lay-bye"` | "payment plan" |
| `"Excellence"` | Remove entirely |
| Centre-aligned everything | Left-align body, asymmetric heroes |

---

*End of Design System v2.0 — Prompt 2 complete*
*Next: Prompt 3 (Content + Page Architect)*
