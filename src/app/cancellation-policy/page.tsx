import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Cancellation policy",
};

export default function CancellationPage() {
  return (
    <LegalLayout title="Cancellation policy">
      <p>
        Cancellation windows and fees vary by property and rate plan. Flexible rates
        typically allow free cancellation up to 48–72 hours before check-in unless
        stated otherwise at booking.
      </p>
      <p>
        Non-refundable promotions may apply for peak dates. Guests receive full policy
        details on the confirmation screen once payment integration is live.
      </p>
    </LegalLayout>
  );
}
