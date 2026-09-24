import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/json-viewer",
    "/json-formatter",
    "/json-validator",
    "/code-compare",
    "/text-diff",
    "/jwt-decoder",
    "/online-code-editor",
    "/translator"
  ];

  return routes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.9,
  }));
}
