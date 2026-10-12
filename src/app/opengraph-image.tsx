import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { fmt, getDictionary } from "@/i18n";
import { BRAND_INK, BRAND_VIOLET, BrandMark } from "./brand-mark";

/**
 * Image d'aperçu quand le lien du site est partagé (X, Telegram, Discord…).
 * Générée une fois au build. X l'utilise aussi (pas besoin de twitter-image).
 */
const t = getDictionary().meta;

export const alt = fmt(t.ogImageAlt);
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse n'accepte que ttf / otf / woff : on lit les fichiers woff de @fontsource
const fontDir = join(process.cwd(), "node_modules/@fontsource/space-grotesk/files");
const fontSemiBold = readFile(join(fontDir, "space-grotesk-latin-600-normal.woff"));
const fontBold = readFile(join(fontDir, "space-grotesk-latin-700-normal.woff"));

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          fontFamily: "Space Grotesk",
          color: BRAND_INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BrandMark size={64} />
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05 }}>{t.ogTagline}</span>
          <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.05, color: BRAND_VIOLET }}>
            {t.ogTaglineAccent}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 26px",
              borderRadius: 999,
              background: "#2aabee",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M21.94 4.3 18.7 19.6c-.24 1.08-.88 1.35-1.79.84l-4.94-3.64-2.38 2.3c-.26.26-.49.48-1 .48l.36-5.03 9.15-8.27c.4-.35-.09-.55-.62-.2L6.17 13.2l-4.87-1.52c-1.06-.33-1.08-1.06.22-1.57L20.55 2.8c.88-.33 1.65.2 1.39 1.5Z" />
            </svg>
            {t.ogBadge}
          </div>
          <span style={{ fontSize: 30, fontWeight: 600, color: "#6a6a78" }}>@{siteConfig.botUsername}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: await fontSemiBold, weight: 600, style: "normal" },
        { name: "Space Grotesk", data: await fontBold, weight: 700, style: "normal" },
      ],
    },
  );
}
