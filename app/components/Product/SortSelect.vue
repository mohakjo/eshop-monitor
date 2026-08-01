<script setup lang="ts">
import {
  PRODUCT_SORT_OPTIONS,
  type ProductSortOrder,
} from "~/composables/useProductSort";

const sortOrder = defineModel<ProductSortOrder>({ required: true });
</script>

<template>
  <div class="mb-4 flex justify-end">
    <select v-model="sortOrder" class="rounded border px-2 py-1 text-sm">
      <option
        v-for="option in PRODUCT_SORT_OPTIONS"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
