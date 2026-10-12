import { Section } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { ClockIcon, FilterIcon, NoiseIcon } from "@/components/ui/icons";
import { getDictionary } from "@/i18n";

const t = getDictionary();
const icons = [NoiseIcon, FilterIcon, ClockIcon];

export function Problem() {
  return (
    <Section eyebrow={t.problem.eyebrow} title={t.problem.title}>
      <div className="grid gap-4 sm:grid-cols-3">
        {t.problem.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div key={item.title} data-reveal className="flex">
              <Tilt>
                <article className="card h-full bg-base-200">
                  <div className="card-body">
                    <span className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-error/10 text-error">
                      <Icon />
                    </span>
                    <h3 className="card-title font-display text-xl tracking-tight">{item.title}</h3>
                    <p className="text-base text-pretty text-base-content/60">{item.text}</p>
                  </div>
                </article>
              </Tilt>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
