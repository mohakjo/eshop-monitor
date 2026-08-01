<script setup lang="ts">
import type { Product } from "~/types";

const props = defineProps<{
  product: Product;
  size?: string;
  quantity?: number;
}>();

const cartStore = useCartStore();

const size = computed(() => {
  if (props.size === "big") {
    return "px-3";
  }
});

function addToCart() {
  cartStore.addToCart(props.product, props.quantity || 1);
}
</script>

<template>
  <button
    class="font-commissioner blue-gradient flex cursor-pointer items-center gap-2 rounded-full p-2 text-xs text-white active:scale-95"
    :class="size"
    @click="addToCart"
  >
    <IconShoppingBag class="size-4.5 sm:size-5 md:size-6" />
    <span v-if="props.size" class="text-base">Ajouter au panier</span>
  </button>
</template>
