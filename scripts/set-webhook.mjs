// Branche @KairosAlertsSOLBot sur le site en ligne (à lancer une fois après chaque changement d'URL).
// Usage :  npm run bot:set-webhook
// Utilise NEXT_PUBLIC_SITE_URL (ex. https://kairos.vercel.app) depuis .env.local.

const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!token || !secret || !siteUrl) {
  console.error("❌ TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET et NEXT_PUBLIC_SITE_URL doivent être remplis dans .env.local");
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
