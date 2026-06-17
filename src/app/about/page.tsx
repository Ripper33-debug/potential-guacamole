import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAboutPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: "Global leader in redeployable infrastructure since 1981.",
};

export default function AboutPage() {
  const page = getAboutPage("about");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
