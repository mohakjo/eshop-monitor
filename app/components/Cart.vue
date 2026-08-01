<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
</script>

<template>
  <NuxtLink to="/cart">
    <div
      class="gray-gradient absolute top-4 right-20 h-fit w-fit rounded-full p-2 lg:top-4 lg:right-6 lg:p-3"
    >
      <svg
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="size-7 lg:size-10"
      >
        <path
          d="M3.35843 36.88C1.0762 27.728 -0.0649207 23.1547 2.33169 20.0773C4.7283 17 9.43375 17 18.842 17H31.1575C40.5684 17 45.2712 17 47.6678 20.0773C50.0644 23.1547 48.9233 27.7307 46.6411 36.88C45.1888 42.7013 44.4652 45.6107 42.3 47.3067C40.1349 49 37.1424 49 31.1575 49H18.842C12.8571 49 9.86466 49 7.69946 47.3067C5.53427 45.6107 4.8081 42.7013 3.35843 36.88Z"
          stroke="#F4F4F4"
          stroke-width="2"
        />
        <path
          d="M44.9497 18.3333L43.0612 11.3867C42.3323 8.70667 41.9679 7.368 41.2205 6.35733C40.4752 5.35324 39.4631 4.57974 38.2999 4.12533C37.1295 3.66667 35.7463 3.66667 32.98 3.66667M5.05054 18.3333L6.9391 11.3867C7.66792 8.70667 8.03234 7.368 8.77978 6.35733C9.52504 5.35324 10.5372 4.57974 11.7004 4.12533C12.8708 3.66667 14.254 3.66667 17.0203 3.66667"
          stroke="#F4F4F4"
          stroke-width="2"
        />
        <path
          d="M17.02 3.66667C17.02 2.95942 17.3003 2.28115 17.7991 1.78105C18.2979 1.28095 18.9745 1 19.68 1H30.3198C31.0252 1 31.7018 1.28095 32.2006 1.78105C32.6995 2.28115 32.9797 2.95942 32.9797 3.66667C32.9797 4.37391 32.6995 5.05219 32.2006 5.55228C31.7018 6.05238 31.0252 6.33333 30.3198 6.33333H19.68C18.9745 6.33333 18.2979 6.05238 17.7991 5.55228C17.3003 5.05219 17.02 4.37391 17.02 3.66667Z"
          stroke="#F4F4F4"
          stroke-width="2"
        />
      </svg>
      <span
        v-if="cartStore.totalItems"
        class="blue-gradient absolute -bottom-2 -left-2 flex size-5 items-center justify-center rounded-full p-3 text-xs font-semibold text-white lg:-bottom-1 lg:-left-1 lg:text-base"
      >
        {{ cartStore.totalItems }}
      </span>
    </div>
  </NuxtLink>
</template>
