import "server-only";
import { requireEnv } from "@/lib/env";

/** Sous-ensemble des objets Telegram utilisés par le bot de bêta. */
export type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
  language_code?: string;
};

export type TelegramUpdate = {
  update_id: number;
  message?: {
    message_id: number;
    from?: TelegramUser;
    chat: { id: number; type: "private" | "group" | "supergroup" | "channel" };
    text?: string;
  };
  my_chat_member?: {
    chat: { id: number; type: string };
    from: TelegramUser;
    new_chat_member: { status: "member" | "kicked" | "left" | string };
  };
};

/** Envoie un message (HTML autorisé : <b>, <i>, <a>…). */
export async function sendMessage(chatId: number, html: string) {
  const token = requireEnv("TELEGRAM_BOT_TOKEN");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: html,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }),
  });
  if (!res.ok) {
    throw new Error(`Telegram sendMessage a échoué (${res.status}) : ${await res.text()}`);
  }
}
