import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";

export const metadata: Metadata = {
  description:
    "One burger, made slowly — like a dish from Huế. Soft-baked buns, hand-cut fries, house sauces. All burgers 43,000đ, two locations in Huế, Vietnam.",
  alternates: {
    canonical: "/en",
    languages: { vi: "/", en: "/en", "x-default": "/" },
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
