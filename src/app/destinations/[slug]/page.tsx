import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllDestinations, getDestinationBySlug } from "@/lib/destinations";
import { getHotelsByDestination } from "@/lib/hotels";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return { title: "Destination" };
  return {
    title: destination.name,
    description: destination.description,
    openGraph: {
      title: `${destination.name} stays`,
      description: destination.tagline,
      images: [{ url: destination.heroImage }],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const hotels = getHotelsByDestination(slug);
  const gallery = destination.gallery.map((src, i) => ({
    src,
    alt: `${destination.name} landscape ${i + 1}`,
  }));

  return (
    <>
      <section className="relative min-h-[50vh] bg-ink">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/25" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-content flex-col justify-end px-5 pb-12 pt-28 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            {destination.region}
          </p>
          <h1 className="mt-3 font-display text-4xl text-cream md:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-xl text-cream/85">{destination.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8">
        <SectionHeading eyebrow="Overview" title="Why travelers come here" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">
          {destination.description}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {destination.highlights.map((h) => (
            <li
              key={h}
              className="border border-line px-3 py-1 text-xs uppercase tracking-wide text-ink-soft"
            >
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream-dark/40 py-16 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading
            eyebrow="Recommended stays"
            title={`Hotels in ${destination.name}`}
          />
          <div className="mt-10">
            <HotelGrid hotels={hotels} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8">
        <SectionHeading eyebrow="Gallery" title="A sense of place" />
        <div className="mt-10">
          <GalleryGrid images={gallery} />
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-20 md:px-8">
        <SectionHeading eyebrow="Travel notes" title="Plan with confidence" />
        <ul className="mt-8 space-y-4 border-l border-line pl-6">
          {destination.travelTips.map((tip) => (
            <li key={tip} className="text-sm leading-relaxed text-ink-muted">
              {tip}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={`/hotels?destination=${destination.slug}`}>
            Search stays in {destination.name}
          </Button>
        </div>
      </section>
    </>
  );
}
