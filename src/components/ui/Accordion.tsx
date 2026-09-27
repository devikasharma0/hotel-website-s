"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/**
 * Disclosure list for FAQs. Built on <details>-style semantics with buttons so
 * the open state is controlled and only one panel stays open at a time.
 *
 * The answers stay in the DOM when collapsed — hidden with `hidden`, not
 * unmounted — so crawlers and AI engines still read them. FAQ content that
 * only exists after a click is content that never gets indexed.
 */
export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition hover:text-accent"
              >
                <span className="font-display text-lg text-ink md:text-xl">
                  {item.q}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-accent transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
            </dt>
            <dd
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="pb-6 pr-10 text-sm leading-relaxed text-ink-muted"
            >
              {item.a}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
