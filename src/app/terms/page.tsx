import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of use",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of use">
      <p>
        These terms govern use of the Antara website and booking
        interface. Replace with finalized legal language prior to production.
      </p>
      <p>
        Content, photography, and trademarks on this site are protected. Unauthorized
        reproduction is prohibited.
      </p>
    </LegalLayout>
  );
}
