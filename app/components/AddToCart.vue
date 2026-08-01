<script setup lang="ts">
import type { Product } from "~/types/Product";
import { useCartStore } from "~/stores/cart";

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-4.5 sm:size-5 md:size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
    <span v-if="props.size" class="text-base">Ajouter au panier</span>
  </button>
</template>
