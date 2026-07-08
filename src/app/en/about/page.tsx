import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Bunbun Burger began behind an open kitchen counter at 39A Bến Nghé, Huế — handcrafted burgers, hand-cut fries, house sauces.",
  openGraph: {
    title: "About us · Bunbun Burger",
    description:
      "Born in Huế, raised behind an open counter — the story of Bunbun Burger.",
    images: ["/hero-banner-clean.png"],
  },
  alternates: {
    canonical: "/en/about",
    languages: {
      vi: "/ve-chung-toi",
      en: "/en/about",
      "x-default": "/ve-chung-toi",
    },
  },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
