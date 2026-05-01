import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RANGES, getRangeBySlug, getCatalogueItems } from "@/lib/catalogue";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ui/product-grid";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  productSchema,
  faqPageSchema,
} from "@/components/seo/schemas";
import type { RangeSlug } from "@/types/catalogue";

/* ---------- static params ---------- */

export function generateStaticParams() {
  return RANGES.map((r) => ({ slug: r.slug }));
}

/* ---------- range content ---------- */

interface RangeContent {
  longDescription: string;
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

const RANGE_CONTENT: Record<string, RangeContent> = {
  prestige: {
    metaTitle: "Prestige Granite Headstones",
    metaDescription:
      "Browse 62 Prestige granite headstone designs from R5,500. Premium granite memorials in multiple sizes and covering types. South Africa's most popular tombstone range.",
    longDescription: `The Prestige range is the most popular collection in our catalogue, and for good reason. With 62 individual designs to choose from, it offers the widest variety of any range we produce — giving families the freedom to find a memorial that truly resonates with their vision.

Every Prestige headstone is manufactured from premium-grade granite sourced for its density, colour consistency, and long-term durability. Granite is a natural igneous rock that withstands the harsh South African climate — from the subtropical humidity of KwaZulu-Natal to the frost of the inland highveld — without cracking, fading, or deteriorating. A Prestige memorial installed today will look just as dignified in fifty years.

The range covers three standard headstone sizes — 700x400mm, 900x500mm, and 1200x600mm — so whether the grave site is a single plot in a municipal cemetery or a larger family plot, there is a Prestige design that fits. Covering options span all four types we offer: Head and Base for a clean, classic look; Kerbs and Chips for a defined border with decorative stone infill; Tiles for a polished, low-maintenance surface; and Kerbs and Slab for a solid granite platform that makes a bold statement.

What sets the Prestige range apart is the balance it strikes between craftsmanship and value. These are not entry-level memorials — they feature detailed engravings, polished edges, and thoughtful proportions — yet they sit at a mid-market price point that most families find comfortable. Starting from R5,500, a Prestige tombstone delivers quality that rivals more expensive ranges without the premium price tag.

If you are unsure which range is right for you, the Prestige collection is an excellent place to start. Its breadth of design means you are likely to find something close to what you have in mind, and our team can personalise any design with custom inscriptions, portraits, and decorative elements.`,
    faqs: [
      {
        question: "What sizes are available in the Prestige range?",
        answer:
          "The Prestige range is available in three sizes: 700x400mm, 900x500mm, and 1200x600mm. Your choice of size will depend on the grave dimensions and your personal preference.",
      },
      {
        question: "Can I customise a Prestige headstone design?",
        answer:
          "Absolutely. Every Prestige design can be personalised with custom inscriptions, laser-etched portraits, decorative borders, and specific granite colours. Our design team will work with you to create something unique.",
      },
      {
        question: "What covering options are available?",
        answer:
          "The Prestige range supports all four covering types: Head and Base, Kerbs and Chips, Tiles, and Kerbs and Slab. Each option is priced separately and can be discussed with our consultants.",
      },
      {
        question: "How long does a Prestige tombstone take to manufacture?",
        answer:
          "Standard manufacturing time is 4 to 6 weeks from confirmation of order. Complex customisations or peak periods may extend this slightly. We will give you a firm timeline when you place your order.",
      },
    ],
  },

  signature: {
    metaTitle: "Signature Granite Memorial Headstones",
    metaDescription:
      "Explore 37 Signature memorial headstone designs from R11,500. Larger granite memorials with intricate detail and premium craftsmanship for families who want something exceptional.",
    longDescription: `The Signature range is designed for families who want their memorial to make a lasting impression. With 37 carefully curated designs, this collection represents the upper tier of our standard catalogue — larger headstones, more intricate detailing, and a level of craftsmanship that speaks for itself.

Each Signature memorial starts with a block of premium granite, hand-selected for consistent colour and minimal veining. Our craftsmen then shape, polish, and engrave every piece in our Pietermaritzburg and Pinetown factories, using a combination of diamond-tipped cutting tools and precision laser engraving. The result is a headstone with crisp lines, mirror-polished surfaces, and engravings that remain sharp and legible for generations.

Signature headstones are available in three sizes — 900x500mm, 1200x600mm, and the imposing 1500x700mm — making them suitable for both standard and larger family plots. The scale of these memorials allows for more elaborate design elements: curved tops, shaped wings, multi-level bases, and generous inscription panels that can accommodate longer tributes, multiple names, or decorative motifs.

Covering options for the Signature range include Kerbs and Chips, Tiles, and Kerbs and Slab. These higher-end covering types complement the premium nature of the headstone and create a cohesive, polished look across the entire grave site. Many families choose the Kerbs and Slab option for its clean lines and the sense of permanence it conveys.

Priced from R11,500, the Signature range is an investment in a memorial that will stand as a testament to a life well lived. Every detail — from the weight of the granite to the depth of the engraving — is considered. If you are looking for a memorial that goes beyond the ordinary, this is the range to explore.

Our consultants can guide you through the full Signature collection, help you select the right granite colour and finish, and work with you on a personalised design that captures exactly what you want to say.`,
    faqs: [
      {
        question: "What makes the Signature range different from Prestige?",
        answer:
          "Signature headstones are larger, feature more intricate design work, and use premium-grade granite. They are intended for families who want an exceptional memorial with greater visual impact and finer craftsmanship.",
      },
      {
        question: "Can I get a Signature headstone in a custom granite colour?",
        answer:
          "Yes. We stock a range of granite colours including black, grey, red, and blue-grey. If you have a specific colour in mind, we can source it — subject to availability and lead time.",
      },
      {
        question: "Is installation included in the price?",
        answer:
          "Installation is quoted separately as costs vary by cemetery location and access conditions. Our team handles all installation logistics and ensures the memorial is secured to the correct standard.",
      },
      {
        question: "Do you offer a payment plan for Signature memorials?",
        answer:
          "Yes. We offer flexible payment plans that allow you to spread the cost over several months. Speak to one of our consultants for details tailored to your budget.",
      },
    ],
  },

  "more-for-less": {
    metaTitle: "Affordable Tombstones South Africa",
    metaDescription:
      "Quality granite tombstones from R3,200 in the More for Less range. 7 affordable memorial designs that prove honouring your loved one doesn't have to cost a fortune.",
    longDescription: `The More for Less range exists because we believe every family deserves a dignified memorial, regardless of budget. With 7 thoughtfully designed options starting from just R3,200, this range delivers genuine quality granite craftsmanship at the most accessible price point in our catalogue.

These are not inferior products. Every More for Less headstone is manufactured from the same grade of natural granite used across our other ranges. The stone is cut, shaped, and polished in our own factories by the same craftsmen who produce our Prestige and Signature memorials. The difference is in the size and complexity of the design — not in the quality of the material or the care taken in production.

Available in two sizes — 600x300mm and 900x300mm — the More for Less range is proportioned for standard single-plot graves in municipal and church cemeteries across KwaZulu-Natal and South Africa. The compact dimensions keep material costs down without compromising the visual dignity of the memorial. These headstones look clean, polished, and respectful — exactly what a memorial should be.

Covering options include Head and Base for a simple, classic presentation, and Kerbs and Chips for families who want to define the grave perimeter with a neat border and decorative stone chips. Both options are affordable and low-maintenance, ensuring the grave site remains presentable for years to come.

We understand that the cost of a funeral in South Africa can be overwhelming. Between the coffin, the service, catering, and transport, families are often left with little budget for the tombstone. The More for Less range addresses this directly — it gives you a beautiful, permanent memorial at a price that does not add financial strain during an already difficult time.

Every headstone in this range can be personalised with the name, dates, and a short inscription of your choice. Laser-etched portraits are also available as an optional add-on. Our team will help you choose a design and work within your budget to create something meaningful.`,
    faqs: [
      {
        question: "Is the quality lower because the price is lower?",
        answer:
          "Not at all. More for Less headstones use the same premium granite and manufacturing processes as our other ranges. The lower price reflects smaller dimensions and simpler designs — not reduced quality.",
      },
      {
        question: "What is the smallest tombstone you offer?",
        answer:
          "The smallest option in the More for Less range is 600x300mm. This is well-suited to standard single-plot graves and provides a clean, dignified memorial.",
      },
      {
        question: "Can I add a photo to a More for Less headstone?",
        answer:
          "Yes. Laser-etched portraits can be added to any design in this range for an additional fee. The result is a lifelike image permanently engraved into the granite surface.",
      },
      {
        question: "Do you offer a payment plan for this range?",
        answer:
          "Yes. We offer flexible payment plans across all our ranges, including More for Less. This allows you to spread the cost comfortably. Contact us for details.",
      },
    ],
  },

  exclusive: {
    metaTitle: "Custom Engraved Tombstones South Africa",
    metaDescription:
      "Bespoke granite tombstones from the Exclusive range. 18 one-of-a-kind memorial designs with custom materials and exceptional craftsmanship. Each memorial as unique as the life it celebrates.",
    longDescription: `The Exclusive range is for families who want a memorial that is truly one of a kind. With 18 designs that serve as starting points rather than fixed templates, this collection represents the pinnacle of what our workshops can produce — bespoke memorials crafted to your exact specifications.

Every Exclusive tombstone begins with a conversation. Our design team sits down with you to understand the person being remembered — their personality, their passions, their story. From there, we develop a concept that translates those qualities into stone. This might mean a non-standard shape, an unusual granite colour, a combination of materials, or an elaborate engraving that tells a visual story. Nothing is off the table.

The granite used in the Exclusive range is hand-selected from our best stock, and in some cases sourced specifically for the project. We work with granites from South Africa, India, China, and Scandinavia — each offering different colours, grain patterns, and finishing characteristics. Whether you envision a deep midnight black, a warm terracotta red, or a subtle blue-grey, we can match it.

Because every Exclusive memorial is custom, sizes are not fixed. We manufacture to the dimensions that suit your design and the grave site. Covering options include Kerbs and Chips, Tiles, and Kerbs and Slab — and we can also create custom covering solutions that integrate with the headstone design for a unified, architectural look.

Craftsmanship at this level takes time. An Exclusive memorial typically requires 8 to 12 weeks from design approval to installation, depending on complexity and material sourcing. We keep you informed at every stage and welcome your input throughout the process.

Pricing for the Exclusive range is by custom quote only, because no two projects are alike. We will provide a detailed written quotation after the initial design consultation so you know exactly what to expect. There are no hidden costs and no surprises.

If you are looking for a memorial that stands apart — something that captures the full measure of a life in granite — the Exclusive range is where that vision becomes reality.`,
    faqs: [
      {
        question: "How does the Exclusive design process work?",
        answer:
          "It starts with a consultation where we learn about the person being memorialised. Our design team then creates a concept sketch for your approval. Once approved, we select materials and begin manufacturing. You are involved at every stage.",
      },
      {
        question: "Why is pricing by custom quote only?",
        answer:
          "Every Exclusive memorial is different — in size, material, design complexity, and finishing. A custom quote ensures you get an accurate price for your specific project rather than a rough estimate.",
      },
      {
        question: "Can I combine different granite colours in one memorial?",
        answer:
          "Yes. Multi-colour and multi-material designs are a hallmark of the Exclusive range. We can combine contrasting granites, integrate bronze elements, or incorporate other materials to achieve your vision.",
      },
      {
        question: "How long does an Exclusive memorial take to complete?",
        answer:
          "Typically 8 to 12 weeks from design approval to installation. Complex designs or imported materials may require additional time. We provide a clear timeline before you commit.",
      },
    ],
  },

  baby: {
    metaTitle: "Baby Headstones KZN",
    metaDescription:
      "Gentle, dignified baby memorial headstones from R2,800. 17 designs crafted with care and sensitivity for the smallest lives. Available across KwaZulu-Natal.",
    longDescription: `Losing a baby is one of the most profound griefs a family can experience. The Baby range was created with this understanding at its heart — every design, every material choice, and every detail is guided by sensitivity, gentleness, and respect for the smallest lives.

Our Baby range offers 17 designs, each proportioned for infant and child memorials. Available in two sizes — 400x250mm and 600x350mm — these headstones are scaled to suit the smaller grave plots typically allocated in infant sections of cemeteries. Despite their smaller dimensions, they carry the same quality of granite, the same precision of engraving, and the same attention to finishing as our full-size ranges.

The designs in this collection reflect the tenderness that families feel. You will find gentle curves, soft shapes, and motifs that speak to innocence and love — small hands, butterflies, teddy bears, angels, and hearts. Every element is engraved with care, because we understand that this memorial may be one of the few physical tributes a family has for their child.

Covering options include Head and Base for a simple, classic presentation, and Kerbs and Chips for families who wish to define and decorate the grave area. Both options are designed to be low-maintenance, so the memorial remains neat and presentable over time without requiring frequent attention.

Priced from R2,800, the Baby range is deliberately accessible. We never want cost to be a barrier for a family that needs to honour their child. Payment plans are available for families who need to spread the cost, and our team will handle every detail with discretion and compassion.

Personalisation is included in every Baby memorial. We engrave the child's name, dates, and a short inscription at no additional cost. Families often choose a brief verse, a line of poetry, or a simple phrase that captures what their child means to them. Laser-etched portraits and custom motifs are also available.

Our consultants understand the sensitivity of this process. When you contact us about a Baby memorial, you will be met with patience, empathy, and a genuine desire to help you create something beautiful for your little one.`,
    faqs: [
      {
        question: "What sizes are available for baby memorials?",
        answer:
          "The Baby range is available in two sizes: 400x250mm and 600x350mm. Both are proportioned for the smaller plots typically found in infant memorial sections.",
      },
      {
        question: "Can I include a photograph on a baby headstone?",
        answer:
          "Yes. We can laser-etch a photograph onto the granite surface, creating a lifelike and permanent image. Many families find this a meaningful way to personalise their child's memorial.",
      },
      {
        question: "How do I arrange a baby memorial?",
        answer:
          "You can contact us by phone or WhatsApp. Our team will guide you through every step with sensitivity and care. There is no pressure, and we work at whatever pace feels right for your family.",
      },
      {
        question: "Is a payment plan available for baby memorials?",
        answer:
          "Yes. We offer flexible payment plans across all ranges, including Baby memorials. We understand this is a difficult time and we do everything we can to ease the process.",
      },
    ],
  },
};

/* ---------- metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = RANGE_CONTENT[slug];
  if (!content) return {};

  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

/* ---------- page ---------- */

export default async function RangePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const range = getRangeBySlug(slug as RangeSlug);
  if (!range) notFound();

