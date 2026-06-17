import { PlaceholderImage } from "@/components/ui";
import type { PageContent } from "@/lib/schemas";

export default function PageHero({ hero }: { hero: PageContent["hero"] }) {
  if (hero.variant === "region") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-wh-navy-dark via-wh-navy to-wh-navy-mid py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(243,146,0,0.12),transparent_55%)]" />
        <div className="wh-container relative flex items-center justify-between gap-8">
          <div>
            <span className="wh-eyebrow text-wh-orange-light">Global Projects</span>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white md:text-5xl lg:text-6xl">{hero.title}</h1>
          </div>
          <div className="hidden h-36 w-56 overflow-hidden rounded-sm opacity-40 md:block">
            <PlaceholderImage src={hero.image} alt={hero.title} className="h-36 w-56" />
          </div>
        </div>
      </section>
    );
  }

  if (hero.variant === "navy") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-wh-navy-dark via-wh-navy to-wh-navy-mid py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(243,146,0,0.1),transparent_50%)]" />
        <div className="wh-container relative">
          <h1 className="max-w-4xl font-display text-4xl font-bold uppercase tracking-wide text-white md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            {hero.title}
          </h1>
          {hero.subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{hero.subtitle}</p>}
        </div>
      </section>
    );
  }

  if (hero.variant === "split") {
    return (
      <section className="grid min-h-[420px] md:grid-cols-2">
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-wh-navy-dark via-wh-navy to-wh-navy-mid p-10 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(243,146,0,0.15),transparent_60%)]" />
          <div className="relative">
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">{hero.title}</h1>
            {hero.subtitle && <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">{hero.subtitle}</p>}
          </div>
        </div>
        <PlaceholderImage src={hero.image} alt={hero.title} className="min-h-[320px]" priority />
      </section>
    );
  }

  return (
    <section className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[580px]">
      <PlaceholderImage src={hero.image} alt={hero.title} className="absolute inset-0 min-h-[420px] md:min-h-[520px] lg:min-h-[580px]" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-wh-navy/90 via-wh-navy/55 to-wh-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-wh-navy/80 via-transparent to-wh-navy/20" />
      <div className="relative flex min-h-[420px] items-center md:min-h-[520px] lg:min-h-[580px]">
        <div className="wh-container py-16">
          <span className="wh-eyebrow text-wh-orange-light">Weatherhaven</span>
          <h1 className="max-w-3xl font-display text-4xl font-bold uppercase tracking-wide text-white md:text-5xl lg:text-6xl">{hero.title}</h1>
          {hero.subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{hero.subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
