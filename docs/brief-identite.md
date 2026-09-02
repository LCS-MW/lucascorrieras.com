# Brief identité — logo et carte de visite

Contexte à donner tel quel à une session de travail. Tout ce qui suit est
relevé du site en production, pas de mémoire.

---

## 1. Qui, et pour qui

**Lucas Corrieras**, designer UI/UX et développeur front-end, en indépendant.
Basé à Cussangy (Aube), intervient à Troyes et dans l'Aube, à distance partout
en France.

Il vend des sites sur mesure à des **artisans, commerçants et indépendants** —
menuisiers, traiteurs, plombiers, producteurs. Public non technique, souvent
âgé de 35 à 60 ans, qui juge sur la solidité apparente et non sur la mode.

La promesse tient en une phrase, c'est le titre de l'accueil :

> **Conçu et codé par la même personne.**

Pas d'agence, pas de sous-traitance, pas de thème acheté. Le site est à la fois
l'offre et la démonstration : sa qualité d'exécution est l'argument de vente.

---

## 2. Ce qui existe déjà

**Il n'y a pas de logo.** La marque est purement typographique : « LUCAS
CORRIERAS » en IBM Plex Mono, capitales, 11 px, interlettrage 0,14 em, encre
sur papier. C'est volontairement discret et un peu technique.

**Un seul picto existe**, celui de l'onglet du navigateur (`src/app/icon.svg`).
C'est le point de départ le plus légitime pour un logo :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#F2F3EF" />
  <rect x="7" y="7" width="18" height="18" fill="none" stroke="#1B3BD4" stroke-width="2" />
  <g fill="#1B3BD4">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="22" y="3" width="7" height="7" />
    <rect x="3" y="22" width="7" height="7" />
    <rect x="22" y="22" width="7" height="7" />
  </g>
</svg>
```

C'est un **cadre de sélection** : un carré vide entouré de quatre poignées
d'angle, comme un élément sélectionné dans un outil de design. Il dit « je
dessine » sans l'écrire.

Le site est en ligne : **lucascorrieras.com**

---

## 3. Le système de design — à respecter à la lettre

### Couleurs

| rôle | valeur |
|---|---|
| papier — fond principal | `#F2F3EF` |
| encre — texte principal | `#14171A` |
| encre secondaire | `#5C6360` |
| **accent — couleur unique** | `#1B3BD4` |
| accent pâle — sections alternées | `#E2E6FA` |
| fond profond — appel à l'action | `#0C1330` |
| filets | accent à 20 % sur le fond |

**Une seule couleur d'accent sur tout le site.** Le fond profond `#0C1330`
n'est pas un noir neutre : c'est la même teinte que l'accent (228°), assombrie
et désaturée.

### Typographie

| usage | police | réglages |
|---|---|---|
| titres | **Bricolage Grotesque** 600 | interlettrage −0,035 em, interlignage 1,02 |
| texte | **Inter Tight** 400 / 500 | interlignage 1,55 |
| étiquettes, cotes | **IBM Plex Mono** 400 | capitales, interlettrage 0,14 em, 11 px |

La mono en capitales espacées est ce qui porte le signal « technique ». C'est
la signature typographique du site.

### Formes

- **Rayons : 2 px maximum.** Aucun arrondi mou.
- **Aucune ombre portée diffuse.** Les séparations se font au filet d'un pixel.
- **Aucun dégradé décoratif.**

---

## 4. Le vocabulaire visuel signature

Le site emprunte le langage des outils de design et de la mesure : **cadres de
sélection, poignées d'angle, cotes, repères d'alignement, étiquettes de
calque**.

Ce vocabulaire dit « je dessine et je code » sans l'écrire, et évoque la
précision d'un artisan pour un public non technique.

**Il s'utilise avec retenue : il ne doit jamais devenir une décoration
répétée.** Sur le site, le cadre de sélection complet n'apparaît qu'une fois,
dans l'accroche de l'accueil. C'est sa condition pour rester un signe.

