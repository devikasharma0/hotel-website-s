"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LinkItem = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: LinkItem[];
};

export function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu overlay"
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <nav
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-line bg-cream px-6 py-24 shadow-soft transition-transform duration-300 motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile"
      >
        <ul className="flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-sm px-2 py-3 text-lg font-display text-ink hover:bg-cream-dark"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-line pt-6">
          <Button href="/book" className="w-full">
            Book now
          </Button>
        </div>
      </nav>
    </div>
  );
}
