import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AntaraMark } from "@/components/brand/AntaraMark";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Antara boutique hotels and retreats.",
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
          eyebrow="Antara"
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
      <section className="bg-ink py-20 text-cream md:py-28">
        <div className="mx-auto flex max-w-content flex-col items-center px-5 text-center md:px-8">
          <AntaraMark className="h-44 w-auto text-cream md:h-56" />
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.22em] text-cream/55">
            The name
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
            Antara — the space within
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/75 md:text-base">
            <span className="tracking-normal text-cream">अन्तर</span> — the
            inner, the interval, the still space a journey is really for. Our
            mark is a hamsa, the swan of Indian iconography, said to drink the
            milk and leave the water behind: discernment, which is the work a
            good hotel does on a guest&rsquo;s behalf. It is drawn in one
            unbroken line, and where its wing would fall a lotus opens instead
            — the two sharing a single body, as a place and a stay should.
          </p>
        </div>
      </section>
    </>
  );
}
