"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="We're here to help plan your stay"
            description="Share your dates and preferences — our reservations team responds within one business day."
          />
          <form onSubmit={onSubmit} className="mt-10 space-y-5" noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Phone
                </span>
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Guests
                </span>
                <select
                  name="guests"
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
                  defaultValue="2"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Check-in
                </span>
                <input
                  name="checkIn"
                  type="date"
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Check-out
                </span>
                <input
                  name="checkOut"
                  type="date"
                  className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full border border-line bg-cream px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
            </label>
            {status === "error" ? (
              <p className="text-sm text-accent-dark">
                Please check required fields and your email format.
              </p>
            ) : null}
            {status === "success" ? (
              <p className="text-sm text-ink-muted">
                Thank you — your message has been recorded (demo). We&apos;ll be in touch
                shortly.
              </p>
            ) : null}
            <Button type="submit">Send message</Button>
          </form>
        </div>
        <aside className="border border-line bg-cream-dark/40 p-8">
          <p className="font-display text-2xl text-ink">Reservations desk</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {siteConfig.contact.address}
          </p>
          <p className="mt-6 text-sm">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="underline-offset-4 hover:underline"
            >
              {siteConfig.contact.email}
            </a>
            <br />
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="underline-offset-4 hover:underline"
            >
              {siteConfig.contact.phone}
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}
