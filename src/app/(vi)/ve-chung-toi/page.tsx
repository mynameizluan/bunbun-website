import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { AboutPage } from "@/components/pages/about";

export const metadata: Metadata = {
  title: content.seo.about.vi.title,
  description: content.seo.about.vi.description,
  openGraph: {
    title: content.seo.about.vi.title,
    description: content.seo.about.vi.description,
    images: ["/hero-banner-clean.png"],
  },
  alternates: {
    canonical: "/ve-chung-toi",
    languages: {
      vi: "/ve-chung-toi",
      en: "/en/about",
      "x-default": "/ve-chung-toi",
    },
  },
};

export default function Page() {
  return <AboutPage locale="vi" />;
}
