"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllHotels } from "@/lib/hotels";
import { formatInr } from "@/lib/utils";

const steps = [
  "property",
  "room",
  "dates",
  "guests",
  "details",
  "confirm",
] as const;

type Step = (typeof steps)[number];

export function BookingFlow() {
  const searchParams = useSearchParams();
  const hotels = getAllHotels();

  const [step, setStep] = useState<Step>("property");
  const [hotelSlug, setHotelSlug] = useState(searchParams.get("hotel") ?? "");
  const [roomSlug, setRoomSlug] = useState(searchParams.get("room") ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const hotel = useMemo(
    () => hotels.find((h) => h.slug === hotelSlug),
    [hotels, hotelSlug],
  );
  const room = useMemo(
    () => hotel?.rooms.find((r) => r.slug === roomSlug),
    [hotel, roomSlug],
  );

  function next() {
    setError(null);
    const idx = steps.indexOf(step);
    if (step === "property" && !hotel) {
      setError("Select a property to continue.");
      return;
    }
    if (step === "room" && !room) {
      setError("Select a room to continue.");
      return;
    }
    if (step === "dates" && (!checkIn || !checkOut)) {
      setError("Choose check-in and check-out dates.");
      return;
    }
    if (step === "details") {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        setError("Please complete all guest details.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Enter a valid email address.");
        return;
      }
    }
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  }

  function back() {
    setError(null);
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  }

  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <SectionHeading
            as="h1"
        eyebrow="Booking"
        title="Reserve your stay"
        description="Frontend booking flow with mock confirmation — ready to connect to your PMS or payment provider."
      />

      <ol className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-ink-soft">
        {steps.map((s) => (
          <li
            key={s}
            className={
              s === step
                ? "border border-ink px-2 py-1 text-ink"
                : "border border-line px-2 py-1"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      {error ? (
        <p className="mt-6 border border-accent/40 bg-cream-dark px-4 py-3 text-sm text-accent-dark">
          {error}
        </p>
      ) : null}

      <div className="mt-8 border border-line bg-cream p-6 md:p-10">
        {step === "property" ? (
          <fieldset className="space-y-3">
            <legend className="font-display text-2xl text-ink">Choose property</legend>
            {hotels.map((h) => (
              <label
                key={h.id}
                className="flex cursor-pointer items-start gap-3 border border-line p-4 hover:border-accent"
              >
                <input
                  type="radio"
                  name="hotel"
                  value={h.slug}
                  checked={hotelSlug === h.slug}
                  onChange={() => {
                    setHotelSlug(h.slug);
                    setRoomSlug("");
                  }}
                />
                <span>
                  <span className="block font-medium">{h.name}</span>
                  <span className="text-sm text-ink-soft">
                    {h.location} · from {formatInr(h.priceFrom)}/night
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === "room" && hotel ? (
          <fieldset className="space-y-3">
            <legend className="font-display text-2xl text-ink">Select room</legend>
            {hotel.rooms.map((r) => (
              <label
                key={r.id}
                className="flex cursor-pointer items-start gap-3 border border-line p-4 hover:border-accent"
              >
                <input
                  type="radio"
                  name="room"
                  value={r.slug}
                  checked={roomSlug === r.slug}
                  onChange={() => setRoomSlug(r.slug)}
                  disabled={!r.available}
                />
                <span>
                  <span className="block font-medium">{r.name}</span>
                  <span className="text-sm text-ink-soft">
                    {formatInr(r.pricePerNight)}/night · sleeps {r.occupancy}
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === "dates" ? (
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Check-out
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
              />
            </label>
          </div>
        ) : null}

        {step === "guests" ? (
          <label className="block max-w-xs">
            <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
              Guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-2 w-full border border-line px-3 py-2"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
            <p className="mt-4 text-sm text-ink-soft">
              Availability is mocked as confirmed for this demo flow.
            </p>
          </label>
        ) : null}

        {step === "details" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Full name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                Phone
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-line px-3 py-2"
                autoComplete="tel"
              />
            </label>
          </div>
        ) : null}

        {step === "confirm" && hotel && room ? (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink">Booking confirmed (demo)</h2>
            <p className="text-sm text-ink-muted">
              Reference <strong>MC-{Date.now().toString().slice(-8)}</strong> — payment
              not collected. Connect your booking engine to finalize reservations.
            </p>
            <ul className="border border-line text-sm">
              <li className="border-b border-line px-4 py-3">
                {hotel.name} · {room.name}
              </li>
              <li className="border-b border-line px-4 py-3">
                {checkIn} → {checkOut} · {guests} guests
              </li>
              <li className="px-4 py-3">
                {name} · {email}
              </li>
            </ul>
            <Button href="/" variant="outline">
              Return home
            </Button>
          </div>
        ) : null}
      </div>

      {step !== "confirm" ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {step !== "property" ? (
            <Button variant="outline" onClick={back}>
              Back
            </Button>
          ) : null}
          <Button onClick={next}>
            {step === "details" ? "Confirm booking" : "Continue"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
