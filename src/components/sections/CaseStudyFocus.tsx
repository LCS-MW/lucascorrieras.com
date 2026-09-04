import Image from "next/image";

import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carteRestaurant } from "@/content/case-studies";

import type { SectionTone } from "@/components/ui/Section";

const HEADING_ID = "pieces-titre";
const { study, pieces, explode, api, gestion } = carteRestaurant;

/**
 * Bloc d'extrait : une légende en voix utilitaire, puis le contenu encadré.
 * Partagé par l'API et la gestion, qui n'ont ni l'un ni l'autre de capture.
 */
function Excerpt({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <div className="border-rule bg-surface border p-5">{children}</div>
      <figcaption className="font-mono text-label text-ink-2 mt-3 uppercase">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * Visuel d'une pièce, en taille de lecture.
 *
 * L'API est du texte et non une capture : le poids est nul, le contenu reste
 * indexable et lisible au lecteur d'écran, et l'adresse du serveur n'a pas à
 * s'afficher sur un site commercial.
 *
 * La gestion est un schéma. Elle est protégée par mot de passe, donc pas
 * capturable, et fabriquer une fausse capture d'un back-office serait
 * exactement la preuve inventée que le reste du site s'interdit. Le schéma dit
 * la structure sans prétendre montrer l'écran.
 */
function Visual({ id }: { id: string }) {
  if (id === "ecran") {
    return (
      <Image
        src="/demonstrations/ecran-accueil.avif"
        alt={explode.screen.alt}
        width={1280}
        height={800}
        sizes="(min-width: 48rem) 40vw, 92vw"
        className="border-rule block w-full border"
      />
    );
  }

  if (id === "carte") {
    return (
      <Image
        src="/demonstrations/ecran-carte.avif"
        alt={explode.carte.alt}
        width={960}
        height={600}
        sizes="(min-width: 48rem) 40vw, 92vw"
        className="border-rule block w-full border"
      />
    );
  }

  if (id === "api") {
    return (
      <Excerpt caption={api.caption}>
        {/* Le bloc défile dans sa propre boîte : une réponse JSON est plus
            large qu'une colonne de téléphone, et c'est la page entière qui
            partirait de travers. */}
        <pre className="overflow-x-auto">
          {/* `text-sm` et non `text-xs` : le thème remet `--text-*` à
              `initial` et ne redéfinit que label, sm, base, lg, xl et les
              display. `text-xs` ne génère aucune règle, le bloc se serait
              affiché à la taille héritée. */}
          <code className="font-mono text-ink text-sm leading-relaxed whitespace-pre">
            {api.code}
          </code>
        </pre>
      </Excerpt>
    );
  }

  return (
    <Excerpt caption={gestion.caption}>
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { label: gestion.menuLabel, items: gestion.menu },
          { label: gestion.fieldsLabel, items: gestion.fields },
        ].map((colonne) => (
          <div key={colonne.label}>
            <p className="font-mono text-label text-accent uppercase">
              {colonne.label}
            </p>
            <ul className="divide-rule border-rule mt-3 divide-y border-t">
              {colonne.items.map((item) => (
                <li key={item} className="text-sm text-ink-2 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Excerpt>
  );
}

/**
 * Les quatre pièces reprises une à une, en taille de lecture.
 *
 * C'est ici que vit tout le contenu : la scène éclatée au-dessus est un
 * diagramme muet, retiré de l'arbre d'accessibilité, et réduite au portable
 * seul sous 48 rem. Cette section, elle, est complète sur tous les formats et
 * sans JavaScript.
 */
export function CaseStudyFocus({ tone = "paper" }: { tone?: SectionTone }) {
  return (
    <Scene name="caseStudy">
      <Section id="pieces" labelledBy={HEADING_ID} tone={tone}>
        <SectionHeading id={HEADING_ID} {...study.intro} />

        <ol className="mt-16">
          {pieces.map((piece) => (
            <li key={piece.id} data-reveal="row">
              <span
                aria-hidden="true"
                data-reveal="row-rule"
                className="bg-rule block h-px w-full origin-left"
              />

              <div className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12">
                {/* `min-w-0` : sans lui, la largeur minimale d'un élément de
                    grille vaut celle de son contenu, et le bloc de code en
                    `white-space: pre` impose alors la longueur de sa plus
                    longue ligne à toute la page. Mesuré : 111 px de
                    débordement horizontal à 320 px de large, malgré
                    l'`overflow-x` posé sur le `<pre>` lui-même. */}
                <div className="mask-y min-w-0 md:col-span-5">
                  <div data-reveal="row-visual">
                    <Visual id={piece.id} />
                  </div>
                </div>

                <div className="mask-y md:col-span-7">
                  <div data-reveal="row-body">
                    <p className="font-mono text-label text-accent uppercase">
                      {piece.cote} · {piece.label}
                    </p>

                    <h3 className="font-display text-display-sm text-ink mt-5">
                      {piece.title}
                    </h3>

                    <p className="text-base text-ink-2 mt-5">{piece.body}</p>

                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {piece.specs.map((spec) => (
                        <li
                          key={spec}
                          className="font-mono text-label text-ink-2 uppercase"
                        >
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </Scene>
  );
}
