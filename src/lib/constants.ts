export const BRAND = {
  name: "Pullen's Tombstones",
  legal: "Amazon Creek Trading (Pty) Ltd",
  tagline: "Cast in Stone",
  taglineZulu: "Amatshe Amathuna",
  established: 1982,
  yearsInBusiness: new Date().getFullYear() - 1982,
  totalInstalls: "22,000+",
  googleRating: 4.9,
  googleReviews: 156,
  facebookFollowers: "4,423",
  vatNumber: "4910290305",
  cipc: "2011/105461/23",
} as const;

export const COLOURS = {
  navy: "#0d2d5e",
  blue: "#1B4B8A",
  orange: "#FF6B00",
  charcoal: "#1A1A1A",
  offWhite: "#FAFAF8",
  gold: "#B8860B",
  cream: "#FDF6E3",
} as const;

export const LOCATIONS = [
  {
    id: "allandale",
    name: "Pietermaritzburg (Head Office)",
    shortName: "PMB",
    address:
      "46 Allandale Drive, Allandale, Pietermaritzburg, 3201, KwaZulu-Natal, South Africa",
    phone: "033 387 8913",
    whatsapp: "+27812130772",
    whatsappDisplay: "081 213 0772",
    type: "HQ + Factory" as const,
    hours: "Mon-Fri 08:00-17:00, Sat 08:00-13:00",
    gps: { lat: -29.5868, lng: 30.3797 },
    status: "open" as const,
  },
  {
    id: "church-street",
    name: "Pietermaritzburg (Church Street)",
    shortName: "Church St",
    address:
      "557 Church Street, Pietermaritzburg Central, 3201, KwaZulu-Natal, South Africa",
    phone: "033 387 8913",
    whatsapp: "+27812130772",
    whatsappDisplay: "081 213 0772",
    type: "Showroom" as const,
    hours: "Mon-Fri 08:00-17:00, Sat 08:00-13:00",
    gps: { lat: -29.6006, lng: 30.3794 },
    status: "open" as const,
  },
  {
    id: "pinetown",
    name: "Pinetown (Factory + Showroom)",
    shortName: "Pinetown",
    address:
      "9 Circuit Road, Westmead, Pinetown, 3610, KwaZulu-Natal, South Africa",
    phone: "068 111 5782",
    whatsapp: "+27812138812",
    whatsappDisplay: "081 213 8812",
    type: "Factory + Showroom" as const,
    hours: "Mon-Fri 08:00-17:00, Sat 08:00-13:00",
    gps: { lat: -29.8063, lng: 30.8571 },
    status: "open" as const,
  },
  {
    id: "ladysmith",
    name: "Ladysmith",
    shortName: "Ladysmith",
    address:
      "Ladysmith, KwaZulu-Natal, South Africa",
    phone: "033 387 8913",
    whatsapp: "+27812130772",
    whatsappDisplay: "081 213 0772",
    type: "Showroom" as const,
    hours: "Opening soon",
    gps: { lat: -28.5596, lng: 29.7812 },
    status: "opening-soon" as const,
  },
] as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/PullensTombstones",
  instagram: "https://www.instagram.com/_pullenstombstones_/",
} as const;

export const META_PIXEL_ID = "3386049621486839";
