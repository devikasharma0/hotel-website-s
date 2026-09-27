"use client";

import Link from "next/link";
import type { Room } from "@/types/hotel";
import { Carousel } from "@/components/ui/Carousel";
import { Rating } from "@/components/ui/Rating";
import { formatInr } from "@/lib/utils";

type Props = {
  room: Room;
  hotelSlug: string;
  rating?: number;
};

export function RoomCard({ room, hotelSlug, rating }: Props) {
  const bookHref = `/book?hotel=${hotelSlug}&room=${room.slug}`;
  const slides = room.images.map((src, i) => ({
    src,
    alt: `${room.name} — photo ${i + 1}`,
  }));

  return (
    <article className="flex h-full flex-col overflow-hidden border border-line bg-cream">
      <Carousel
        slides={slides}
        aspect="aspect-[4/3]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
        indicator="dots"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl text-ink">{room.name}</h3>
          {rating ? <Rating value={rating} size="sm" /> : null}
        </div>

        <p className="mt-2 text-sm text-ink-soft">
          Sleeps {room.occupancy} · {room.bedType}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {room.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((a) => (
            <li key={a} className="border border-line px-2 py-1 text-xs text-ink-muted">
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">From</p>
            <p className="font-medium text-ink">
              {formatInr(room.pricePerNight)}
              <span className="text-sm font-normal text-ink-soft">/night</span>
            </p>
          </div>
          {room.available ? (
            <Link
              href={bookHref}
              className="inline-flex min-h-[44px] items-center bg-ink px-5 text-sm font-medium text-cream transition hover:bg-accent-dark"
            >
              Book now
            </Link>
          ) : (
            <span className="text-sm text-accent-dark">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
