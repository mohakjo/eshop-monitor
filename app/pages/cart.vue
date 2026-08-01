<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
const cartStore = useCartStore();
const router = useRouter();
const isMounted = ref(false);

definePageMeta({
  middleware: ["cart"],
});

onMounted(() => {
  isMounted.value = true;
});
</script>
<template>
  <section v-if="isMounted" class="font-commissioner p-4 lg:p-16">
    <h1 class="mb-8 text-2xl font-bold">Panier</h1>
    <div class="flex flex-col gap-6">
      <button
        class="blue-gradient ml-auto w-fit cursor-pointer rounded-full px-2 py-1 text-xs text-white"
        @click="cartStore.clearCart()"
      >
        Vider le panier
      </button>
      <div
        v-for="item in cartStore.cart"
        :key="item.id"
        class="grid grid-cols-[80px_1fr_auto_auto_auto] items-center gap-2 pb-4"
      >
        <NuxtLink :to="`/product/${item.id}`">
          <img
            :src="item.thumbnail"
            :alt="item.title"
            class="h-20 w-20 object-contain"
          />
        </NuxtLink>
        <div>
          <NuxtLink :to="`/product/${item.id}`">
            <h2 class="text-sm font-semibold md:text-base">
              {{ item.title }}
            </h2>
          </NuxtLink>
          <p class="text-xs text-gray-500 md:text-sm">{{ item.price }} €</p>
        </div>
        <div class="flex items-center gap-2">
          <Incrementer
            :value="item.quantity"
            @update:value="
              (newValue) => cartStore.changeQuantity(item, newValue)
            "
          />
        </div>
        <p class="w-20 text-right font-semibold">
          {{ (item.price * item.quantity).toFixed(2) }} €
        </p>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-blue size-6 rotate-45 cursor-pointer"
            @click="cartStore.removeFromCart(item)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div class="mt-6 flex flex-col items-end gap-4">
        <p class="text-lg font-semibold">
          Total : {{ cartStore.totalCart.toFixed(2) }} €
        </p>
        <button
          class="blue-gradient cursor-pointer rounded-full px-4 py-2 text-white"
          @click="router.push('/recapitulatif')"
        >
          Commander
        </button>
      </div>
    </div>
  </section>
</template>
<style></style>
