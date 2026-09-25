import { MarkArt } from "@/components/brand/AntaraMark";
import { WordmarkArt } from "@/components/brand/AntaraWordmark";

/**
 * Mark and wordmark locked up side by side — the form for navigation bars,
 * footers and anywhere the name has to be read at a glance. Composed from the
 * two pieces rather than re-exporting their paths, so there is one source of
 * truth for each. Inherits `currentColor`.
 */
export function AntaraLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="-30 -39 2354 635" className={className} role="img" aria-label="Antara" fill="none">
      <MarkArt />
      <g transform="translate(687 394) scale(2.05357)">
        <WordmarkArt />
      </g>
    </svg>
  );
}
