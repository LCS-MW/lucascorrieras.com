"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { TransitionLink } from "@/components/motion/TransitionLink";
import { nav } from "@/content/nav";

/**
 * Navigation principale.
 *
 * Une seule liste de liens, jamais deux. En dessous de `md` elle devient un
 * panneau plein écran ouvert par un bouton ; au-dessus, elle reprend sa forme
 * de barre horizontale. Dupliquer le balisage — une version bureau et une
 * version mobile — casserait deux choses à la fois : le lecteur d'écran
 * annoncerait la navigation deux fois, et surtout le soulignement porterait
 * son `view-transition-name` en double, ce qui annule purement et simplement
 * la transition.
 *
 * Le soulignement reste rendu **uniquement dans le lien actif**, et c'est le
 * navigateur qui interpole sa position et sa largeur d'une page à l'autre.
 *
 * Les libellés ne portent aucun nom de transition : un nom partagé *déplace*
 * l'élément au lieu de le dupliquer, et le menu se viderait à chaque
 * navigation.
 *
 * Le survol est un signal distinct de l'état actif : deux traits d'accent qui
 * encadrent le libellé. Le lien actif n'y répond pas — il porte déjà le
 * soulignement.
 */
export function SiteNav() {
  const pathname = usePathname();
  const panelId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLUListElement>(null);

  /**
   * L'état retenu n'est pas « ouvert » mais « ouvert depuis quelle page ».
   * Le panneau est donc fermé dès que la route change, sans effet de
   * synchronisation — remettre l'état à faux depuis un effet déclencherait un
   * second rendu après peinture, et c'est précisément ce que la règle
   * `react-hooks/set-state-in-effect` interdit.
   *
   * Ça couvre aussi le retour arrière du navigateur, qu'un `onClick` posé sur
   * les liens ne verrait jamais passer.
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);

  // Échap ferme et rend le focus au bouton : un panneau qu'on ne peut fermer
  // qu'à la souris est un piège au clavier.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      button.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // À l'ouverture, le focus entre dans le panneau. Le laisser sur le bouton
  // obligerait à retraverser toute la page pour atteindre le premier lien.
  useEffect(() => {
    if (open) panel.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <nav aria-label={nav.label}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpenedAt(open ? null : pathname)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? nav.menu.close : nav.menu.open}
        className="nav-burger relative z-[45]"
      >
        {/* Trois filets d'un pixel, comme le reste du site. Les deux premiers
            se croisent à l'ouverture, le troisième s'efface. */}
        <span aria-hidden="true" className="nav-burger-bar" />
        <span aria-hidden="true" className="nav-burger-bar" />
        <span aria-hidden="true" className="nav-burger-bar" />
      </button>

      <ul
        ref={panel}
        id={panelId}
        data-open={open ? "" : undefined}
        className="nav-panel"
      >
        {nav.links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="nav-link font-mono text-label text-ink-2 relative inline-block py-2 uppercase"
              >
                {link.label}

                {active ? (
                  <span aria-hidden="true" className="nav-underline" />
                ) : null}
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
