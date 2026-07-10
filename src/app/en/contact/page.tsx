import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: content.seo.contact.en.title,
  description: content.seo.contact.en.description,
  openGraph: {
    title: content.seo.contact.en.title,
    description: content.seo.contact.en.description,
    images: ["/contact-venue-v2.png"],
  },
  alternates: {
    canonical: "/en/contact",
    languages: {
      vi: "/lien-he",
      en: "/en/contact",
      "x-default": "/lien-he",
    },
  },
};

export default function Page() {
  return <ContactPage locale="en" />;
}
