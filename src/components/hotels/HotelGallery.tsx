"use client";

import Image from "next/image";
import { useState } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { Modal } from "@/components/ui/Modal";

/**
 * The property gallery: one large slide on mobile, a hero-plus-grid mosaic on
 * desktop, and a "show all" modal holding every photo.
 */
export function HotelGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [open, setOpen] = useState(false);
  const slides = images.map((src, i) => ({
    src,
    alt: `${name} — photo ${i + 1} of ${images.length}`,
  }));
  const mosaic = images.slice(1, 5);

  return (
    <>
      {/* Mobile: a single swipeable frame. */}
      <div className="md:hidden">
        <Carousel
          slides={slides}
          aspect="aspect-[4/3]"
          sizes="100vw"
          indicator="counter"
          priority
          onExpand={() => setOpen(true)}
        />
      </div>

      {/* Desktop: the classic hero-and-four mosaic. */}
      <div className="relative hidden gap-2 md:grid md:grid-cols-4 md:grid-rows-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          aria-label={`Open gallery, ${images.length} photos`}
        >
          <Image
            src={images[0]}
            alt={`${name} — featured photo`}
            fill
            priority
            sizes="(max-width: 1024px) 50vw, 640px"
            className="object-cover transition duration-500 hover:scale-[1.02]"
          />
        </button>

        {mosaic.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(true)}
            className="relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`Open gallery, photo ${i + 2}`}
          >
            <Image
              src={src}
              alt={`${name} — photo ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 25vw, 320px"
              className="object-cover transition duration-500 hover:scale-[1.03]"
            />
          </button>
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-4 right-4 rounded-full border border-ink/10 bg-cream px-5 py-2.5 text-xs font-medium tracking-wide text-ink shadow-soft transition hover:bg-cream-dark"
        >
          Show all {images.length} photos
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`${name} — gallery`}
        panelClassName="max-w-5xl"
      >
        <Carousel
          slides={slides}
          aspect="aspect-[16/10]"
          sizes="(max-width: 1024px) 100vw, 960px"
          indicator="counter"
        />
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt={`${name} — photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 33vw, 220px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
