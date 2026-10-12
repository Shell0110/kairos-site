import type { CSSProperties, ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/ui/Logo";
import { getDictionary } from "@/i18n";

const t = getDictionary().telegram;

// Fond d'écran de conversation Telegram (bleu pastel + motif discret de points)
const wallpaper: CSSProperties = {
  backgroundColor: "#cfdcf3",
  backgroundImage:
    "radial-gradient(rgba(255,255,255,.35) 1.2px, transparent 1.3px), linear-gradient(160deg, #dde7fb 0%, #c3d3f1 55%, #d6e1f6 100%)",
  backgroundSize: "18px 18px, 100% 100%",
};

/**
 * Maquette « capture d'écran » : un iPhone (daisyUI mockup-phone) avec une conversation Telegram iOS.
 * `time` = heure affichée dans la barre d'état (celle de l'alerte).
 */
export function TelegramChat({ children, label, time }: { children: ReactNode; label?: string; time: string }) {
  return (
    <figure className="mx-auto flex w-full max-w-[300px] flex-col items-center gap-4 sm:max-w-[320px]">
      <div className="mockup-phone rounded-[3.25rem] border-[#3a3a3c] shadow-2xl shadow-neutral/25">
        <div className="mockup-phone-camera" />
        <div className="mockup-phone-display flex flex-col rounded-[2.8rem] bg-white text-left text-black">
          <StatusBar time={time} />
          <ChatHeader />
          <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-2 pb-2" style={wallpaper}>
            <span className="mx-auto rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-medium text-white">
              {t.today}
            </span>
            {children}
          </div>
          <InputBar />
        </div>
      </div>
      {label && <figcaption className="badge badge-gold">{label}</figcaption>}
    </figure>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[13px] font-semibold">
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1" aria-hidden>
        {/* Réseau */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* Wi-Fi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.2c2.1 0 4 .8 5.5 2.1l1.1-1.1A9.3 9.3 0 0 0 7.5.6 9.3 9.3 0 0 0 .9 3.2L2 4.3a7.8 7.8 0 0 1 5.5-2.1Zm0 3.2c1.2 0 2.4.5 3.3 1.2l1.1-1.1a6.4 6.4 0 0 0-8.8 0l1.1 1.1c.9-.7 2.1-1.2 3.3-1.2Zm0 3.2c-.4 0-.8.1-1.1.4l1.1 1.1 1.1-1.1a1.6 1.6 0 0 0-1.1-.4Z" />
        </svg>
        {/* Batterie */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
          <path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" opacity=".4" />
        </svg>
      </span>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-black/10 bg-[#f7f7f7] px-2">
      <span className="flex w-20 items-center text-[15px] text-[#007aff]">
        <svg
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10 2 2 10l8 8" />
        </svg>
        {/* Compteur de messages non lus, comme le bouton retour de Telegram iOS */}
        <span className="ml-1 rounded-full bg-[#007aff] px-1.5 text-[12px] leading-[18px] font-medium text-white">
          {t.unread}
        </span>
      </span>
      <span className="flex flex-col items-center leading-tight">
        <span className="text-[15px] font-semibold">{siteConfig.name}</span>
        <span className="text-[12px] text-black/50">{t.botSubtitle}</span>
      </span>
      <span className="flex w-20 justify-end">
        <span className="overflow-hidden rounded-full">
          <LogoMark size={34} />
        </span>
      </span>
    </div>
  );
}

function InputBar() {
  return (
    <div className="shrink-0 border-t border-black/10 bg-[#f7f7f7] px-2 pt-1.5 pb-5">
      <div className="flex items-center gap-2 text-black/40" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="m21 11-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4L15.5 7" />
        </svg>
        <span className="flex-1 rounded-full border border-black/15 bg-white px-3 py-1 text-[14px]">{t.inputPlaceholder}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      </div>
      {/* Barre d'accueil de l'iPhone */}
      <div className="mx-auto mt-3 h-[5px] w-28 rounded-full bg-black" />
    </div>
  );
}

/** Message entrant + boutons inline sous le message, comme dans Telegram iOS (visuels uniquement). */
export function TelegramBubble({ children, time, buttons }: { children: ReactNode; time: string; buttons?: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="chat chat-start p-0">
        <div className="chat-bubble max-w-[94%] min-w-0 bg-white px-2.5 pt-1.5 pb-1 text-[12.5px] leading-[1.38] text-black shadow-sm">
          {children}
          <p className="-mt-1 text-right text-[10.5px] text-black/40">{time}</p>
        </div>
      </div>
      {buttons && (
        <div className="grid grid-cols-3 gap-1">
          {buttons.map((label) => (
            <span
              key={label}
              className="rounded-lg bg-black/25 py-1.5 text-center text-[12px] font-medium text-white backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Garde un bout de texte (« MC : 412 k $ ») sur une seule ligne */
export function Nowrap({ children }: { children: ReactNode }) {
  return <span className="whitespace-nowrap">{children}</span>;
}

/** « 16:32 » : heure de la barre d'état et de la bulle */
export function formatAlertTime(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }).format(
    new Date(iso),
  );
}

/** « 08/10 16:32:07 », comme dans les alertes du bot */
export function formatAlertDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));
}
