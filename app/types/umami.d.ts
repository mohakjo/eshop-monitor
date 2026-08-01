/**
 * Le script Umami est injecté à l'exécution par app/plugins/umami.client.ts :
 * il n'expose aucun typage, on décrit donc ici la seule API que l'on consomme.
 */
export type UmamiEventData = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: UmamiEventData) => void;
    };
  }
}
