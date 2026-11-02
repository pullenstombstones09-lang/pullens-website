import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogueItem } from "@/types/catalogue";

interface ProductGridProps {
  items: CatalogueItem[];
}

/**
 * Public catalogue grid. Owner decision: no per-design prices on the public
 * site — the customer unlocks their price on the design page.
 */
export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-ink-muted py-12">No designs available</p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link
          key={item.code}
          href={`/ranges/${item.range}/${item.code}`}
          className="group card-editorial block"
        >
          <div className="relative aspect-[4/3] bg-dark overflow-hidden">
            <Image
              src={item.imagePath}
              alt={`Design ${item.code}`}
              fill
              loading="lazy"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <div className="px-3 py-3 flex items-center justify-between gap-2">
            <span className="heading-roman text-sm text-ink gold-underline-hover">
              {item.code}
            </span>
            <span className="text-xs text-ink-muted inline-flex items-center gap-1 whitespace-nowrap">
              Price &amp; order
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
