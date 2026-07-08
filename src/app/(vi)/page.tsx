import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";

export const metadata: Metadata = {
  description:
    "Một chiếc burger, làm chậm rãi như một món Huế. Bánh ủ mềm, khoai tây cắt tay chiên thủ công, xốt nêm theo khẩu vị Huế. Đồng giá 43.000đ, 2 cơ sở tại Huế.",
  alternates: {
    canonical: "/",
    languages: { vi: "/", en: "/en", "x-default": "/" },
  },
};

export default function Page() {
  return <HomePage locale="vi" />;
}
