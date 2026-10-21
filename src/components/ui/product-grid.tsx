import Image from "next/image";
import Link from "next/link";
import type { CatalogueItem } from "@/types/catalogue";
import { fromPrice, formatZAR } from "@/lib/pricing";

interface ProductGridProps {
  items: CatalogueItem[];
}

export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-ink-muted py-12">No designs available</p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => {
        const from = fromPrice(item.code);
        return (
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
            <div className="px-3 py-3 flex items-baseline justify-between gap-2">
              <span className="heading-roman text-sm text-ink gold-underline-hover">
                {item.code}
              </span>
              <span className="text-xs text-ink-muted whitespace-nowrap">
                {from ? `From ${formatZAR(from)}` : "Price on request"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
