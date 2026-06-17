import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAboutPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Weatherhaven company history since 1981.",
};

export default function TimelinePage() {
  const page = getAboutPage("timeline");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
