import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAboutPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "45th Anniversary",
  description: "Celebrating 45 years of Weatherhaven.",
};

export default function AnniversaryPage() {
  const page = getAboutPage("anniversary");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
