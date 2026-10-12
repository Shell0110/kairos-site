/**
 * ⚠️ DONNÉES D'EXEMPLE — FICTIVES ⚠️
 *
 * Ces alertes servent uniquement à illustrer le rendu sur la page d'accueil.
 * Remplace-les par un vrai achat passé (et une vraie convergence) avant le lancement :
 * adresses, montants, market cap, liens, horodatage.
 */

export type WalletTag = "smart" | "kol" | "perso";

export type TokenInfo = {
  name: string;
  ticker: string;
  /** Adresse du contrat (mint) */
  mint: string;
  marketCapUsd: number;
  liquidityUsd: number;
  volume24hUsd: number;
  /** Âge du token, texte libre (ex. "2 h 14 min") */
  age: string;
};

export type AlertLinks = {
  dexscreener: string;
  solscanTx: string;
  gmgn: string;
};

export type BuyAlert = {
  wallet: { label: string; address: string; tag: WalletTag };
  token: TokenInfo;
  amountSol: number;
  amountUsd: number;
  priceUsd: string;
  links: AlertLinks;
  /** Horodatage ISO 8601 */
  timestamp: string;
};

export type ConvergenceAlert = {
  token: TokenInfo;
  windowMinutes: number;
  buys: { label: string; address: string; tag: WalletTag; amountSol: number; minutesAgo: number }[];
  links: { dexscreener: string; solscanToken: string; gmgn: string };
  timestamp: string;
};

export const sampleBuyAlert: BuyAlert = {
  wallet: {
    label: "Whale_07",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    tag: "smart",
  },
  token: {
    name: "Exemple Token",
    ticker: "EXEMPLE",
    mint: "ExEmPLe1111111111111111111111111111111pump",
    marketCapUsd: 412_000,
    liquidityUsd: 68_500,
    volume24hUsd: 1_240_000,
    age: "2 h 14 min",
  },
  amountSol: 12.5,
  amountUsd: 2_150,
  priceUsd: "0.000412",
  links: {
    dexscreener: "https://dexscreener.com/solana",
    solscanTx: "https://solscan.io",
    gmgn: "https://gmgn.ai/?chain=sol",
  },
  timestamp: "2026-10-08T14:32:07Z",
};

export const sampleConvergenceAlert: ConvergenceAlert = {
  token: {
    name: "Démo Coin",
    ticker: "DEMO",
    mint: "DeMo22222222222222222222222222222222222pump",
    marketCapUsd: 186_000,
    liquidityUsd: 41_200,
    volume24hUsd: 530_000,
    age: "47 min",
  },
  windowMinutes: 8,
  buys: [
    { label: "Sniper_Alpha", address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", tag: "smart", amountSol: 8.2, minutesAgo: 8 },
    { label: "KOL_Matteo", address: "3Kz9Mf7bW5d2YpQnR8xTcLvH4jE6uA1sGk5NoPq7RtUv", tag: "kol", amountSol: 5.0, minutesAgo: 4 },
    { label: "Whale_07", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", tag: "smart", amountSol: 15.4, minutesAgo: 0 },
  ],
  links: {
    dexscreener: "https://dexscreener.com/solana",
    solscanToken: "https://solscan.io",
    gmgn: "https://gmgn.ai/?chain=sol",
  },
  timestamp: "2026-10-09T21:07:44Z",
};
