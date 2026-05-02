import { BRAND, LOCATIONS, SOCIAL } from "@/lib/constants";

export function localBusinessSchema() {
  return LOCATIONS.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: `${BRAND.name} — ${BRAND.tagline}. Tombstone manufacturing since ${BRAND.established}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.split(",")[0],
      addressLocality: loc.address.split(",")[1]?.trim(),
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    telephone: loc.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.gps.lat,
      longitude: loc.gps.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BRAND.googleRating,
      reviewCount: BRAND.googleReviews,
    },
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
  }));
}

export function productSchema(
  rangeName: string,
  description: string,
  budgetTier: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: rangeName,
    description,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      description: budgetTier,
    },
  };
}

export function faqPageSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    legalName: BRAND.legal,
    foundingDate: String(BRAND.established),
    url: "https://pullenstombstones.co.za",
    sameAs: [SOCIAL.facebook, SOCIAL.instagram],
    logo: "https://pullenstombstones.co.za/logo.png",
    contactPoint: LOCATIONS.map((loc) => ({
      "@type": "ContactPoint",
      telephone: loc.phone,
      contactType: "customer service",
      areaServed: "ZA",
    })),
  };
}
