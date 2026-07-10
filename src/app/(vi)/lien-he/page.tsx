import type { Metadata } from "next";
import content from "@/data/site-content.json";
import { ContactPage } from "@/components/pages/contact";

export const metadata: Metadata = {
  title: content.seo.contact.vi.title,
  description: content.seo.contact.vi.description,
  openGraph: {
    title: content.seo.contact.vi.title,
    description: content.seo.contact.vi.description,
    images: ["/contact-venue-v2.png"],
  },
  alternates: {
    canonical: "/lien-he",
    languages: {
      vi: "/lien-he",
      en: "/en/contact",
      "x-default": "/lien-he",
    },
  },
};

export default function Page() {
  return <ContactPage locale="vi" />;
}
