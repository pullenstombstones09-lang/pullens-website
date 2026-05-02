import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { LOCATIONS } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tombstone Inscription Ideas: Words That Last Forever",
  description:
    "A curated collection of tombstone epitaphs, quotes, and inscription ideas in English, isiZulu, and Afrikaans for South African families.",
  alternates: { canonical: "https://pullenstombstones.co.za/blog/inscription-ideas" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tombstone Inscription Ideas: Words That Last Forever",
  author: { "@type": "Organization", name: "Pullen's Tombstones" },
  publisher: { "@type": "Organization", name: "Pullen's Tombstones" },
  datePublished: "2026-05-01",
  description: "Curated epitaphs and inscription ideas in English, isiZulu, and Afrikaans.",
};

export default function InscriptionIdeasPage() {
  const wa = whatsappLink(LOCATIONS[0].whatsapp, "Hi, I need help with an inscription for a tombstone.");

  return (
    <>
      <JsonLd data={articleSchema} />
      <Section>
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-charcoal/50 hover:text-navy transition-colors">
            &larr; Back to Guides
          </Link>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy mt-6 mb-4">
            Tombstone Inscription Ideas: Words That Last Forever
          </h1>
          <p className="text-charcoal/60 text-sm mb-8">Published 1 May 2026</p>

          <div className="space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              The words on a tombstone carry immense weight. They are the final public message to and
              about a loved one — read by generations to come. Here are ideas to help you find the
              right words.
            </p>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              English Inscriptions
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="border-l-2 border-gold pl-4">&ldquo;Forever in our hearts&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Gone from our sight, but never from our hearts&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;A life so beautifully lived deserves to be beautifully remembered&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Until we meet again&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Rest in eternal peace&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Your memory is our keepsake, with which we will never part&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;In loving memory — always in our thoughts, forever in our hearts&rdquo;</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;God saw you getting tired and a cure was not to be, so He put His arms around you and whispered &lsquo;Come to me&rsquo;&rdquo;</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              isiZulu Inscriptions
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="border-l-2 border-gold pl-4">&ldquo;Lala ngoxolo&rdquo; — Rest in peace</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Siyakukhumbula njalo&rdquo; — We will always remember you</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Uthando lwakho luhlala nathi&rdquo; — Your love remains with us</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Ulale ngokuthula, sizohlangana futhi&rdquo; — Rest peacefully, we will meet again</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Inkumbulo yakho iyophila phakade&rdquo; — Your memory will live forever</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Hamba kahle&rdquo; — Go well</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              Afrikaans Inscriptions
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="border-l-2 border-gold pl-4">&ldquo;Rus in vrede&rdquo; — Rest in peace</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Vir ewig in ons harte&rdquo; — Forever in our hearts</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Jou nagedagtenis leef voort&rdquo; — Your memory lives on</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Tot ons weer ontmoet&rdquo; — Until we meet again</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              Biblical & Spiritual
            </h2>
            <ul className="space-y-3 pl-4">
              <li className="border-l-2 border-gold pl-4">&ldquo;The Lord is my shepherd&rdquo; — Psalm 23:1</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;I am the resurrection and the life&rdquo; — John 11:25</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Well done, good and faithful servant&rdquo; — Matthew 25:21</li>
              <li className="border-l-2 border-gold pl-4">&ldquo;Absent from the body, present with the Lord&rdquo; — 2 Corinthians 5:8</li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-navy mt-10 mb-3">
              Tips for Choosing an Inscription
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep it concise — fewer words have more impact on stone</li>
              <li>Consider who will read it: family, visitors, future generations</li>
              <li>Include the person&apos;s nickname or term of endearment if appropriate</li>
              <li>Check the cemetery&apos;s character limits for the headstone size you&apos;ve chosen</li>
              <li>We can engrave in any language — just provide the correct text</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <Button variant="cta" href={wa} className="text-lg px-8 py-4">
              Discuss Your Inscription on WhatsApp
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}
