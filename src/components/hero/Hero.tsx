"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-ink">
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2400&q=85"
        alt="Sunlit luxury resort terrace overlooking mountains"
        fill
        priority
        className="object-cover object-center motion-safe:animate-[hero-zoom_18s_ease-out_forwards]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/30" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-content flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-cream/80">
          Discover your next escape
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
          Stay somewhere worth remembering.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
          Curated boutique hotels and retreats across India&apos;s most
          extraordinary landscapes — warm hospitality, editorial design, and
          seamless booking.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/hotels" variant="secondary">
            Explore stays
          </Button>
          <Button
            href="/book"
            variant="outline"
            className="border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
          >
            Book now
          </Button>
        </div>
      </div>
    </section>
  );
}
