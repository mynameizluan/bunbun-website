import { ORDER_URL, PHONE_TEL, VENUE_1, VENUE_2 } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import content from "@/data/site-content.json";

const WEEKDAY_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "10:00",
  closes: "22:00",
};

const WEEKEND_HOURS = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Saturday", "Sunday"],
  opens: "09:00",
  closes: "22:30",
};

function restaurant(id: string, name: string, streetAddress: string) {
  return {
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#${id}`,
    name,
    image: `${SITE_URL}${content.assets.heroBanner}`,
    servesCuisine: "Burger",
    priceRange: "19.000đ – 139.000đ",
    telephone: PHONE_TEL.replace("tel:0", "+84"),
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Huế",
      addressCountry: "VN",
    },
    openingHoursSpecification: [WEEKDAY_HOURS, WEEKEND_HOURS],
    hasMenu: ORDER_URL,
    url: SITE_URL,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    restaurant("cs1", "Bunbun Burger — Cơ sở 1", VENUE_1.address),
    restaurant("cs2", "Bunbun Burger — Cơ sở 2", VENUE_2.address),
  ],
};

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
