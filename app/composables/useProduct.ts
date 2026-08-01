import type { Product } from "~/types";

export function useProduct(id: string | string[] | undefined) {
  return useFetch<Product>(`/api/products/${id}`);
}
