/**
 * Liste dédoublonnée des catégories présentes dans le catalogue.
 *
 * S'appuie sur useProducts : la requête `/api/products` est partagée avec les
 * pages qui affichent les produits, aucun appel réseau supplémentaire n'est
 * déclenché.
 */
export function useCategories() {
  const { products, status, error } = useProducts();

  const categories = computed(() => [
    ...new Set(products.value.map((product) => product.category)),
  ]);

  return { categories, status, error };
}
