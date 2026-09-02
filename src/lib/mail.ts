import { site } from "@/content/site";

/**
 * Envoi d'un courriel par l'API REST d'EmailJS.
 *
 * Appelée directement par `fetch`, sans le paquet npm : c'est une requête POST
 * avec un objet JSON, et CLAUDE.md interdit d'ajouter une dépendance qui n'est
 * pas nécessaire. Changer de fournisseur ne touchera que ce fichier.
 *
 * ⚠️ L'appel se fait **côté serveur**, depuis l'action du formulaire, et non
 * depuis le navigateur comme le fait l'intégration habituelle d'EmailJS. Deux
 * raisons : la clé publique ne part pas dans le paquet client, et la
 * validation comme le piège à robots restent hors de portée du visiteur. Un
 * formulaire validé uniquement côté client se contourne avec un `curl`.
 *
 * Ce mode exige d'activer « API calls from non-browser applications » dans le
 * compte EmailJS et de fournir la clé privée en `accessToken`. Sans elle,
 * l'API répond 403.
 *
 * Les quatre valeurs vivent en variables d'environnement et non dans le code.
 * Les trois premières sont « publiques par conception » chez EmailJS — elles
 * voyagent dans le navigateur sur une intégration classique — mais le dépôt
 * est public : les y écrire les republierait durablement.
 */

const ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/** Les quatre variables doivent être présentes ensemble, sinon rien n'est envoyé. */
export function canSend(): boolean {
  return Boolean(
    process.env.EMAILJS_SERVICE_ID &&
    process.env.EMAILJS_TEMPLATE_ID &&
    process.env.EMAILJS_PUBLIC_KEY &&
    process.env.EMAILJS_PRIVATE_KEY,
  );
}

export type Message = {
  name: string;
  email: string;
  trade: string;
  message: string;
};

export async function sendMessage(message: Message): Promise<void> {
  if (!canSend()) throw new Error("Configuration EmailJS incomplète");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,

      /**
       * Le gabarit EmailJS doit consommer ces noms. Les doublons — `name` et
       * `from_name`, `email` et `reply_to` — couvrent les deux conventions
       * qu'EmailJS propose selon la façon dont le gabarit a été créé : les
       * champs inconnus sont ignorés, mais un champ attendu et absent laisse
       * un trou dans le message reçu.
       *
       * `reply_to` a un sens particulier : EmailJS s'en sert pour l'en-tête de
       * réponse. Sans lui, répondre depuis la boîte de réception écrirait à
       * EmailJS et non au visiteur.
       */
      template_params: {
        from_name: message.name,
        name: message.name,
        reply_to: message.email,
        email: message.email,
        trade: message.trade || "non précisé",
        message: message.message,
        to_email: site.email,
      },
    }),
  });

  if (!response.ok) {
    /**
     * Le message d'EmailJS remonte, mais expurgé des quatre identifiants au
     * cas où l'API les renverrait en écho. Il est indispensable : sans lui, un
     * refus se présentait comme un échec anonyme, et la seule façon de le
     * diagnostiquer était d'interroger l'API depuis l'extérieur.
     *
     * C'est l'action qui le journalise, côté serveur. Le visiteur, lui, ne
     * voit jamais que la phrase générique.
     */
    const secrets = [
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      process.env.EMAILJS_PUBLIC_KEY,
      process.env.EMAILJS_PRIVATE_KEY,
    ].filter((v): v is string => Boolean(v));

    const brut = await response.text().catch(() => "");
    const detail = secrets
      .reduce((texte, secret) => texte.replaceAll(secret, "[masqué]"), brut)
      .slice(0, 300);

    throw new Error(`EmailJS a répondu ${response.status} — ${detail}`);
  }
}
