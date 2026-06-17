import PageHero from "@/components/sections/PageHero";
import SectionRenderer from "@/components/sections/SectionRenderer";
import ContactFormSection from "@/components/layout/ContactFormSection";
import type { PageContent } from "@/lib/schemas";

interface PageTemplateProps {
  page: PageContent;
  markets: string[];
}

export default function PageTemplate({ page, markets }: PageTemplateProps) {
  return (
    <>
      <PageHero hero={page.hero} />
      {page.sections.map((section, i) => (
        <SectionRenderer key={`${section.type}-${i}`} section={section} />
      ))}
      {page.showContactForm !== false && <ContactFormSection markets={markets} />}
    </>
  );
}
