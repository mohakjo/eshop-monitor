import type { ValidationErrors, ValidationRule } from "~/utils/validation";

/**
 * Petit moteur de validation partagé par les formulaires du tunnel de commande.
 *
 * `rules` est un getter : il est réévalué à chaque appel de `validate()` pour
 * lire l'état courant du formulaire.
 */
export function useFormValidation(rules: () => ValidationRule[]) {
  const errors = ref<ValidationErrors>({});

  function validate() {
    errors.value = collectErrors(rules());

    return Object.keys(errors.value).length === 0;
  }

  return { errors, validate };
}
