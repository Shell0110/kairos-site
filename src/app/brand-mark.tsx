/**
 * Logo Kairos pour les images générées (favicon, apple-icon, image d'aperçu).
 * Couleurs en dur : les variables CSS du thème ne sont pas disponibles dans ImageResponse.
 */
export const BRAND_BLUE = "#4169e1"; // royal blue
export const BRAND_INK = "#0c0c14";

export function BrandMark({ size, radius = 9 }: { size: number; radius?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx={radius} fill={BRAND_BLUE} />
      <path d="M7 9l8 7M7 23l8-7M7 16h8M15 16h10" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="16" r="2.6" fill="#ffffff" />
    </svg>
  );
}
