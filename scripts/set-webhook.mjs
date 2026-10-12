// Branche @KairosAlertsSOLBot sur le site en ligne (à lancer une fois après chaque changement d'URL).
// Usage :  npm run bot:set-webhook -- https://ton-site.vercel.app
// (sans adresse, utilise NEXT_PUBLIC_SITE_URL de .env.local)

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const siteUrl = process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL;

if (!token || !secret || !siteUrl) {
  console.error("❌ TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET (.env.local) et l'adresse du site sont nécessaires");
  process.exit(1);
}
if (!siteUrl.startsWith("https://")) {
  console.error(`❌ Telegram exige une URL en https:// (actuellement : ${siteUrl}). Pour tester en local, utilise npm run bot:dev`);
  process.exit(1);
}

const url = `${siteUrl.replace(/\/$/, "")}/api/telegram/webhook`;
const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url, secret_token: secret, allowed_updates: ["message", "my_chat_member"] }),
}).then((r) => r.json());

console.log(res.ok ? `✅ Webhook branché sur ${url}` : `❌ ${res.description}`);
process.exit(res.ok ? 0 : 1);
