import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { TrikutaDusk } from "@/components/art/TrikutaDusk";
import { homeHero } from "@/data/home";
import { siteConfig } from "@/lib/site";

/**
 * Homepage hero — "Darshan with warmth."
 *
 * Until a real photo is set in src/data/home.ts, the background is an inline
 * SVG dusk scene: the three peaks of Trikuta, the lit yatra path climbing to
 * the Bhawan, and a diya on the hotel terrace in the foreground. It is pure
 * markup, so the largest paint is the headline text, not an image download.
 */
export function Hero() {
  const { eyebrow, title, subtitle, primaryCta, whatsappCta, trustChips, image } =
    homeHero;
  const waHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    whatsappCta.message,
  )}`;

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#1c1622]">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <TrikutaDusk />
      )}

      {/* Readability: darken the text side, keep the hills and diya bright. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140f14]/85 via-[#140f14]/30 to-transparent md:bg-gradient-to-r md:from-[#140f14]/80 md:via-[#140f14]/35 md:to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-content flex-col justify-end px-5 pb-20 pt-32 md:px-8 md:pb-28">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#F3C98B] motion-safe:animate-[hero-rise_900ms_ease-out_both]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] text-cream sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/90 md:text-lg">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-start gap-3 motion-safe:animate-[hero-rise_1500ms_ease-out_both]">
          <Button
            href={primaryCta.href}
            variant="secondary"
            className="min-h-[52px] px-8 text-base"
          >
            {primaryCta.label}
          </Button>
          <div className="flex flex-col items-start">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-cream/45 px-7 text-base font-medium tracking-wide text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              <ChatIcon />
              {whatsappCta.label}
            </a>
            <span className="mt-2 text-xs text-cream/75">{whatsappCta.note}</span>
          </div>
        </div>

        <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:flex sm:flex-wrap motion-safe:animate-[hero-rise_1700ms_ease-out_both]">
          {trustChips.map((chip) => (
            <li
              key={chip}
              className="flex items-center gap-2 rounded-full border border-cream/25 bg-[#140f14]/40 px-4 py-2 text-xs text-cream/90 backdrop-blur-sm sm:text-sm"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2B45A]" />
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.74 4.86-1.28A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-2.88.76.77-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8s-.39-.12-.55.12-.63.8-.78.96-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34a.45.45 0 0 0-.02-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31 2.75 2.75 0 0 0-.86 2.05 4.78 4.78 0 0 0 1 2.54 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.61a2.5 2.5 0 0 0 1.66-1.17 2.05 2.05 0 0 0 .14-1.17c-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
