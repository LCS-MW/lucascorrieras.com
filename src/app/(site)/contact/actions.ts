"use server";

import { INITIAL, type FormState } from "@/app/(site)/contact/form-state";
import { contact } from "@/content/contact";
import { sendMessage } from "@/lib/mail";

/**
 * Action serveur du formulaire de contact.
 *
 * Elle ne rend pas la page dynamique : la page reste prérendue, seule cette
 * fonction s'exécute sur une requête POST. C'est le malentendu le plus
 * fréquent — un formulaire n'oblige pas à passer en rendu serveur.
 *
 * Toute la validation est refaite ici. Celle du navigateur est un confort pour
 * le visiteur, jamais une garantie : un automate poste directement.
 */

/** Assez strict pour écarter une faute de frappe, assez large pour ne rien refuser de valide. */
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _previous: FormState,
  data: FormData,
): Promise<FormState> {
  const champ = (nom: string) => (data.get(nom)?.toString() ?? "").trim();

  const values = {
    name: champ("name").slice(0, 120),
    email: champ("email").slice(0, 180),
    trade: champ("trade").slice(0, 120),
    message: champ("message").slice(0, 4000),
  };

  // Le piège à robots : invisible et hors de l'ordre de tabulation, donc
  // rempli uniquement par un automate. On répond succès sans rien envoyer,
  // pour ne pas lui apprendre qu'il a été repéré.
  if (champ(contact.form.honeypot.name)) {
    return { status: "success", errors: {}, values: INITIAL.values };
  }

  const errors: FormState["errors"] = {};
  if (values.name.length < 2) errors.name = contact.form.errors.name;
  if (!COURRIEL.test(values.email)) errors.email = contact.form.errors.email;
  if (values.message.length < 10) errors.message = contact.form.errors.message;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await sendMessage(values);
  } catch (erreur) {
    /**
     * Journalisé côté serveur, donc lisible dans les logs de fonction de
     * l'hébergeur — jamais renvoyé au visiteur, à qui le détail ne sert à rien
     * et à qui il révélerait l'infrastructure.
     *
     * Ni le message du visiteur ni son adresse n'entrent dans ce journal : ce
     * serait consigner une donnée personnelle pour rien, et la politique de
     * confidentialité dit que le formulaire n'enregistre rien.
     */
    console.error(
      "[contact] envoi impossible :",
      erreur instanceof Error ? erreur.message : "cause inconnue",
    );

    return {
      status: "error",
      errors: { form: contact.form.errors.failed },
      values,
    };
  }

  return { status: "success", errors: {}, values: INITIAL.values };
}
