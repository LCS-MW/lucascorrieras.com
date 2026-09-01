"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { submitContact } from "@/app/(site)/contact/actions";
import { INITIAL } from "@/app/(site)/contact/form-state";
import { contact } from "@/content/contact";

const { form } = contact;

/**
 * Formulaire de contact.
 *
 * Aucune bibliothèque : `useActionState` suffit, et il donne l'état d'envoi
 * sans qu'on ait à le tenir soi-même. Les champs conservent leur valeur après
 * une erreur — la réponse de l'action les renvoie — parce que refaire saisir
 * un message de dix lignes pour une adresse mal tapée est le meilleur moyen
 * de perdre la demande.
 *
 * Le résultat est annoncé dans une région `aria-live` : sans elle, un lecteur
 * d'écran ne saurait jamais que l'envoi a réussi, la page ne changeant pas.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const id = useId();
  const resultat = useRef<HTMLParagraphElement>(null);

  // Après une erreur, le focus va au premier champ fautif. Après un succès,
  // au message : sans ça, le focus reste sur un bouton dont le libellé ne dit
  // plus rien de ce qui vient de se passer.
  useEffect(() => {
    if (state.status === "error") {
      const premier = Object.keys(state.errors)[0];
      if (premier && premier !== "form") {
        document.getElementById(`${id}-${premier}`)?.focus();
        return;
      }
    }
    if (state.status !== "idle") resultat.current?.focus();
  }, [state, id]);

  const champ = (nom: "name" | "email" | "message") =>
    state.errors[nom]
      ? {
          "aria-invalid": true as const,
          "aria-describedby": `${id}-${nom}-err`,
        }
      : {};

  const style =
    "border-rule bg-paper text-ink focus-visible:border-accent mt-3 w-full rounded-sm border px-4 py-3 text-base transition-colors";

  return (
    <form action={action} noValidate className="mt-10 max-w-xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-name`}
            className="font-mono text-label text-ink-2 uppercase"
          >
            {form.fields.name.label}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={state.values.name}
            placeholder={form.fields.name.placeholder}
            className={style}
            {...champ("name")}
          />
          {state.errors.name ? (
            <p
              id={`${id}-name-err`}
              className="text-accent text-sm mt-2 font-medium"
            >
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="font-mono text-label text-ink-2 uppercase"
          >
            {form.fields.email.label}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={state.values.email}
            placeholder={form.fields.email.placeholder}
            className={style}
            {...champ("email")}
          />
          {state.errors.email ? (
            <p
              id={`${id}-email-err`}
              className="text-accent text-sm mt-2 font-medium"
            >
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor={`${id}-trade`}
          className="font-mono text-label text-ink-2 uppercase"
        >
          {form.fields.trade.label}{" "}
          <span className="text-ink-2">({form.fields.trade.hint})</span>
        </label>
        <input
          id={`${id}-trade`}
          name="trade"
          type="text"
          defaultValue={state.values.trade}
          placeholder={form.fields.trade.placeholder}
          className={style}
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor={`${id}-message`}
          className="font-mono text-label text-ink-2 uppercase"
        >
          {form.fields.message.label}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          defaultValue={state.values.message}
          placeholder={form.fields.message.placeholder}
          className={`${style} resize-y`}
          {...champ("message")}
        />
        {state.errors.message ? (
          <p
            id={`${id}-message-err`}
            className="text-accent text-sm mt-2 font-medium"
          >
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {/* Piège à robots. Hors de l'écran plutôt qu'en `display: none` : certains
          automates ignorent les champs masqués, aucun n'ignore un champ placé
          hors cadre. `tabIndex={-1}` et `aria-hidden` le retirent du clavier et
          des lecteurs d'écran. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-${form.honeypot.name}`}>
          {form.honeypot.label}
        </label>
        <input
          id={`${id}-${form.honeypot.name}`}
          name={form.honeypot.name}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-paper border-accent hover:bg-ink hover:border-ink inline-flex items-center rounded-sm border px-6 py-3 text-base font-medium transition-colors duration-150 disabled:opacity-60"
        >
          {pending ? form.sending : form.submit}
        </button>

        <p
          ref={resultat}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="text-base text-ink-2"
        >
          {state.status === "success" ? form.success : null}
          {state.errors.form ?? null}
        </p>
      </div>

      <p className="font-mono text-label text-ink-2 mt-8 uppercase">
        {form.notice}
      </p>
    </form>
  );
}
