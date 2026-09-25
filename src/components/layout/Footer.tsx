import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { AntaraLogo } from "@/components/brand/AntaraLogo";

const explore = [
  { href: "/hotels", label: "Hotels" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#experiences", label: "Experiences" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const support = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Booking information" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cancellation-policy", label: "Cancellation" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-cream">
      <div className="mx-auto grid max-w-content gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AntaraLogo className="h-24 w-auto text-cream" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <a
              href={siteConfig.social.instagram}
              className="text-cream/80 underline-offset-4 hover:text-cream hover:underline"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.facebook}
              className="text-cream/80 underline-offset-4 hover:text-cream hover:underline"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.youtube}
              className="text-cream/80 underline-offset-4 hover:text-cream hover:underline"
            >
              YouTube
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/80 hover:text-cream hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/80 hover:text-cream hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
            Support
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {support.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-cream/80 hover:text-cream hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">
            Legal
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/80 hover:text-cream hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-cream/60">
            {siteConfig.contact.email}
            <br />
            {siteConfig.contact.phone}
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
