import Image from "next/image";
import { Button } from "@/components/ui/Button";
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
        <DuskScene />
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

/** Trikuta at dusk: three peaks, the lit yatra path, a diya on the terrace. */
function DuskScene() {
  // Zigzag yatra path from the town up to the Bhawan on the middle peak.
  const yatraPath =
    "M1010 760 L1150 700 L1060 640 L1190 585 L1110 525 L1215 470 L1150 415 L1235 365 L1190 325 L1248 292";

  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMax slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1830" />
          <stop offset="0.38" stopColor="#3f2a3f" />
          <stop offset="0.66" stopColor="#8a4a3c" />
          <stop offset="0.86" stopColor="#d3844a" />
          <stop offset="1" stopColor="#efb567" />
        </linearGradient>
        <radialGradient id="sun" cx="0.72" cy="0.9" r="0.55">
          <stop offset="0" stopColor="#ffd08a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd08a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="farHills" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b4148" />
          <stop offset="1" stopColor="#4a2e38" />
        </linearGradient>
        <linearGradient id="trikuta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#35222c" />
          <stop offset="1" stopColor="#21161d" />
        </linearGradient>
        <radialGradient id="diyaGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity="0.85" />
          <stop offset="0.35" stopColor="#f2a44a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f2a44a" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#sky)" />
      <rect width="1600" height="900" fill="url(#sun)" />
      <g fill="#fff5e6">
        {[
          [120, 70, 1.4], [260, 140, 1], [420, 60, 1.2], [610, 120, 0.9],
          [760, 50, 1.3], [930, 110, 1], [1110, 70, 1.2], [1300, 130, 0.9],
          [1460, 60, 1.3], [1540, 170, 1], [340, 220, 0.8], [880, 200, 0.8],
        ].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity="0.75" />
        ))}
      </g>

      {/* Far range */}
      <path
        d="M0 640 L180 560 L330 600 L520 520 L700 575 L860 505 L980 540 L1600 470 L1600 900 L0 900 Z"
        fill="url(#farHills)"
        opacity="0.9"
      />

      {/* Trikuta — three peaks */}
      <path
        d="M720 900 L860 700 L960 620 L1060 470 L1120 400 L1170 450 L1248 270 L1330 420 L1380 380 L1440 330 L1520 460 L1600 520 L1600 900 Z"
        fill="url(#trikuta)"
      />

      {/* Lit yatra path: a blurred glow under crisp dots */}
      <path d={yatraPath} fill="none" stroke="#ffc46b" strokeWidth="7" strokeDasharray="0 16" strokeLinecap="round" filter="url(#glow)" opacity="0.8" />
      <path d={yatraPath} fill="none" stroke="#ffe0a3" strokeWidth="3.2" strokeDasharray="0 16" strokeLinecap="round" />

      {/* Bhawan — a small cluster of warm lights near the summit */}
      <g>
        <circle cx="1250" cy="288" r="26" fill="url(#diyaGlow)" />
        {[
          [1240, 290], [1248, 284], [1256, 291], [1262, 286], [1234, 296], [1252, 297],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="3.2" height="3.2" fill="#ffe7b0" />
        ))}
      </g>

      {/* Katra town lights at the foot */}
      <g fill="#ffd490" opacity="0.85">
        {[
          [880, 780], [905, 770], [935, 785], [965, 772], [990, 790], [1030, 778],
          [1070, 792], [1105, 781], [1140, 795], [1180, 784], [1215, 797], [1260, 786],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />
        ))}
      </g>

      {/* Hotel terrace parapet */}
      <path d="M0 830 L1600 815 L1600 900 L0 900 Z" fill="#150e12" />
      <path d="M0 830 L1600 815" stroke="#6b4a36" strokeWidth="3" opacity="0.7" />
      {/* Terrace pillars */}
      <g fill="#1d141a">
        <rect x="1350" y="640" width="26" height="180" />
        <rect x="1340" y="628" width="46" height="14" />
      </g>

      {/* Diya on the ledge */}
      <g>
        <circle cx="1470" cy="790" r="95" fill="url(#diyaGlow)" className="motion-safe:animate-[diya-breathe_3.2s_ease-in-out_infinite]" style={{ transformOrigin: "1470px 790px" }} />
        <path d="M1440 808 Q1470 836 1500 808 Z" fill="#8a4b2a" />
        <path d="M1440 808 L1500 808" stroke="#b86a3a" strokeWidth="3" />
        <path
          d="M1470 806 C1462 796 1464 784 1470 772 C1476 784 1478 796 1470 806 Z"
          fill="#ffd27a"
          className="motion-safe:animate-[diya-flicker_1.6s_ease-in-out_infinite]"
          style={{ transformOrigin: "1470px 806px" }}
        />
        <path d="M1470 802 C1467 796 1468 790 1470 785 C1472 790 1473 796 1470 802 Z" fill="#fff4d6" />
      </g>

      {/* Marigold string along the parapet */}
      <g fill="#f29a2e">
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={40 + i * 36} cy={838 + Math.sin(i / 1.6) * 6} r="7" opacity="0.9" />
        ))}
      </g>
    </svg>
  );
}
