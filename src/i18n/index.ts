import { siteConfig } from "@/config/site";
import { fr, type Dictionary } from "./fr";

export type Locale = "fr";

const dictionaries: Record<Locale, Dictionary> = { fr };

export const defaultLocale: Locale = "fr";

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

/** Remplace les {variables} d’un texte. {name} = nom du site, {bot} = nom du bot Telegram. */
export function fmt(text: string, vars: Record<string, string | number> = {}) {
  const all: Record<string, string | number> = { name: siteConfig.name, bot: siteConfig.botUsername, ...vars };
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in all ? String(all[key]) : match,
  );
}

/** Formatage des nombres en français : 412000 → "412 k$" */
export function formatUsdCompact(value: number) {
  return (
    new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(value) +
    " $"
  );
}

export function formatNumber(value: number, maxDecimals = 2) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: maxDecimals }).format(value);
}
