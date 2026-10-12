/**
 * Configuration générale du site.
 * Les valeurs entre crochets sont à remplacer : tant qu'elles restent ainsi, le lien correspondant est masqué.
 */
export const siteConfig = {
  /** Nom du bot / de la marque. Le changer ici le change partout. */
  name: "Kairos",

  /** URL publique du site (sans slash final). Surchargée par NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kairos-sol.vercel.app",

  social: {
    /** Pseudo X sans le @ */
    xHandle: "[HANDLE_X]",
    /** Lien du canal / groupe Telegram public (sinon le pied de page renvoie vers le bot) */
    telegramUrl: "[LIEN_TELEGRAM]",
  },

  /** Nom d'utilisateur du bot Telegram, sans le @. Les visiteurs s'inscrivent en ouvrant le bot. */
  botUsername: "KairosAlertsSOLBot",

  pricing: {
    premiumSol: "0,1",
    premiumUsd: "20",
    threeMonthDiscount: 15,
    earlyBirdSpots: 10,
  },
} as const;

/** Lien qui ouvre le bot dans Telegram (appli mobile, desktop ou web). */
export function telegramBotUrl() {
  return `https://t.me/${siteConfig.botUsername}`;
}

const isPlaceholder = (value: string) => value.startsWith("[");

/** Profil X, ou null tant que le pseudo n'est pas renseigné. */
export function xProfileUrl() {
  const handle = siteConfig.social.xHandle;
  return isPlaceholder(handle) ? null : `https://x.com/${handle}`;
}

/** Canal Telegram public s'il existe, sinon le bot. */
export function telegramChannelUrl() {
  const url = siteConfig.social.telegramUrl;
  return isPlaceholder(url) ? telegramBotUrl() : url;
}
