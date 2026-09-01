# lucascorrieras.com

Site vitrine de Lucas Corrieras, designer UI/UX et développeur front-end freelance.
Le site est à la fois l'offre commerciale et la démonstration technique : sa qualité
d'exécution est le principal argument de vente.

## Cible
Artisans, commerçants, indépendants et TPE en France. Public non technique.
Le site doit rassurer sur le sérieux tout en démontrant une maîtrise que ces
visiteurs perçoivent sans pouvoir la nommer.

## Stack imposée
- Next.js 16.x, App Router, TypeScript strict, Turbopack
- React 19.x
- Tailwind CSS v4 (config CSS-first via @theme, pas de tailwind.config.js)
- GSAP + @gsap/react (hook useGSAP) + ScrollTrigger + SplitText
- Lenis pour le smooth scroll
- Motion (motion.dev) pour les animations au niveau composant
- next/font pour l'auto-hébergement des polices
- Node 22 LTS minimum

Vérifie les dernières versions stables avant d'installer. N'ajoute aucune
dépendance qui n'est pas dans cette liste sans me demander d'abord.

## Tokens de design — ne jamais improviser une couleur ou une taille

Couleurs :
--paper      #F2F3EF   fond principal, gris-papier froid
--surface    #E9EAE4   sections alternées
--ink        #14171A   texte principal
--ink-2      #5C6360   texte secondaire
--rule       #D7DAD2   filets et bordures
--accent     #1B3BD4   bleu signal, couleur unique
--accent-soft #E2E6FA  fonds d'accent

Une seule couleur d'accent sur tout le site. Aucun dégradé décoratif.
Aucune ombre portée diffuse. Les séparations se font au filet 1px.

Typographies :
- Display : Bricolage Grotesque, poids 600, letter-spacing -0.035em, line-height 1.02
- Texte : Inter Tight, poids 400/500
- Utilitaire : IBM Plex Mono, uppercase, letter-spacing 0.14em — réservé aux
  libellés, cotes, étiquettes techniques. C'est ce qui porte le signal "technique".

Rayons : 2px maximum. Pas d'arrondis mous.

## Vocabulaire visuel signature
Le site emprunte le langage des outils de design et de la mesure : cadres de
sélection, poignées d'angle, cotes, repères d'alignement, étiquettes de calque.
Ce vocabulaire dit "je dessine et je code" sans l'écrire, et évoque la précision
d'un artisan pour un public non technique.
Il s'utilise avec retenue : il ne doit jamais devenir une décoration répétée.

## Règles de motion
- Une intention par section, orchestrée. Jamais d'effets dispersés.
- Interdit : parallaxe générique de fond, fade-up systématique sur tous les blocs,
  bibliothèques type AOS, compteurs animés sans raison, curseur custom gadget.
- Toute animation au scroll passe par GSAP + ScrollTrigger, jamais par des
  IntersectionObserver maison.
- Tout ce qui bouge doit se justifier : soit ça révèle une information, soit ça
  guide le regard, soit ça donne du feedback. Sinon on le supprime.
- prefers-reduced-motion : état final immédiat, jamais un simple ralentissement.
- Toute animation GSAP dans un composant React passe par useGSAP() avec un scope.

## Plancher de qualité — non négociable
- Lighthouse 100/100/100/100 sur mobile en production
- LCP < 1.2s, CLS = 0, INP < 200ms
- Navigation clavier complète, focus visible sur tous les éléments interactifs
- Contrastes AA minimum
- Un seul h1 par page, hiérarchie de titres correcte
- Métadonnées Next complètes par page, données structurées LocalBusiness
- Aucune erreur ni warning en console

## Conventions
- Server Components par défaut. "use client" uniquement sur les composants animés.
- Chaque composant animé isole sa logique GSAP dans un hook dédié.
- Aucun texte en dur dans les composants : tout le contenu dans src/content/.
- Français, vouvoiement, phrases courtes. Pas de jargon technique côté visiteur.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
