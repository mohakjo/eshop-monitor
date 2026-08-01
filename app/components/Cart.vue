<script setup lang="ts">
const cartStore = useCartStore();
</script>

<template>
  <NuxtLink to="/cart">
    <div
      class="gray-gradient absolute top-4 right-20 h-fit w-fit rounded-full p-2 lg:top-4 lg:right-6 lg:p-3"
    >
      <IconBag class="size-7 lg:size-10" />

      <span
        v-if="cartStore.totalItems"
        class="blue-gradient absolute -bottom-2 -left-2 flex size-5 items-center justify-center rounded-full p-3 text-xs font-semibold text-white lg:-bottom-1 lg:-left-1 lg:text-base"
      >
        {{ cartStore.totalItems }}
      </span>
    </div>
  </NuxtLink>
</template>
