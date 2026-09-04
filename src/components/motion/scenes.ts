import { DURATION, EASE } from "@/lib/motion-tokens";

import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerClass } from "gsap/ScrollTrigger";

/**
 * Une scène par section. Chacune reçoit sa portée et construit sa propre
 * intention : jamais un fondu uniforme, jamais tous les éléments en même
 * temps. Toutes restent sous l'intensité de la séquence d'entrée du hero, qui
 * est le seul moment à cinq temps du site.
 *
 * Chaque révélation est un `fromTo` : l'état de départ est posé par le tween
 * lui-même, au moment de sa création. C'est volontaire et c'est le cœur du
 * contrat — si GSAP ne se charge pas, rien n'est jamais masqué, et si la mise
 * en page bouge, la valeur de départ est calculée sur les bonnes mesures.
 * Aucun état masqué ne doit être posé en CSS pour ces sections.
 */

export type SceneApi = {
  root: HTMLElement;
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerClass;
  /** Découpe en lignes masquées, enregistre l'instance pour le nettoyage. */
  splitLines: (el: Element) => Element[];
  /** Rend au titre son balisage d'origine une fois la séquence jouée. */
  revertSplits: () => void;
  q: (selector: string) => HTMLElement | null;
  qa: (selector: string) => HTMLElement[];
};

/** Le bloc entre à 78 % de la hauteur : assez tôt pour être lu, assez tard
 *  pour que le geste ait lieu sous les yeux du visiteur. */
const START = "top 78%";

/**
 * Toute scène rend son balisage à la fin : garder les lignes découpées, c'est
 * geler le retour à la ligne calculé à la mesure, et le titre resterait coupé
 * selon une largeur qui n'existe plus après un redimensionnement.
 */
const enter = (api: SceneApi, trigger?: Element) =>
  api.gsap.timeline({
    defaults: { ease: EASE.reveal },
    onComplete: api.revertSplits,
    scrollTrigger: { trigger: trigger ?? api.root, start: START, once: true },
  });

/**
 * En-tête de section, commun à toutes les scènes : le libellé mono paraît, son
 * filet se trace, puis le titre monte ligne par ligne sous masque.
 */
function revealHeading(api: SceneApi, tl: gsap.core.Timeline, at = 0) {
  const label = api.q('[data-reveal="label"]');
  const rule = api.q('[data-reveal="rule"]');
  const title = api.q('[data-reveal="title"]');
  const note = api.q('[data-reveal="note"]');

  if (label) {
    tl.fromTo(
      label,
      { opacity: 0 },
      { opacity: 1, duration: 0.28, ease: EASE.feedback },
      at,
    );
  }
  if (rule) {
    tl.fromTo(
      rule,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.55, ease: EASE.travel },
      at + 0.06,
    );
  }
  if (title) {
    const lines = api.splitLines(title);
    tl.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.2 }, at + 0.24);
    tl.fromTo(
      lines,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.62, stagger: 0.06 },
      at + 0.24,
    );
  }
  if (note) {
    tl.fromTo(
      note,
      { opacity: 0 },
      { opacity: 1, duration: DURATION.ui },
      at + 0.42,
    );
  }

  return tl;
}

/** Colonnes qui montent sous masque, décalées les unes des autres. */
function revealColumns(
  api: SceneApi,
  tl: gsap.core.Timeline,
  at: number,
  ruleSelector: string,
  bodySelector: string,
  step = 0.1,
) {
  const rules = api.qa(ruleSelector);
  const bodies = api.qa(bodySelector);

  if (rules.length) {
    tl.fromTo(
      rules,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.45, stagger: step, ease: EASE.travel },
      at,
    );
  }
  if (bodies.length) {
    tl.fromTo(
      bodies,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.8, stagger: step },
      at + 0.12,
    );
  }
}

/** Déplacement maximal d'une carte vers le curseur, en pixels. */
const MAGNETIC_MAX = 8;

/**
 * Attirance très légère de la carte vers le curseur. Sur `x`/`y`, donc sur
 * `transform` : aucune incidence sur la mise en page.
 *
 * Rien n'est branché sans souris fine : au doigt, `pointermove` se déclenche
 * au contact et la carte se déplacerait sous le pouce.
 */
