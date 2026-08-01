import type { Product } from "~/types/Product";

export function useProduct(id: string | string[] | undefined) {
  return useFetch<Product>(`/api/products/${id}`);
}
