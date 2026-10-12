import { siteConfig, xProfileUrl } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { TelegramLogoIcon, XLogoIcon } from "@/components/ui/icons";
import { fmt, getDictionary } from "@/i18n";

const t = getDictionary();
// Calculé au build (le site est statique) — se met à jour à chaque déploiement
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-8 border-t border-base-300 px-4 py-12">
      <div className="footer mx-auto max-w-5xl sm:footer-horizontal">
        <aside>
          <Logo />
          <p className="mt-1 text-base text-base-content/60">{t.footer.tagline}</p>
        </aside>
        <nav className="flex gap-2.5 sm:justify-self-end" aria-label="Réseaux sociaux">
          <a href={xProfileUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline border-base-300" aria-label={t.footer.x}>
            <XLogoIcon width={16} height={16} />
          </a>
          <a
            href={siteConfig.social.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-outline border-base-300"
            aria-label={t.footer.telegram}
          >
            <TelegramLogoIcon width={17} height={17} />
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-5xl border-t border-base-300 pt-6 text-sm">
        <p className="font-medium">{t.footer.disclaimer}</p>
        <p className="mt-2 text-base-content/45">{fmt(t.footer.rights, { year })}</p>
      </div>
    </footer>
  );
}
