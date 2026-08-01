<script setup lang="ts">
import type { ProductApiResponse } from "~/types/Product";
import { ref, computed } from "vue";

const show = ref(false);
const router = useRouter();

const closeMenuOnNavigation = router.afterEach(() => {
  show.value = false;
});

const { products, status, error } = useProducts();

const categories = computed(() => {
  return [...new Set(products.value?.map((p) => p.category) || [])];
});

function toggle() {
  show.value = !show.value;
}

onBeforeUnmount(() => {
  closeMenuOnNavigation();
});
</script>

<template>
  <svg
    v-if="!show"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="absolute top-5 right-5 block size-10 cursor-pointer lg:hidden"
    @click="toggle"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>

  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="absolute top-5 right-5 block size-10 cursor-pointer lg:hidden"
    @click="toggle"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>

  <nav
    class="bg-gray border-r-blue fixed top-0 left-0 z-50 flex h-dvh w-56 flex-col items-center gap-8 border-r-4 px-6 py-12 text-white transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="show ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <NuxtLink to="/" class="w-full cursor-pointer">
      <figure class="font-ultra flex flex-col items-center gap-3 text-xl">
        <img src="/Logo.svg" alt="Cart icon" class="w-fit" />
        <h1><span class="text-blue">Foo</span>Commerce</h1>
      </figure>
    </NuxtLink>

    <div class="font-commissioner flex w-full flex-col gap-4">
      <h3 class="text-2xl font-bold">Catégories</h3>
      <ul class="flex flex-col gap-2 text-lg">
        <li
          v-for="category in categories"
          :key="category"
          class="w-fit cursor-pointer"
        >
          <NuxtLink :to="`/category/${category}`" class="capitalize">
            {{ category }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <ul class="flex w-full flex-1 items-end justify-between">
      <li>
        <NuxtLink to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6 active:scale-95"
          >
            <path
              fill-rule="evenodd"
              d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </NuxtLink>
      </li>

      <li class="cursor-pointer">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="size-6 active:scale-95"
        >
          <path
            d="M3.55556 32C2.57778 32 1.74104 31.6521 1.04533 30.9564C0.34963 30.2607 0.00118519 29.4234 0 28.4444V3.55556C0 2.57778 0.348445 1.74104 1.04533 1.04533C1.74222 0.34963 2.57896 0.00118519 3.55556 0H16V3.55556H3.55556V28.4444H16V32H3.55556ZM23.1111 24.8889L20.6667 22.3111L25.2 17.7778H10.6667V14.2222H25.2L20.6667 9.68889L23.1111 7.11111L32 16L23.1111 24.8889Z"
            fill="#F4F4F4"
          />
        </svg>
      </li>
    </ul>
  </nav>
</template>
