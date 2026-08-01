import type { H3Event } from "h3";

/**
 * Point d'entrée unique vers l'API DummyJSON côté serveur.
 *
 * L'URL de base provient du runtimeConfig, ce qui évite de répéter le domaine
 * dans chaque handler et permet de la pointer vers un mock en développement.
 */
export function fetchFromDummyJson<T>(
  event: H3Event,
  path: string,
): Promise<T> {
  const { dummyJsonBaseUrl } = useRuntimeConfig(event);

  return $fetch<T>(`${dummyJsonBaseUrl}${path}`);
}
