import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { getNavigation, getSiteConfig } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Weatherhaven | Redeployable Infrastructure & Shelter Systems",
    template: "%s | Weatherhaven",
  },
  description:
    "World leader in redeployable infrastructure and camp solutions for military, medical, and commercial operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  const site = getSiteConfig();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SiteHeader navigation={navigation.main} />
        <main>{children}</main>
        <SiteFooter site={site} legal={navigation.footer.legal} />
        <Analytics />
      </body>
    </html>
  );
}
