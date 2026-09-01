import { site } from "@/content/site";

import type { PageContent } from "@/content/types";

/**
 * Textes des deux pages légales.
 *
 * La politique de confidentialité est courte parce qu'elle est vraie : le
 * site ne dépose aucun cookie, n'embarque aucun traceur et n'a pas de
 * formulaire. Vérifié — aucune dépendance d'analytique dans le projet. Le
 * jour où un formulaire ou une mesure d'audience arrive, ce texte doit être
 * réécrit le même jour.
 *
 * Elle n'a volontairement pas été reprise de l'ancien site : celui-ci déclare
 * un formulaire de contact et un sous-traitant, EmailJS. Ni l'un ni l'autre
 * n'existent ici, et décrire un traitement qui n'a pas lieu est aussi faux
 * que d'en taire un.
 *
 * Les conditions générales, elles, sont reprises de l'ancien site : ce sont
 * des engagements commerciaux, pas de la description technique. Deux ajouts
 * seulement, tous deux imposés par le code de commerce entre professionnels —
 * l'indemnité forfaitaire de recouvrement et le droit applicable.
 */
export const legalPages = {
  cgv: {
    kicker: "Conditions de vente",
    metaTitle: "Conditions générales de vente",
    metaDescription:
      "Devis, acompte, paiement, propriété du code et responsabilité. Les conditions qui s’appliquent à toute prestation.",
    h1: "Conditions générales de vente",
    lead: "Ce qui s’applique dès qu’un devis est signé. Rien ici n’est une surprise de dernière minute.",

    /** À réviser à chaque changement de conditions. */
    updatedAt: "Août 2026",

    sections: [
      {
        title: "Objet",
        body: [
          "Ces conditions régissent la relation entre Lucas Corrieras, entrepreneur individuel, et son client, pour toute prestation de création de site web, de design d’interface ou de développement.",
          "La signature d’un devis vaut acceptation sans réserve de ces conditions.",
        ],
      },
      {
        title: "Devis et commande",
        body: [
          "Chaque prestation fait l’objet d’un devis détaillé, valable 30 jours.",
          "La commande devient ferme à réception du devis daté et signé, accompagné du versement de l’acompte.",
        ],
      },
      {
        title: "Prix et paiement",
        body: [
          "Les prix sont en euros. TVA non applicable, article 293 B du code général des impôts.",
          "Un acompte de 30 % à 40 % est versé à la commande, à un taux précisé sur le devis. Le solde est dû à la livraison ou à la mise en ligne.",
          "En cas de retard de paiement, des pénalités égales à trois fois le taux d’intérêt légal sont exigibles de plein droit, sans mise en demeure préalable, ainsi qu’une indemnité forfaitaire de 40 € pour frais de recouvrement.",
        ],
      },
      {
        title: "Propriété du travail livré",
        body: [
          "La propriété du code source et des créations graphiques est transférée au client au paiement intégral du prix.",
          "Tant que la facture finale n’est pas réglée, ces créations restent la propriété exclusive de Lucas Corrieras.",
        ],
      },
      {
        title: "Responsabilité",
        body: [
          "Le prestataire est tenu à une obligation de moyens. Sa responsabilité ne peut être engagée pour un dommage indirect : perte de chiffre d’affaires, perte de données consécutive à une manipulation du client.",
          "Le client est seul responsable des contenus qu’il fournit : textes, images, et des droits qui s’y attachent.",
        ],
      },
      {
        title: "Force majeure",
        body: [
          "La responsabilité du prestataire ne peut être engagée si l’inexécution ou le retard découle d’un cas de force majeure au sens de l’article 1218 du code civil.",
        ],
      },
      {
        title: "Droit applicable",
        body: [
          "Ces conditions sont soumises au droit français. À défaut d’accord amiable, tout litige relève des tribunaux compétents.",
        ],
      },
    ],
  },

  mentions: {
    kicker: "Informations légales",
    metaTitle: "Mentions légales",
    metaDescription: `Éditeur, hébergeur et coordonnées du site ${site.domain}.`,
    h1: "Mentions légales",
    lead: "Les informations que la loi impose de publier sur un site professionnel.",
  } satisfies PageContent,

  privacy: {
    kicker: "Données personnelles",
    metaTitle: "Confidentialité",
    metaDescription:
      "Ce site ne dépose aucun cookie et ne collecte aucune donnée de navigation. Ce qui se passe quand vous m’écrivez.",
    h1: "Confidentialité",
    lead: "Ce site ne vous suit pas. Voici ce que ça veut dire concrètement.",

    sections: [
      {
        title: "Aucun cookie, aucune mesure d’audience",
        body: [
          "Ce site ne dépose aucun cookie sur votre appareil. Il n’embarque ni Google Analytics, ni aucun autre outil de mesure. Aucune bannière de consentement n’est nécessaire, parce qu’il n’y a rien à consentir.",
          "Vos pages consultées, votre adresse IP et votre parcours ne sont ni enregistrés ni transmis.",
        ],
      },
      {
        title: "Quand vous m’écrivez",
        body: [
          "Il n’y a pas de formulaire sur ce site : vous m’écrivez par courriel, depuis votre propre messagerie. Je reçois donc votre adresse et ce que vous avez choisi de me dire.",
          "Je conserve ces échanges le temps de la relation, et les documents comptables le temps que la loi impose. Rien n’est revendu, rien n’est transmis à un tiers à des fins commerciales.",
        ],
      },
      {
        title: "Vos droits",
        body: [
          "Vous pouvez demander à consulter, corriger ou supprimer ce que je détiens sur vous, en écrivant à l’adresse indiquée dans les mentions légales. Je réponds à chaque demande.",
          "Si la réponse ne vous convient pas, vous pouvez saisir la CNIL.",
        ],
      },
      {
        title: "Hébergement",
        body: [
          "Le site est hébergé par Vercel. Comme tout hébergeur, Vercel tient des journaux techniques de connexion pour assurer le service et sa sécurité. Je n’y ai pas accès à des fins d’analyse et je n’en tire aucun profil.",
        ],
      },
    ],
  },
} as const;
