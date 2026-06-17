import { PlaceholderImage } from "@/components/ui";
import type { PageContent } from "@/lib/schemas";

export default function PageHero({ hero }: { hero: PageContent["hero"] }) {
  if (hero.variant === "region") {
    return (
      <section className="bg-wh-navy py-16">
        <div className="wh-container flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{hero.title}</h1>
          <div className="hidden h-32 w-48 opacity-30 md:block">
            <PlaceholderImage src={hero.image} alt={hero.title} className="h-32 w-48" />
          </div>
        </div>
      </section>
    );
  }

  if (hero.variant === "navy") {
    return (
      <section className="bg-gray-600 py-20">
        <div className="wh-container">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{hero.title}</h1>
          {hero.subtitle && <p className="mt-4 max-w-2xl text-lg text-gray-200">{hero.subtitle}</p>}
        </div>
      </section>
    );
  }

  if (hero.variant === "split") {
    return (
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-wh-navy p-8 md:p-16">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{hero.title}</h1>
          {hero.subtitle && <p className="mt-4 text-gray-300">{hero.subtitle}</p>}
        </div>
        <PlaceholderImage src={hero.image} alt={hero.title} className="min-h-[280px]" priority />
      </section>
    );
  }

  return (
    <section className="relative min-h-[320px] md:min-h-[420px]">
      <PlaceholderImage src={hero.image} alt={hero.title} className="absolute inset-0 min-h-[320px] md:min-h-[420px]" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative flex min-h-[320px] items-center md:min-h-[420px]">
        <div className="wh-container">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{hero.title}</h1>
          {hero.subtitle && <p className="mt-4 max-w-2xl text-lg text-gray-100">{hero.subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
