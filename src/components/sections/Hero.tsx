import { getDictionary } from "@/i18n";
import { JoinCard } from "@/components/waitlist/JoinCard";

const t = getDictionary();

export function Hero() {
  return (
    <section id="top" className="px-4 pt-14 pb-16 sm:pt-24 sm:pb-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="badge badge-primary badge-sm mb-6 font-medium">{t.hero.badge}</span>

        <h1 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-5xl">
          {t.hero.titleBefore}{" "}
          <span className="text-rotate align-bottom text-primary">
            <span>
              {t.hero.rotatingWords.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </span>
          </span>
          <br />
          {t.hero.titleAfter}
          <span className="mt-2 block text-xl text-base-content/60 sm:text-2xl">{t.hero.titleAccent}</span>
        </h1>

        <p className="mt-3 text-sm text-pretty text-base-content/60">{t.hero.subtitle}</p>
      </div>

      <div id="inscription" className="mt-10 scroll-mt-24 sm:mt-12">
        <JoinCard />
      </div>
    </section>
  );
}
