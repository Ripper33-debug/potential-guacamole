import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getNewsPage, getNewsSlugs, getSiteConfig } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = getNewsPage(slug);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "News" };
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  try {
    const page = getNewsPage(slug);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
