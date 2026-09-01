import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcase } from "@/content/showcase";

const HEADING_ID = "maquette-titre";
const { screen } = showcase;

/**
 * Padding partagé par les deux couches d'une région. Les couches doivent
 * coïncider au pixel : une seule constante par région, jamais recopiée.
 */
const PAD = {
  header: "px-6 pt-9 pb-5 md:px-10",
  hero: "px-6 pt-12 pb-8 md:px-10",
  cards: "px-6 pt-11 pb-14 md:px-10",
} as const;

/**
 * Les deux couches occupent la même cellule de grille plutôt qu'une
 * superposition absolue : la plus haute des deux fixe la hauteur de la
 * région, donc aucune ne peut déborder sur ce qui suit.
 */
const STACK = "col-start-1 row-start-1";

/**
 * Fenêtre d'apparition et de disparition d'une annotation, en fraction de la
 * progression du scrub. Les `span` sont l'inverse de la durée : une
 * multiplication en CSS, la division par une variable n'y étant pas fiable.
 *
 * Les trois fenêtres se chevauchent en se décalant vers le bas de l'écran :
 * les annotations se passent le relais au fil de la transformation au lieu de
 * rester posées là.
 */
const WINDOW = {
  header: {
    "--in-from": 0,
    "--in-span": 16.7,
    "--out-from": 0.3,
    "--out-span": 8.3,
  },
  hero: {
    "--in-from": 0.08,
    "--in-span": 12.5,
    "--out-from": 0.45,
    "--out-span": 7.7,
  },
  cards: {
    "--in-from": 0.2,
    "--in-span": 10,
    "--out-from": 0.62,
    "--out-span": 7.1,
  },
} as const;

/**
 * Libellé et cote de la maquette, entièrement à l'accent : c'est le seul
 * endroit du site où le vocabulaire de mesure est dense, il porte donc la
 * couleur.
 */
function Annotation({
  label,
  cote,
  window: frame,
}: {
  label: string;
  cote: string;
  window: (typeof WINDOW)[keyof typeof WINDOW];
}) {
  return (
    <span
      data-showcase-annotation
      style={frame as React.CSSProperties}
      className="font-mono text-label text-accent absolute top-3 left-6 flex gap-3 uppercase md:left-10"
    >
      <span>{label}</span>
      <span>{cote}</span>
    </span>
  );
}

/**
 * Bloc gris de maquette. Il reste gris : il figure du contenu pas encore mis
 * en forme, pas une annotation de mesure.
 */
function Bar({ className }: { className: string }) {
  return <span className={`bg-ink-2/30 block ${className}`} />;
}

/**
 * Écran de démonstration, du plan annoté au résultat livré.
 *
 * Deux couches occupent exactement la même boîte : la couche réelle est en
 * flux et fixe la hauteur, la couche maquette est superposée en `inset-0`.
 * Leur visibilité, la teinte du fond et le remplissage du bouton se calculent
 * tous à partir d'un seul scalaire, `--showcase-progress`. Faire varier ce
 * scalaire transforme l'écran, dans un sens comme dans l'autre.
 *
 * Le bouton est volontairement hors des deux couches : son fond passe du gris
 * à l'accent sans jamais être remplacé, c'est le seul élément qui se
 * métamorphose vraiment plutôt que de se croiser.
 */
