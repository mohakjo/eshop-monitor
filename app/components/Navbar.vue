<script setup lang="ts">
import IconClose from "~/components/Icon/Close.vue";
import IconMenu from "~/components/Icon/Menu.vue";

const router = useRouter();
const { categories } = useCategories();

const isOpen = ref(false);

/** Le menu mobile se referme dès qu'une navigation aboutit. */
const stopClosingOnNavigation = router.afterEach(() => {
  isOpen.value = false;
});

onBeforeUnmount(stopClosingOnNavigation);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <component
    :is="isOpen ? IconClose : IconMenu"
    class="absolute top-5 right-5 block size-10 cursor-pointer lg:hidden"
    :aria-label="isOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
    :aria-expanded="isOpen"
    @click="toggle"
  />

  <nav
    class="bg-gray border-r-blue fixed top-0 left-0 z-50 flex h-dvh w-56 flex-col items-center gap-8 border-r-4 px-6 py-12 text-white transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
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
