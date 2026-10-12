import { Section } from "@/components/ui/Section";
import { ConvergeIcon, ListCheckIcon, SlidersIcon } from "@/components/ui/icons";
import { fmt, getDictionary } from "@/i18n";

const t = getDictionary();

// Une pastille de couleur douce par étape, comme la timeline de crowny.fun
const steps = [
  { Icon: ListCheckIcon, dot: "bg-primary/10 text-primary" },
  { Icon: ConvergeIcon, dot: "bg-warning/15 text-warning" },
  { Icon: SlidersIcon, dot: "bg-success/10 text-success" },
];

export function Solution() {
  const items = t.solution.items;

  return (
    <Section eyebrow={t.solution.eyebrow} title={t.solution.title} align="left">
      <ul className="timeline timeline-vertical timeline-compact timeline-snap-icon">
        {items.map((item, i) => {
          const { Icon, dot } = steps[i];
          return (
            // snap-icon annule la colonne vide de timeline-compact : on la remet à 0
            <li key={item.title} data-reveal className="[--timeline-col-start:0]">
              {i > 0 && <hr className="bg-primary/40" />}
              <div className="timeline-middle">
                <span className={`inline-flex size-[52px] items-center justify-center rounded-full ${dot}`}>
                  <Icon />
                </span>
              </div>
              <div className="timeline-end mb-12 ml-3 max-w-md pt-1 sm:ml-5">
                <p className="text-xs font-semibold tracking-wider text-base-content/60 uppercase">
                  {fmt(t.solution.step, { n: i + 1 })}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-pretty text-base-content/60">{item.text}</p>
              </div>
              {i < items.length - 1 && <hr className="bg-primary/40" />}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