export function Showcase() {
  return (
    <Scene name="showcase">
      <Section id="maquette" labelledBy={HEADING_ID} tone="soft">
        <SectionHeading id={HEADING_ID} {...showcase.intro} />

        <p className="sr-only">{showcase.description}</p>

        <div data-showcase className="mt-16">
          <div data-showcase-pin>
            <div className="font-mono text-label flex items-center gap-4 uppercase">
              <span className="text-accent">{showcase.states.from}</span>
              <span className="bg-rule relative h-px flex-1">
                <span
                  data-showcase-bar
                  className="bg-accent absolute inset-0 origin-left"
                />
              </span>
              <span className="text-accent">{showcase.states.to}</span>
              {/* Largeur figée : « 0 % » et « 100 % » n'ont pas le même nombre
                de caractères, la boîte ne doit pas s'élargir en cours de
                route. */}
              <span
                data-showcase-percent
                className="text-ink w-14 text-right tabular-nums"
              >
                0 %
              </span>
            </div>

            <div
              aria-hidden="true"
              data-showcase-screen
              className="border-rule mt-8 border"
            >
              {/* ---- En-tête ------------------------------------------------ */}
              <div className="border-rule relative grid border-b">
                <div
                  data-showcase-real
                  className={`flex items-center justify-between gap-8 ${STACK} ${PAD.header}`}
                >
                  <span className="font-mono text-label text-ink uppercase">
                    {screen.header.brand}
                  </span>
                  {/* Sous 30 rem, les trois libellés dépassent du cadre et
                      sont rognés. Un vrai site y mettrait un menu : la
                      maquette le montre aussi, c'est plus juste que de couper
                      le texte. */}
                  <span className="hidden gap-6 min-[30rem]:flex">
                    {screen.header.links.map((link) => (
                      <span
                        key={link}
                        className="font-mono text-label text-ink-2 uppercase"
                      >
                        {link}
                      </span>
                    ))}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex w-5 flex-col gap-1 min-[30rem]:hidden"
                  >
                    <span className="bg-ink-2 block h-px w-full" />
                    <span className="bg-ink-2 block h-px w-full" />
                    <span className="bg-ink-2 block h-px w-full" />
                  </span>
                </div>

                <div
                  data-showcase-wire
                  className={`flex items-center justify-between gap-8 ${STACK} ${PAD.header}`}
                >
                  <Bar className="h-2.5 w-32" />
                  <span className="hidden gap-6 min-[30rem]:flex">
                    <Bar className="h-2.5 w-16" />
                    <Bar className="h-2.5 w-14" />
                    <Bar className="h-2.5 w-12" />
                  </span>
                  <span className="flex min-[30rem]:hidden">
                    <Bar className="h-2.5 w-5" />
                  </span>
                </div>

                <Annotation
                  label={screen.header.label}
                  cote={screen.header.cote}
                  window={WINDOW.header}
                />
              </div>

              {/* ---- Accroche ----------------------------------------------- */}
              <div className="relative">
                <div className="relative grid">
                  <div data-showcase-real className={`${STACK} ${PAD.hero}`}>
                    <h3 className="font-display text-display-sm text-ink max-w-md">
                      {screen.hero.title}
                    </h3>
                    <p className="text-sm text-ink-2 mt-6 max-w-sm">
                      {screen.hero.body}
                    </p>
                  </div>

                  <div data-showcase-wire className={`${STACK} ${PAD.hero}`}>
                    <div className="border-accent/50 max-w-md space-y-2 border border-dashed p-2">
                      <Bar className="h-5 w-4/5" />
                      <Bar className="h-5 w-3/5" />
                    </div>
                    <div className="mt-7 max-w-sm space-y-2.5">
                      <Bar className="h-2.5 w-full" />
                      <Bar className="h-2.5 w-4/5" />
                    </div>
                  </div>

                  <Annotation
                    label={screen.hero.label}
                    cote={screen.hero.cote}
                    window={WINDOW.hero}
                  />
                </div>

                <div className="px-6 pb-14 md:px-10">
                  <span
                    data-showcase-fill
                    className="relative inline-flex items-center rounded-sm px-5 py-2.5"
                  >
                    <span
                      data-showcase-real
                      className="text-sm text-paper font-medium"
                    >
                      {screen.hero.action}
                    </span>
                    {/* `text-ink` et non `text-ink-2` : sur le gris de maquette,
                    le texte secondaire ne donne que 3,4:1. */}
                    <span
                      data-showcase-wire
                      className="font-mono text-label text-ink absolute inset-0 flex items-center justify-center uppercase"
                    >
                      {screen.hero.action}
                    </span>
                  </span>
                </div>
              </div>

              {/* ---- Trois blocs -------------------------------------------- */}
              <div className="border-rule relative grid border-t">
                <div
                  data-showcase-real
                  className={`grid gap-6 sm:grid-cols-3 ${STACK} ${PAD.cards}`}
                >
                  {screen.cards.items.map((card) => (
                    <div key={card.title} className="border-rule border-t pt-5">
                      <p className="font-mono text-label text-accent uppercase">
                        {card.title}
                      </p>
                      <p className="text-sm text-ink-2 mt-3">{card.body}</p>
                    </div>
                  ))}
                </div>

                <div
                  data-showcase-wire
                  className={`grid gap-6 sm:grid-cols-3 ${STACK} ${PAD.cards}`}
                >
                  {screen.cards.items.map((card) => (
                    <div
                      key={card.title}
                      className="border-accent/50 space-y-3 self-start border border-dashed p-3"
                    >
                      <Bar className="h-2.5 w-2/3" />
                      <Bar className="h-2.5 w-full" />
                      <Bar className="h-2.5 w-4/5" />
                    </div>
                  ))}
                </div>

                <Annotation
                  label={screen.cards.label}
                  cote={screen.cards.cote}
                  window={WINDOW.cards}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Scene>
  );
}
