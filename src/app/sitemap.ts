import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/ve-chung-toi",
    "/lien-he",
    "/en",
    "/en/menu",
    "/en/about",
    "/en/contact",
  ];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.endsWith("/menu") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/en" ? 0.9 : 0.8,
  }));
}
