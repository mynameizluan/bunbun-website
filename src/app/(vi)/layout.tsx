import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "../globals.css";
import { fontClass } from "@/lib/fonts";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RestaurantJsonLd } from "@/components/restaurant-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bunbun Burger — Burger thủ công Made in Huế",
    template: "%s · Bunbun Burger",
  },
  description:
    "Bunbun Burger — burger thủ công Made in Huế. Bánh ủ mềm, khoai tây cắt tay chiên thủ công, xốt nêm theo khẩu vị Huế. Đồng giá 43.000đ.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Bunbun Burger",
    title: "Bunbun Burger — Burger thủ công Made in Huế",
    description:
      "Burger thủ công Made in Huế. Đồng giá 43.000đ. Đặt hàng qua iPOS, ShopeeFood.",
    images: ["/hero-banner-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bunbun Burger — Burger thủ công Made in Huế",
    description:
      "Burger thủ công Made in Huế. Đồng giá 43.000đ. Đặt hàng qua iPOS, ShopeeFood.",
    images: ["/hero-banner-clean.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={fontClass}>
      <body className="bg-paper text-ink font-body font-light antialiased">
        <RestaurantJsonLd />
        <SiteNav locale="vi" />
        {children}
        <SiteFooter locale="vi" />
      </body>
    </html>
  );
}
