import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] bg-ink">
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-content flex-col items-start justify-center px-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cream/60">404</p>
        <h1 className="mt-4 font-display text-4xl text-cream md:text-5xl">
          This page wandered off the map.
        </h1>
        <p className="mt-4 max-w-md text-sm text-cream/75">
          The link may be outdated, or the page may have moved. Let&apos;s get you
          back to familiar ground.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="secondary">
            Back home
          </Button>
          <Link
            href="/hotels"
            className="inline-flex min-h-[44px] items-center border border-cream/40 px-6 text-sm text-cream hover:bg-cream/10"
          >
            Browse hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
