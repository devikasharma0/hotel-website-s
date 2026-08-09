"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ImageItem = { src: string; alt: string; span?: string };

type Props = {
  images: ImageItem[];
};

export function GalleryGrid({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const showPrev = useCallback(() => {
    setIndex((i) => (i == null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const showNext = useCallback(() => {
    setIndex((i) => (i == null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, close, showPrev, showNext]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={cn(
              "group relative aspect-square overflow-hidden bg-ink/5 text-left md:aspect-auto md:min-h-[180px]",
              image.span,
            )}
            onClick={() => setIndex(i)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      {index != null ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close gallery"
            onClick={close}
          />
          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
            <div className="relative aspect-[16/10] w-full max-h-[80vh]">
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-4 text-sm text-cream/80">{images[index].alt}</p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={showPrev}
                className="min-h-[44px] border border-cream/30 px-4 text-sm text-cream hover:bg-cream/10"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={showNext}
                className="min-h-[44px] border border-cream/30 px-4 text-sm text-cream hover:bg-cream/10"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
