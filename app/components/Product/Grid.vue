<script setup lang="ts">
import type { Product } from "~/types";

defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="grid">
    <LazyProductThumbnail
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
