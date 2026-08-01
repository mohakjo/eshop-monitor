<script setup lang="ts">
const show = ref(false);
const router = useRouter();

const closeMenuOnNavigation = router.afterEach(() => {
  show.value = false;
});

const { products } = useProducts();

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
  <IconMenu
    v-if="!show"
    class="absolute top-5 right-5 block size-10 cursor-pointer lg:hidden"
    @click="toggle"
  />

  <IconClose
    v-else
    class="absolute top-5 right-5 block size-10 cursor-pointer lg:hidden"
    @click="toggle"
  />

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
          <IconSettings class="size-6 active:scale-95" />
        </NuxtLink>
      </li>

      <li class="cursor-pointer">
        <IconLogout class="size-6 active:scale-95" />
      </li>
    </ul>
  </nav>
</template>
