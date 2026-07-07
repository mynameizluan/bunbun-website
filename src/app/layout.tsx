import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RestaurantJsonLd } from "@/components/restaurant-json-ld";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bunbunburger.vn"),
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
    <html lang="vi" className={`${jakarta.variable} ${vietnamPro.variable}`}>
      <body className="bg-paper text-ink font-body font-light antialiased">
        <RestaurantJsonLd />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
