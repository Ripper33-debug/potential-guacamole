import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAboutPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Supplier Information",
  description: "Information for Weatherhaven suppliers.",
};

export default function SupplierPage() {
  const page = getAboutPage("supplier-information");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
