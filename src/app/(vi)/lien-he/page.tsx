import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Bunbun Burger — 2 cơ sở tại Huế: 39A Bến Nghé & 02 Đặng Thái Thân. Giờ mở cửa 10:00–22:00 (T2–T6), 09:00–22:30 (T7–CN). Hotline 079 928 9889.",
  openGraph: {
    title: "Liên hệ · Bunbun Burger",
    description: "2 cơ sở tại Huế — giờ mở cửa, bản đồ, hotline.",
    images: ["/contact-venue-v2.png"],
  },
  alternates: {
    canonical: "/lien-he",
    languages: {
      vi: "/lien-he",
      en: "/en/contact",
      "x-default": "/lien-he",
    },
  },
};

export default function Page() {
  return <ContactPage locale="vi" />;
}
