import Image from "next/image";
import Link from "next/link";
import type { RangeInfo } from "@/types/catalogue";

interface RangeCardProps {
  range: RangeInfo;
  featuredImage: string;
}

export function RangeCard({ range, featuredImage }: RangeCardProps) {
  return (
    <Link href={`/ranges/${range.slug}`} className="group card-editorial">
      <div className="relative aspect-[4/3] bg-dark overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage}
            alt={`${range.name} tombstone range`}
            fill
            className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="heading-roman text-lg text-ink gold-underline-hover">
            {range.name}
          </h3>
          <span className="label-ui text-ink-muted text-[9px]">{range.budgetTier}</span>
        </div>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed line-clamp-2">
          {range.description}
        </p>
      </div>
    </Link>
  );
}
