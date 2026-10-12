import { siteConfig, telegramBotUrl } from "@/config/site";
import { TelegramLogoIcon } from "@/components/ui/icons";
import { fmt, getDictionary } from "@/i18n";
import { QrCode } from "./QrCode";

const t = getDictionary().cta;

/**
 * Carte d'inscription à la bêta : toute la carte est un lien vers le bot.
 * Sur ordinateur, un QR code permet de l'ouvrir depuis le téléphone.
 */
export function JoinCard() {
  const url = telegramBotUrl();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto flex max-w-md items-center gap-5 rounded-box bg-base-200 p-5 text-left sm:p-6"
    >
      <div className="min-w-0 flex-1">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-telegram text-white">
          <TelegramLogoIcon width={20} height={20} />
        </span>
        <p className="mt-4 font-display text-xl font-semibold tracking-tight">{t.title}</p>
        <p className="mt-0.5 text-sm text-base-content/60">
          {fmt(t.subtitle)}
          <span aria-hidden>{" "}→</span>
        </p>
        <p className="mt-4 text-xs text-base-content/50">
          🎁 {fmt(t.earlyBird, { spots: siteConfig.pricing.earlyBirdSpots })}
        </p>
      </div>

      {/* QR code : seulement sur grand écran (sur mobile, un tap ouvre directement l'appli) */}
      <div className="hidden shrink-0 md:block">
        <QrCode value={url} size={112} label={fmt(t.qrLabel)} />
      </div>
    </a>
  );
}
