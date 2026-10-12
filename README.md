# Kairos — site de pré-lancement

Landing page de pré-lancement du bot Telegram Kairos (alertes smart money Solana).
Les visiteurs s'inscrivent en ouvrant [@KairosAlertsSOLBot](https://t.me/KairosAlertsSOLBot) (bouton + QR code).

## Lancer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000
```

## UI

Le site utilise [daisyUI 5](https://daisyui.com) (composants Tailwind : `btn`, `card`, `input`, `collapse`, `timeline`, `chat`…)
avec un thème maison « kairos » calqué sur la DA de crowny.fun.

## Bot de bêta (@KairosAlertsSOLBot)

Quand quelqu'un appuie sur « Démarrer », Telegram appelle `src/app/api/telegram/webhook/route.ts`,
qui enregistre la personne dans la table Supabase `beta_users` et lui répond (textes dans `src/i18n/fr.ts`, clé `bot`).

| Commande | Rôle |
| --- | --- |
| `npm run bot:dev` | Test en local (pendant `npm run dev`) : relaie les messages du bot vers le site local |
| `npm run bot:set-webhook -- https://ton-site.vercel.app` | Après déploiement : branche le bot sur le site en ligne |

Table : `supabase/migrations/0001_beta_users.sql` (à exécuter dans le SQL Editor de Supabase).

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Nom, liens X / Telegram, prix, nom du bot (`botUsername`) | `src/config/site.ts` |
| Tous les textes (français) | `src/i18n/fr.ts` |
| Alertes d'exemple (à remplacer par un vrai achat) | `src/data/sample-alerts.ts` |
| Couleurs, arrondis (thème daisyUI « kairos ») | `src/app/globals.css` (bloc `@plugin "daisyui/theme"`) |
| Sections de la page | `src/components/sections/` |
| Bulles Telegram | `src/components/telegram/` |
| Bloc d'inscription (bouton Telegram + QR code) | `src/components/waitlist/` |

## Prévu pour plus tard

- **Dernières alertes en direct** : nouvelle section `src/components/sections/LiveAlerts.tsx`
  qui lira la table des alertes du bot dans Supabase, insérée dans `src/app/page.tsx`
  (emplacement marqué en commentaire). Elle réutilisera `BuyAlertMessage` / `ConvergenceAlertMessage`.
- **Parrainage** : retiré pour la V1, à prévoir en V2/V3 (lien `t.me/KairosAlertsSOLBot?start=CODE`).
