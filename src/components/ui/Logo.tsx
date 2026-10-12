import { siteConfig } from "@/config/site";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--color-primary)" />
      {/* Trois flux qui convergent vers un point */}
      <path
        d="M7 9l8 7M7 23l8-7M7 16h8M15 16h10"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="25" cy="16" r="2.6" fill="#ffffff" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight">{siteConfig.name}</span>
    </span>
  );
}
