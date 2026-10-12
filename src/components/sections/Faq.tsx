import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/i18n";

const t = getDictionary();

export function Faq() {
  return (
    <Section id="faq" eyebrow={t.faq.eyebrow} title={t.faq.title}>
      <div className="mx-auto max-w-2xl space-y-3">
        {t.faq.items.map((item) => (
          <details key={item.q} data-reveal className="collapse collapse-arrow bg-base-200 open:bg-secondary/70">
            <summary className="collapse-title font-display text-lg font-semibold tracking-tight">{item.q}</summary>
            <div className="collapse-content">
              <p className="leading-relaxed text-pretty text-base-content/60">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
