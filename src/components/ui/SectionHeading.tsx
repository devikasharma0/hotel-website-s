import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Props = {
  /** Use "h1" where this is the page's main heading. Defaults to "h2". */
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  as: Heading = "h2",
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="font-display text-3xl leading-tight text-ink md:text-4xl lg:text-[2.75rem]">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
