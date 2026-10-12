import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/ui/Logo";
import { getDictionary } from "@/i18n";

const t = getDictionary();

/** Cadre qui imite une conversation Telegram (thème clair). */
export function TelegramChat({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <figure className="card card-border mx-auto w-full max-w-md overflow-hidden bg-tg-bg shadow-2xl shadow-neutral/15">
      <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-4 py-3">
        <LogoMark size={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{siteConfig.name}</p>
          <p className="text-xs text-tg-link">{t.telegram.botSubtitle}</p>
        </div>
        {label && <span className="badge badge-gold badge-sm">{label}</span>}
      </div>
      <div className="p-2 sm:p-3">{children}</div>
    </figure>
  );
}

/** Message entrant (bulle de chat) + boutons inline sous le message, comme dans Telegram (visuels uniquement). */
export function TelegramBubble({ children, time, buttons }: { children: ReactNode; time: string; buttons?: string[] }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble max-w-full bg-base-100 px-3.5 pt-2.5 pb-1.5 text-[14px] leading-relaxed text-base-content shadow-sm">
        {children}
        <p className="mt-1 text-right text-[11px] text-base-content/45">{time}</p>
      </div>
      {buttons && (
        <div className="chat-footer mt-1.5 grid w-full grid-cols-3 gap-1.5">
          {buttons.map((label) => (
            <span
              key={label}
              className="btn btn-sm pointer-events-none rounded-lg border-0 bg-base-100/80 text-[13px] text-tg-link shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function formatAlertTime(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));
}

export function formatAlertDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));
}

export function shortAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}
