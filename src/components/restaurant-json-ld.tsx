import { ORDER_URL } from "@/lib/constants";

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
    "@id": `https://bunbunburger.vn/#${id}`,
    name,
    image: "https://bunbunburger.vn/hero-banner-clean.png",
    servesCuisine: "Burger",
    priceRange: "19.000đ – 139.000đ",
    telephone: "+84799289889",
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Huế",
      addressCountry: "VN",
    },
    openingHoursSpecification: [WEEKDAY_HOURS, WEEKEND_HOURS],
    hasMenu: ORDER_URL,
    url: "https://bunbunburger.vn",
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    restaurant("cs1", "Bunbun Burger — 39A Bến Nghé", "39A Bến Nghé, Phú Hội"),
    restaurant("cs2", "Bunbun Burger — 02 Đặng Thái Thân", "02 Đặng Thái Thân"),
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
