-- Inscrits à la bêta : une ligne par personne qui a appuyé sur « Démarrer » dans @KairosAlertsSOLBot.
-- À exécuter une fois dans Supabase : SQL Editor → New query → coller → Run.

create table if not exists public.beta_users (
  telegram_id   bigint primary key,              -- identifiant Telegram (permet au bot d'écrire à la personne)
  username      text,                            -- @pseudo sans le @ (peut être vide sur Telegram)
  first_name    text,
  language_code text,
  source        text,                            -- d'où vient la personne : t.me/KairosAlertsSOLBot?start=<source>
  is_blocked    boolean not null default false,  -- true si la personne a bloqué le bot
  created_at    timestamptz not null default now()
);

create index if not exists beta_users_created_at_idx on public.beta_users (created_at);

-- Sécurité : RLS activée et AUCUNE policy → personne ne peut lire ni écrire avec la clé publique.
-- Seul le serveur (clé secrète, qui contourne la RLS) accède à la table.
alter table public.beta_users enable row level security;

-- Le projet n'expose pas automatiquement les nouvelles tables : on donne l'accès au serveur uniquement
-- (rôle service_role = clé secrète). Les rôles publics anon / authenticated n'ont aucun droit.
grant select, insert, update on public.beta_users to service_role;
revoke all on public.beta_users from anon, authenticated;
