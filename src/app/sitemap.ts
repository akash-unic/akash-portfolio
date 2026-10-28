import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://github.com/akash-unic/akash-portfolio",
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
