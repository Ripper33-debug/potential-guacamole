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

export default function SiteFooter({ site, legal }: SiteFooterProps) {
  const mid = Math.ceil(legal.length / 2);
  const col1 = legal.slice(0, mid);
  const col2 = legal.slice(mid);

  return (
    <footer className="bg-wh-navy text-white">
      <div className="wh-container py-12">
        <div className="mb-8">
          <Image src="/images/logo.png" alt={site.name} width={160} height={40} className="mb-6 h-8 w-auto brightness-0 invert" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase">Head Office</h3>
            <p className="text-sm text-gray-300">International Number: {site.phone}</p>
            <p className="text-sm text-gray-300">
              Email:{" "}
              <a href={`mailto:${site.email}`} className="hover:text-wh-orange">
                {site.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-300">{site.address}</p>
            <div className="mt-4 flex gap-3">
              {site.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs uppercase text-gray-300 hover:text-wh-orange" aria-label={s.label}>
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          <div>
            {col1.map((link) => (
              <Link key={link.href + link.label} href={link.href} className="mb-2 block text-xs uppercase text-gray-300 hover:text-wh-orange">
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            {col2.map((link) => (
              <Link key={link.href + link.label} href={link.href} className="mb-2 block text-xs uppercase text-gray-300 hover:text-wh-orange">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>ISO 9001</p>
            <p>14001 CERTS</p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          Copyright © {new Date().getFullYear()} Weatherhaven Global Resources Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
