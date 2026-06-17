import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getInnovationPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Innovations",
  description: "Weatherhaven innovative redeployable solutions.",
};

export default function InnovationsPage() {
  const page = getInnovationPage();
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
