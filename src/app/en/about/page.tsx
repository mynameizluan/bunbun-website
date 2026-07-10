import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: content.seo.about.en.title,
  description: content.seo.about.en.description,
  openGraph: {
    title: content.seo.about.en.title,
    description: content.seo.about.en.description,
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
