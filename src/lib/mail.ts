import { site } from "@/content/site";

/**
 * Envoi d'un courriel par l'API REST de Resend.
 *
 * Appelée directement par `fetch`, sans le paquet npm : c'est une requête
 * POST avec un objet JSON, et CLAUDE.md interdit d'ajouter une dépendance qui
 * n'est pas nécessaire. Changer de fournisseur ne touchera que ce fichier.
 *
 * `RESEND_API_KEY` n'est jamais lue ailleurs, et sa seule *présence* décide si
 * le formulaire s'affiche — voir la page contact. Sans clé, aucun formulaire
 * n'est rendu : un formulaire qui n'envoie rien coûte plus cher qu'une adresse
 * qui marche.
 */

/**
 * Expéditeur technique. Resend n'accepte un domaine que s'il est vérifié chez
 * lui ; tant que `lucascorrieras.com` ne l'est pas, `onboarding@resend.dev`
 * est la seule adresse autorisée et les messages ne peuvent partir que vers
 * l'adresse du compte Resend.
 */
const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export type Message = {
  name: string;
  email: string;
  trade: string;
  message: string;
};

export async function sendMessage(message: Message): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY absente");

  const corps = [
    `Nom      : ${message.name}`,
    `Courriel : ${message.email}`,
    message.trade ? `Métier   : ${message.trade}` : null,
    "",
    message.message,
  ]
    .filter((ligne) => ligne !== null)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} — site <${FROM}>`,
      to: [site.email],
      // La réponse part vers le visiteur, pas vers l'expéditeur technique :
      // sans ça, répondre depuis sa boîte écrirait à Resend.
      reply_to: message.email,
      subject: `Demande depuis le site — ${message.name}`,
      text: corps,
    }),
  });

  if (!response.ok) {
    // Le corps de la réponse peut contenir la clé en écho : on ne le
    // journalise pas, seul le statut sort d'ici.
    throw new Error(`Resend a répondu ${response.status}`);
  }
}
