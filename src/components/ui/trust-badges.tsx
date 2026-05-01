import { BRAND } from "@/lib/constants";
import { Star } from "lucide-react";

interface Badge {
  value: string;
  label: string;
  stars?: boolean;
}

const badges: Badge[] = [
  { value: `${BRAND.googleRating}`, label: "Google Reviews", stars: true },
  { value: BRAND.totalInstalls, label: "Memorials Installed" },
  { value: `Over ${BRAND.yearsInBusiness} Years`, label: "of Excellence" },
  { value: `${BRAND.googleReviews}`, label: "5-Star Reviews" },
];

function FilledStars() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-orange text-orange"
        />
      ))}
    </span>
  );
}

export function TrustBadges() {
  return (
    <div className="overflow-x-auto">
      <div className="flex flex-nowrap snap-x gap-4 md:grid md:grid-cols-4 md:gap-6">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="flex-none snap-center w-40 md:w-auto text-center py-4 px-3"
          >
            <p className="text-2xl font-bold text-navy flex items-center justify-center">
              {badge.value}
              {badge.stars && <FilledStars />}
            </p>
            <p className="text-sm text-charcoal/60 mt-1">{badge.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
