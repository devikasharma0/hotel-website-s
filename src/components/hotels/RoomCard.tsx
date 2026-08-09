import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types/hotel";
import { formatInr } from "@/lib/utils";

type Props = {
  room: Room;
  hotelSlug: string;
};

export function RoomCard({ room, hotelSlug }: Props) {
  const bookHref = `/book?hotel=${hotelSlug}&room=${room.slug}`;

  return (
    <article className="grid gap-4 border border-line bg-cream md:grid-cols-[minmax(0,38%)_1fr]">
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[240px]">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 35vw"
        />
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <h3 className="font-display text-2xl text-ink">{room.name}</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Sleeps {room.occupancy} · {room.bedType}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {room.amenities.map((a) => (
            <li
              key={a}
              className="border border-line px-2 py-1 text-xs text-ink-muted"
            >
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <div>
            <p className="text-sm text-ink-soft">From</p>
            <p className="font-medium text-ink">
              {formatInr(room.pricePerNight)}
              <span className="text-sm font-normal text-ink-soft">/night</span>
            </p>
          </div>
          {room.available ? (
            <Link
              href={bookHref}
              className="inline-flex min-h-[44px] items-center bg-ink px-5 text-sm font-medium text-cream"
            >
              Book
            </Link>
          ) : (
            <span className="text-sm text-accent-dark">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
