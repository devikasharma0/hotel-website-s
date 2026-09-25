type Variant = "horizontal" | "mark";

/**
 * Antara's logo, inlined so it inherits `currentColor` — the same file can
 * sit on cream or on ink without a second asset. The static SVGs in
 * /public/brand are for anything outside React (email, decks, print).
 *
 * - "horizontal": the onion arch and flame beside the wordmark. Navigation,
 *   footers, anywhere the name needs to be read.
 * - "mark": the arch alone, for sizes where the wordmark would close up.
 */
export function AntaraLogo({
  variant = "horizontal",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="10 0 100 146"
        className={className}
        role="img"
        aria-label="Antara"
        fill="none"
      >
      <g stroke="currentColor" strokeWidth="3.6" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M 90,132 L 90,78
      C 95,62 92,50 86,44
      C 80,34 66,22 60,14
      C 54,22 40,34 34,44
      C 28,50 25,62 30,78
      L 30,132" />
      <path d="M 22,132 L 98,132" />
      <path d="M 60,59 C 76,85 74,107 60,126 C 46,107 44,85 60,59 Z"
      fill="currentColor" stroke="none" />
      </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="-14 -14 374.06 120.04"
      className={className}
      role="img"
      aria-label="Antara"
      fill="none"
    >
      <g transform="translate(-17.16 -10.92) scale(0.78)" fill="none" stroke="currentColor" strokeWidth="4.62"
      strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M 90,132 L 90,78 C 95,62 92,50 86,44 C 80,34 66,22 60,14
      C 54,22 40,34 34,44 C 28,50 25,62 30,78 L 30,132"/>
      <path d="M 22,132 L 98,132"/>
      <path d="M 60,59 C 76,85 74,107 60,126 C 46,107 44,85 60,59 Z"
      fill="currentColor" stroke="none"/>
      </g>
      <g transform="translate(85.28 25.96) scale(1.18)" fill="none" stroke="currentColor" strokeWidth="3.73" strokeLinecap="butt" strokeLinejoin="miter">
      <path d="M 0,34 L 15,0 L 30,34 M 5.29,22 L 24.71,22"/>
      <path d="M 41,34 L 41,0 L 67,34 L 67,0"/>
      <path d="M 78,0 L 104,0 M 91,0 L 91,34"/>
      <path d="M 115,34 L 130,0 L 145,34 M 120.29,22 L 139.71,22"/>
      <path d="M 156,34 L 156,0 L 168,0 A 8.5 8.5 0 0 1 168,17 L 156,17 M 168,17 L 180,34"/>
      <path d="M 191,34 L 206,0 L 221,34 M 196.29,22 L 215.71,22"/>
      </g>
    </svg>
  );
}
