import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function Section({ eyebrow, title, text, children, className = "", centered = false }: SectionProps) {
  return (
    <section className={`px-5 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || text) && (
          <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h2>}
            {text && <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
