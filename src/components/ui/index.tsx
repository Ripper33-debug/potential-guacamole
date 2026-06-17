import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

interface ButtonProps {
  label: string;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "navy";
  className?: string;
}

export function Button({ label, href, type = "button", variant = "primary", className = "" }: ButtonProps) {
  const variantClass =
    variant === "secondary" ? "wh-btn-secondary" : variant === "navy" ? "wh-btn-navy" : "wh-btn-primary";
  const classes = `${variantClass} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {label}
    </button>
  );
}

export function SectionHeading({ children, accent = false, eyebrow }: { children: ReactNode; accent?: boolean; eyebrow?: string }) {
  if (accent) {
    return (
      <div className="mb-8">
        {eyebrow && <span className="wh-eyebrow">{eyebrow}</span>}
        <h2 className="wh-section-heading wh-heading-accent">
          <span>{children}</span>
        </h2>
      </div>
    );
  }
  return (
    <div className="mb-8">
      {eyebrow && <span className="wh-eyebrow">{eyebrow}</span>}
      <h2 className="wh-section-heading">{children}</h2>
    </div>
  );
}

export function PlaceholderImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const imageSrc = src || "/images/placeholders/default.svg";
  return (
    <div className={`wh-image-frame ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover opacity-75 mix-blend-luminosity transition-transform duration-700 hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export function CheckIcon() {
  return (
    <span className="mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wh-orange/10 text-wh-orange ring-1 ring-wh-orange/30">
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

const whyChooseIcons: Record<string, ReactNode> = {
  solutions: (
    <svg className="mx-auto h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  engineering: (
    <svg className="mx-auto h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03a2.652 2.652 0 00-3.64-.061l-2.33 2.33a2.652 2.652 0 00-.061 3.64l3.03 2.496M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>
  ),
  global: (
    <svg className="mx-auto h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
};

export function WhyChooseIcon({ type }: { type?: string }) {
  return (
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-wh-navy text-wh-orange ring-4 ring-wh-orange/10">
      {whyChooseIcons[type || "solutions"]}
    </div>
  );
}

export function LinkArrow({ label = "Read more" }: { label?: string }) {
  return (
    <span className="wh-link-arrow">
      {label}
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </span>
  );
}
