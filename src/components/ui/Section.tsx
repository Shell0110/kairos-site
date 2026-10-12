import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: "center" | "left";
};

export function Section({ id, eyebrow, title, subtitle, children, className = "", align = "center" }: SectionProps) {
  const centered = align === "center";
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <header data-reveal className={`mb-10 max-w-2xl sm:mb-14 ${centered ? "mx-auto text-center" : ""}`}>
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
          <h2 className="font-display text-3xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-lg text-pretty text-base-content/60">{subtitle}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
