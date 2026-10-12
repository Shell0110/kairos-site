import { Suspense } from "react";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { fmt, formatNumber, getDictionary } from "@/i18n";
import { isAdmin } from "@/lib/admin/auth";
import { computeStats, fetchAllBetaUsers } from "@/lib/admin/stats";
import { logout } from "./actions";
import { LoginForm } from "./LoginForm";

const t = getDictionary().admin;

export const metadata: Metadata = {
  title: fmt(t.title),
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-base-200 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Suspense fallback={<span className="loading loading-spinner mx-auto block" />}>
          <AdminGate />
        </Suspense>
      </div>
    </main>
  );
}

/** Lit le cookie de session (donnée de requête) : rendu à chaque visite, derrière le Suspense. */
async function AdminGate() {
  if (!(await isAdmin())) return <LoginForm />;
  return <Dashboard />;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  dateStyle: "short",
  timeStyle: "short",
});

async function Dashboard() {
  const users = await fetchAllBetaUsers();
  const stats = computeStats(users);
  const maxPerDay = Math.max(1, ...stats.perDay.map((d) => d.count));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="badge badge-neutral badge-sm">admin</span>
        </div>
        <div className="flex gap-2">
          {/* Lien classique (pas <Link>) : c'est un téléchargement de fichier */}
          <a href="/admin/export" className="btn btn-sm btn-primary">
            {t.exportCsv}
          </a>
          <form action={logout}>
            <button type="submit" className="btn btn-sm">
              {t.logout}
            </button>
          </form>
        </div>
      </header>

      <section className="stats stats-vertical w-full bg-base-100 sm:stats-horizontal">
        <Stat title={t.stats.total} value={stats.total} />
        <Stat title={t.stats.active} value={stats.active} desc={t.stats.activeHint} />
        <Stat title={t.stats.today} value={stats.today} />
        <Stat title={t.stats.last7} value={stats.last7} />
      </section>

      <section className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title font-display">{t.perDayTitle}</h2>
          <p className="text-sm text-base-content/60">{t.perDayHint}</p>
          {/* Une seule série : pas de légende, le titre la nomme. Valeur au survol (tooltip). */}
          <div className="mt-4 flex h-44 items-end gap-0.5 border-b border-base-300" role="img" aria-label={t.perDayTitle}>
            {stats.perDay.map((day) => (
              <div
                key={day.key}
                className="tooltip flex h-full flex-1 items-end"
                data-tip={fmt(t.perDayTooltip, { date: day.label, count: day.count })}
              >
                <div
                  className="w-full rounded-t-[4px] bg-primary transition-opacity hover:opacity-80"
                  style={{ height: day.count ? `${(day.count / maxPerDay) * 100}%` : "2px", opacity: day.count ? 1 : 0.15 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-base-content/60">
            <span>{stats.perDay[0].label}</span>
            <span>{stats.perDay[stats.perDay.length - 1].label}</span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <section className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title font-display">{t.sourcesTitle}</h2>
            <p className="text-sm text-base-content/60">{t.sourcesHint}</p>
            <table className="table table-sm mt-2">
              <tbody>
                {stats.sources.map(({ source, count }) => (
                  <tr key={source}>
                    <td>{source || <span className="text-base-content/60">{t.sourceDirect}</span>}</td>
                    <td className="text-right tabular-nums">{formatNumber(count, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title font-display">{t.recentTitle}</h2>
            {users.length === 0 ? (
              <p className="text-base-content/60">{t.empty}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>{t.columns.user}</th>
                      <th>{t.columns.source}</th>
                      <th>{t.columns.date}</th>
                      <th>{t.columns.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 50).map((user) => (
                      <tr key={user.telegram_id}>
                        <td>
                          {user.username ? (
                            <a href={`https://t.me/${user.username}`} target="_blank" rel="noopener noreferrer" className="link">
                              @{user.username}
                            </a>
                          ) : (
                            user.first_name
                          )}
                        </td>
                        <td>{user.source ?? "—"}</td>
                        <td className="whitespace-nowrap tabular-nums">{dateFormat.format(new Date(user.created_at))}</td>
                        <td>{user.is_blocked && <span className="badge badge-error badge-soft badge-sm">{t.blocked}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ title, value, desc }: { title: string; value: number; desc?: string }) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value font-display tabular-nums">{formatNumber(value, 0)}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
}
