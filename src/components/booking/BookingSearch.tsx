"use client";

import { getAllDestinations } from "@/lib/destinations";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "floating" | "inline";
};

export function BookingSearch({ className, variant = "floating" }: Props) {
  const router = useRouter();
  const destinations = getAllDestinations();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/hotels?${params.toString()}`);
  }

  const fieldClass =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-accent focus:outline-none focus:ring-0";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        variant === "floating" &&
          "-mt-10 relative z-10 mx-auto max-w-content px-5 md:-mt-14 md:px-8",
        className,
      )}
      aria-label="Search stays"
    >
      <div
        className={cn(
          "grid gap-6 bg-cream p-6 shadow-search md:grid-cols-[1.2fr_1fr_1fr_0.7fr_auto] md:items-end md:gap-4 md:p-8",
          variant === "inline" && "shadow-none border border-line",
        )}
      >
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
            Destination
          </span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={cn(fieldClass, "cursor-pointer")}
          >
            <option value="">Any destination</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
            Check-in
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
            Check-out
          </span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
            Guests
          </span>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={cn(fieldClass, "cursor-pointer")}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="h-[44px] bg-ink px-6 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-ink-muted md:mb-0.5"
        >
          Search
        </button>
      </div>
    </form>
  );
}
