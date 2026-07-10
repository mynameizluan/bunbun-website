import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import content from "@/data/site-content.json";
import "../globals.css";
import { fontClass } from "@/lib/fonts";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { RestaurantJsonLd } from "@/components/restaurant-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: content.seo.home.en.title,
    template: `%s · ${content.brand.name}`,
  },
  description: content.seo.home.en.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bunbun Burger",
    title: content.seo.home.en.title,
    description:
      "Handcrafted burgers made in Huế, Vietnam. All burgers 43,000đ. Order via iPOS or ShopeeFood.",
    images: ["/hero-banner-clean.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: content.seo.home.en.title,
    description:
      "Handcrafted burgers made in Huế, Vietnam. All burgers 43,000đ. Order via iPOS or ShopeeFood.",
    images: ["/hero-banner-clean.png"],
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontClass}>
      <body className="bg-paper text-ink font-body font-light antialiased">
        <RestaurantJsonLd />
        <SiteNav locale="en" />
        {children}
        <SiteFooter locale="en" />
      </body>
    </html>
  );
}
