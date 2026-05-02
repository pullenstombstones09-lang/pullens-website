import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tombstone Guides & Advice",
  description:
    "Expert guidance on choosing tombstones, inscriptions, covering types, and more from Pullen's Tombstones — KZN's most trusted memorial manufacturer.",
  alternates: { canonical: "https://pullenstombstones.co.za/blog" },
};

const POSTS = [
  {
    slug: "how-to-choose-a-tombstone",
    title: "How to Choose a Tombstone: A Complete Guide for KZN Families",
    excerpt:
      "From granite type to size, covering options, and budget — everything you need to know before ordering a memorial.",
    date: "2026-05-01",
  },
  {
    slug: "inscription-ideas",
    title: "Tombstone Inscription Ideas: Words That Last Forever",
    excerpt:
      "A curated collection of epitaphs, quotes, and inscription ideas in English, isiZulu, and Afrikaans to honour your loved one.",
    date: "2026-05-01",
  },
  {
    slug: "covering-types-explained",
    title: "Tombstone Covering Types Explained: Head & Base vs Kerbs vs Slab",
    excerpt:
      "Understand the difference between covering options so you can choose the right one for your family's memorial.",
    date: "2026-05-01",
  },
] as const;

export default function BlogPage() {
  return (
    <>
      <Section>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-4">
          Guides & Advice
        </h1>
        <p className="text-center text-charcoal/70 max-w-xl mx-auto mb-12">
          Helpful articles to guide you through choosing, personalising, and understanding tombstones.
        </p>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-cream rounded-lg p-6 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <time className="text-xs text-charcoal/50">{post.date}</time>
              <h2 className="font-display font-bold text-xl text-navy mt-1 mb-2">
                {post.title}
              </h2>
              <p className="text-charcoal/70 text-sm mb-3">{post.excerpt}</p>
              <span className="text-orange font-semibold text-sm inline-flex items-center gap-1">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
