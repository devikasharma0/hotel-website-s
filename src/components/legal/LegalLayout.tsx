import { type ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function LegalLayout({ title, children }: Props) {
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <h1 className="font-display text-4xl text-ink">{title}</h1>
      <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-ink-muted">
        {children}
      </div>
    </div>
  );
}
