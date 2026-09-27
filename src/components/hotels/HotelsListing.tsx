"use client";

import { HotelGrid } from "@/components/hotels/HotelGrid";
import { BookingSearch } from "@/components/booking/BookingSearch";
import { Modal } from "@/components/ui/Modal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { amenityOptions, filterHotels } from "@/lib/hotels";
import { getAllDestinations } from "@/lib/destinations";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export function HotelsListing() {
  const searchParams = useSearchParams();
  const destinations = getAllDestinations();

  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [destination, setDestination] = useState(
    searchParams.get("destination") ?? "all",
  );
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sort, setSort] = useState<
    "price-asc" | "price-desc" | "rating" | "name"
  >("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const d = searchParams.get("destination");
    if (d) setDestination(d);
  }, [searchParams]);

  const hotels = useMemo(
    () =>
      filterHotels({
        query,
        destination: destination === "all" ? undefined : destination,
        minRating,
        maxPrice,
        amenities,
        sort,
      }),
    [query, destination, minRating, maxPrice, amenities, sort],
  );

  const filterPanel = (
    <div className="space-y-6">
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Search
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm focus:border-accent focus:outline-none"
          placeholder="Property or location"
        />
      </label>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Destination
        </span>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
        >
          <option value="all">All destinations</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Minimum rating
        </span>
        <select
          value={minRating ?? ""}
          onChange={(e) =>
            setMinRating(e.target.value ? Number(e.target.value) : undefined)
          }
          className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="4.5">4.5+</option>
          <option value="4.7">4.7+</option>
          <option value="4.8">4.8+</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Max price (INR/night)
        </span>
        <select
          value={maxPrice ?? ""}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="9000">Up to ₹9,000</option>
          <option value="11000">Up to ₹11,000</option>
          <option value="13000">Up to ₹13,000</option>
        </select>
      </label>
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Amenities
        </legend>
        <ul className="mt-3 space-y-2">
          {amenityOptions.map((a) => (
            <li key={a}>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={(e) => {
                    setAmenities((prev) =>
                      e.target.checked
                        ? [...prev, a]
                        : prev.filter((x) => x !== a),
                    );
                  }}
                />
                {a}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <label className="block">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">
          Sort by
        </span>
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as typeof sort)
          }
          className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
        >
          <option value="rating">Guest rating</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <SectionHeading
            as="h1"
        eyebrow="Hotels & retreats"
        title="Find your stay"
        description="Filter by destination, price, and amenities — then explore each property in detail."
      />

      <div className="mt-10">
        <BookingSearch variant="inline" className="!mt-0 !px-0" />
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm text-ink-soft">{hotels.length} properties</p>
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="min-h-[44px] border border-line px-4 text-sm font-medium"
        >
          Filters
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-28 border border-line bg-cream p-6">
            <p className="font-display text-xl text-ink">Filters</p>
            <div className="mt-6">{filterPanel}</div>
          </div>
        </aside>
        <div>
          <p className="mb-6 hidden text-sm text-ink-soft lg:block">
            {hotels.length} properties
          </p>
          <HotelGrid hotels={hotels} layout="horizontal" />
        </div>
      </div>

      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        panelClassName="rounded-t-lg sm:rounded-sm"
      >
        {filterPanel}
        <button
          type="button"
          className="mt-6 w-full bg-ink py-3 text-sm font-medium text-cream"
          onClick={() => setFiltersOpen(false)}
        >
          Show {hotels.length} stays
        </button>
      </Modal>
    </div>
  );
}
