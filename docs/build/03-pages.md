# PULLEN'S TOMBSTONES — PAGE CONTENT & STRUCTURE
**Version:** 2.0 | **Date:** 4 May 2026
**Ref:** 01-architecture.md, 02-design-system.md

---

## PAGE 1: HOMEPAGE `/`

### A. Metadata
- **Meta title:** `Pullen's Tombstones | Cast in Stone Since 1982`
- **Meta description:** `Family-run tombstone manufacturer serving KZN since 1982. 22,000+ memorials installed. Browse our ranges or chat on WhatsApp.` (148 chars)
- **OG image:** `og-homepage.png` — Hero photo with logo lockup overlay
- **Schema:** Organization + LocalBusiness x4 + AggregateRating + WebSite + BreadcrumbList
- **Canonical:** `https://pullenstombstones.co.za`

### B. Hero Section
- **Photo brief:** Warm golden-hour shot of a finished granite tombstone in a rural KZN cemetery. Rolling green hills in background. A fresh flower arrangement beside the stone. No people — let the craftsmanship speak.
- **H1 (Lora Italic):** *It's been long enough.*
- **Sub-headline (Lora Roman):** Three generations. One workshop. KZN since 1982.
- **Primary CTA:** "See Our Ranges" → /ranges/prestige
- **Secondary CTA:** "Chat on WhatsApp" → wa.me/27812130772
- **SINCE 1982 mark:** Top-right
- **Logo lockup:** Bottom-left, dark variant

### C. Sections

**1. Trust Strip**
- 4.9★ from 156 reviews · 22,000+ memorials installed · Serving KZN since 1982 · 4 locations
- Full-width cream bar, Poppins eyebrow text, antique gold star icons

**2. Our Ranges (eyebrow: "OUR RANGES")**
- **Heading (Lora Italic):** *Five ranges. One standard of care.*
- 5 RangeCards in horizontal scroll (mobile) / grid (desktop):
  - **Prestige** — Our most popular range. Granite headstones with timeless designs. 20 designs.
  - **Signature** — Premium granite with complex detailing. For families who want something distinctive. 36 designs.
  - **More for Less** — Dignified memorials that respect every budget. Starting from our most accessible prices. 10 designs.
  - **Exclusive** — Bespoke designs for families who envision something unique. Custom quoted. 58 designs.
  - **Baby & Infant** — Small stones, made with the gentlest hands. 18 designs.

