/**
 * État du formulaire, tenu à l'écart de l'action.
 *
 * ⚠️ Un module marqué `"use server"` ne peut exporter que des fonctions
 * asynchrones. Y déclarer cette constante la faisait sortir `undefined` chez
 * le client, et `useActionState` démarrait sur un état vide : la compilation
 * échouait au prérendu sur `state.values.name`. Les types, eux, sont effacés
 * et peuvent rester n'importe où — c'est la valeur qui doit vivre ici.
 */

export type FormState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<"name" | "email" | "message" | "form", string>>;
  /** Renvoyé au client pour ne pas vider les champs après une erreur. */
  values: { name: string; email: string; trade: string; message: string };
};

export const INITIAL: FormState = {
  status: "idle",
  errors: {},
  values: { name: "", email: "", trade: "", message: "" },
};
