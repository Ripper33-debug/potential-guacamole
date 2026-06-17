import Link from "next/link";
import { Button, CheckIcon, LinkArrow, PlaceholderImage, SectionHeading, WhyChooseIcon } from "@/components/ui";
import type { Section } from "@/lib/schemas";

function renderBody(body: string | string[]) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return paragraphs.map((p, i) => (
    <p key={i} className="wh-prose mb-4 last:mb-0">
      {p}
    </p>
  ));
}

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "intro":
      return (
        <section className="py-20">
          <div className="wh-container grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {section.heading && <SectionHeading accent>{section.heading}</SectionHeading>}
              {renderBody(section.body)}
              {section.cta && <Button label={section.cta.label} href={section.cta.href || "/contact"} className="mt-6" />}
            </div>
            {section.image && (
              <div>
                <PlaceholderImage src={section.image} alt={section.heading || ""} className="aspect-[4/3] w-full rounded-sm shadow-lg shadow-wh-navy/10" />
                {section.caption && (
                  <div className="mt-6 border-l-4 border-wh-orange bg-wh-gray-light py-4 pl-5">
                    <h3 className="font-display text-lg font-bold uppercase text-wh-navy">{section.caption.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-wh-gray-text">{section.caption.body}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      );

    case "text":
      return (
        <section className="py-12">
          <div className="wh-container max-w-4xl">
            {section.heading && <SectionHeading accent>{section.heading}</SectionHeading>}
            {renderBody(section.body)}
          </div>
        </section>
      );

    case "cards": {
      const cols = section.columns || 3;
      const gridClass = cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <section className="wh-section-alt py-20">
          <div className="wh-container">
            {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
            <div className={`grid gap-8 ${gridClass}`}>
              {section.items.map((item) => (
                <article key={item.title} className="wh-card group flex flex-col">
                  {item.image && <PlaceholderImage src={item.image} alt={item.title} className="aspect-video w-full" />}
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    {item.tag && (
                      <span className="mb-3 inline-block w-fit rounded-sm bg-wh-orange px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="mb-3 font-display text-lg font-bold uppercase text-wh-navy">{item.title}</h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-wh-gray-text">{item.description}</p>
                    {item.href && (
                      <Link href={item.href} className="group/link mt-auto">
                        <LinkArrow label={item.buttonLabel || "Read more"} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "features":
      return (
        <section className="wh-section-alt py-20">
          <div className="wh-container">
            {section.heading && <SectionHeading accent>{section.heading}</SectionHeading>}
            <ul className="grid gap-5 sm:grid-cols-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start rounded-sm bg-white p-4 text-sm leading-relaxed text-wh-gray-text shadow-sm">
                  <CheckIcon />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    case "feature-grid":
      return (
        <section className="py-16">
          <div className="wh-container">
            {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
            <div className="grid gap-10 md:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.title}>
                  {item.image && <PlaceholderImage src={item.image} alt={item.title} className="mb-4 aspect-video w-full" />}
                  <h3 className="mb-2 font-bold text-wh-navy">{item.title}</h3>
                  <p className="text-sm text-wh-gray-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "why-choose":
      return (
        <section className="py-20">
          <div className="wh-container">
            <h2 className="mx-auto mb-14 max-w-4xl text-center font-display text-2xl font-bold uppercase leading-snug tracking-wide text-wh-navy md:text-3xl">
              {section.heading}
            </h2>
            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
              {section.items.map((item) => (
                <div key={item.title} className="rounded-sm border border-wh-gray-muted bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
                  <WhyChooseIcon type={item.icon} />
                  <h3 className="mb-4 font-display text-base font-bold uppercase leading-snug text-wh-navy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-wh-gray-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "specs":
      return (
        <section className="py-16">
          <div className="wh-container">
            {section.table.title && <SectionHeading>{section.table.title}</SectionHeading>}
            <SectionHeading>Specifications</SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-wh-navy to-wh-navy-mid">
                    {section.table.columns.map((col) => (
                      <th key={col} className="border border-wh-navy-mid px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-white">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? "bg-wh-gray-light" : "bg-white"}>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="border border-gray-200 px-4 py-3 text-wh-gray-text">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case "related-solutions":
    case "related-insights":
      return (
        <section className="wh-section-alt py-20">
          <div className="wh-container">
            <SectionHeading>{section.heading || "Related Solutions"}</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Link key={item.title} href={item.href || "/contact"} className="group relative block min-h-[220px] overflow-hidden rounded-sm shadow-md">
                  <PlaceholderImage src={item.image} alt={item.title} className="absolute inset-0" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-wh-navy via-wh-navy/70 to-transparent p-6 transition-colors group-hover:from-wh-navy-dark">
                    <h3 className="font-display text-lg font-bold uppercase text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
                    <span className="mt-4">
                      <LinkArrow label="Read more" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );

    case "rfp":
      return (
        <section className="py-16">
          <div className="wh-container max-w-3xl text-center">
            <SectionHeading accent>{section.heading || "DOWNLOAD OUR RFP GUIDE"}</SectionHeading>
            {section.body && <p className="mb-6 text-wh-gray-text">{section.body}</p>}
            <Button label="DOWNLOAD" href="/contact" />
          </div>
        </section>
      );

    case "split-banner":
      return (
        <section className={`grid md:grid-cols-2 ${section.reversed ? "md:[direction:rtl]" : ""}`}>
          <PlaceholderImage src={section.image} alt={section.title} className="min-h-[340px] md:[direction:ltr]" />
          <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-wh-navy-dark via-wh-navy to-wh-navy-mid p-10 md:p-16 lg:p-20 md:[direction:ltr]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(243,146,0,0.12),transparent_55%)]" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white md:text-3xl lg:text-4xl">{section.title}</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">{section.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {section.buttons?.map((btn, i) => (
                  <Button key={btn.label} label={btn.label} href={btn.href || "/contact"} variant={i === 0 ? "primary" : "secondary"} />
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case "columns":
      return (
        <section className="py-16">
          <div className="wh-container">
            {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
            <div className="grid gap-10 md:grid-cols-3">
              {section.items.map((item) => (
                <div key={item.title}>
                  {item.image && <PlaceholderImage src={item.image} alt={item.title} className="mb-4 aspect-video w-full" />}
                  <h3 className="mb-3 font-bold text-wh-navy">{item.title}</h3>
                  {renderBody(item.body)}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "timeline":
      return (
        <section className="py-16">
          <div className="wh-container max-w-4xl space-y-8">
            {section.items.map((item) => (
              <div key={item.year + item.title} className="grid gap-6 border-b border-gray-200 pb-8 md:grid-cols-[100px_1fr]">
                <div className="text-xl font-bold text-wh-orange">{item.year}</div>
                <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                  {item.image && <PlaceholderImage src={item.image} alt={item.title} className="aspect-video w-full max-w-[200px]" />}
                  <div>
                    <h3 className="font-bold uppercase text-wh-navy">{item.title}</h3>
                    <p className="mt-2 text-sm text-wh-gray-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "team":
      return (
        <section className="py-16">
          <div className="wh-container">
            {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
              {section.members.map((m) => (
                <div key={m.name} className="text-center">
                  <div className="mx-auto mb-3 h-24 w-24 rounded-full bg-wh-gray-light" />
                  <p className="text-sm font-bold text-wh-navy">{m.name}</p>
                  <p className="text-xs text-wh-gray-text">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "values":
      return (
        <section className="py-16">
          <div className="wh-container space-y-12">
            {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
            {section.items.map((item) => (
              <div key={item.title} className="grid gap-8 md:grid-cols-2 md:items-center">
                {item.image && <PlaceholderImage src={item.image} alt={item.title} className="aspect-video w-full" />}
                <div>
                  <h3 className="mb-3 text-xl font-bold text-wh-navy">{item.title}</h3>
                  <p className="text-wh-gray-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "hero-collage":
      return (
        <section className="-mt-1 bg-white py-16 md:py-20">
          <div className="wh-container">
            <div className="mb-10 grid grid-cols-4 gap-1.5 md:grid-cols-8 md:gap-2">
              {section.images.map((img, i) => (
                <PlaceholderImage
                  key={i}
                  src={img}
                  alt=""
                  className={`aspect-square w-full rounded-sm ${i % 3 === 0 ? "md:translate-y-2" : i % 3 === 1 ? "md:-translate-y-1" : ""}`}
                />
              ))}
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <p className="wh-prose text-lg md:text-xl">{section.body}</p>
              {section.cta && (
                <div className="mt-8">
                  <Button label={section.cta.label} href={section.cta.href || "/contact"} />
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case "carousel":
      return (
        <section className="py-20">
          <div className="wh-container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {section.items.map((item) => (
                <Link key={item.title} href={item.href || "/contact"} className="group block">
                  <PlaceholderImage src={item.image} alt={item.title} className="mb-5 aspect-[3/4] w-full rounded-sm shadow-md transition-shadow group-hover:shadow-xl" />
                  <h3 className="font-display text-base font-bold uppercase text-wh-navy transition-colors group-hover:text-wh-orange">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-wh-gray-text">{item.description}</p>
                  <span className="mt-4 block">
                    <LinkArrow label="Read more" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );

    case "news-feature":
      return (
        <section className="wh-section-alt py-20">
          <div className="wh-container grid gap-10 lg:grid-cols-2 lg:gap-12">
            <Link href={section.featured.href || "/news"} className="group block">
              <PlaceholderImage src={section.featured.image} alt={section.featured.title} className="mb-5 aspect-video w-full rounded-sm shadow-lg" />
              <span className="wh-eyebrow">Featured</span>
              <h3 className="font-display text-xl font-bold uppercase leading-snug text-wh-navy transition-colors group-hover:text-wh-orange md:text-2xl">
                {section.featured.title}
              </h3>
              <p className="mt-3 wh-prose">{section.featured.description}</p>
              <span className="mt-5 block">
                <LinkArrow label="Read full story" />
              </span>
            </Link>
            <div className="space-y-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-wh-navy">Group News</h3>
              {section.items.map((item) => (
                <Link key={item.title} href={item.href || "/news"} className="group flex gap-5 rounded-sm border border-wh-gray-muted bg-white p-4 transition-shadow hover:shadow-md">
                  <PlaceholderImage src={item.image} alt={item.title} className="h-20 w-28 shrink-0 rounded-sm" />
                  <div>
                    <h4 className="text-sm font-bold leading-snug text-wh-navy group-hover:text-wh-orange">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-wh-gray-text">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );

    case "team-cta":
      return (
        <section className="border-y border-wh-gray-muted py-20">
          <div className="wh-container grid gap-10 md:grid-cols-2 md:items-center">
            {section.image && <PlaceholderImage src={section.image} alt="" className="aspect-video w-full rounded-sm shadow-lg" />}
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-wh-navy md:text-3xl">{section.title}</h2>
              <p className="mt-5 wh-prose">{section.body}</p>
              <Button label={section.cta.label} href={section.cta.href || "/contact"} className="mt-8" />
            </div>
          </div>
        </section>
      );

    case "cta-bar":
      return (
        <section className="border-y border-gray-200 py-8">
          <div className="wh-container flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-3xl text-wh-gray-text">{section.body}</p>
            <Button label={section.cta.label} href={section.cta.href || "/contact"} />
          </div>
        </section>
      );

    case "article":
      return (
        <section className="py-16">
          <div className="wh-container grid gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              {section.date && <p className="mb-4 text-sm text-wh-gray-text">{section.date}</p>}
              {section.body.map((p, i) => (
                <p key={i} className="mb-4 text-wh-gray-text leading-relaxed">
                  {p}
                </p>
              ))}
            </article>
            {section.sidebar && (
              <aside className="border border-gray-200 p-6">
                {section.sidebar.image && <PlaceholderImage src={section.sidebar.image} alt={section.sidebar.name} className="mb-4 aspect-square w-full max-w-[200px]" />}
                <h3 className="font-bold text-wh-navy">{section.sidebar.name}</h3>
                <p className="text-sm text-wh-orange">{section.sidebar.title}</p>
                <p className="mt-3 text-sm text-wh-gray-text">{section.sidebar.bio}</p>
                <Button label="READ MORE NEWS" href="/news" className="mt-6" />
              </aside>
            )}
          </div>
        </section>
      );

    default:
      return null;
  }
}
