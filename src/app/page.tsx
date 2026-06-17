import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getHomePage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Weatherhaven | Redeployable Infrastructure & Shelter Systems",
  description:
    "World leader in redeployable infrastructure and camp solutions for military, medical, and commercial operations.",
};

export default function HomePage() {
  const page = getHomePage();
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
