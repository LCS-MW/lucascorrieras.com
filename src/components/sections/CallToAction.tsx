import { Scene } from "@/components/motion/Scene";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cta } from "@/content/cta";

const HEADING_ID = "cta-titre";

/**
 * Fond profond : le bleu de l'accent poussé au bout, pas un noir neutre.
 * L'accent lui-même n'y a pas un contraste suffisant pour porter du texte
 * (2,3:1) : la voix utilitaire passe donc en `accent-soft`, à 14,7:1, et le
 * bouton s'inverse.
 *
 * À l'entrée, un calque papier se rétracte vers le bas et découvre le fond de
 * haut en bas. C'est un `scaleY` sur un calque, pas une hauteur : la mise en
 * page n'en sait rien.
 */
export function CallToAction() {
  return (
    <Scene name="cta">
      <Section
        labelledBy={HEADING_ID}
        tone="depth"
        overlay={
          <span
            aria-hidden="true"
            data-cta-sweep
            className="bg-paper absolute inset-0 origin-bottom"
          />
        }
      >
        <p
          data-reveal="label"
          className="font-mono text-label text-accent-soft uppercase"
        >
          {cta.label}
        </p>

        <h2
          id={HEADING_ID}
          data-reveal="title"
          className="font-display text-display text-paper mt-8 max-w-2xl text-balance"
        >
          {cta.title}
        </h2>

        <p
          data-reveal="note"
          className="text-xl text-accent-soft mt-8 max-w-xl"
        >
          {cta.body}
        </p>

        <div
          data-reveal="actions"
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Button href={cta.action.href} variant="inverse">
            {cta.action.label}
          </Button>
          <p className="font-mono text-label text-accent-soft uppercase">
            {cta.note}
          </p>
        </div>
      </Section>
    </Scene>
  );
}
