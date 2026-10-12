import { Logo } from "@/components/ui/Logo";
import { TelegramLogoIcon } from "@/components/ui/icons";
import { telegramBotUrl } from "@/config/site";
import { fmt, getDictionary } from "@/i18n";

const t = getDictionary();

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/85 backdrop-blur-md">
      <nav className="navbar mx-auto max-w-5xl px-4">
        <div className="navbar-start">
          <a href="#top" aria-label={fmt(t.nav.home)}>
            <Logo />
          </a>
        </div>
        <div className="navbar-end">
          <a
            href={telegramBotUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fmt(t.nav.telegramLabel)}
            className="btn btn-glow border-0 bg-telegram px-5 text-white hover:bg-telegram/90"
          >
            <TelegramLogoIcon width={18} height={18} />
            {t.nav.telegram}
          </a>
        </div>
      </nav>
    </header>
  );
}
