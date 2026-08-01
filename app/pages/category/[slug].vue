<script setup lang="ts">
const route = useRoute();

const slug = computed(() => decodeURIComponent(route.params.slug as string));

const { products } = useProducts();

const sortOrder = ref("default");

const filteredProducts = computed(() => {
  const list = products.value.filter((p) => p.category === slug.value);

  if (sortOrder.value === "price-desc") {
    return [...list].sort((a, b) => b.price - a.price);
  }

  if (sortOrder.value === "price-asc") {
    return [...list].sort((a, b) => a.price - b.price);
  }

  return list;
});
</script>

<template>
  <section class="p-6">
    <h1 class="mb-6 text-2xl font-bold capitalize">{{ slug }}</h1>

    <div class="mb-4 flex justify-end">
      <select v-model="sortOrder" class="rounded border px-2 py-1 text-sm">
        <option value="default">Par défaut</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="price-asc">Prix croissant</option>
      </select>
    </div>

    <div
      v-if="filteredProducts.length"
      class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <LazyProductThumbnail
        v-for="product in filteredProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>

    <p v-else class="text-gray-500">Aucun produit dans cette catégorie.</p>
  </section>
</template>
