<script setup lang="ts">
import type { Product } from "../../types/Product";

const product = defineProps<Product>();
</script>

<template>
  <figure
    class="font-commissioner bg-card-bg flex h-full w-full flex-col rounded-4xl p-4 shadow-lg transition hover:-translate-y-1"
  >
    <div class="mb-2 flex items-center justify-between">
      <NuxtLink :to="`/category/${product.category}`">
        <ProductCategory :category="product.category" class="cursor-pointer" />
      </NuxtLink>

      <span class="text-sm font-semibold md:text-base">
        {{ product.price }}€
      </span>
    </div>

    <NuxtLink
      :to="`/product/${product.id}`"
      class="flex h-40 items-center justify-center sm:h-48 md:h-56"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="max-h-full max-w-full object-contain"
      />
    </NuxtLink>

    <figcaption class="mt-auto flex items-center justify-between gap-3">
      <NuxtLink :to="`/product/${product.id}`" class="min-w-0 flex-1">
        <span class="block truncate text-sm md:text-base">
          {{ product.title }}
        </span>
      </NuxtLink>

      <div class="shrink-0">
        <AddToCart :product="product" />
      </div>
    </figcaption>
  </figure>
</template>

<style></style>
