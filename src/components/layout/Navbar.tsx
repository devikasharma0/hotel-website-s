"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AntaraWordmark } from "@/components/brand/AntaraWordmark";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { href: "/hotels", label: "Hotels" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || menuOpen
            ? "border-b border-line/80 bg-cream/95 backdrop-blur-md"
            : "bg-gradient-to-b from-ink/35 to-transparent",
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link
            href="/"
            aria-label={siteConfig.name}
            className={cn(
              "transition-colors",
              scrolled || menuOpen ? "text-ink" : "text-cream",
            )}
          >
            <AntaraWordmark className="h-8 w-auto md:h-9" />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide underline-offset-4 hover:underline",
                  scrolled ? "text-ink-muted" : "text-cream/90",
                  pathname.startsWith(link.href) && "underline",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href="/book"
              variant={scrolled ? "primary" : "outline"}
              className={cn(
                !scrolled &&
                  "!border-cream/40 !text-cream hover:!border-cream hover:!bg-cream/10",
              )}
            >
              Book now
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center border lg:hidden",
              scrolled || menuOpen
                ? "border-line text-ink"
                : "border-cream/40 text-cream",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className={cn("block h-px w-5 bg-current", menuOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("block h-px w-5 bg-current", menuOpen && "opacity-0")} />
              <span className={cn("block h-px w-5 bg-current", menuOpen && "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
