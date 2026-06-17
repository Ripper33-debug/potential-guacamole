import type { Metadata } from "next";
import PageTemplate from "@/components/templates/PageTemplate";
import { getProjectPage, getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Global deployments across 95+ countries.",
};

export default function ProjectsPage() {
  const page = getProjectPage("index");
  const site = getSiteConfig();
  return <PageTemplate page={page} markets={site.markets} />;
}