  const content = RANGE_CONTENT[slug];
  if (!content) notFound();

  const items = getCatalogueItems(slug as RangeSlug);
  const hq = LOCATIONS[0];

  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "Ranges", url: "https://pullenstombstones.co.za/ranges" },
          {
            name: range.name,
            url: `https://pullenstombstones.co.za/ranges/${range.slug}`,
          },
        ])}
      />
      <JsonLd
        data={productSchema(
          `${range.name} Range — Pullen's Tombstones`,
          range.description,
          range.priceRange
        )}
      />
      <JsonLd data={faqPageSchema(content.faqs)} />

      {/* Hero */}
      <Section>
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/60 mb-6">
          <a href="/ranges" className="hover:text-orange transition-colors">
            Ranges
          </a>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{range.name}</span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-3">
          {range.name} Range
        </h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mb-2">
          {range.description}
        </p>
        <p className="text-xl font-semibold text-navy">
          {range.priceRange}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {range.coveringTypes.map((ct) => (
            <span
              key={ct}
              className="text-xs font-medium bg-cream text-navy px-3 py-1 rounded-full"
            >
              {ct}
            </span>
          ))}
          <span className="text-xs font-medium bg-cream text-charcoal/60 px-3 py-1 rounded-full">
            {range.sizes}
          </span>
        </div>
      </Section>

      {/* Product grid */}
      <Section className="bg-cream/50">
        <h2 className="font-display text-2xl font-bold text-navy mb-6">
          Designs ({items.length})
        </h2>
        <ProductGrid items={items} />
      </Section>

      {/* Long-form content */}
      <Section>
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            About the {range.name} Range
          </h2>
          <div className="prose prose-charcoal max-w-none space-y-4">
            {content.longDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-charcoal/80 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section dark>
        <h2 className="font-display text-2xl font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-6 max-w-3xl">
          {content.faqs.map((faq, i) => (
            <div key={i}>
              <dt className="font-semibold text-lg mb-1">{faq.question}</dt>
              <dd className="text-white/80 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* WhatsApp CTA */}
      <Section className="text-center">
        <h2 className="font-display text-2xl font-bold text-navy mb-3">
          {range.slug === "baby"
            ? "We are here to help"
            : `Interested in the ${range.name} range?`}
        </h2>
        <p className="text-charcoal/70 mb-6 max-w-lg mx-auto">
          {range.slug === "baby"
            ? "Reach out whenever you are ready. Our team will guide you with patience and care."
            : "Send us a WhatsApp message and one of our consultants will assist you with designs, pricing, and next steps."}
        </p>
        <Button
          variant="whatsapp"
          href={whatsappLink(
            hq.whatsapp,
            `Hi, I'm interested in the ${range.name} range`
          )}
        >
          Chat on WhatsApp
        </Button>
      </Section>
    </>
  );
}
