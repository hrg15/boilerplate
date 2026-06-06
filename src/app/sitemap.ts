import type { MetadataRoute } from "next";
import { BASE_URL } from "../../config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPage = ["contact-us", "about-us"];

  const staticRoutes = staticPage.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...staticRoutes,
  ];
}
