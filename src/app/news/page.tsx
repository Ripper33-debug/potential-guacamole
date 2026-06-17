import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getNewsPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Weatherhaven.",
};

export default function NewsPage() {
  const page = getNewsPage();
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
