import type { Metadata } from "next";
import { MenuClient } from "@/components/menu-client";

export const metadata: Metadata = {
  title: "Thực đơn",
  description:
    "Thực đơn Bunbun Burger — burger đồng giá 43.000đ, combo, khoai tây thủ công, salad, tráng miệng và trà. Burger Huế thủ công, đặt hàng qua iPOS.",
  openGraph: {
    title: "Thực đơn · Bunbun Burger",
    description:
      "Burger đồng giá 43.000đ, combo, khoai tây thủ công và nhiều món khác tại Bunbun Burger Huế.",
    images: ["/hero-banner-clean.png"],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}
