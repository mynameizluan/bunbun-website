import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { MenuClient } from "@/components/menu-client";

export const metadata: Metadata = {
  title: content.seo.menu.vi.title,
  description: content.seo.menu.vi.description,
  openGraph: {
    title: content.seo.menu.vi.title,
    description: content.seo.menu.vi.description,
    images: ["/hero-banner-clean.png"],
  },
  alternates: {
    canonical: "/menu",
    languages: { vi: "/menu", en: "/en/menu", "x-default": "/menu" },
  },
};

export default function MenuPage() {
  return <MenuClient locale="vi" />;
}
