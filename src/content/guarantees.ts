/**
 * Bandeau de garanties. Quatre affirmations, quatre choses vérifiables : un
 * visiteur peut contrôler chacune d'elles sur le site livré.
 *
 * Aucune ne porte sur un délai de correction, une validation par étapes ou un
 * suivi du chantier — ce sont des engagements de service, pas des propriétés
 * du travail livré, et ils ne sont pas tenables aux prix affichés.
 *
 * Aucune ne porte non plus sur un résultat chiffré : ni score de test, ni
 * position dans un moteur, ni pourcentage de gain. Ces chiffres dépendent
 * d'outils et d'algorithmes qui changent sans prévenir, donc on ne s'y engage
 * pas. La performance se dit par la façon dont le site est construit.
 *
 * La dernière portait sur l'absence d'abonnement. Elle était fausse : un site
 * qui a un espace de gestion, une base de données ou un hébergement
 * professionnel a un coût mensuel, quel que soit celui qui l'encaisse.
 * L'engagement tenable n'est pas « il n'y en a pas », c'est « il n'y en a
 * aucun de mon fait, et vous connaissez les autres avant de signer ».
 */
export const guarantees = {
  label: "Ce qui est garanti",
  items: [
    {
      label: "Socle technique",
      value:
        "Chaque page est écrite pour vous. Aucun thème acheté, aucun constructeur de pages.",
    },
    {
      label: "Performance",
      value:
        "Un site qui s’affiche immédiatement, sur mobile comme sur ordinateur. C’est un critère de construction, pas une option ajoutée à la fin.",
    },
    {
      label: "Propriété",
      value:
        "Le code, le nom de domaine et les comptes sont à votre nom. Vous partez avec, quand vous voulez.",
    },
    {
      label: "Coûts annoncés",
      value:
        "Je ne facture aucun montant mensuel. Si le site a besoin d’un service payant pour tourner, son tarif est celui du fournisseur, et vous le connaissez avant de commencer.",
    },
  ],
} as const;
