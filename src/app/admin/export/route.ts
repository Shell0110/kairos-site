import { isAdmin } from "@/lib/admin/auth";
import { fetchAllBetaUsers, type BetaUser } from "@/lib/admin/stats";

/**
 * Export CSV des inscrits (admin uniquement).
 * Séparateur « ; » et BOM UTF-8 pour qu'Excel en français l'ouvre correctement.
 */
export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const users = await fetchAllBetaUsers();
  const columns: (keyof BetaUser)[] = [
    "telegram_id",
    "username",
    "first_name",
    "language_code",
    "source",
    "is_blocked",
    "created_at",
  ];
  const lines = [columns.join(";"), ...users.map((user) => columns.map((col) => csvCell(user[col])).join(";"))];

  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kairos-beta-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

function csvCell(value: unknown) {
  let text = value === null || value === undefined ? "" : String(value);
  // Empêche Excel d'interpréter un pseudo comme une formule (=, +, -, @)
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return /[";\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
