import type { Metadata } from "next";
import { MenuClient } from "@/components/menu-client";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bunbun Burger menu — burgers all at 43,000đ, combos, hand-cut fries, salads, desserts and tea. Handcrafted in Huế, order via iPOS.",
  openGraph: {
    title: "Menu · Bunbun Burger",
    description:
      "Burgers all at 43,000đ, combos, hand-cut fries and more at Bunbun Burger, Huế.",
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
