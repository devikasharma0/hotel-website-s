import { cn } from "@/lib/utils";

type Props = {
  value: number;
  size?: "sm" | "md";
  className?: string;
};

export function Rating({ value, size = "md", className }: Props) {
  const full = Math.floor(value);
  const label = `${value.toFixed(1)} out of 5 stars`;

  return (
    <div
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label={label}
      role="img"
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "text-accent",
            size === "sm" ? "text-xs" : "text-sm",
            i < full ? "opacity-100" : "opacity-25",
          )}
        >
          ★
        </span>
      ))}
      <span
        className={cn(
          "font-medium text-ink-muted",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}
