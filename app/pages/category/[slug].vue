<script setup lang="ts">
const route = useRoute();

const slug = computed(() => decodeURIComponent(route.params.slug as string));

const { products } = useProducts();

const productsInCategory = computed(() =>
  products.value.filter((product) => product.category === slug.value),
);

const { sortOrder, sortedProducts } = useProductSort(productsInCategory);
</script>

<template>
  <section class="p-6">
    <h1 class="mb-6 text-2xl font-bold capitalize">{{ slug }}</h1>

    <ProductSortSelect v-model="sortOrder" />

    <div
      v-if="sortedProducts.length"
      class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <LazyProductThumbnail
        v-for="product in sortedProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>

    <p v-else class="text-gray-500">Aucun produit dans cette catégorie.</p>
  </section>
</template>
