import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-cream hover:bg-ink-muted border border-transparent",
  secondary:
    "bg-cream-dark text-ink hover:bg-line border border-line",
  ghost: "bg-transparent text-ink hover:bg-cream-dark border border-transparent",
  outline:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:bg-cream-dark",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-h-[44px]",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