---

## 5. Demande 1 — le logo

Concevoir un logo qui prolonge ce système sans le trahir.

**Contraintes dures**

- Une seule couleur, `#1B3BD4`, plus le papier `#F2F3EF`. Pas de seconde teinte.
- Lisible et reconnaissable à **16 px** (favicon) comme à 100 mm (enseigne).
- Doit fonctionner **en monochrome** : gravure, tampon, fond sombre, fax.
- Formes géométriques, angles francs, rayons ≤ 2 px.
- Aucun dégradé, aucune ombre, aucun effet.

**Trois pistes à explorer**

1. **Le cadre de sélection**, repris du favicon et poussé plus loin. Le plus
   fidèle, mais il faut éviter qu'il ressemble à un viseur d'appareil photo ou
   à un QR code.
2. **Le monogramme LC** construit dans le vocabulaire de la mesure — les deux
   lettres tenues par des repères d'alignement, ou cotées comme sur un plan.
3. **La marque typographique seule**, travaillée : « LUCAS CORRIERAS » en mono
   espacée, avec un seul signe qui l'accompagne. Le plus sobre, et cohérent
   avec ce qui existe.

**Livrables attendus** : SVG monochrome, version horizontale (marque + signe)
et version compacte (signe seul), plus une déclinaison sur fond `#0C1330`.

---

## 6. Demande 2 — la carte de visite Vistaprint

**Format standard français : 85 × 55 mm.** Avec fond perdu de 3 mm sur chaque
bord, le fichier fait **91 × 61 mm**. Marge de sécurité de 5 mm depuis la coupe
— rien d'important au-delà. **300 dpi minimum, en CMJN.**

*(À confirmer sur la fiche produit Vistaprint : les formats varient selon la
gamme choisie.)*

**Informations à faire figurer**

```
Lucas Corrieras
Designer et développeur — sites sur mesure
lucascorrieras.com
lcs@lucascorrieras.com
06 18 05 39 48
Troyes et l'Aube
```

**Recto / verso**

Le recto devrait porter le logo seul sur le papier `#F2F3EF`, ou en réserve
sur l'accent `#1B3BD4`. Le verso porte les coordonnées, en mono espacée pour
les étiquettes et en Inter Tight pour les valeurs — exactement comme le pied de
page du site.

Une carte de visite est le seul objet où le vocabulaire de la mesure peut
respirer : une cote imprimée le long d'un bord, un repère de coupe assumé.
Mais une seule fois, pas trois.

---

## 7. Le piège de l'impression

**`#1B3BD4` sort du gamut CMJN.** Ce bleu est un bleu d'écran : imprimé en
quadrichromie il sortira plus terne et plus violet. Trois options, dans l'ordre
de ce que je recommanderais :

1. **Accepter le décalage** et valider sur un exemplaire imprimé avant de
   commander la série. Le moins cher.
2. **Choisir un Pantone proche** et imprimer en ton direct. Plus fidèle et plus
   dense, mais Vistaprint ne le propose pas sur son entrée de gamme.
3. **Adopter un bleu d'impression distinct** du bleu d'écran, plus imprimable,
   accepté comme équivalent. C'est ce que font beaucoup d'identités.

Ne pas convertir mécaniquement le RVB en CMJN sans regarder le résultat : c'est
le meilleur moyen d'obtenir une carte fade qui ne ressemble pas au site.

---

## 8. Ce qu'il ne faut surtout pas faire

- Ajouter une seconde couleur, un dégradé, une ombre portée.
- Arrondir les angles au-delà de 2 px.
- Un logo qui ne survit pas au monochrome ou au 16 px.
- Répéter le motif du cadre de sélection sur toute la carte : il perd son sens
  dès qu'il devient un fond.
- Une icône générique de développeur — chevrons `</>`, terminal, fusée, engrenage.
  Le public visé est un menuisier, pas un recruteur technique.
- Un slogan sur la carte. Le site s'en charge.
