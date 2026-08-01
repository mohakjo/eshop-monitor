import type { Product } from "./product";

/** Un produit du catalogue augmenté de la quantité choisie par l'utilisateur. */
export interface CartItem extends Product {
  quantity: number;
}
