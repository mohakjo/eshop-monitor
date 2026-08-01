import * as Sentry from "@sentry/vue";

/**
 * Mesure le temps de chargement d'une page clé et remonte la durée à GlitchTip.
 *
 * Le span démarre pendant le `setup()` du composant et se ferme après la
 * première frame effectivement peinte : `nextTick` garantit que le DOM est à
 * jour, `requestAnimationFrame` que le navigateur l'a rendu. Fermer le span
 * dans un `setTimeout(..., 0)` mesurerait une durée quasi nulle, sans rapport
 * avec le ressenti utilisateur.
 */
export function usePageLoadSpan(name: string) {
  if (!import.meta.client) return;

  const span = Sentry.startInactiveSpan({ name, op: "ui.load" });

  onMounted(() => {
    nextTick(() => {
      requestAnimationFrame(() => span.end());
    });
  });
}
