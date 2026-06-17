import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getInnovationPage, getInnovationSlugs, getSiteConfig } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getInnovationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = getInnovationPage(slug);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "Innovation" };
  }
}

export default async function InnovationPage({ params }: Props) {
  const { slug } = await params;
  try {
    const page = getInnovationPage(slug);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
