"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  className?: string;
};

/**
 * An ambient video band: muted, looping, and playing itself.
 *
 * Two rules it has to respect. Autoplay only survives in browsers when the
 * video is muted and inline, and a guest who has asked for reduced motion
 * should get the poster frame and a play button instead of movement they did
 * not ask for. Either way the poster renders first, so the section never
 * appears as an empty black box while the file loads.
 */
export function VideoShowcase({ src, poster, title, caption, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    // Only spend bandwidth once the band is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className={cn("relative overflow-hidden bg-ink", className)}>
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-700",
            playing ? "opacity-0" : "opacity-100",
          )}
        />
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-cream md:text-5xl">
            {title}
          </h2>
          {caption ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base">
              {caption}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-cream/85 text-ink shadow-soft backdrop-blur-sm transition hover:bg-cream md:right-8 md:top-8"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            {playing ? (
              <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
            ) : (
              <path d="M8 5l11 7-11 7z" />
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
