import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getProjectPage, getProjectSlugs, getSiteConfig } from "@/lib/content";

interface Props {
  params: Promise<{ continent: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((continent) => ({ continent }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { continent } = await params;
  try {
    const page = getProjectPage(continent);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "Projects" };
  }
}

export default async function ProjectRegionPage({ params }: Props) {
  const { continent } = await params;
  try {
    const page = getProjectPage(continent);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
