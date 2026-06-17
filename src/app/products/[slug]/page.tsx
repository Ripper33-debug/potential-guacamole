import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/templates/PageTemplate";
import { getAllProductSlugs, getProductPage, getSiteConfig } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = getProductPage(slug);
    return { title: page.meta.title, description: page.meta.description };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  try {
    const page = getProductPage(slug);
    const site = getSiteConfig();
    return <PageTemplate page={page} markets={site.markets} />;
  } catch {
    notFound();
  }
}
