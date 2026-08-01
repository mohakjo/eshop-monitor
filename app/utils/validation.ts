export type ValidationErrors = Record<string, string>;

export interface ValidationRule {
  /** Clé sous laquelle le message sera exposé au template. */
  field: string;
  valid: boolean;
  message: string;
}

export const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export function isFilled(value: string | undefined | null): boolean {
  return Boolean(value);
}

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/**
 * Évalue les règles et ne retient que la première en échec pour chaque champ,
 * afin qu'un champ vide affiche « requis » plutôt que « invalide ».
 */
export function collectErrors(rules: ValidationRule[]): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const { field, valid, message } of rules) {
    if (!valid && !(field in errors)) {
      errors[field] = message;
    }
  }

  return errors;
}
