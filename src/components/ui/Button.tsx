import { TransitionLink } from "@/components/motion/TransitionLink";

import { a11y } from "@/content/site";

import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse";
};

/**
 * Un seul bouton pour tout le site. Rayon de 2 px, aucun dégradé, aucune
 * ombre : la hiérarchie se fait à la couleur pleine contre le filet.
 *
 * `inverse` est réservé aux fonds sombres, où l'accent n'a pas un contraste
 * suffisant pour porter du texte.
 */
const VARIANT = {
  primary: "bg-accent text-paper border-accent hover:bg-ink hover:border-ink",
  secondary: "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
  inverse:
    "bg-paper text-ink border-paper hover:bg-accent-soft hover:border-accent-soft",
} as const;

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  const isInternal = href.startsWith("/");
  const className = `inline-flex items-center rounded-sm border px-6 py-3 text-base font-medium transition-colors duration-150 ${VARIANT[variant]}`;

  // Un lien qui sort du site s'ouvre à côté : le visiteur garde la page
  // ouverte et revient sans la recharger. `rel` va avec `target="_blank"`,
  // sinon la page ouverte peut manipuler celle qui l'a ouverte.
  if (!isInternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
        <span className="sr-only"> ({a11y.newTab})</span>
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={className}>
      {children}
    </TransitionLink>
  );
}
