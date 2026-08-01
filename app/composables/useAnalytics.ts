import type { CartItem, Product, UmamiEventData } from "~/types";

/** Noms des événements personnalisés remontés dans le dashboard Umami. */
export const ANALYTICS_EVENTS = {
  viewProduct: "view_product",
  addToCart: "add_to_cart",
  checkoutStart: "checkout_start",
  checkoutSuccess: "checkout_success",
} as const;

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Façade au-dessus du script Umami.
 *
 * Le script n'est injecté que côté navigateur : chaque appel est donc protégé
 * par `import.meta.client` et par l'optional chaining sur `window.umami`, qui
 * reste absent tant que le script n'a pas fini de charger.
 */
export function useAnalytics() {
  function track(event: AnalyticsEvent, data?: UmamiEventData) {
    if (!import.meta.client) return;

    window.umami?.track(event, data);
  }

  /** Payload commun aux événements liés à un produit. */
  function trackProduct(
    event:
      | typeof ANALYTICS_EVENTS.viewProduct
      | typeof ANALYTICS_EVENTS.addToCart,
    product: Product,
  ) {
    track(event, {
      product_id: product.id,
      product_name: product.title,
      product_category: product.category,
      product_price: product.price,
    });
  }

  /** Payload commun aux étapes du tunnel de commande. */
  function trackCart(
    event:
      | typeof ANALYTICS_EVENTS.checkoutStart
      | typeof ANALYTICS_EVENTS.checkoutSuccess,
    items: CartItem[],
  ) {
    track(event, {
      cart_total: items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      cart_items_count: items.length,
      cart_quantity: items.reduce((total, item) => total + item.quantity, 0),
    });
  }

  return { track, trackProduct, trackCart };
}
