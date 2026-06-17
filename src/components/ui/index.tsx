import Link from "next/link";
import Image from "next/image";

interface ButtonProps {
  label: string;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ label, href, type = "button", variant = "primary", className = "" }: ButtonProps) {
  const classes = `${variant === "primary" ? "wh-btn-primary" : "wh-btn-secondary"} ${className}`;
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

export function SectionHeading({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  if (accent) {
    return (
      <h2 className="wh-section-heading wh-heading-accent mb-8">
        <span>{children}</span>
      </h2>
    );
  }
  return <h2 className="wh-section-heading mb-8">{children}</h2>;
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
    <div className={`relative overflow-hidden bg-wh-navy ${className}`}>
      <Image src={imageSrc} alt={alt} fill className="object-cover" priority={priority} sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
}

export function CheckIcon() {
  return (
    <span className="mr-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-wh-orange text-wh-orange">
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

export function WhyChooseIcon({ type }: { type?: string }) {
  const icons: Record<string, string> = {
    solutions: "💡",
    engineering: "⚙️",
    global: "🌍",
  };
  return <span className="mb-4 block text-4xl">{icons[type || "solutions"]}</span>;
}
