import type { Hotel } from "@/types/hotel";
import { HotelCard } from "@/components/hotels/HotelCard";
import { cn } from "@/lib/utils";

type Props = {
  hotels: Hotel[];
  className?: string;
  layout?: "vertical" | "horizontal";
};

export function HotelGrid({ hotels, className, layout = "vertical" }: Props) {
  if (!hotels.length) {
    return (
      <div className="border border-dashed border-line bg-cream-dark/50 px-6 py-16 text-center">
        <p className="font-display text-2xl text-ink">No stays match your search</p>
        <p className="mt-2 text-sm text-ink-soft">
          Try adjusting filters or exploring another destination.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === "vertical"
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-8",
        className,
      )}
    >
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} layout={layout} />
      ))}
    </div>
  );
}
