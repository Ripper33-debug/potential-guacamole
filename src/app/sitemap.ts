import type { MetadataRoute } from "next";
import {
  getAllProductSlugs,
  getInnovationSlugs,
  getNewsSlugs,
  getProjectSlugs,
  getSolutionCategories,
  getSolutionSlugs,
} from "@/lib/content";

const BASE = "https://www.weatherhaven.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/timeline",
    "/about/supplier-information",
    "/about/anniversary",
    "/contact",
    "/projects",
    "/innovations",
    "/news",
    "/products/containerized-solutions",
    "/solutions/medical",
    "/solutions/commercial",
    "/solutions/military",
    "/solutions/services",
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  getAllProductSlugs().forEach((slug) => {
    routes.push({ url: `${BASE}/products/${slug}`, lastModified: new Date() });
  });

  getSolutionCategories().forEach((category) => {
    routes.push({ url: `${BASE}/solutions/${category}`, lastModified: new Date() });
    getSolutionSlugs(category).forEach((slug) => {
      routes.push({ url: `${BASE}/solutions/${category}/${slug}`, lastModified: new Date() });
    });
  });

  getProjectSlugs().forEach((continent) => {
    routes.push({ url: `${BASE}/projects/${continent}`, lastModified: new Date() });
  });

  getInnovationSlugs().forEach((slug) => {
    routes.push({ url: `${BASE}/innovations/${slug}`, lastModified: new Date() });
  });

  getNewsSlugs().forEach((slug) => {
    routes.push({ url: `${BASE}/news/${slug}`, lastModified: new Date() });
  });

  return routes;
}
