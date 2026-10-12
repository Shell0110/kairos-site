// Test du bot en local, sans tunnel ni déploiement.
// Récupère les messages du bot auprès de Telegram (getUpdates) et les transmet
// au webhook local http://localhost:3000/api/telegram/webhook, comme le ferait Telegram en production.
//
// Usage (dans un 2e terminal, pendant que `npm run dev` tourne) :  npm run bot:dev
//
// ⚠️ Supprime le webhook de production le temps du test : relance `npm run bot:set-webhook` ensuite si le site est déployé.

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const localUrl = process.env.LOCAL_WEBHOOK_URL ?? "http://localhost:3000/api/telegram/webhook";

if (!token || !secret) {
  console.error("❌ TELEGRAM_BOT_TOKEN et TELEGRAM_WEBHOOK_SECRET doivent être remplis dans .env.local");
  process.exit(1);
}

const api = (method, body) =>
  fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  }).then((r) => r.json());

const me = await api("getMe");
if (!me.ok) {
  console.error("❌ Token refusé par Telegram :", me.description);
  process.exit(1);
}
await api("deleteWebhook", { drop_pending_updates: false });
console.log(`🤖 @${me.result.username} écoute en local → ${localUrl}`);
console.log("   Ouvre le bot sur ton téléphone et appuie sur Démarrer. Ctrl+C pour arrêter.\n");

let offset = 0;
for (;;) {
  try {
    const res = await api("getUpdates", { offset, timeout: 30, allowed_updates: ["message", "my_chat_member"] });
    if (!res.ok) throw new Error(res.description);

    for (const update of res.result) {
      const from = update.message?.from ?? update.my_chat_member?.from;
      const label = update.message?.text ?? `(statut : ${update.my_chat_member?.new_chat_member?.status})`;
      const local = await fetch(localUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Telegram-Bot-Api-Secret-Token": secret },
        body: JSON.stringify(update),
      });
      console.log(`${local.ok ? "✅" : "❌"} ${local.status}  @${from?.username ?? from?.first_name} : ${label}`);
      // Comme Telegram : en cas d'erreur du site, on garde le message et on réessaie (rien n'est perdu)
      if (!local.ok) throw new Error(`le site a répondu ${local.status} (voir les logs du serveur)`);
      offset = update.update_id + 1;
    }
  } catch (error) {
    console.error("⚠️", error.message, "— nouvel essai dans 3 s");
    await new Promise((r) => setTimeout(r, 3000));
  }
}
