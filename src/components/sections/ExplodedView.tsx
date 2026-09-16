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
 * calque fait 32 de large et 20 de haut dans une scène de 100 × 56,25 (16/9),
 * donc |dx| ≤ 34 et |dy| ≤ 18.
 *
 * Les écarts verticaux ont été resserrés d'un cinquième en passant la scène du
 * 16/10 au 16/9. La dispersion reste plus large que haute, ce qui va au format
 * de la scène.
 */
const POSITIONS: Record<string, { dx: number; dy: number }> = {
  ecran: { dx: -29, dy: -11 },
  navigation: { dx: 3, dy: -14 },
  carte: { dx: 31, dy: -6 },
  api: { dx: -33, dy: 3 },
  base: { dx: 15, dy: 11 },
  gestion: { dx: -13, dy: 14 },
  hebergement: { dx: 32, dy: 13 },
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
        /* Une vraie barre, pas trois traits. Le nom à gauche, les trois ancres
           à droite, celle en cours soulignée à l'accent : c'est la barre du
           site décrit, pas un symbole de barre. */
        <div className="flex h-full flex-col p-4">
          <div className="border-rule flex items-center justify-between gap-3 border-b pb-2.5">
            <span className="font-display text-ink text-sm">
              {navigation.marque}
            </span>
            <span className="flex gap-3">
              {navigation.items.map((item) => (
                <span key={item} className="relative">
                  <span
                    className={`font-mono text-label uppercase ${
                      item === navigation.active ? "text-ink" : "text-ink-2"
                    }`}
                  >
                    {item}
                  </span>
                  {item === navigation.active ? (
                    <span className="bg-accent absolute inset-x-0 -bottom-1 block h-px" />
                  ) : null}
                </span>
              ))}
            </span>
          </div>

          {/* Le haut de la page sous la barre : deux lignes de titre et le
              début d'une grille, pour qu'on voie à quoi la barre est fixée. */}
          <div className="mt-4 flex flex-1 flex-col gap-2">
            <Bar className="h-2.5 w-1/2" />
            <Bar className="h-1.5 w-2/3" />
            <div className="mt-auto grid grid-cols-3 gap-2">
              <span className="border-rule block h-6 border" />
              <span className="border-rule block h-6 border" />
              <span className="border-rule block h-6 border" />
            </div>
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
        /* Un vrai back-office : la colonne de menu à gauche, la liste des
           plats à droite avec leur prix et leur état de publication. La
           structure est celle relevée dans le projet, pas une invention. */
        <div className="flex h-full items-center gap-3 p-4">
          <div className="flex w-2/5 flex-col gap-1.5">
            {gestion.menu.map((item, index) => (
              <span
                key={item}
                className={`font-mono text-label block px-2 py-1.5 uppercase ${
                  index === 1
                    ? "bg-accent-soft text-accent"
                    : "text-ink-2 border-rule border"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            {gestion.lignes.map((ligne) => (
              <div
                key={ligne.nom}
                className="border-rule flex items-center gap-2 border-b pb-1.5"
              >
                <span className="text-ink-2 min-w-0 flex-1 truncate text-sm">
                  {ligne.nom}
                </span>
                <span className="font-mono text-label text-ink">
                  {ligne.prix}
                </span>
                {/* La case « visible » : pleine quand le plat est publié,
                    vide quand il est retiré de la carte du soir. */}
                <span
                  className={`block h-2.5 w-2.5 border ${
                    ligne.visible
                      ? "border-accent bg-accent"
                      : "border-rule bg-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
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
                {/* Le plan de travail. Il est DANS la pile, pas derrière
                    elle : il subit donc la même perspective et la même orbite,
                    et c'est ce qui le fait lire comme un sol sur lequel l'objet
                    est posé plutôt que comme un papier peint. Un décor animé
                    indépendamment serait de la parallaxe de fond, que les règles
                    de motion du site interdisent.

                    Il se trace à mesure que la pile s'ouvre, puis s'efface quand
                    la caméra plonge : à ce moment-là on n'est plus au-dessus de
                    l'objet, on est dedans. */}
                <svg
                  data-eclat-sol
                  aria-hidden="true"
                  viewBox="0 0 160 100"
                  preserveAspectRatio="none"
                >
                  {Array.from({ length: 9 }, (_, colonne) => (
                    <line
                      key={`v${colonne}`}
                      style={{ "--n": colonne } as React.CSSProperties}
                      x1={colonne * 20}
                      y1="0"
                      x2={colonne * 20}
                      y2="100"
                      pathLength="1"
                    />
                  ))}
                  {Array.from({ length: 6 }, (_, rangee) => (
                    <line
                      key={`h${rangee}`}
                      style={{ "--n": rangee + 9 } as React.CSSProperties}
                      x1="0"
                      y1={rangee * 20}
                      x2="160"
                      y2={rangee * 20}
                      pathLength="1"
                    />
                  ))}
                </svg>

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

                    {/* Les deux tranches donnent son épaisseur au calque.
                        Ce sont de vraies faces, pivotées d'un quart de tour
                        dans l'espace : sans elles la pile n'est qu'une série
                        de plans sans volume, et aucune rotation ne peut le
                        faire croire. */}
                    <span data-eclat-tranche="droite" aria-hidden="true" />
                    <span data-eclat-tranche="bas" aria-hidden="true" />

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
            </div>

            {/* La cote de profondeur est voisine de la scène, pas dedans :
                la scène recadre, et posée à l'intérieur elle tombait 28 px
                sous le bord inférieur, donc invisible malgré une opacité de 1. */}
            <span data-eclat-axe className="font-mono text-label uppercase">
              <span className="text-ink-2">{explode.axis.near}</span>
              <span data-eclat-axe-trait />
              <span className="text-ink-2">{explode.axis.far}</span>
            </span>

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
                  {/* Le visuel du calque, pour le format empilé. Sous 48 rem
                      la scène n'est pas rendue, et une grille de sept
                      vignettes muettes suivie de sept textes obligeait à
                      rapprocher chaque numéro de son paragraphe. Ici chaque
                      bloc est complet. Le second rendu ne coûte rien : la
                      copie inutile est en `display: none`, donc son image
                      n'est jamais demandée. */}
                  <span
                    data-eclat-vignette
                    aria-hidden="true"
                    className="border-rule bg-paper mb-5 block aspect-[16/10] overflow-hidden border"
                  >
                    <LayerVisual visual={layer.visual} />
                  </span>

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
