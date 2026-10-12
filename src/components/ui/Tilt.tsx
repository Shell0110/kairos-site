import type { ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Si présent, toute la carte devient un lien (le contenu ne doit pas contenir d'autre lien ou bouton). */
  href?: string;
  label?: string;
};

/**
 * Effet 3D daisyUI (`hover-3d`) : la carte se penche vers le coin où se trouve la souris.
 * Le premier enfant est le contenu, les 8 div vides sont les zones de détection.
 * Pas d'élément interactif à l'intérieur (les zones de détection sont au-dessus du contenu).
 */
export function Tilt({ children, className = "", href, label }: TiltProps) {
  const zones = Array.from({ length: 8 }, (_, i) => <div key={i} />);
  // `grid` (au lieu de l'inline-grid de daisyUI) pour que mx-auto / max-w-* fonctionnent
  const classes = `hover-3d grid w-full ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={classes}>
        {children}
        {zones}
      </a>
    );
  }
  return (
    <div className={classes}>
      {children}
      {zones}
    </div>
  );
}
