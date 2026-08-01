<script setup lang="ts">
const { products, status, error } = useProducts();
const { sortOrder, sortedProducts } = useProductSort(products);
</script>

<template>
  <div class="p-4 sm:p-16">
    <h1
      class="font-encodeSansCondensed blue-gradient mt-2 mb-8 min-h-24 bg-clip-text pt-1 text-4xl font-bold text-transparent sm:mt-4 sm:mb-16 sm:text-5xl"
    >
      Tous nos produits
    </h1>

    <ProductSortSelect v-model="sortOrder" />

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
