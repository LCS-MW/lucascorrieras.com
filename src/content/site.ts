/**
 * Identité du site. Toute chaîne visible par un visiteur vit dans
 * `src/content/` — jamais en dur dans un composant.
 *
 * ⚠️ `email`, `phone` et l'adresse apparaissent publiquement.
 *
 * `phone` peut repasser à `null` : tout ce qui en dépend — le bouton d'appel
 * de la page contact, sa ligne dans la fiche, le `telephone` des données
 * structurées — disparaît alors sans laisser de trace visible.
 */
export const site = {
  name: "Lucas Corrieras",

  /**
   * Domaine canonique : l'apex, sans `www`. Décision, pas hasard.
   *
   * C'est l'URL qu'un artisan lit sur une carte, note sur un carnet ou dicte
   * au téléphone : quatre caractères de moins comptent là, pas dans un
   * navigateur. L'argument technique inverse — un `CNAME` sur `www`, des
   * cookies qui ne fuient pas vers les sous-domaines — ne s'applique pas ici :
   * Vercel sert l'apex nativement et le site ne dépose aucun cookie.
   *
   * ⚠️ Tout en dépend : `metadataBase`, les canoniques, `og:url`, le plan du
   * site et le `robots.txt`. Changer cette ligne les change tous d'un coup —
   * mais laisse en place la redirection d'hôte, qui vit chez l'hébergeur.
   *
   * Cette redirection n'est volontairement pas dans `next.config.ts`. Une
   * règle `www → apex` dans le code, combinée à la redirection `apex → www`
   * encore active chez Vercel, produirait une boucle infinie : le site ne
   * répondrait plus du tout. Une incohérence d'hôte dégrade le référencement ;
   * une boucle coupe le site. On règle donc ça au même endroit que la
   * redirection existante, et à un seul endroit.
   */
  domain: "lucascorrieras.com",
  url: "https://lucascorrieras.com",
  role: "Designer UI/UX et développeur front-end",
  description:
    "Conception et développement de sites sur mesure pour les artisans, les commerçants et les indépendants. Une seule personne, du premier croquis à la mise en ligne.",
  locale: "fr_FR",
  lang: "fr",

  /**
   * ⚠️ Reprise du site actuellement en ligne, qui publie cette adresse dans
   * ses mentions légales et sa politique de confidentialité. Le scaffold
   * portait `contact@lucascorrieras.com`, qui était une valeur inventée.
   */
  email: "lcs@lucascorrieras.com",

  /** Format lisible. `null` = ligne masquée partout. */
  phone: "06 18 05 39 46" as string | null,

  /**
   * Siège déclaré. Il figure dans les mentions légales parce que la loi
   * l'impose, et dans les données structurées parce qu'une fiche sans
   * localité n'est éligible à aucun résultat enrichi.
   */
  street: "3 voie des Âtres",
  locality: "Cussangy",
  region: "Grand Est",

  /**
   * Marché visé, distinct du siège. Cussangy est un village : personne n'y
   * cherche un site web. Troyes et l'Aube sont la zone où la requête existe,
   * et la déclarer en `areaServed` est exact — c'est là qu'on intervient,
   * pas là qu'on est domicilié.
   */
  servedCity: "Troyes",
  servedRegion: "Aube",

  area: "Troyes et l’Aube · à distance partout en France",
} as const;
