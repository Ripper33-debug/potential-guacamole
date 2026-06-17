import Link from "next/link";
import Image from "next/image";

interface SiteFooterProps {
  site: {
    name: string;
    phone: string;
    email: string;
    address: string;
    social: { label: string; href: string }[];
  };
  legal: { label: string; href: string }[];
}

const socialIcons: Record<string, string> = {
  LinkedIn: "in",
  YouTube: "yt",
  Facebook: "fb",
  Instagram: "ig",
};

export default function SiteFooter({ site, legal }: SiteFooterProps) {
  const mid = Math.ceil(legal.length / 2);
  const col1 = legal.slice(0, mid);
  const col2 = legal.slice(mid);

  return (
    <footer className="bg-gradient-to-b from-wh-navy to-wh-navy-dark text-white">
      <div className="h-1 bg-gradient-to-r from-wh-orange via-wh-orange-light to-wh-orange" />
      <div className="wh-container py-14 lg:py-16">
        <div className="mb-10">
          <Image src="/images/logo.png" alt={site.name} width={180} height={44} className="h-10 w-auto brightness-0 invert" />
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-wh-orange">Head Office</h3>
            <p className="text-sm leading-relaxed text-white/70">{site.phone}</p>
            <p className="mt-2 text-sm text-white/70">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-wh-orange">
                {site.email}
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{site.address}</p>
            <div className="mt-5 flex gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 text-[10px] font-bold uppercase text-white/80 transition-colors hover:bg-wh-orange hover:text-white"
                  aria-label={s.label}
                >
                  {socialIcons[s.label] || s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          <div>
            {col1.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="mb-2.5 block text-xs uppercase tracking-wider text-white/60 transition-colors hover:text-wh-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            {col2.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="mb-2.5 block text-xs uppercase tracking-wider text-white/60 transition-colors hover:text-wh-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-right">
            <div className="inline-block rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-wider text-white/50">
              <p>ISO 9001</p>
              <p className="mt-1">ISO 14001</p>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          Copyright © {new Date().getFullYear()} Weatherhaven Global Resources Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
