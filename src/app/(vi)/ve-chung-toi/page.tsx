import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Bunbun Burger bắt đầu từ một quầy bếp mở nhỏ ở 39A Bến Nghé, Huế — burger thủ công, khoai tây cắt tay, xốt tự làm theo khẩu vị người Việt.",
  openGraph: {
    title: "Về chúng tôi · Bunbun Burger",
    description:
      "Sinh ra ở Huế, lớn lên từ quầy bếp mở — câu chuyện của Bunbun Burger.",
    images: ["/hero-banner-clean.png"],
  },
  alternates: {
    canonical: "/ve-chung-toi",
    languages: {
      vi: "/ve-chung-toi",
      en: "/en/about",
      "x-default": "/ve-chung-toi",
    },
  },
};

export default function Page() {
  return <AboutPage locale="vi" />;
}
