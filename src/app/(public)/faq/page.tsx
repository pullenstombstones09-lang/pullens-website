import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema, breadcrumbSchema } from "@/components/seo/schemas";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How Much Does a Tombstone Cost? | FAQ",
  description:
    "Answers to common questions about tombstone prices, covering types, payment plans, and more. Granite tombstones from R3,200 in KZN.",
};

const FAQ_ITEMS = [
  {
    question: "How much does a tombstone cost in South Africa?",
    answer:
      "Our ranges start from R3,200 for the More for Less range, through R5,500\u2013R9,800 for Prestige, R11,500\u2013R18,000 for Signature, and custom pricing for Exclusive designs. Baby memorials start from R2,800. Final price depends on size, design, covering type, and extras like photo engraving (R850) or additional inscription letters.",
  },
  {
    question: "What granite colours are available?",
    answer:
      "We work primarily with Black granite (our most popular), as well as Grey, Pink, Blue Pearl, Red, and Green. Black granite offers the best contrast for engraved inscriptions and is the most durable option for KZN\u2019s climate.",
  },
  {
    question: "What are the different covering types?",
    answer:
      "Head & Base (collect & carry, R1,200 erection), Kerbs & Chips (R2,500), Tiles (R2,500), and Kerbs & Slab (R3,200). Each offers a different look \u2014 kerbs & chips is our most popular choice, while tiles offer a clean, modern finish.",
  },
  {
    question: "How long does a tombstone take to make?",
    answer:
      "We can manufacture a standard tombstone in as little as one day for urgent orders. Typical turnaround depends on design complexity and current workload. Contact us for a timeline on your specific requirements.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. We accept any deposit amount to get started. The balance is due before installation or collection. We offer flexible payment plans to suit your budget.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "Free delivery within 50km of our factory. Beyond 50km, transport is R10/km for direct customers. We deliver throughout KwaZulu-Natal and can quote for national delivery within 24 hours.",
  },
  {
    question: "How does the inscription process work?",
    answer:
      "You provide us with the wording \u2014 either in person, via WhatsApp, or by phone. We create a digital preview for you to review. Once you confirm every name, date, and word is correct, we proceed. 80 letters are included free; extra letters are R5 each.",
  },
  {
    question: "What is a tombstone unveiling ceremony?",
    answer:
      "An unveiling (ukuvulwa kwetshe) is a family ceremony held when the tombstone is first revealed, typically months after burial. It\u2019s a significant cultural event in many South African communities. We can coordinate installation timing around your planned ceremony.",
  },
  {
    question: "Can I customise my tombstone design?",
    answer:
      "Absolutely. Our Exclusive range offers fully bespoke designs with custom materials and shapes. Even within our standard ranges, we can adjust inscriptions, add photo engravings, and accommodate special requests.",
  },
  {
    question: "Do you do baby memorials?",
    answer:
      "Yes. Our Baby range (from R2,800) offers gentle, dignified memorials for infant and child loss. We handle these orders with extra sensitivity and care. Sizes range from 400x250mm to 600x350mm.",
  },
  {
    question: "Where are your showrooms?",
    answer:
      "We have two locations: our head office and factory at 46 Allandale Drive, Pietermaritzburg, and our Pinetown showroom at 9 Circuit Road, Westmead. Both are open Mon\u2013Fri 08:00\u201317:00 and Sat 08:00\u201313:00.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "The easiest way is WhatsApp \u2014 send us a message with the range you\u2019re interested in and any specific requirements. We\u2019ll respond with a detailed quote. You can also visit either showroom or call us directly.",
  },
];

export default function FAQPage() {
  const pmb = LOCATIONS[0];

  return (
    <>
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://pullenstombstones.co.za" },
          { name: "FAQ", url: "https://pullenstombstones.co.za/faq" },
        ])}
      />

      <Section>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-charcoal/80 max-w-2xl mb-12">
          Everything you need to know about tombstone prices, materials,
          delivery, and the ordering process.
        </p>

        <div className="max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-lg bg-cream transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-navy select-none list-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-orange transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-charcoal/80 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Chat with us on WhatsApp and we&apos;ll get back to you quickly.
          </p>
          <Button
            variant="whatsapp"
            href={whatsappLink(
              pmb.whatsapp,
              "Hi, I have a question about tombstones."
            )}
          >
            Chat with us on WhatsApp
          </Button>
        </div>
      </Section>
    </>
  );
}
