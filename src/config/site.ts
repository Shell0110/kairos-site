/**
 * Configuration générale du site.
 * Remplace les valeurs entre crochets avant la mise en ligne.
 */
export const siteConfig = {
  /** Nom du bot / de la marque. Le changer ici le change partout. */
  name: "Kairos",

  /** URL publique du site (sans slash final). Surchargée par NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  social: {
    /** Pseudo X sans le @ */
    xHandle: "[HANDLE_X]",
    /** Lien du canal / groupe Telegram public */
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

export function xProfileUrl() {
  return `https://x.com/${siteConfig.social.xHandle}`;
}
