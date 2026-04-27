const TJA = {
  name: "TJA AutoCare",
  url: "https://tjaautocarenj.com",
  telephone: "+1-201-933-2828",
  street: "161 Ridge Road",
  city: "Lyndhurst",
  region: "NJ",
  postal: "07071",
  country: "US",
  lat: 40.8123,
  lng: -74.1238,
};

const AREA_SERVED = [
  "Lyndhurst",
  "Bergen County",
  "North Jersey",
  "Rutherford",
  "Kearny",
];

const MAKES = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Jaguar",
  "Land Rover",
  "Volvo",
  "MINI",
];

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

export function autoRepairLocalBusiness() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: TJA.name,
    url: TJA.url,
    telephone: TJA.telephone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: TJA.street,
      addressLocality: TJA.city,
      addressRegion: TJA.region,
      postalCode: TJA.postal,
      addressCountry: TJA.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: TJA.lat,
      longitude: TJA.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    areaServed: AREA_SERVED.map((n) => ({ "@type": "City", name: n })),
    makesServiced: MAKES,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
  };
  return pretty(data);
}

const DEFAULT_FAQS = [
  {
    question: "Do you service BMW vehicles in Lyndhurst NJ?",
    answer:
      "Yes. TJA AutoCare specializes in independent BMW repair and maintenance for Bergen County drivers. We service all BMW models including 3 Series, 5 Series, X3, X5, and M variants — with dealer-level diagnostics at independent-shop pricing.",
  },
  {
    question: "How much does a BMW brake job cost at TJA AutoCare?",
    answer:
      "A typical BMW brake replacement at TJA runs between $800 and $1,200 depending on pads, rotors, and sensors. Our labor rate is $177/hr and we use OE or OE-equivalent parts. Most jobs are completed same day.",
  },
  {
    question: "Are you cheaper than a Mercedes-Benz dealership?",
    answer:
      "Yes. Most TJA Mercedes services come in 30–50% below dealership pricing for the same job. We use OE-spec parts, document everything, and your factory warranty is not affected by independent service.",
  },
  {
    question: "What's the difference between an independent specialist and a dealer?",
    answer:
      "An independent specialist like TJA AutoCare focuses on actual repair quality and long-term relationships, not upsells from a service writer working on commission. We give honest diagnostics, transparent pricing, and a 24-month / 24,000-mile warranty on most repairs.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Yes. TJA AutoCare backs most repairs with a 24-month / 24,000-mile warranty. Family-owned since 2013, we stand behind our work and you can call the shop directly if anything needs follow-up.",
  },
];

export function faqPage(faqArray) {
  const faqs = (faqArray && faqArray.length ? faqArray : DEFAULT_FAQS).map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  }));
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs,
  };
  return pretty(data);
}

export function brakeService() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Brake Repair",
    name: "Brake Replacement & Repair — TJA AutoCare",
    description:
      "Honest brake replacement and repair for European and domestic vehicles in Lyndhurst NJ. TJA AutoCare uses OE-spec pads and rotors, with most brake jobs completed same day. Family owned since 2013 with a 24mo/24k warranty.",
    provider: {
      "@type": "AutoRepair",
      name: TJA.name,
      url: TJA.url,
      telephone: TJA.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: TJA.street,
        addressLocality: TJA.city,
        addressRegion: TJA.region,
        postalCode: TJA.postal,
        addressCountry: TJA.country,
      },
    },
    areaServed: AREA_SERVED.map((n) => ({ "@type": "City", name: n })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "400",
      highPrice: "1200",
      priceRange: "$400-$1,200",
    },
  };
  return pretty(data);
}

export function euroSpecialistService() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "European Vehicle Repair",
    name: "European Auto Specialist — TJA AutoCare",
    description:
      "Independent European auto repair in Bergen County, NJ. TJA AutoCare services BMW, Mercedes-Benz, Audi, Porsche, Jaguar, Land Rover, Volvo, and MINI with dealer-level diagnostic equipment, OE-spec parts, and pricing 30–50% below dealership rates. A real dealer alternative for North Jersey euro owners.",
    provider: {
      "@type": "AutoRepair",
      name: TJA.name,
      url: TJA.url,
      telephone: TJA.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: TJA.street,
        addressLocality: TJA.city,
        addressRegion: TJA.region,
        postalCode: TJA.postal,
        addressCountry: TJA.country,
      },
    },
    makesServiced: MAKES,
    areaServed: AREA_SERVED.map((n) => ({ "@type": "City", name: n })),
  };
  return pretty(data);
}

export const SCHEMAS = [
  { key: "localBusiness", label: "AutoRepair LocalBusiness", build: autoRepairLocalBusiness, file: "auto-repair-localbusiness.json" },
  { key: "faq", label: "FAQ Page", build: () => faqPage(), file: "faq-page.json" },
  { key: "brake", label: "Brake Service", build: brakeService, file: "brake-service.json" },
  { key: "euro", label: "Euro Specialist Service", build: euroSpecialistService, file: "euro-specialist-service.json" },
];
