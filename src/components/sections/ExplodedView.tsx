import Image from "next/image";

import { Scene } from "@/components/motion/Scene";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carteRestaurant } from "@/content/case-studies";

const HEADING_ID = "eclate-titre";
const { explode, layers, api, gestion, base, hebergement, navigation } =
  carteRestaurant;

/**
 * Où chaque calque part, en centièmes de la largeur de la scène, mesuré
 * depuis son centre.
 *
 * Dispersés, pas alignés. Une première version les faisait descendre en
 * escalier régulier, ce qui se lisait comme une liste posée en biais plutôt
 * que comme une pile ouverte. La profondeur, elle, reste monotone : c'est
 * elle qui porte l'ordre, du plus visible au plus enfoui.
 *
 * Bornes à ne pas dépasser, pour que rien ne sorte du cadre au repos : un
 * calque fait 32 de large et 20 de haut dans une scène de 100 × 62,5, donc
 * |dx| ≤ 34 et |dy| ≤ 21.
 */
const POSITIONS: Record<string, { dx: number; dy: number }> = {
  ecran: { dx: -29, dy: -14 },
  navigation: { dx: 3, dy: -18 },
  carte: { dx: 31, dy: -7 },
  api: { dx: -33, dy: 4 },
  base: { dx: 15, dy: 14 },
  gestion: { dx: -13, dy: 18 },
  hebergement: { dx: 32, dy: 16 },
};

/** Les calques réellement plaçables : sans position, pas de place dans la pile. */
const PLACES = layers.filter((layer) => layer.id in POSITIONS);

/** Barre de maquette, dans la voix des schémas du site. */
function Bar({ className }: { className: string }) {
  return <span className={`bg-ink-2/30 block ${className}`} />;
}

/**
 * Contenu d'un calque.
 *
 * Deux calques seulement portent une capture, et ce sont les deux seules
 * choses réellement visibles du site. Les cinq autres n'ont pas d'apparence :
 * une API, une table, un back-office protégé et quatre conteneurs ne se
 * photographient pas. Ils sont donc dessinés, avec leurs vraies valeurs, et
 * jamais mis en scène comme des captures qu'ils ne sont pas.
 */
