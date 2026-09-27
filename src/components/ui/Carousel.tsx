"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Slide = { src: string; alt: string };

type Props = {
  slides: Slide[];
  /** Rendered width hint for next/image. */
  sizes?: string;
  className?: string;
  aspect?: string;
  /** Dots suit a handful of slides; a counter suits many. */
  indicator?: "dots" | "counter" | "none";
  /** Only the first slide of an above-the-fold carousel should be priority. */
  priority?: boolean;
  rounded?: boolean;
  onExpand?: () => void;
  expandLabel?: string;
};

export function Carousel({
  slides,
  sizes = "100vw",
  className,
  aspect = "aspect-[4/3]",
  indicator = "dots",
  priority = false,
  rounded = false,
  onExpand,
  expandLabel,
}: Props) {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const touchX = useRef<number | null>(null);
  const labelId = useId();
  const count = slides.length;

  // Honour reduced motion: slides still change, they just don't slide.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setInstant(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  if (count === 0) return null;

  return (
    <div
      className={cn("group relative overflow-hidden bg-cream-dark", aspect,
        rounded && "rounded-sm", className)}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <span id={labelId} className="sr-only">
        Photo gallery, {count} images
      </span>

      <div
        className={cn("flex h-full w-full", !instant && "transition-transform duration-500 ease-out")}
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
      >
        {slides.map((slide, i) => (
          <div key={slide.src + i} className="relative h-full w-full shrink-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              loading={priority && i === 0 ? undefined : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {count > 1 ? (
        <>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(index + (dir === "next" ? 1 : -1))}
              aria-label={dir === "next" ? "Next photo" : "Previous photo"}
              className={cn(
                "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center",
                "rounded-full bg-cream/85 text-ink shadow-soft backdrop-blur-sm",
                "opacity-0 transition hover:bg-cream focus-visible:opacity-100",
                "group-hover:opacity-100 group-focus-within:opacity-100",
                dir === "next" ? "right-3" : "left-3",
              )}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"
                   stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d={dir === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          {indicator === "dots" ? (
            <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-5 bg-cream" : "w-1.5 bg-cream/55 hover:bg-cream/80",
                  )}
                />
              ))}
            </div>
          ) : null}

          {indicator === "counter" ? (
            <p className="absolute bottom-3 right-3 z-10 rounded-full bg-ink/65 px-3 py-1 text-xs text-cream backdrop-blur-sm">
              {index + 1} / {count}
            </p>
          ) : null}
        </>
      ) : null}

      {onExpand ? (
        <button
          type="button"
          onClick={onExpand}
          className="absolute bottom-3 left-3 z-10 rounded-full border border-ink/10 bg-cream px-4 py-2 text-xs font-medium tracking-wide text-ink shadow-soft transition hover:bg-cream-dark"
        >
          {expandLabel ?? `Show all ${count} photos`}
        </button>
      ) : null}
    </div>
  );
}
