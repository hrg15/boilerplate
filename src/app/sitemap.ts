import type { MetadataRoute } from "next";
import { ROUTES } from "@/shared/constants/routes";
import { BASE_URL } from "../../config";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: ROUTES.home, changeFrequency: "weekly", priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((route) => ({
    ...route,
    url: new URL(route.url, BASE_URL).toString(),
  }));
}
