import Image from "next/image";
import type { CatalogueItem } from "@/types/catalogue";

interface ProductGridProps {
  items: CatalogueItem[];
}

export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-charcoal/60 py-12">
        No designs available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.code} className="group">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)]">
            <Image
              src={item.imagePath}
              alt={`Design ${item.code}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <p className="mt-2 text-sm font-medium text-navy text-center">
            {item.code}
          </p>
        </div>
      ))}
    </div>
  );
}
