import Image from "next/image";
import type { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

type Props = {
  hotel: Hotel;
};

export function HotelHero({ hotel }: Props) {
  return (
    <section className="relative min-h-[55vh] bg-ink md:min-h-[65vh]">
      <Image
        src={hotel.images[0]}
        alt={hotel.name}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/20" />
      <div className="relative mx-auto flex min-h-[55vh] max-w-content flex-col justify-end px-5 pb-12 pt-28 md:min-h-[65vh] md:px-8 md:pb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-cream/75">
          {hotel.destination}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-cream md:text-5xl lg:text-6xl">
          {hotel.name}
        </h1>
        <p className="mt-3 text-sm text-cream/85 md:text-base">{hotel.location}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Rating value={hotel.rating} className="[&_span]:text-cream [&_span:last-child]:text-cream/90" />
          <span className="text-sm text-cream/70">
            {hotel.reviewCount} guest reviews
          </span>
        </div>
        <div className="mt-8 hidden md:block">
          <Button href={`/book?hotel=${hotel.slug}`}>Check availability</Button>
        </div>
      </div>
    </section>
  );
}
