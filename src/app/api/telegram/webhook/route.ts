import { timingSafeEqual } from "node:crypto";
import { siteConfig } from "@/config/site";
import { fmt, getDictionary } from "@/i18n";
import { parseStartSource, registerBetaUser, setBetaUserBlocked } from "@/lib/beta/registerBetaUser";
import { requireEnv } from "@/lib/env";
import { sendMessage, type TelegramUpdate } from "@/lib/telegram/api";

const t = getDictionary().bot;

/**
 * Webhook de @KairosAlertsSOLBot : Telegram appelle cette route à chaque message reçu par le bot.
 * Protégée par le secret envoyé par Telegram dans l'en-tête X-Telegram-Bot-Api-Secret-Token
 * (défini lors du setWebhook, voir scripts/set-webhook.mjs).
 */
export async function POST(request: Request) {
  if (!isFromTelegram(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  let update: TelegramUpdate;
  try {
    update = await request.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    await handleUpdate(update);
  } catch (error) {
    // Réponse 500 → Telegram renverra la mise à jour plus tard (pas d'inscription perdue si Supabase est indisponible)
    console.error("[telegram webhook]", error);
    return new Response("Internal Error", { status: 500 });
  }

  return Response.json({ ok: true });
}

async function handleUpdate(update: TelegramUpdate) {
  // La personne a bloqué / débloqué le bot
  const member = update.my_chat_member;
  if (member && member.chat.type === "private") {
    const status = member.new_chat_member.status;
    if (status === "kicked" || status === "member") {
      await setBetaUserBlocked(member.from.id, status === "kicked");
    }
    return;
  }

  const message = update.message;
  // On ne répond qu'aux messages privés de vrais utilisateurs (pas aux groupes ni aux autres bots)
  if (!message?.from || message.from.is_bot || message.chat.type !== "private") return;

  const text = message.text ?? "";
  if (!/^\/start(\s|$)/.test(text)) {
    await sendMessage(message.chat.id, t.help);
    return;
  }

  const { isNew, rank } = await registerBetaUser(message.from, parseStartSource(text));

  const lines = isNew
    ? [fmt(t.welcome, { firstName: escapeHtml(message.from.first_name) })]
    : [fmt(t.alreadyRegistered)];
  if (rank > 0 && rank <= siteConfig.pricing.earlyBirdSpots) {
    lines.push(fmt(t.earlyBird, { spots: siteConfig.pricing.earlyBirdSpots }));
  }
  lines.push(t.disclaimer);

  await sendMessage(message.chat.id, lines.join("\n\n"));
}

function isFromTelegram(request: Request) {
  const expected = Buffer.from(requireEnv("TELEGRAM_WEBHOOK_SECRET"));
  const received = Buffer.from(request.headers.get("x-telegram-bot-api-secret-token") ?? "");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