**3. Heritage Strip (dark bg #0F0F14)**
- **Eyebrow (antique gold):** SINCE 1982
- **Heading (Lora Italic, cream):** *Three generations of a family workshop*
- **Body (Inter, cream 80% opacity):**
  What started as one man's craft in a Pietermaritzburg workshop has grown into KZN's most trusted memorial manufacturer. Three generations of the Pullen family have shaped granite into lasting tributes.

  Today, our team of 38 craftspeople work across four locations. Every stone is cut, polished, and engraved by hand. Every inscription is confirmed with the family before production begins.

  We've installed more than 22,000 memorials across KwaZulu-Natal. Each one carries a family's story.
- **CTA:** "About Our Story" → /about

**4. Testimonials (eyebrow: "WHAT FAMILIES SAY")**
- **Heading (Lora Italic):** *In their words*
- 3 Google review cards (real reviews, names, dates, 5-star ratings)
- Note: Pull from Google Places API or hardcode initial 3 verified reviews

**5. FAQ Teaser (eyebrow: "COMMON QUESTIONS")**
- **Heading (Lora Italic):** *Questions families ask us*
- Top 4 FAQs:
  1. How much does a tombstone cost in South Africa?
  2. How long does it take to make a tombstone?
  3. Do you offer a payment plan?
  4. What is the difference between covering types?
- **CTA:** "See All FAQs" → /faq

**6. Our Locations (eyebrow: "FIND US")**
- **Heading (Lora Italic):** *Four locations across KZN*
- 4 LocationCards:
  1. **Pietermaritzburg HQ** — 46 Allandale Drive · 033 387 8913 · WhatsApp 081 213 0772
  2. **Pinetown** — 9 Circuit Road, Westmead · 068 111 5782 · WhatsApp 081 213 8812
  3. **Church Street, PMB** — 557 Church Street · Opening hours TBC
  4. **Ladysmith** — 78 Murchison Street · Opening soon
- **Pinetown note:** "Serving Durban, Pinetown, and surrounding areas" with link to /pinetown

**7. Final CTA (dark bg #0F0F14)**
- **Heading (Lora Italic, cream):** *Ready to honour someone you love?*
- **Sub (Inter, cream):** Chat with our team. No pressure, no rush.
- **CTA:** WhatsApp button → wa.me/27812130772

### D. CTA Stack
- Primary: /ranges/prestige (most popular)
- Secondary: WhatsApp
- Tertiary: /faq

### E. SEO
- **Word count target:** 800+
- **Primary keyword:** tombstones pietermaritzburg
- **Secondary:** tombstones kzn, memorial headstones, tombstone company pmb, granite headstones
- **Internal links:** /ranges/prestige, /about, /faq, /contact, /pinetown, /specials

---

## PAGE 2: PINETOWN `/pinetown`

### A. Metadata
- **Meta title:** `Tombstones Durban & Pinetown | Pullen's Since 1982`
- **Meta description:** `Tombstone showroom in Pinetown, Durban. Granite headstones from R3,200. Visit us at 9 Circuit Road, Westmead or chat on WhatsApp.` (140 chars)
- **Schema:** LocalBusiness (Pinetown) + BreadcrumbList
- **Canonical:** `https://pullenstombstones.co.za/pinetown`

### B. Hero
- **Photo brief:** Pinetown showroom exterior or Durban skyline at golden hour with a granite slab in foreground.
- **H1 (Lora Italic):** *Serving Durban families since 1982*
- **Sub-headline:** Visit our Pinetown showroom or chat on WhatsApp.
- **Primary CTA:** "Chat on WhatsApp" → wa.me/27812138812
- **WhatsApp number:** 081 213 8812 (Pinetown)

### C. Sections
Mirror homepage structure but Pinetown-focused:
- Pinetown location details prominent
- Map embed for 9 Circuit Road, Westmead
- Ranges preview linking to same range pages
- Trust signals (same business, same quality)
- FAQ teaser
- **CTA with Pinetown WhatsApp number**

### D. SEO
- **Word count:** 600+
- **Primary keyword:** tombstones durban
- **Secondary:** headstones pinetown, tombstone showroom durban, granite memorial durban

---

## PAGES 3-7: RANGE PAGES `/ranges/[slug]`

### Template Structure (all 5 ranges follow this)

#### A. Metadata Pattern
- **Title:** `[Range] Tombstones | Pullen's KZN`
- **Description:** `[Range description]. Browse [X] designs or chat on WhatsApp for a quote.`
- **Schema:** Product + AggregateOffer + BreadcrumbList

#### B. Hero
- **Eyebrow (Poppins):** [RANGE NAME] RANGE
- **H1 (Lora Italic):** [Emotional headline per range]
- **Sub (Lora Roman):** [X] designs · [Budget tier] · Chat on WhatsApp for a quote
- **CTA:** "Chat on WhatsApp" + "View All Designs"

#### C. Sections
1. **Design Grid** — All designs in range, 3/4/5-col responsive
2. **About This Range** — 400+ words of genuine content about materials, process, who it's for
3. **Covering Types** — Brief explanation with link to /blog/covering-types-explained
4. **Trust Strip** — 22,000+ installs, 4.9★
5. **Cross-sell** — "Also explore" with 2 other range cards
6. **CTA Strip** — WhatsApp

---

### PAGE 3: PRESTIGE `/ranges/prestige`

- **H1:** *Mama, I did it.*
- **Angle:** PRIDE (Ukuziqhenya)
- **Sub:** 20 designs · Mid-range · Chat on WhatsApp for a quote
- **Body:** Our most popular range. The Prestige collection features classic granite headstones in black, grey, and pink granite. Clean lines, respectful proportions, and room for meaningful inscriptions.

  Most families choose Prestige. These are stones that stand the test of KZN's weather — the summer rains, the winter frost of the Midlands. Each one is cut from solid granite and finished by hand in our Allandale workshop.

  Available with all four covering types: head and base, kerbs and chips, tiles, or full slab. Your choice depends on the cemetery's requirements and your family's preference.

- **Primary keyword:** granite headstone south africa
- **Word count:** 400+

### PAGE 4: SIGNATURE `/ranges/signature`

- **H1:** *When the family gathers*
- **Angle:** UNVEILING (Imindeni)
- **Sub:** 36 designs · Premium · Chat on WhatsApp for a quote
- **Body:** Premium granite with complex designs. Hearts, crosses, open books, angel wings — each design tells a story. Signature stones are for families who want the memorial to say something about the person it honours.

  These are our most detailed pieces. Some take three weeks to engrave. The detailing is done by senior craftsmen who've been with us for over a decade.

- **Primary keyword:** granite memorial headstone

### PAGE 5: MORE FOR LESS `/ranges/more-for-less`

- **H1:** *A memorial that honours, at a price that respects*
- **Angle:** CARE (Ukunakekela)
- **Sub:** 10 designs · Affordable · Chat on WhatsApp for a quote
- **Body:** Dignified memorials for families working within a budget. These are not lesser stones — they are crafted from the same granite, by the same team, in the same workshop.

  The difference is in the design complexity. Simpler lines, fewer engraved elements, smaller dimensions. The quality of the granite and the care in production is identical.

  We offer flexible payment plans. A 50% deposit gets production started, with the balance due before installation. No interest, no hidden fees.

- **Primary keyword:** affordable tombstones south africa
- **Note:** This page must NOT feel cheap or apologetic. Dignified positioning.

### PAGE 6: EXCLUSIVE `/ranges/exclusive`

- **H1:** *One of a kind, because they were*
- **Angle:** LEGACY (Ilifa)
- **Sub:** 58 designs · Bespoke · Chat on WhatsApp to discuss your vision
- **Body:** Custom-designed memorials for families with a specific vision. These are collaborative projects — you bring the idea, our design team brings it to life in granite.

  We've created stones shaped like guitars, open bibles, traditional Zulu shields, and abstract sculptures. If you can describe it, we can discuss it.

  Every Exclusive project starts with a conversation. There are no fixed designs here — just starting points for your imagination.

- **Primary keyword:** custom engraved tombstone south africa

### PAGE 7: BABY & INFANT `/ranges/baby`

- **H1:** *Small stones, gentle hands*
- **Angle:** CARE (Ukunakekela) — gentlest tone
- **Sub:** 18 designs · Made with care
- **CTA:** "We're here when you're ready" → WhatsApp (NOT "Get a quote")
- **Body:** There is no harder stone to make than a small one. Our baby and infant memorials are crafted with particular care by our most experienced team members.

  These stones are smaller in dimension but carry the same weight of love. Hearts, teddy bears, tiny hands, sleeping angels — each design was chosen for its tenderness.

  There is no rush. If you are not ready to choose today, that is perfectly fine. When you are, we are here.

- **Primary keyword:** baby headstones kzn
- **Sensitivity:** No pricing language at all. No budget tiers. No "affordable". Just care.
- **No cross-sell** on this page — don't push other ranges on grieving parents.

---

## PAGE 8: SPECIALS `/specials`

### A. Metadata
- **Meta title:** `Tombstone Specials May 2026 | Pullen's KZN`
- **Meta description:** `May 2026 tombstone specials. Granite headstones from R3,200. Payment plans available. Visit 4 KZN showrooms or chat on WhatsApp.` (142 chars)
- **Schema:** Product + Offer (with prices) + BreadcrumbList

### B. Hero
- **H1 (Lora Italic):** *May 2026 specials*
- **Sub:** Limited monthly deals on selected tombstones. Payment plans available.

### C. Sections
1. **Specials Grid** — Featured deals WITH prices (this is the only page that shows prices)
   - Each special: design image, range, original context, **special price in antique gold**
   - "Enquire on WhatsApp" per item
2. **Payment Plan section**
   - "We offer flexible payment plans on all orders. A 50% deposit gets production started. Balance is due before installation. No interest. No hidden fees."
3. **Trust** — 4.9★, since 1982

### D. SEO
- **Word count:** 400+
- **Primary keyword:** tombstone prices 2026
- **Note:** This page must be updated monthly. Content-managed or manually updated.

---

## PAGE 9: ABOUT `/about`

### A. Metadata
- **Meta title:** `About Pullen's Tombstones | KZN Since 1982`
- **Meta description:** `Three generations, 22,000+ memorials, 38 craftspeople. Learn about KZN's most trusted tombstone manufacturer since 1982.` (130 chars)
- **Schema:** Organization + LocalBusiness x4 + BreadcrumbList

### B. Hero
- **Photo brief:** Black-and-white archival photo of the original workshop (if available) or current team photo outside Allandale factory.
- **H1 (Lora Italic):** *She raised us. We honour her.*
- **Sub:** Three generations. One workshop. KZN since 1982.
- **Angle:** LEGACY (Ilifa)

### C. Sections

**1. Our Story (eyebrow: OUR STORY)**
- **Heading (Lora Italic):** *From one workshop to four locations*
- In 1982, the Pullen family opened a small granite workshop on Allandale Drive in Pietermaritzburg. The first stones were cut by hand, polished with patience, and installed with pride.

  Forty-four years later, that workshop has grown into KZN's most trusted memorial manufacturer. We've expanded to four locations — Pietermaritzburg, Pinetown, Church Street, and Ladysmith — with a team of 38 craftspeople.

  The family's hands are still in the work. The same care that shaped the first stone shapes every stone today.

**2. By the Numbers (eyebrow: THE NUMBERS)**
Stats strip:
- 22,000+ memorials installed
- 4.9★ from 156 Google reviews
- 44 years in business
- 4 locations across KZN
- 38 skilled craftspeople

**3. Our Craft (eyebrow: OUR CRAFT)**
- **Heading (Lora Italic):** *How a memorial is made*
- Every tombstone starts as a rough granite block. It is cut to size, ground smooth, and polished to a mirror finish. Designs are transferred by tracing, and inscriptions are sandblasted into the surface — letter by letter.

  The covering — whether kerbs and chips, tiles, or a full slab — is prepared separately. On installation day, our team arrives at the cemetery with everything pre-fitted. A standard installation takes 4-6 hours.

  Before any production begins, the family must confirm the inscription digitally. We send a preview via WhatsApp. Once confirmed, the stone goes into production. No exceptions.

**4. Locations (eyebrow: FIND US)**
- 4 LocationCards with WhatsApp CTAs

### D. SEO
- **Word count:** 800+
- **Primary keyword:** tombstone company kzn
- **Internal links:** /, /ranges/prestige, /contact, /faq, /blog/covering-types-explained

---

## PAGE 10: CONTACT `/contact`

### A. Metadata
- **Meta title:** `Contact Pullen's Tombstones | 4 KZN Locations`
- **Meta description:** `Visit our showrooms in PMB, Pinetown, Church Street or Ladysmith. Or chat on WhatsApp — we're here to help.` (118 chars)
- **Schema:** LocalBusiness x4 (full geo + openingHours) + BreadcrumbList

### B. Hero
- **H1 (Lora Italic):** *Visit us, or chat from anywhere*
- **Sub:** Four showrooms across KZN. WhatsApp is always open.

### C. Sections
1. **Locations Grid** — 4 LocationCards with Google Maps embeds:
   - **Pietermaritzburg HQ:** 46 Allandale Drive, Allandale, PMB 3201. Mon-Fri 7:30-16:30, Sat 8:00-12:00. 033 387 8913. WhatsApp 081 213 0772.
   - **Pinetown:** 9 Circuit Road, Westmead. Mon-Fri 7:30-16:30, Sat 8:00-12:00. 068 111 5782. WhatsApp 081 213 8812.
   - **Church Street:** 557 Church Street, PMB Central. Hours TBC.
   - **Ladysmith:** 78 Murchison Street. Opening soon.

2. **Contact Form** — Name, phone, message, location preference dropdown

### D. SEO
- **Word count:** 300+
- **Primary keyword:** tombstone showroom pietermaritzburg

---

## PAGE 11: FAQ `/faq`

### A. Metadata
- **Meta title:** `Tombstone FAQ South Africa | Pullen's`
- **Meta description:** `Answers to common questions about tombstones, prices, payment plans, inscriptions, and covering types. Pullen's KZN since 1982.` (139 chars)
- **Schema:** FAQPage + BreadcrumbList

### B. Hero
- **H1 (Lora Italic):** *Questions families ask us*
- **Sub:** If your question isn't here, chat on WhatsApp — we'll answer personally.

### C. FAQ Items (14)

**1. How much does a tombstone cost in South Africa?**
Tombstone prices depend on the range, size, granite colour, covering type, and extras like photo engraving. Our ranges start from R3,200, with most families investing between R5,500 and R12,000. For an accurate quote, chat with us on WhatsApp — we'll walk you through the options.

**2. How long does it take to make a tombstone?**
From confirmed inscription to installation, most orders take 3-6 weeks. The timeline depends on design complexity, covering type, and installation scheduling. We'll give you an estimated date when your deposit is paid.

**3. Do you offer a payment plan?**
Yes. We offer flexible payment plans on all orders. A 50% deposit starts production. The balance is due before installation. There's no interest and no hidden fees. Chat with us on WhatsApp to discuss payment options.

**4. What is the difference between covering types?**
There are four main covering types:
- **Head and Base (Kerbs & Chips):** The headstone sits on a base, surrounded by concrete kerbs filled with marble chips. The most common and affordable option.
- **Tiles:** The base area is covered with matching granite or ceramic tiles. Neat and easy to maintain.
- **Full Slab:** A solid granite slab covers the entire grave area. The most premium option.
Each cemetery may have restrictions on which types are allowed. We'll advise based on your cemetery.

**5. Can I customise the inscription?**
Absolutely. You write the inscription, and we engrave it exactly as confirmed. You'll receive a digital preview via WhatsApp before we begin. Once you reply YES, production starts. Changes after confirmation may incur additional costs. 80 letters are included free of charge; additional letters are charged at R5 each.

**6. Do you install at any cemetery in KZN?**
We install at most cemeteries across KwaZulu-Natal. Transport within 50km of our factory is free. Beyond 50km, a transport fee applies. Chat with us to confirm installation at your cemetery.

**7. How do I confirm my inscription is correct before production?**
We send a digital preview of your inscription via WhatsApp. Check every name, date, and word carefully. Reply 1 to confirm, or 2 to request changes. Once confirmed, no changes can be made without a written request and possible additional cost. This is the most important step — take your time.

**8. What is the difference between granite colours?**
We work with six main granite colours: Black (most common), Grey, Pink, Blue Pearl, Red, and Green. Black granite shows sandblasted inscriptions most clearly. The choice is yours — we'll show you samples at any of our showrooms.

**9. Can my family see the design before I order it?**
Yes. When our online designer tool launches, you'll be able to create a design and share a link with your family via WhatsApp. For now, our team will send you a design preview via WhatsApp that you can forward to family members.

**10. Do you remove old tombstones before installing the new one?**
Yes. If there's an existing tombstone that needs to be removed, we can arrange this. Removal is quoted separately — currently R1,500. The old stone is disposed of respectfully.

**11. What is the warranty or guarantee?**
All our tombstones carry a structural warranty. Granite is one of the most durable natural stones — it resists weather, cracking, and fading. If there is a defect in material or workmanship, we will repair or replace it at no cost. Normal wear from extreme weather events is not covered.

**12. How do I track my order?**
Once your deposit is paid, you'll receive a tracking link via WhatsApp. Open it anytime to see your order's progress through our 11-stage pipeline — from inscription confirmation through to installation. No login required.

**13. What happens at an unveiling ceremony? (Ukuvulwa kwetshe)**
Ukuvulwa kwetshe is the ceremony where the tombstone is formally unveiled, usually 6-12 months after burial. The family gathers, prayers are offered, and the tombstone is revealed by removing a cloth covering. It is a significant event in many cultures across KZN. We can schedule installation to align with your planned unveiling date.

**14. Do you make baby and infant headstones?**
Yes. Our Baby range includes 18 designs made specifically for infant memorials — hearts, teddy bears, sleeping angels, and other gentle forms. These stones are crafted with particular care by our most experienced team members. There is no rush to decide. When you are ready, we are here.

### D. SEO
- **Word count:** 1500+ (all Q&As combined)
- **Primary keyword:** how much does a tombstone cost in sa
- **Internal links:** /ranges/more-for-less, /ranges/baby, /blog/covering-types-explained, /contact, /specials

---

## PAGE 12: BLOG — HOW TO CHOOSE `/blog/how-to-choose-tombstone`

### A. Metadata
- **Meta title:** `How to Choose a Tombstone | Pullen's Guide`
- **Meta description:** `A guide for families choosing a tombstone in South Africa. Ranges, materials, inscriptions, covering types and what to expect.` (139 chars)
- **Schema:** Article + BreadcrumbList

### B. Content (1200+ words)

**H1 (Lora Italic):** *How to choose a tombstone for someone you love*

**Introduction:**
Choosing a tombstone is one of the most personal decisions a family makes together. There is no right answer — only what feels right for the person you are honouring and the family that gathers around their memory.

This guide walks through the decisions you'll face, from granite type to inscription wording. Take your time. There is no deadline on grief.

**Section: Start with the range**
Tombstones are grouped into ranges based on design complexity and size. At Pullen's, we offer five ranges: More for Less, Prestige, Signature, Exclusive, and Baby. Most families start by browsing the ranges to see which designs resonate.

The range determines the base price. Within each range, the final price depends on size, granite colour, covering type, and extras.

**Section: Choose your granite**
Six colours are commonly available: Black, Grey, Pink, Blue Pearl, Red, and Green. Black granite is the most popular — sandblasted inscriptions show crisp white against the dark surface. Pink and grey granites offer a softer look. Blue Pearl has a distinctive shimmer.

Visit one of our showrooms to see and touch the granite samples. Photos don't fully capture the depth and texture of each stone.

**Section: Decide on the covering type**
The covering is the area around and beneath the headstone. There are four options: head and base with kerbs and chips, tiles, or full slab. Your cemetery may restrict which types are allowed — check with us before deciding. (→ link to /blog/covering-types-explained)

**Section: Write the inscription**
This is the most important part. The inscription carries the name, dates, and words that will endure for generations. Common elements include: full name, birth and death dates, a short message or scripture verse, and the names of loved ones.

We include 80 letters free of charge (spaces not counted). Extra letters are R5 each. Our team will send you a digital preview via WhatsApp — check every letter, every date, every name before confirming. (→ link to /blog/inscription-ideas)

**Section: Consider extras**
Options include photo engraving (a photograph etched into the granite), flower vases, vinyl lettering, and marble chips for the covering. Each adds to the memorial's personalisation.

**Section: Understand the process**
Once you've chosen a design and confirmed the inscription, a 50% deposit starts production. Your order moves through our 11-stage pipeline. You'll receive a tracking link via WhatsApp. The balance is due before installation. A typical order takes 3-6 weeks from deposit to installation.

**Section: Talk to us**
If you're unsure where to start, chat with us on WhatsApp. We've helped over 22,000 families make this decision. There is no pressure, no rush, and no wrong question.

### C. SEO
- **Word count:** 1200+
- **Primary keyword:** buy tombstone online south africa
- **Internal links:** /ranges/prestige, /ranges/baby, /blog/inscription-ideas, /blog/covering-types-explained, /faq, /contact

---

## PAGE 13: BLOG — INSCRIPTIONS `/blog/inscription-ideas`

### A. Metadata
- **Meta title:** `Tombstone Inscription Ideas | EN & isiZulu`
- **Meta description:** `30 real tombstone inscription ideas in English and isiZulu. Dignified wording for headstones, chosen by real KZN families.` (134 chars)
- **Schema:** Article + BreadcrumbList

### B. Content (1200+ words)

**H1 (Lora Italic):** *Words that endure*

**Introduction:**
The inscription is what people read when they visit. It is the voice of the memorial — the words a family chooses to represent a lifetime. These are real inscription patterns used by families across KZN, shared here as starting points for your own.

**English inscriptions:**
1. In Loving Memory of [Name] / [Date] - [Date] / Forever in Our Hearts
2. Rest in Peace / Gone but Never Forgotten
3. A Beloved Mother, Grandmother and Friend
4. Until We Meet Again
5. Your Memory is Our Keepsake
6. With Christ, Which is Far Better — Philippians 1:23
7. The Lord is My Shepherd — Psalm 23
8. A Life So Beautifully Lived Deserves to Be Beautifully Remembered
9. In God's Care / [Name] / [Date] - [Date]
10. Safe in the Arms of Jesus

**isiZulu inscriptions:**
11. Lala Ngoxolo (Rest in Peace)
12. Uhambe Kahle (Go Well)
13. Ungalibali Uthando Lwakho (Your Love Will Not Be Forgotten)
14. Sikhumbula Wena Njalo (We Remember You Always)
15. Ulele Ngoxolo KuNkulunkulu (Resting in Peace with God)
16. Umama Wethu Othandekayo (Our Beloved Mother)
17. Ubaba Wethu Othandekayo (Our Beloved Father)
18. Inkumbulo Yakho Iyohlala Nathi (Your Memory Will Stay With Us)
19. Hamba Kahle, Silale Ngoxolo (Go Well, We Rest in Peace)
20. UNkulunkulu Akubusise (God Bless You)

**Bilingual inscriptions:**
21. In Loving Memory / Isikhumbulo Sothando / [Name]
22. Rest in Peace / Lala Ngoxolo / [Name] / [Dates]
23. Forever in Our Hearts / Enhliziyweni Yethu Njalo
24. Gone but Not Forgotten / Uhambile Kodwa Asikhohliwe

**Baby and infant inscriptions:**
25. Too Beautiful for Earth
26. Our Little Angel / [Name] / [Dates]
27. Born Sleeping / Forever Loved
28. Small Hands, Big Heart
29. Held for a Moment, Loved for a Lifetime
30. Ingelosi Yethu Encane (Our Little Angel)

**Note on choosing words:**
Take your time. Discuss with family. The inscription should feel true to the person it honours, not borrowed from a list. If you need help, our team has guided thousands of families through this step. Chat with us on WhatsApp.

### C. SEO
- **Word count:** 1200+
- **Primary keyword:** tombstone inscription ideas
- **Internal links:** /faq, /ranges/prestige, /blog/how-to-choose-tombstone, /contact

---

## PAGE 14: BLOG — COVERING TYPES `/blog/covering-types-explained`

### A. Metadata
- **Meta title:** `Tombstone Covering Types Explained | Pullen's`
- **Meta description:** `Kerbs & chips, tiles, or full slab? Understand the differences between tombstone covering types and which is right for your cemetery.` (147 chars)
- **Schema:** Article + BreadcrumbList

### B. Content (1200+ words)

**H1 (Lora Italic):** *Kerbs and chips, tiles, or slab — which covering is right?*

**Introduction:**
The covering is everything around and beneath the headstone. It frames the memorial and protects the grave area. There are four main options, each with different costs, aesthetics, and maintenance needs.

**Head and Base (Kerbs & Chips):**
The headstone sits on a granite base. Concrete kerbs form a border around the grave area, and the inside is filled with marble chips. This is the most common and affordable option. The marble chips can be white, grey, or mixed. They need occasional topping up as they settle. Erection cost: R2,500.

**Tiles:**
Granite or ceramic tiles cover the base area within the kerbs. This creates a neat, flat surface that's easy to maintain. Tiles resist weed growth better than chips. Erection cost: R2,500.

**Full Slab (Kerbs & Slab):**
A solid granite slab covers the entire grave area. This is the most premium option — it creates a seamless, polished surface from headstone to foot. It is also the most expensive. Erection cost: R3,200.

**Head and Base Only:**
For cemeteries that don't allow kerbs, the headstone sits on a simple granite base. This is the most minimal option. Erection cost: R1,200.

**Cemetery restrictions:**
Some cemeteries have rules about which covering types are allowed. Municipal cemeteries often restrict slab installations. Private and church cemeteries tend to be more flexible. We'll check the rules for your cemetery before quoting.

**Which should I choose?**
Budget, maintenance preference, and cemetery rules narrow the choice. Kerbs and chips are the most popular. Full slab is the premium choice. Tiles are the practical middle ground. There is no wrong answer.

### C. SEO
- **Word count:** 1200+
- **Primary keyword:** tombstone covering types
- **Internal links:** /faq, /ranges/prestige, /blog/how-to-choose-tombstone, /contact

---

## PAGE 15: ORDER TRACKING `/track/[ref]`

### A. Metadata
- **Meta:** `noindex, nofollow`
- **Title:** `Track Order [REF] | Pullen's Tombstones`
- **No schema** (private page)

### B. Structure

1. **Header:** "Order [REF]" + "Welcome back, [First Name]"
2. **Progress Bar** — 11 stages with bilingual labels:
   | # | English | isiZulu |
   |---|---------|---------|
   | 1 | Enquiry received | Sicelo silufakile |
   | 2 | Inscription pending | Silinda umbhalo |
   | 3 | Inscription confirmed | Umbhalo uqinisekisiwe |
   | 4 | Quote sent | Intengo ithunyelwe |
   | 5 | Deposit paid | Idiphozithi ikhokhiwe |
   | 6 | In production | Iyakhiwa |
   | 7 | Ready | Isikhulile |
   | 8 | Installation scheduled | Ukufakwa kuhlelelwe |
   | 9 | Installed | Ifakiwe |
   | 10 | Review requested | Sicela ibuyekezo |
   | 11 | Closed | Iqedile |
3. **Current Stage Card** — Gold highlight, last update, ETA
4. **Activity Feed** — Last 5 stage changes
5. **CTA:** "Chat on WhatsApp" → routes to order's location

### C. Error States
- Invalid ref: "We couldn't find that order. Double-check the reference, or chat with us on WhatsApp."
- Old closed order (>12 months): Show final state + "Need a new tombstone? Start here."

---

## PAGE 16: DESIGNER STUB `/designer`

- **H1 (Lora Italic):** *Design your memorial*
- **Body:** Our online designer is being built. In the meantime, our team will walk you through every option — from range to inscription to covering type. All on WhatsApp, at your pace.
- **CTA:** "Start on WhatsApp" → wa.me/27812130772
- **Below:** 5 RangeCards for browsing
- **Meta title:** `Design Your Tombstone Online | Pullen's KZN`
- **Schema:** WebApplication (future)
- **Note:** No "coming soon" language. It's phrased as "our team will guide you" which is true and useful.

---

## PAGE 17: DESIGN SHARE STUB `/design/[id]`

- **H1 (Lora Italic):** *This link will be active soon*
- **Body:** We're building a way for families to view and discuss designs together. In the meantime, chat with us on WhatsApp and we'll send you a design preview directly.
- **CTA:** WhatsApp
- **Meta:** `noindex, nofollow`

---

*End of Page Content v2.0 — Prompt 3 complete*
*Next: Prompt 5 (Build Plan Translator) — Prompt 4 skipped*
