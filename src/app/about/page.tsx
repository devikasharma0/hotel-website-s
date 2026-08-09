import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Meridian Collection boutique hotels and retreats.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[40vh] bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=85"
          alt="Hotel lobby with warm lighting"
          fill
          className="object-cover opacity-90"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative mx-auto max-w-content px-5 pb-12 pt-32 md:px-8">
          <h1 className="font-display text-4xl text-cream md:text-5xl">About us</h1>
        </div>
      </section>
      <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Meridian Collection"
          title="Independent hospitality, elevated with care"
        />
        <div className="prose prose-neutral mt-8 max-w-3xl text-ink-muted">
          <p className="text-base leading-relaxed">
            We partner with owner-operated hotels and retreats across India —
            places with character, not corporate sameness. Our team handles brand
            standards, guest communication, and digital booking so each property
            can focus on what happens at the door.
          </p>
          <p className="mt-6 text-base leading-relaxed">
            Every stay is reviewed for location, design integrity, and service
            warmth. We believe luxury is quiet: good sleep, honest food, and
            staff who listen.
          </p>
        </div>
      </div>
    </>
  );
}
