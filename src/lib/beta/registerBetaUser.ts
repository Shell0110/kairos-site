import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { TelegramUser } from "@/lib/telegram/api";

export type RegisterResult = {
  isNew: boolean;
  /** Ordre d'inscription (1 = premier inscrit) */
  rank: number;
};

/** Nettoie le paramètre de /start (t.me/Bot?start=xxx) : lettres, chiffres, _ et -, 64 caractères max. */
export function parseStartSource(text: string): string | null {
  const payload = text.trim().split(/\s+/)[1] ?? "";
  const clean = payload.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
  return clean || null;
}

/** Inscrit (ou retrouve) une personne qui a lancé le bot, et calcule son rang d'inscription. */
export async function registerBetaUser(user: TelegramUser, source: string | null): Promise<RegisterResult> {
  const db = getSupabaseAdmin();

  const { data: existing, error: selectError } = await db
    .from("beta_users")
    .select("created_at")
    .eq("telegram_id", user.id)
    .maybeSingle();
  if (selectError) throw selectError;

  let createdAt = existing?.created_at as string | undefined;
  const isNew = !existing;

  if (existing) {
    // Personne déjà inscrite : on met à jour son profil (et on la marque comme active si elle avait bloqué le bot)
    const { error } = await db
      .from("beta_users")
      .update({
        username: user.username ?? null,
        first_name: user.first_name,
        language_code: user.language_code ?? null,
        is_blocked: false,
      })
      .eq("telegram_id", user.id);
    if (error) throw error;
  } else {
    const { data, error } = await db
      .from("beta_users")
      // ignoreDuplicates : si Telegram renvoie deux fois le même /start en même temps, pas d'erreur
      .upsert(
        {
          telegram_id: user.id,
          username: user.username ?? null,
          first_name: user.first_name,
          language_code: user.language_code ?? null,
          source,
        },
        { onConflict: "telegram_id", ignoreDuplicates: true },
      )
      .select("created_at")
      .maybeSingle();
    if (error) throw error;
    createdAt = data?.created_at ?? new Date().toISOString();
  }

  const { count, error: countError } = await db
    .from("beta_users")
    .select("telegram_id", { count: "exact", head: true })
    .lte("created_at", createdAt);
  if (countError) throw countError;

  return { isNew, rank: count ?? 0 };
}

/** Marque une personne comme ayant bloqué (ou débloqué) le bot : utile pour les futurs envois groupés. */
export async function setBetaUserBlocked(telegramId: number, isBlocked: boolean) {
  const { error } = await getSupabaseAdmin()
    .from("beta_users")
    .update({ is_blocked: isBlocked })
    .eq("telegram_id", telegramId);
  if (error) throw error;
}
