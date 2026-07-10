import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { HomePage } from "@/components/pages/home";

export const metadata: Metadata = {
  description: content.seo.home.en.description,
  alternates: {
    canonical: "/en",
    languages: { vi: "/", en: "/en", "x-default": "/" },
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