function attachMagnetic(api: SceneApi): (() => void) | undefined {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const teardowns = api.qa("[data-magnetic]").map((card) => {
    const moveX = api.gsap.quickTo(card, "x", {
      duration: 0.45,
      ease: EASE.feedback,
    });
    const moveY = api.gsap.quickTo(card, "y", {
      duration: 0.45,
      ease: EASE.feedback,
    });

    const clamp = (value: number) => Math.max(-1, Math.min(1, value));

    const onMove = (event: PointerEvent) => {
      const box = card.getBoundingClientRect();
      moveX(
        clamp((event.clientX - (box.left + box.width / 2)) / (box.width / 2)) *
          MAGNETIC_MAX,
      );
      moveY(
        clamp((event.clientY - (box.top + box.height / 2)) / (box.height / 2)) *
          MAGNETIC_MAX,
      );
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  });

  return () => {
    for (const teardown of teardowns) teardown();
  };
}

export const SCENES = {
  /** Sections dont l'en-tête suffit : le corps n'a pas d'intention propre. */
  heading(api: SceneApi) {
    revealHeading(api, enter(api));
  },

  /** Bandeau de garanties : les filets se tracent, les items suivent. */
  guarantees(api: SceneApi) {
    const tl = enter(api);
    revealColumns(
      api,
      tl,
      0,
      '[data-reveal="col-rule"]',
      '[data-reveal="col-body"]',
      0.08,
    );
  },

  /** Services : filet en cascade, puis la colonne monte sous masque. */
  services(api: SceneApi) {
    const tl = revealHeading(api, enter(api));
    revealColumns(
      api,
      tl,
      0.5,
      '[data-reveal="col-rule"]',
      '[data-reveal="col-body"]',
    );
  },

  /** En-tête : se compacte après 100 px. Seule la hauteur bouge. */
  header(api: SceneApi) {
    const header = api.q("[data-header]");
    if (!header) return;

    const setCompact = (compact: boolean) => {
      header.dataset.compact = compact ? "true" : "false";
    };

    setCompact(window.scrollY > 100);

    api.ScrollTrigger.create({
      start: 100,
      end: "max",
      onEnter: () => setCompact(true),
      onLeaveBack: () => setCompact(false),
    });
  },

  /** Réalisations : l'aperçu se révèle sous masque, en reprenant l'échelle. */
  projects(api: SceneApi) {
    const tl = revealHeading(api, enter(api));

    const notice = api.q('[data-reveal="notice"]');
    if (notice)
      tl.fromTo(
        notice,
        { opacity: 0 },
        { opacity: 1, duration: DURATION.ui },
        0.5,
      );

    const previews = api.qa('[data-reveal="preview"]');
    if (previews.length) {
      tl.fromTo(
        previews,
        { yPercent: 100, scale: 1.06 },
        { yPercent: 0, scale: 1, duration: 0.85, stagger: 0.1 },
        0.58,
      );
    }

    const bodies = api.qa('[data-reveal="card-body"]');
    if (bodies.length) {
      tl.fromTo(
        bodies,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.7, stagger: 0.1 },
        0.72,
      );
    }

    return attachMagnetic(api);
  },

  /**
   * Méthode : chaque ligne se révèle à son tour, son filet se trace, et le
   * numéro d'étape s'incrémente depuis 00. Le compteur reste sur deux
   * caractères, la largeur ne bouge donc jamais.
   */
  method(api: SceneApi) {
    revealHeading(api, enter(api));

    for (const row of api.qa('[data-reveal="row"]')) {
      const tl = api.gsap.timeline({
        defaults: { ease: EASE.reveal },
        scrollTrigger: { trigger: row, start: "top 88%", once: true },
      });

      const rule = row.querySelector('[data-reveal="row-rule"]');
      const body = row.querySelector('[data-reveal="row-body"]');
      const number = row.querySelector<HTMLElement>("[data-count]");

      if (rule) {
        tl.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: EASE.travel },
          0,
        );
      }
      if (body) {
        tl.fromTo(body, { yPercent: 100 }, { yPercent: 0, duration: 0.7 }, 0.1);
      }
      if (number) {
        const target = Number(number.dataset.count ?? "0");
        const counter = { value: 0 };
        const write = (value: number) => {
          number.textContent = String(Math.round(value)).padStart(2, "0");
        };
        tl.to(
          counter,
          {
            value: target,
            duration: 0.4,
            ease: "none",
            // La remise à 00 se fait ici et non par une propriété GSAP :
            // `textContent` passerait par l'interpolation numérique et
            // écrirait « 0 » au lieu de « 00 ». Elle a lieu pendant que la
            // ligne est encore derrière son masque, donc invisible — le rendu
            // serveur porte la vraie valeur et ne saute jamais en arrière.
            onStart: () => write(0),
            onUpdate: () => write(counter.value),
          },
          0.12,
        );
      }
    }
  },

  /**
   * Maquette vers site : la section est épinglée, le scroll pilote la
   * transformation. Un seul scalaire est écrit par image — le reste du calcul
   * se fait en CSS, donc rien ne touche à la mise en page.
   *
   * Les annotations ne restent pas fixes : chacune a sa fenêtre d'apparition
   * et de disparition, déclarée en CSS, et elles se passent le relais du haut
   * vers le bas de l'écran au fil du scrub.
   */
  showcase(api: SceneApi) {
    revealHeading(api, enter(api));

    const stage = api.q("[data-showcase]");
    const pin = api.q("[data-showcase-pin]");
    const percent = api.q("[data-showcase-percent]");
    if (!stage || !pin) return;

    api.ScrollTrigger.create({
      trigger: pin,
      start: "center center",
      end: "+=130%",
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        stage.style.setProperty(
          "--showcase-progress",
          self.progress.toFixed(4),
        );
        if (percent)
          percent.textContent = `${Math.round(self.progress * 100)} %`;
      },
    });
  },

  /**
   * Étude de cas : chaque pièce est découverte, pas révélée.
   *
   * Le filet se trace, la pièce se dégage de sous son masque, le texte suit.
   * C'est le geste de la grille de réalisations (`projects`), repris tel quel
   * parce qu'il dit la même chose : on découvre un écran.
   *
   * Surtout, ce n'est pas un fondu montant posé sur chaque bloc. Une première
   * version faisait exactement ça, `opacity` et `y` sur le corps entier de
   * chaque rangée, ce que le CLAUDE.md interdit nommément.
   */
  caseStudy(api: SceneApi) {
    revealHeading(api, enter(api));

    for (const row of api.qa('[data-reveal="row"]')) {
      const tl = api.gsap.timeline({
        defaults: { ease: EASE.reveal },
        scrollTrigger: { trigger: row, start: "top 85%", once: true },
      });

      const rule = row.querySelector('[data-reveal="row-rule"]');
      const visual = row.querySelector('[data-reveal="row-visual"]');
      const body = row.querySelector('[data-reveal="row-body"]');

      if (rule) {
        tl.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: EASE.travel },
          0,
        );
      }
      if (visual) {
        tl.fromTo(
          visual,
          { yPercent: 100, scale: 1.04 },
          { yPercent: 0, scale: 1, duration: 0.8 },
          0.12,
        );
      }
      if (body) {
        tl.fromTo(body, { yPercent: 100 }, { yPercent: 0, duration: 0.7 }, 0.26);
      }
    }
  },

  /**
   * Vue éclatée : la section est épinglée, le scroll sépare les pièces de la
   * machine. Même contrat que `showcase` — un seul scalaire écrit par image,
   * tout le reste calculé en CSS, donc rien qui touche à la mise en page.
   *
   * ⚠️ La section n'est **pas** épinglée, et c'est un choix, pas un oubli.
   * L'accueil épingle déjà sa section maquette. Deux épinglages sur le même
   * site, c'est le même tour joué deux fois : le vocabulaire devient une
   * décoration répétée, ce que le CLAUDE.md interdit. Ici le scrub est branché
   * sur la traversée naturelle de la section, sans retenir le défilement.
   *
   * L'éclatement est donc terminé quand la section arrive au centre de
   * l'écran, et il y reste : après `end`, la progression vaut 1 et ne bouge
   * plus. On lit la suite avec les pièces séparées sous les yeux, au lieu de
   * les voir se refermer.
   *
   * Le seuil passe par `gsap.matchMedia()` et non par un `window.matchMedia`
   * lu une fois. La lecture unique cassait dans les deux sens, mesuré :
   * chargé large puis rétréci, la cale de l'épinglage restait insérée et le
   * document gardait 1 218 px de vide pour une animation qui ne tournait plus ;
   * chargé étroit puis élargi, aucun déclencheur n'était jamais créé et la vue
   * éclatée restait morte, pièces figées derrière la machine.
   *
   * Sous 48 rem, rien n'est branché : le CSS y réduit la scène au portable
   * seul.
   */
  eclat(api: SceneApi) {
    revealHeading(api, enter(api));

    const stage = api.q("[data-eclat]");
    const piste = api.q("[data-eclat-piste]");
    if (!stage || !piste) return;

    const mm = api.gsap.matchMedia();

    mm.add("(width >= 48rem)", () => {
      const trigger = api.ScrollTrigger.create({
        trigger: piste,
        start: "top 85%",
        end: "center 45%",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          stage.style.setProperty("--eclat-progress", self.progress.toFixed(4));
        },
      });

      // La propriété est retirée et pas remise à zéro : la valeur de repos
      // appartient à la feuille de style, et `prefers-reduced-motion` y pose
      // 1. Écrire 0 ici figerait la scène assemblée pour qui a demandé à
      // réduire les animations en cours de visite.
      return () => {
        trigger.kill();
        stage.style.removeProperty("--eclat-progress");
      };
    });

    return () => mm.revert();
  },

  /**
   * Appel à l'action : le fond profond balaie la section de haut en bas, puis
   * le titre se révèle par lignes. Le balayage est un `scaleY` sur un calque,
   * pas une hauteur : aucune incidence sur la mise en page.
   */
  cta(api: SceneApi) {
    const tl = enter(api);

    const sweep = api.q("[data-cta-sweep]");
    if (sweep) {
      tl.fromTo(
        sweep,
        { scaleY: 1 },
        { scaleY: 0, duration: 0.7, ease: EASE.travel },
        0,
      );
    }

    const label = api.q('[data-reveal="label"]');
    if (label)
      tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.45);

    const title = api.q('[data-reveal="title"]');
    if (title) {
      const lines = api.splitLines(title);
      tl.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.52);
      tl.fromTo(
        lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.66, stagger: 0.06 },
        0.52,
      );
    }

    const body = api.q('[data-reveal="note"]');
    if (body)
      tl.fromTo(
        body,
        { opacity: 0 },
        { opacity: 1, duration: DURATION.ui },
        0.72,
      );

    const actions = api.q('[data-reveal="actions"]');
    if (actions)
      tl.fromTo(
        actions,
        { opacity: 0 },
        { opacity: 1, duration: DURATION.ui },
        0.82,
      );
  },
} as const;

export type SceneName = keyof typeof SCENES;
