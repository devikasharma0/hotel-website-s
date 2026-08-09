import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types/hotel";

type Props = {
  destination: Destination;
  index?: number;
};

export function DestinationCard({ destination, index = 0 }: Props) {
  const tall = index % 3 === 0;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`group relative block overflow-hidden bg-ink ${
        tall ? "md:row-span-2 md:min-h-[520px]" : "min-h-[280px]"
      }`}
    >
      <Image
        src={destination.heroImage}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
          {destination.region}
        </p>
        <h3 className="mt-2 font-display text-3xl text-cream md:text-4xl">
          {destination.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-cream/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
          {destination.tagline}
        </p>
      </div>
    </Link>
  );
}
