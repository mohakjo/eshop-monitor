import type { ProductApiResponse } from "~/types/Product";

export function useProducts() {
  const { data, status, error } = useFetch<ProductApiResponse>("/api/products");

  const products = computed(() => data.value?.products ?? []);

  return { products, status, error };
}
