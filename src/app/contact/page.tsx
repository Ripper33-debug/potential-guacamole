import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAboutPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Weatherhaven for redeployable infrastructure solutions.",
};

export default function ContactPage() {
  const page = getAboutPage("contact");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
