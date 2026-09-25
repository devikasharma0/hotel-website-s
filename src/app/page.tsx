import { BookingSearch } from "@/components/booking/BookingSearch";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Hero } from "@/components/hero/Hero";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import { ReviewCarousel } from "@/components/reviews/ReviewCarousel";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AntaraMark } from "@/components/brand/AntaraMark";
import { experienceCategories, galleryImages, testimonials } from "@/data/experiences";
import { getAllDestinations } from "@/lib/destinations";
import { getFeaturedHotels } from "@/lib/hotels";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedHotels(6);
  const destinations = getAllDestinations();

  return (
    <>
      <Hero />
      <BookingSearch />

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Featured properties"
          title="Stays chosen for place, light, and calm"
          description="Each property is selected for its setting and service — not for scale. Explore rooms, experiences, and availability in a few clicks."
        />
        <div className="mt-12">
          <HotelGrid hotels={featured} />
        </div>
        <div className="mt-10">
          <Button href="/hotels" variant="outline">
            View all hotels
          </Button>
        </div>
      </section>

      <section className="bg-cream-dark/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading
            eyebrow="Destinations"
            title="India's landscapes, thoughtfully mapped"
            description="From alpine cedar to quiet coast — find the mood that matches your escape."
          />
          <div className="mt-12 grid gap-3 md:grid-cols-3 md:grid-rows-2">
            {destinations.slice(0, 6).map((d, i) => (
              <DestinationCard key={d.slug} destination={d} index={i} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/destinations"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Explore all destinations
            </Link>
          </div>
        </div>
      </section>

      <section id="experiences" className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Experiences"
          title="More than a room — a reason to travel"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experienceCategories.map((exp) => (
            <article
              key={exp.slug}
              className="group relative min-h-[280px] overflow-hidden border border-line"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-cream">{exp.title}</h3>
                <p className="mt-2 text-sm text-cream/80">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[360px] md:min-h-[520px]">
          <Image
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85"
            alt="Guests relaxing on a terrace with mountain views"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center bg-ink px-8 py-16 text-cream md:px-14 md:py-20">
          <AntaraMark className="mb-8 h-24 w-auto text-cream/85 md:h-28" />
          <p className="text-xs uppercase tracking-[0.22em] text-cream/60">
            Our story
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
            Hospitality that feels personal — because it is.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-cream/80 md:text-base">
            Antara began with a simple belief: where you stay should
            deepen where you are. We partner with independent properties, train
            teams in warm, unobtrusive service, and design every touchpoint to
            feel calm, honest, and beautifully considered.
          </p>
          <div className="mt-8">
            <Button
              href="/about"
              variant="outline"
              className="border-cream/35 text-cream hover:border-cream hover:bg-cream/10"
            >
              Read about us
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Why stay with us"
          title="The details guests remember"
          align="center"
          className="mx-auto"
        />
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Thoughtfully chosen locations",
              body: "Properties positioned for views, walks, and quiet — not foot traffic.",
            },
            {
              title: "Personalized hospitality",
              body: "Small teams who know your name and respect your pace.",
            },
            {
              title: "Exceptional views",
              body: "Rooms framed for morning light and evening stillness.",
            },
            {
              title: "Curated experiences",
              body: "Local partners for food, nature, and culture — booked with ease.",
            },
            {
              title: "Comfortable stays",
              body: "Linens, acoustics, and climate considered as seriously as design.",
            },
            {
              title: "Seamless booking",
              body: "Clear pricing, flexible policies, and human support when you need it.",
            },
          ].map((item) => (
            <li key={item.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream-dark/40 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHeading eyebrow="Gallery" title="Moments from our collection" />
          <div className="mt-12">
            <GalleryGrid images={galleryImages} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Guest voices"
          title="Trusted by travelers who value calm"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <ReviewCarousel items={testimonials} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=2000&q=80"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative mx-auto max-w-content px-5 text-center md:px-8">
          <h2 className="font-display text-3xl text-cream md:text-5xl">
            Your next escape is closer than you think.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-cream/80 md:text-base">
            Search dates, compare stays, and reserve with confidence — payment
            integration ready when you are.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/hotels" variant="secondary">
              Explore stays
            </Button>
            <Button
              href="/book"
              variant="outline"
              className="border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
            >
              Start booking
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
