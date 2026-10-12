/**
 * Tous les textes du site, en français.
 * Pour ajouter l'anglais : créer en.ts avec la même structure (type Dictionary)
 * et l'enregistrer dans i18n/index.ts.
 *
 * Les {variables} entre accolades sont remplacées via la fonction fmt().
 */
export const fr = {
  meta: {
    title: "{name} — Tracker de wallets Solana et alertes smart money",
    description:
      "{name} est un bot Telegram qui t'alerte quand les meilleurs wallets smart money Solana achètent un memecoin. Alertes de convergence, filtres market cap et liquidité. Rejoins la liste d'attente.",
    keywords: [
      "tracker wallet solana",
      "smart money solana",
      "alertes memecoin",
      "bot telegram solana",
      "copy trading solana",
      "wallet tracker",
    ],
  },

  nav: {
    telegram: "Telegram",
    telegramLabel: "Ouvrir @{bot} sur Telegram",
  },

  hero: {
    badge: "Bêta bientôt disponible",
    /** « Les meilleurs [mot qui tourne] Solana achètent. » — 2 à 6 mots */
    titleBefore: "Les meilleurs",
    rotatingWords: ["wallets", "traders", "snipers", "KOLs"],
    titleAfter: "Solana achètent.",
    titleAccent: "Tu es prévenu.",
    subtitle: "Alertes smart money en temps réel, sur Telegram.",
  },

  cta: {
    title: "Rejoindre la bêta",
    subtitle: "Ouvre @{bot} sur Telegram",
    earlyBird: "Les {spots} premiers : 1 mois Premium offert",
    qrLabel: "QR code pour ouvrir @{bot} sur Telegram",
  },

  problem: {
    eyebrow: "Le problème",
    title: "Trop de bruit, pas assez de signal",
    items: [
      {
        title: "Des milliers de transactions",
        text: "Les trackers gratuits te balancent chaque swap de chaque wallet. Impossible de suivre, encore moins d'agir à temps.",
      },
      {
        title: "Tout à trier toi-même",
        text: "Trouver les bons wallets, éliminer les bots et les coups de chance… c'est un travail à plein temps.",
      },
      {
        title: "Tu arrives trop tard",
        text: "Quand le token apparaît sur ton fil X, les premiers sont déjà en x5. Le bon coup est passé.",
      },
    ],
  },

  solution: {
    eyebrow: "La solution",
    title: "On vend le filtre, pas le tracking",
    step: "Étape {n}",
    items: [
      {
        title: "Liste smart money triée à la main",
        text: "100 à 300 wallets performants, nettoyés des bots et des coups de chance, notés et mis à jour chaque semaine.",
      },
      {
        title: "Alertes de convergence",
        text: "Le signal fort : tu es alerté quand au moins 3 wallets smart achètent le même token en moins de 15 minutes.",
      },
      {
        title: "Tes filtres",
        text: "Market cap, liquidité, âge du token, montant minimum de l'achat : tu ne reçois que ce qui t'intéresse.",
      },
    ],
  },

  alertPreview: {
    eyebrow: "Aperçu",
    title: "Une alerte, en clair",
    subtitle: "Tout ce qu'il faut pour décider vite, directement dans Telegram.",
    sampleBadge: "Exemple — données fictives",
  },

  convergencePreview: {
    eyebrow: "Le signal fort",
    title: "Quand plusieurs smart money convergent",
    subtitle:
      "Un wallet qui achète, c'est une info. Trois wallets indépendants sur le même token en quelques minutes, c'est un signal.",
  },

  telegram: {
    botSubtitle: "bot",
    buyTitle: "Achat smart money",
    convergenceTitle: "{count} wallets smart ont acheté ${ticker} en {minutes} min",
    wallet: "Wallet",
    token: "Token",
    contract: "CA",
    amount: "Montant",
    price: "Prix d'entrée",
    marketCap: "Market cap",
    liquidity: "Liquidité",
    age: "Âge",
    volume24h: "Vol. 24 h",
    totalBought: "Total acheté",
    minutesAgo: "il y a {m} min",
    justNow: "à l'instant",
    tags: { smart: "Smart money", kol: "KOL", perso: "Perso" },
    links: { dexscreener: "DexScreener", solscan: "Solscan", gmgn: "GMGN" },
  },

  pricing: {
    eyebrow: "Offres",
    title: "Simple, payé en crypto",
    earlyBird: "Les {spots} premiers inscrits : 1 mois de Premium offert",
    perMonth: "/ mois",
    free: {
      name: "Gratuit",
      price: "0",
      priceUnit: "",
      description: "Pour découvrir le service.",
      features: [
        "3 wallets perso suivis",
        "Alertes différées (5-10 min) dans le canal public",
      ],
    },
    premium: {
      name: "Premium",
      price: "{sol} SOL",
      priceAlt: "ou ~{usd} $ / mois · –{discount} % sur 3 mois",
      description: "Pour ne plus rien rater.",
      badge: "Recommandé",
      features: [
        "Alertes instantanées (< 5 s)",
        "Accès à la liste smart money",
        "Alertes de convergence réglables",
        "50 wallets perso suivis",
        "Filtres : market cap, liquidité, âge, montant",
      ],
    },
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    items: [
      {
        q: "C'est quoi la « smart money » ?",
        a: "Ce sont des wallets Solana qui ont un historique de trades rentables sur la durée : traders expérimentés, KOL, early buyers. On les sélectionne à la main, on élimine les bots et les coups de chance, et on note chaque wallet selon la performance de ses achats.",
      },
      {
        q: "Comment je reçois les alertes ?",
        a: "Directement sur Telegram, via le bot. Tu lances le bot, tu règles tes filtres, et les alertes arrivent en message privé. Les membres gratuits voient une sélection d'alertes avec quelques minutes de retard dans le canal public.",
      },
      {
        q: "C'est quoi une alerte de convergence ?",
        a: "Une alerte envoyée quand au moins 3 wallets smart différents achètent le même token en moins de 15 minutes. Les seuils (nombre de wallets, fenêtre de temps) sont réglables en Premium.",
      },
      {
        q: "Comment je paie ?",
        a: "En SOL ou en USDC, directement depuis ton wallet, via un lien Solana Pay généré par le bot. Le paiement est détecté automatiquement sur la blockchain et ton Premium s'active tout seul. Le bot ne te demandera jamais ta clé privée ni ta phrase de récupération.",
      },
      {
        q: "Quand sort la bêta ?",
        a: "Le bot est en cours de développement. Ouvre le bot dès maintenant : tu seras prévenu directement sur Telegram à l'ouverture de la bêta, avant tout le monde.",
      },
      {
        q: "Est-ce que c'est un conseil en investissement ?",
        a: "Non. Les alertes sont des signaux informatifs basés sur des transactions publiques. Aucune garantie de gain : les memecoins sont extrêmement risqués. Fais toujours tes propres recherches.",
      },
    ],
  },

  /** Messages envoyés par @KairosAlertsSOLBot (HTML Telegram : <b>, <i>, <a>). */
  bot: {
    welcome:
      "👋 Bienvenue {firstName} !\n\n✅ <b>Tu es inscrit à la bêta de {name}.</b>\n\nTu recevras ici les alertes smart money Solana dès l'ouverture. Rien d'autre à faire : garde simplement cette conversation.",
    earlyBird: "🎁 Tu fais partie des <b>{spots} premiers inscrits</b> : 1 mois de Premium offert au lancement.",
    alreadyRegistered: "✅ Tu es déjà inscrit à la bêta de {name}. On te prévient ici dès l'ouverture.",
    help: "🤖 Ce bot est en bêta privée. Tape /start pour t'inscrire : tu seras prévenu ici dès le lancement.",
    disclaimer: "<i>Signaux informatifs, aucune garantie de gain. Fais tes propres recherches.</i>",
  },

  footer: {
    tagline: "Alertes smart money Solana sur Telegram.",
    disclaimer: "Signaux informatifs, aucune garantie de gain. Fais tes propres recherches.",
    x: "X",
    telegram: "Telegram",
    rights: "© {year} {name}",
  },
} as const;

/** Forme du dictionnaire, à respecter par les autres langues. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof fr>;
