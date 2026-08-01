<script setup lang="ts">
/** Nombre de produits mis en avant sur la page d'accueil. */
const HIGHLIGHTED_PRODUCTS_COUNT = 8;

const { products } = useProducts();
</script>

<template>
  <div class="p-4 sm:p-16">
    <h1
      class="font-encodeSansCondensed blue-gradient mt-2 mb-8 min-h-24 bg-clip-text pt-1 text-4xl font-bold text-transparent sm:mt-4 sm:mb-16 sm:text-5xl"
    >
      Tout.
      <span class="block sm:inline"> Simplement. </span>
    </h1>

    <div class="flex items-center justify-between">
      <h2 class="font-commissioner text-xl font-semibold sm:text-2xl">
        Ça pourrait vous plaire...
      </h2>

      <NuxtLink to="/products" class="text-gray text-sm underline sm:text-lg">
        Voir tout
      </NuxtLink>
    </div>

    <ProductGrid
      :products="products.slice(0, HIGHLIGHTED_PRODUCTS_COUNT)"
      class="grid-cols-2 gap-4 py-4 lg:gap-6 lg:py-8 xl:grid-cols-4"
    />
  </div>
</template>
