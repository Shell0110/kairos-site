import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type BetaUser = {
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  language_code: string | null;
  source: string | null;
  is_blocked: boolean;
  created_at: string;
};

const PAGE_SIZE = 1000;

/** Tous les inscrits, du plus récent au plus ancien (lecture par pages de 1000). */
export async function fetchAllBetaUsers(): Promise<BetaUser[]> {
  const db = getSupabaseAdmin();
  const users: BetaUser[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await db
      .from("beta_users")
      .select("telegram_id, username, first_name, language_code, source, is_blocked, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    users.push(...(data as BetaUser[]));
    if (!data || data.length < PAGE_SIZE) return users;
  }
}

const TIME_ZONE = "Europe/Paris";
// fr-CA formate en AAAA-MM-JJ : pratique comme clé de jour
const dayKeyFormat = new Intl.DateTimeFormat("fr-CA", { timeZone: TIME_ZONE });
const dayLabelFormat = new Intl.DateTimeFormat("fr-FR", { timeZone: TIME_ZONE, day: "numeric", month: "short" });

export function computeStats(users: BetaUser[], now = new Date()) {
  const dayMs = 24 * 60 * 60 * 1000;
  const todayKey = dayKeyFormat.format(now);

  const perDayCount = new Map<string, number>();
  const sources = new Map<string, number>();
  for (const user of users) {
    const key = dayKeyFormat.format(new Date(user.created_at));
    perDayCount.set(key, (perDayCount.get(key) ?? 0) + 1);
    const source = user.source ?? "";
    sources.set(source, (sources.get(source) ?? 0) + 1);
  }

  // 30 derniers jours, du plus ancien au plus récent (jours sans inscription = 0)
  const perDay = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now.getTime() - (29 - i) * dayMs);
    const key = dayKeyFormat.format(date);
    return { key, label: dayLabelFormat.format(date), count: perDayCount.get(key) ?? 0 };
  });

  return {
    total: users.length,
    active: users.filter((u) => !u.is_blocked).length,
    today: perDayCount.get(todayKey) ?? 0,
    last7: perDay.slice(-7).reduce((sum, d) => sum + d.count, 0),
    perDay,
    sources: [...sources.entries()].map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count),
  };
}
