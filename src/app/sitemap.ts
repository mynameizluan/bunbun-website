import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://bunbunburger.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/ve-chung-toi", "/lien-he"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/menu" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
