"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export default function SiteHeader({ navigation }: { navigation: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="wh-container flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Weatherhaven" width={160} height={40} className="h-8 w-auto lg:h-10" priority />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href={item.href} className="wh-nav-link">
                {item.label}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 mt-0 min-w-[220px] border border-gray-100 bg-white py-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-wh-navy hover:bg-wh-gray-light hover:text-wh-orange">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button label="CONTACT" href="/contact" />
        </nav>

        <button type="button" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="h-6 w-6 text-wh-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="wh-container space-y-1 py-4">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className="block py-2 text-sm font-semibold uppercase text-wh-navy" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href} className="block py-1 pl-4 text-sm text-wh-gray-text" onClick={() => setMobileOpen(false)}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Button label="CONTACT" href="/contact" className="mt-4" />
          </div>
        </div>
      )}
    </header>
  );
}
