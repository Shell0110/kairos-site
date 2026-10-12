import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { fmt, getDictionary } from "@/i18n";

const t = getDictionary();
const { pricing } = siteConfig;

export function Pricing() {
  const p = t.pricing;

  return (
    <Section id="offres" eyebrow={p.eyebrow} title={p.title}>
      <div data-reveal className="mb-10 flex justify-center">
        <p className="badge badge-gold badge-lg h-auto py-2 text-center">
          🎁 {fmt(p.earlyBird, { spots: pricing.earlyBirdSpots })}
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        <div data-reveal className="flex">
          <article className="card w-full bg-base-200">
            <div className="card-body sm:p-7">
              <h3 className="card-title font-display text-xl tracking-tight">{p.free.name}</h3>
              <p className="flex-none text-base-content/60">{p.free.description}</p>
              <Price amount={p.free.price} unit={p.perMonth} />
              <FeatureList features={p.free.features} muted />
            </div>
          </article>
        </div>

        <div data-reveal className="flex">
          <article className="card card-border w-full border-2 border-primary bg-base-100 shadow-xl shadow-primary/15">
            <div className="card-body sm:p-7">
              {/* Badge dans la carte : l'effet 3D coupe ce qui dépasse */}
              <h3 className="card-title font-display text-xl tracking-tight">
                {p.premium.name}
                <span className="badge badge-primary badge-sm font-semibold">{p.premium.badge}</span>
              </h3>
              <p className="flex-none text-base-content/60">{p.premium.description}</p>
              <Price amount={fmt(p.premium.price, { sol: pricing.premiumSol })} unit={p.perMonth} />
              <p className="flex-none text-sm text-base-content/60">
                {fmt(p.premium.priceAlt, { usd: pricing.premiumUsd, discount: pricing.threeMonthDiscount })}
              </p>
              <FeatureList features={p.premium.features} />
            </div>
          </article>
        </div>
      </div>
    </Section>
  );
}

function Price({ amount, unit }: { amount: string; unit: string }) {
  return (
    <p className="mt-4 flex-none font-display text-5xl font-bold tracking-tight">
      {amount}
      <span className="ml-1 font-sans text-base font-normal tracking-normal text-base-content/60">{unit}</span>
    </p>
  );
}

function FeatureList({ features, muted }: { features: readonly string[]; muted?: boolean }) {
  return (
    <ul className="mt-4 flex-1 space-y-3 text-[15px]">
      {features.map((f) => (
        <li key={f} className="flex gap-2.5">
          <span
            className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ${
              muted ? "bg-base-300 text-base-content/60" : "bg-primary/10 text-primary"
            }`}
          >
            <CheckIcon width={12} height={12} strokeWidth={3} />
          </span>
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}
