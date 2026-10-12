"use client";

import { useEffect } from "react";

/**
 * Fait apparaître en fondu les éléments marqués data-reveal quand ils entrent à l'écran.
 * Sans JavaScript, tout reste visible (l’attribut data-reveal-ready n’est jamais posé).
 */
export function RevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window) || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    // Les éléments déjà visibles au chargement ne doivent pas clignoter
    const viewportHeight = window.innerHeight;
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < viewportHeight) el.dataset.visible = "";
      else observer.observe(el);
    });
    document.documentElement.dataset.revealReady = "";

    return () => observer.disconnect();
  }, []);

  return null;
}
