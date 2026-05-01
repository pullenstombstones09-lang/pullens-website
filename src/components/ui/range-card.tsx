import Image from "next/image";
import type { RangeInfo } from "@/types/catalogue";
import { Button } from "./button";

interface RangeCardProps {
  range: RangeInfo;
  featuredImage: string;
}

export function RangeCard({ range, featuredImage }: RangeCardProps) {
  return (
    <div className="bg-cream rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] hover:translate-y-[-2px] transition-transform duration-200">
      <div className="relative aspect-[4/3]">
        <Image
          src={featuredImage}
          alt={range.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-xl text-navy">
          {range.name}
        </h3>
        <p className="text-sm text-charcoal/70 mt-1">{range.priceRange}</p>
        <div className="mt-4">
          <Button variant="secondary" href={`/catalogue/${range.slug}`}>
            View Range
          </Button>
        </div>
      </div>
    </div>
  );
}
