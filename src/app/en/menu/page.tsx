import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { MenuClient } from "@/components/menu-client";

export const metadata: Metadata = {
  title: content.seo.menu.en.title,
  description: content.seo.menu.en.description,
  openGraph: {
    title: content.seo.menu.en.title,
    description: content.seo.menu.en.description,
    images: ["/hero-banner-clean.png"],
  },
  alternates: {
    canonical: "/en/menu",
    languages: { vi: "/menu", en: "/en/menu", "x-default": "/menu" },
  },
};

export default function Page() {
  return <MenuClient locale="en" />;
}
