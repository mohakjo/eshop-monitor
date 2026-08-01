<script setup lang="ts">
const { products, status, error } = useProducts();

const sortOrder = ref("default");

const sortedProducts = computed(() => {
  const list = [...products.value];

  if (sortOrder.value === "price-desc") {
    return list.sort((a, b) => b.price - a.price);
  }

  if (sortOrder.value === "price-asc") {
    return list.sort((a, b) => a.price - b.price);
  }

  return list;
});
</script>

<template>
  <div class="p-4 sm:p-16">
    <h1
      class="font-encodeSansCondensed blue-gradient mt-2 mb-8 min-h-24 bg-clip-text pt-1 text-4xl font-bold text-transparent sm:mt-4 sm:mb-16 sm:text-5xl"
    >
      Tous nos produits
    </h1>

    <div class="mb-4 flex justify-end">
      <select v-model="sortOrder" class="rounded border px-2 py-1 text-sm">
        <option value="default">Par défaut</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="price-asc">Prix croissant</option>
      </select>
    </div>

    <p
      v-if="status === 'pending'"
      class="font-commissioner py-4 text-base sm:text-lg"
    >
      Chargement...
    </p>

    <p v-else-if="error" class="font-commissioner py-4 text-base sm:text-lg">
      Erreur : {{ error.message }}
    </p>

    <div
      v-else
      class="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      <LazyProductThumbnail
        v-for="product in sortedProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>
  </div>
</template>
