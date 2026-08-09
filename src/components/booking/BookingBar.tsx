"use client";

import Link from "next/link";
import { formatInr } from "@/lib/utils";

type Props = {
  priceFrom: number;
  hotelSlug: string;
};

export function BookingBar({ priceFrom, hotelSlug }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4">
        <div>
          <p className="text-xs text-ink-soft">From</p>
          <p className="font-medium text-ink">
            {formatInr(priceFrom)}
            <span className="text-sm font-normal text-ink-soft">/night</span>
          </p>
        </div>
        <Link
          href={`/book?hotel=${hotelSlug}`}
          className="inline-flex min-h-[44px] items-center bg-ink px-5 text-sm font-medium text-cream"
        >
          Check availability
        </Link>
      </div>
    </div>
  );
}
