"use client";

import { useState } from "react";

/**
 * Long-form property copy with a Read more toggle.
 *
 * Every paragraph is rendered up front and the collapse is done with a CSS
 * line clamp, so the full text is in the HTML for crawlers and AI engines even
 * while a reader sees only the opening. Mounting the rest on click would hide
 * the substance of the page from exactly the systems meant to summarise it.
 */
export function AboutProperty({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={
          expanded
            ? "space-y-4"
            : "relative max-h-32 space-y-4 overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-t after:from-cream after:to-transparent"
        }
      >
        {paragraphs.map((text, i) => (
          <p key={i} className="max-w-3xl text-base leading-relaxed text-ink-muted">
            {text}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-4 text-sm font-medium tracking-wide text-accent underline-offset-4 transition hover:underline"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
