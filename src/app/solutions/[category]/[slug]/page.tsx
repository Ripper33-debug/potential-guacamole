import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getSiteConfig, getSolutionCategories, getSolutionPage, getSolutionSlugs } from "@/lib/content";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const category of getSolutionCategories()) {
    for (const slug of getSolutionSlugs(category)) {
      params.push({ category, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  try {
    const page = getSolutionPage(category, slug);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "Solution" };
  }
}

export default async function SolutionPage({ params }: Props) {
  const { category, slug } = await params;
  if (!getSolutionCategories().includes(category)) notFound();
  try {
    const page = getSolutionPage(category, slug);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
