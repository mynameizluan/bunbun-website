import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bunbun Burger — two locations in Huế: 39A Bến Nghé & 02 Đặng Thái Thân. Open 10:00–22:00 (Mon–Fri), 09:00–22:30 (Sat–Sun). Hotline 079 928 9889.",
  openGraph: {
    title: "Contact · Bunbun Burger",
    description: "Two locations in Huế — opening hours, maps, hotline.",
    images: ["/contact-venue-v2.png"],
  },
  alternates: {
    canonical: "/en/contact",
    languages: {
      vi: "/lien-he",
      en: "/en/contact",
      "x-default": "/lien-he",
    },
  },
};

export default function Page() {
  return <ContactPage locale="en" />;
}
