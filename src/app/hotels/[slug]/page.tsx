import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookingBar } from "@/components/booking/BookingBar";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { HotelHero } from "@/components/hotels/HotelHero";
import { RoomCard } from "@/components/hotels/RoomCard";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllHotels, getHotelBySlug } from "@/lib/hotels";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, hotelSchema } from "@/lib/schema";
import { formatInr } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllHotels().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) return { title: "Hotel not found" };
  return {
    title: hotel.name,
    description: hotel.shortDescription,
    alternates: { canonical: `/hotels/${hotel.slug}` },
    openGraph: {
      title: hotel.name,
      description: hotel.shortDescription,
      images: [{ url: hotel.images[0] }],
    },
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  const hotel = getHotelBySlug(slug);
  if (!hotel) notFound();

  const gallery = hotel.images.map((src, i) => ({
    src,
    alt: `${hotel.name} — photo ${i + 1}`,
    span: i === 0 ? "md:col-span-2 md:row-span-2" : undefined,
  }));


  return (
    <>
      <JsonLd
        schema={[
          hotelSchema(hotel),
          breadcrumbSchema([
            { name: "Hotels", path: "/hotels" },
            { name: hotel.name, path: `/hotels/${hotel.slug}` },
          ]),
        ]}
      />
      <HotelHero hotel={hotel} />

      <section className="mx-auto max-w-content px-5 py-12 md:px-8">
        <ul className="grid gap-6 border border-line bg-cream-dark/30 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {[
            { label: "Guests", value: `Up to ${hotel.maxGuests}` },
            { label: "Rooms", value: String(hotel.roomCount) },
            { label: "Property type", value: hotel.propertyType },
            { label: "From", value: `${formatInr(hotel.priceFrom)}/night` },
          ].map((item) => (
            <li key={item.label} className="lg:px-6 first:lg:pl-0">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                {item.label}
              </p>
              <p className="mt-2 font-medium text-ink">{item.value}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-content px-5 pb-16 md:px-8">
        <SectionHeading eyebrow="About" title="A stay shaped by place" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
          {hotel.description}
        </p>
      </section>

      <section className="bg-cream-dark/40 py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Rooms" title="Spaces designed to unwind" />
          <div className="mt-10 flex flex-col gap-8">
            {hotel.rooms.map((room) => (
              <RoomCard key={room.id} room={room} hotelSlug={hotel.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
        <SectionHeading eyebrow="Amenities" title="Everything you need, nothing you don't" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {hotel.amenities.map((a) => (
            <li
              key={a}
              className="border border-line px-4 py-5 text-center text-sm text-ink-muted"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream-dark/30 py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Gallery" title="Inside the property" />
          <div className="mt-10">
            <GalleryGrid images={gallery} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8">
        <SectionHeading eyebrow="Experiences" title="While you're here" />
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {hotel.experiences.map((exp) => (
            <li
              key={exp}
              className="border-l-2 border-accent pl-4 text-sm text-ink-muted"
            >
              {exp}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-content px-5 pb-16 md:px-8">
        <SectionHeading eyebrow="Location" title="Find us" />
        <p className="mt-4 text-sm text-ink-soft">{hotel.location}</p>
        <div className="mt-6 aspect-[16/9] w-full overflow-hidden border border-line bg-line">
          <iframe
            title={`Map for ${hotel.name}`}
            src={hotel.mapEmbedUrl}
            className="h-full w-full min-h-[280px] border-0"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-cream-dark/50 py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Reviews" title="What guests say" />
          <ul className="mt-10 space-y-8">
            {hotel.reviews.map((review) => (
              <li key={review.id} className="border-b border-line pb-8 last:border-0">
                <Rating value={review.rating} size="sm" />
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                  {review.text}
                </p>
                <p className="mt-4 text-sm font-medium text-ink">
                  {review.guestName}
                  {review.location ? (
                    <span className="font-normal text-ink-soft">
                      {" "}
                      · {review.location}
                    </span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 pb-28 md:px-8 md:pb-16">
        <div className="flex flex-col items-start justify-between gap-6 border border-line bg-ink px-8 py-10 text-cream md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl">Ready to reserve?</h2>
            <p className="mt-2 text-sm text-cream/75">
              From {formatInr(hotel.priceFrom)} per night · flexible cancellation on select rates
            </p>
          </div>
          <Button href={`/book?hotel=${hotel.slug}`} variant="secondary">
            Check availability
          </Button>
        </div>
      </section>

      <BookingBar priceFrom={hotel.priceFrom} hotelSlug={hotel.slug} />
    </>
  );
}
