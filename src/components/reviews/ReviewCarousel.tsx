"use client";

import { useState } from "react";
import type { Testimonial } from "@/types/hotel";
import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/utils";

type Props = {
  items: Testimonial[];
};

export function ReviewCarousel({ items }: Props) {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <div className="border border-line bg-cream-dark/40 px-6 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <Rating value={item.rating} className="justify-center" />
        <blockquote className="mt-6 font-display text-2xl leading-snug text-ink md:text-3xl">
          &ldquo;{item.text}&rdquo;
        </blockquote>
        <p className="mt-6 text-sm font-medium text-ink">{item.guestName}</p>
        <p className="text-sm text-ink-soft">{item.stayLocation}</p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show review ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              i === active ? "bg-accent" : "bg-line hover:bg-accent/50",
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-3 md:hidden">
        <button
          type="button"
          className="min-h-[44px] border border-line px-4 text-sm"
          onClick={() =>
            setActive((a) => (a - 1 + items.length) % items.length)
          }
        >
          Prev
        </button>
        <button
          type="button"
          className="min-h-[44px] border border-line px-4 text-sm"
          onClick={() => setActive((a) => (a + 1) % items.length)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
