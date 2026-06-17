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
    <header className="sticky top-0 z-50 border-b border-wh-gray-muted/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="wh-container flex h-[72px] items-center justify-between lg:h-20">
        <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-90">
          <Image src="/images/logo.png" alt="Weatherhaven" width={180} height={44} className="h-9 w-auto lg:h-11" priority />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
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
                <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[240px] overflow-hidden rounded-sm border border-wh-gray-muted bg-white py-2 shadow-xl shadow-wh-navy/10">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block border-l-2 border-transparent px-5 py-2.5 text-sm font-medium text-wh-navy transition-colors hover:border-wh-orange hover:bg-wh-gray-light hover:text-wh-orange"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button label="Contact" href="/contact" className="!px-5 !py-2.5" />
        </nav>

        <button
          type="button"
          className="rounded-sm p-2 text-wh-navy transition-colors hover:bg-wh-gray-light lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-wh-gray-muted bg-white lg:hidden">
          <div className="wh-container space-y-1 py-5">
            {navigation.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2.5 text-sm font-bold uppercase tracking-wider text-wh-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-2 pl-4 text-sm text-wh-gray-text hover:text-wh-orange"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Button label="Contact" href="/contact" className="mt-4" />
          </div>
        </div>
      )}
    </header>
  );
}
