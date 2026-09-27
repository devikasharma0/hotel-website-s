import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AboutProperty } from "@/components/hotels/AboutProperty";
import { BookingBar } from "@/components/booking/BookingBar";
import { HotelGallery } from "@/components/hotels/HotelGallery";
import { RoomCard } from "@/components/hotels/RoomCard";
import { VideoShowcase } from "@/components/hotels/VideoShowcase";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, hotelSchema } from "@/lib/schema";
import { getAllHotels, getHotelBySlug } from "@/lib/hotels";
import { siteConfig } from "@/lib/site";
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

  return (
    <>
      <JsonLd
        schema={[
          hotelSchema(hotel),
          faqSchema(hotel.faqs, `/hotels/${hotel.slug}`),
          breadcrumbSchema([
            { name: "Hotels", path: "/hotels" },
            { name: hotel.name, path: `/hotels/${hotel.slug}` },
          ]),
        ]}
      />

      {/* Title first, then pictures — the reference leads with the gallery. */}
      <section className="mx-auto max-w-content px-5 pt-28 md:px-8 md:pt-32">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          {hotel.destination}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {hotel.name}
          </h1>
          <div className="flex items-center gap-3">
            <Rating value={hotel.rating} size="sm" />
            <span className="text-sm text-ink-soft">
              {hotel.rating} · {hotel.reviewCount} reviews
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-ink-soft">{hotel.location}</p>
      </section>

      <section className="mx-auto mt-6 max-w-content px-5 md:px-8">
        <HotelGallery name={hotel.name} images={hotel.images} />
      </section>

      <section className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)]">
          <div>
            <SectionHeading eyebrow="About" title="About our property" />
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
              {hotel.description}
            </p>
            <div className="mt-6">
              <AboutProperty paragraphs={hotel.about} />
            </div>
          </div>

          <aside className="h-fit border border-line bg-cream-dark/30 p-6">
            <h2 className="font-display text-xl text-ink">Quick information</h2>
            <dl className="mt-5 space-y-4 text-sm">
              {[
                ["Check in", hotel.checkIn],
                ["Check out", hotel.checkOut],
                ["Property type", hotel.propertyType],
                ["Rooms", String(hotel.roomCount)],
                ["Max guests", `Up to ${hotel.maxGuests}`],
                ["Address", hotel.location],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line pb-3 last:border-0"
                >
                  <dt className="text-ink-soft">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 space-y-1 text-sm">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="block text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="mt-6">
              <Button
                href={`/book?hotel=${hotel.slug}`}
                className="w-full justify-center"
              >
                Check availability
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream-dark/40 py-14 md:py-16">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Amenities" title="What this property offers" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {hotel.amenities.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 border border-line bg-cream px-4 py-4 text-sm text-ink-muted"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {hotel.video ? (
        <VideoShowcase
          src={hotel.video.src}
          poster={hotel.video.poster}
          title={`A day at ${hotel.name}`}
          caption={hotel.shortDescription}
          className="my-14 md:my-16"
        />
      ) : null}

      <section className="mx-auto max-w-content px-5 pb-14 md:px-8 md:pb-16">
        <SectionHeading eyebrow="Rooms" title="Exclusive retreats" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {hotel.rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              hotelSlug={hotel.slug}
              rating={hotel.rating}
            />
          ))}
        </div>
      </section>

      <section className="bg-cream-dark/30 py-14 md:py-16">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Experiences" title="While you're here" />
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {hotel.experiences.map((exp) => (
              <li
                key={exp}
                className="border-l-2 border-accent bg-cream px-5 py-5 text-sm text-ink-muted"
              >
                {exp}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-16">
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

      <section className="bg-cream-dark/50 py-14 md:py-16">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Reviews" title="What guests say" />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {hotel.reviews.map((review) => (
              <li key={review.id} className="border border-line bg-cream p-6">
                <Rating value={review.rating} size="sm" />
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {review.text}
                </p>
                <p className="mt-4 text-sm font-medium text-ink">
                  {review.guestName}
                  {review.location ? (
                    <span className="font-normal text-ink-soft"> · {review.location}</span>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-16">
        <SectionHeading
          eyebrow="Support"
          title="Frequently asked questions"
          className="mb-10"
        />
        <div className="max-w-3xl">
          <Accordion items={hotel.faqs} />
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-28 md:px-8 md:pb-16">
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
