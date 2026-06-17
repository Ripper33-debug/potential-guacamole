import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getSiteConfig, getSolutionCategories, getSolutionPage } from "@/lib/content";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getSolutionCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  try {
    const page = getSolutionPage(category);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "Solutions" };
  }
}

export default async function SolutionCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!getSolutionCategories().includes(category)) notFound();
  try {
    const page = getSolutionPage(category);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
