import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un package-lock.json traîne dans le dossier personnel : sans cette ligne,
  // Turbopack remonte jusqu'à lui pour déduire la racine du projet et avertit
  // à chaque démarrage.
  turbopack: {
    root: __dirname,
  },

  /**
   * Le site remplace une version précédente dont deux adresses étaient
   * indexées — elles figurent dans son plan du site. Sans redirection
   * permanente, elles répondraient 404 et l'ancienneté acquise sur ces URL
   * serait perdue au lieu d'être transmise.
   *
   * `/mentions-legales` et `/confidentialite` gardent le même chemin : rien à
   * rediriger. `/cgv` n'était pas indexée — l'ancien `robots.txt` l'interdit
   * au crawl — et aucune conditions générales n'est écrite pour l'instant,
   * donc son 404 ne coûte rien.
   */
  async redirects() {
    return [
      { source: "/expertise", destination: "/services", permanent: true },
      { source: "/projets", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
