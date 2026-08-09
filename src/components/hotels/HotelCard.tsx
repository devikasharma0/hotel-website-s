import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/types/hotel";
import { Rating } from "@/components/ui/Rating";
import { formatInr } from "@/lib/utils";

type Props = {
  hotel: Hotel;
  layout?: "vertical" | "horizontal";
  className?: string;
};

export function HotelCard({ hotel, layout = "vertical", className }: Props) {
  const bookHref = `/book?hotel=${hotel.slug}`;

  if (layout === "horizontal") {
    return (
      <article
        className={cn(
          "group grid gap-4 border border-line bg-cream md:grid-cols-[minmax(0,42%)_1fr]",
          className,
        )}
      >
        <Link href={`/hotels/${hotel.slug}`} className="relative block min-h-[220px] overflow-hidden md:min-h-full">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </Link>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            {hotel.destination}
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">
            <Link
              href={`/hotels/${hotel.slug}`}
              className="underline-offset-4 hover:underline"
            >
              {hotel.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{hotel.location}</p>
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {hotel.shortDescription}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Rating value={hotel.rating} size="sm" />
            <span className="text-sm text-ink-muted">
              From {formatInr(hotel.priceFrom)}/night
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/hotels/${hotel.slug}`}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Explore
            </Link>
            <Link
              href={bookHref}
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Book
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-line bg-cream",
        className,
      )}
    >
      <Link
        href={`/hotels/${hotel.slug}`}
        className="relative block aspect-[4/5] overflow-hidden sm:aspect-[3/4]"
      >
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          {hotel.location}
        </p>
        <h3 className="mt-2 font-display text-xl leading-snug text-ink md:text-2xl">
          <Link
            href={`/hotels/${hotel.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {hotel.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {hotel.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-4">
          <Rating value={hotel.rating} size="sm" />
          <span className="text-sm font-medium text-ink">
            {formatInr(hotel.priceFrom)}
          </span>
        </div>
        <div className="mt-4 flex gap-4 text-sm font-medium">
          <Link href={`/hotels/${hotel.slug}`} className="hover:underline">
            Explore
          </Link>
          <Link href={bookHref} className="text-accent hover:underline">
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}