function LayerVisual({ visual }: { visual: string }) {
  switch (visual) {
    case "capture-accueil":
      return (
        <Image
          src="/demonstrations/ecran-accueil.avif"
          alt={explode.alts.accueil}
          width={1280}
          height={800}
          sizes="(min-width: 64rem) 700px, 46vw"
          className="block h-full w-full object-cover object-top"
        />
      );

    case "capture-carte":
      return (
        <Image
          src="/demonstrations/ecran-carte.avif"
          alt={explode.alts.carte}
          width={960}
          height={600}
          sizes="(min-width: 64rem) 700px, 46vw"
          className="block h-full w-full object-cover object-top"
        />
      );

    case "schema-nav":
      return (
        // Les trois libellés doivent tenir dans une vignette de 34 % de la
        // scène, et dans une demi-colonne sur téléphone. Ils se partagent la
        // largeur à parts égales et se coupent proprement plutôt que de
        // déborder du cadre par les deux bords.
        <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
          <div className="border-rule flex w-full gap-2 border px-2 py-2">
            {navigation.items.map((item) => (
              <span
                key={item}
                className="font-mono text-label text-ink-2 min-w-0 flex-1 truncate text-center uppercase"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex w-full gap-2">
            {navigation.items.map((item) => (
              <span key={item} className="flex flex-1 justify-center">
                <span className="bg-accent block h-3 w-px" />
              </span>
            ))}
          </div>
        </div>
      );

    case "code-api":
      return (
        <div className="flex h-full items-center overflow-hidden p-5">
          <pre className="overflow-hidden">
            <code className="font-mono text-ink text-label leading-relaxed whitespace-pre">
              {api.apercu}
            </code>
          </pre>
        </div>
      );

    case "schema-base":
      return (
        <div className="flex h-full flex-col justify-center gap-3 p-5">
          <div className="border-rule flex items-baseline justify-between gap-4 border-b pb-2">
            {base.columns.map((column) => (
              <span
                key={column}
                className="font-mono text-label text-accent uppercase"
              >
                {column}
              </span>
            ))}
          </div>
          {base.counts.map((count) => (
            <div
              key={count.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-mono text-label text-ink-2 uppercase">
                {count.label}
              </span>
              <Bar className="h-1.5 flex-1" />
              <span className="font-mono text-label text-ink">
                {count.value}
              </span>
            </div>
          ))}
        </div>
      );

    case "schema-gestion":
      return (
        <div className="flex h-full flex-col gap-2 p-5">
          {gestion.menu.map((item) => (
            <span
              key={item}
              className="border-rule font-mono text-label text-ink-2 block border px-3 py-1.5 uppercase"
            >
              {item}
            </span>
          ))}
          <span className="bg-rule mt-1 block h-px w-full" />
          <Bar className="h-1.5 w-full" />
          <Bar className="h-1.5 w-4/5" />
          <Bar className="h-1.5 w-3/5" />
        </div>
      );

    default:
      return (
        <div className="grid h-full grid-cols-2 content-center gap-2 p-5">
          {hebergement.services.map((service) => (
            <div key={service.name} className="border-rule border p-2">
              <p className="font-mono text-label text-accent uppercase">
                {service.name}
              </p>
              <p className="font-mono text-label text-ink-2 mt-1 uppercase">
                {service.role}
              </p>
            </div>
          ))}
        </div>
      );
  }
}

/**
 * La pile du site, ouverte puis traversée.
 *
 * Sept calques, du premier écran jusqu'aux conteneurs. Ils s'étagent en
 * diagonale sous une perspective : chacun reste entièrement visible, aucun
 * n'en masque un autre. Une première version en empilait quatre aux quatre
 * coins, ce qui n'était pas une vue éclatée mais un quadrillage animé.
 *
 * Deux scalaires, écrits par le scrub, et tout le reste calculé en CSS :
 *   `--eclat-progress`  0 → 1  la pile s'ouvre et bascule en perspective
 *   `--eclat-camera`    0 → 6  la caméra se pose sur chaque calque à son tour
 *
 * Le texte de chaque calque vit dans la même pile, pas dans une liste en
 * dessous : sortir de l'éclatement pour retomber dans un enchaînement de
 * blocs ordinaires annulait tout l'effet.
 *
 * Seule la pile est décorative. Les légendes, elles, sont le contenu réel de
 * la section : une liste ordonnée, lue dans l'ordre à toutes les largeurs,
 * même quand une seule est visible à l'écran. Il n'y a donc pas de version
 * `sr-only` en double, et sans JavaScript les sept légendes s'empilent
 * simplement les unes sous les autres.
 */
export function ExplodedView() {
  return (
    <Scene name="eclat">
      <Section labelledBy={HEADING_ID}>
        <SectionHeading id={HEADING_ID} {...explode.intro} />

        <p className="sr-only">{explode.description}</p>

        <div data-eclat className="mt-16">
          <div data-eclat-piste>
            {/* La pile est le schéma : décorative, doublée par les légendes,
                qui portent le même contenu en texte réel et restent lues dans
                l'ordre même quand une seule est visible à l'écran. */}
            <div data-eclat-scene aria-hidden="true">
              <div data-eclat-pile>
                {PLACES.map((layer, index) => (
                  <div
                    key={layer.id}
                    data-eclat-calque
                    style={
                      {
                        "--i": index,
                        "--dx": POSITIONS[layer.id].dx,
                        "--dy": POSITIONS[layer.id].dy,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      data-eclat-etiquette
                      className="font-mono text-label flex justify-between gap-3 uppercase"
                    >
                      <span className="text-accent">{layer.label}</span>
                      <span className="text-ink-2">{layer.cote}</span>
                    </span>

                    <span data-eclat-cadre>
                      {/* Le cadre de sélection se referme sur le calque visé.
                          C'est le geste du logotype et de la séquence
                          d'entrée, repris ici : quatre poignées d'angle qui se
                          posent. */}
                      <i data-eclat-poignee />
                      <i data-eclat-poignee />
                      <i data-eclat-poignee />
                      <i data-eclat-poignee />

                      <span
                        data-eclat-carte
                        className="border-rule bg-paper block aspect-[16/10] overflow-hidden border"
                      >
                        <LayerVisual visual={layer.visual} />
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Cote de la pile : dit dans quel sens on s'enfonce. */}
              <span data-eclat-axe className="font-mono text-label uppercase">
                <span className="text-ink-2">{explode.axis.near}</span>
                <span data-eclat-axe-trait />
                <span className="text-ink-2">{explode.axis.far}</span>
              </span>
            </div>

            {/* Le texte du calque sur lequel la caméra est posée. C'est le
                contenu réel de la section, pas un doublon : il est lu dans
                l'ordre, à toutes les largeurs, et sans JavaScript les sept
                légendes s'empilent simplement les unes sous les autres. */}
            <ol data-eclat-legendes>
              {layers.map((layer, index) => (
                <li
                  key={layer.id}
                  data-eclat-legende
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <p className="font-mono text-label text-accent uppercase">
                    {layer.cote} · {layer.label}
                  </p>
                  <h3 className="font-display text-display-sm text-ink mt-4">
                    {layer.title}
                  </h3>
                  <p className="text-base text-ink-2 mt-4">{layer.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {layer.specs.map((spec) => (
                      <li
                        key={spec}
                        className="font-mono text-label text-ink-2 uppercase"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </Scene>
  );
}
