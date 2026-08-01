import type { MaybeRefOrGetter } from "vue";
import type { Product } from "~/types";

export const PRODUCT_SORT_OPTIONS = [
  { value: "default", label: "Par défaut" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "price-asc", label: "Prix croissant" },
] as const;

export type ProductSortOrder = (typeof PRODUCT_SORT_OPTIONS)[number]["value"];

type Comparator = (a: Product, b: Product) => number;

const COMPARATORS: Partial<Record<ProductSortOrder, Comparator>> = {
  "price-desc": (a, b) => b.price - a.price,
  "price-asc": (a, b) => a.price - b.price,
};

/**
 * Tri d'une liste de produits piloté par un `select`.
 *
 * La source peut être une ref, un getter ou un tableau : le tri est recalculé
 * automatiquement quand elle change, sans jamais muter le tableau d'origine.
 */
export function useProductSort(products: MaybeRefOrGetter<Product[]>) {
  const sortOrder = ref<ProductSortOrder>("default");

  const sortedProducts = computed(() => {
    const list = toValue(products);
    const compare = COMPARATORS[sortOrder.value];

    return compare ? [...list].sort(compare) : list;
  });

  return { sortOrder, sortedProducts };
}
