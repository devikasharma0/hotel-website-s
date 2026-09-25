import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy">
      <p>
        This placeholder privacy policy describes how Antara would
        collect, use, and protect guest information. Replace this text with counsel-approved
        copy before launch.
      </p>
      <p>
        We process booking and contact details to fulfill reservations, respond to
        inquiries, and improve our services. We do not sell personal data to third
        parties.
      </p>
    </LegalLayout>
  );
}
