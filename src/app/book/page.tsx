import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  alternates: { canonical: "/book" },
  title: "Book your stay",
  description: "Search availability and complete your reservation with Antara.",
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="px-5 py-32 text-center">Loading…</div>}>
      <BookingFlow />
    </Suspense>
  );
}
