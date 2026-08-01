<script setup lang="ts">
import { watch, watchEffect } from "vue";

const route = useRoute();

const { data: product, status, error } = await useProduct(route.params.id);

const quantity = ref(1);

const mainImage = ref<string | undefined>();

watchEffect(() => {
  if (product.value) {
    mainImage.value = product.value.thumbnail;
  }
});

onMounted(() => {
  setTimeout(() => {
    if (!product.value) {
      return;
    }

    window.umami?.track("view_product", {
      product_id: product.value.id,
      product_name: product.value.title,
      product_category: product.value.category,
      product_price: product.value.price,
    });
  }, 500);
});
</script>

<template>
  <div class="font-commissioner min-h-screen p-4 lg:flex lg:flex-col lg:p-16">
    <p v-if="status === 'pending'">Chargement...</p>
    <p v-else-if="error">Erreur : {{ error.message }}</p>

    <div v-else-if="product" class="lg:flex lg:flex-1 lg:flex-col">
      <h1
        class="mb-6 max-w-44 text-2xl font-semibold sm:max-w-none sm:text-3xl"
      >
        {{ product.title }}
      </h1>

      <div
        class="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20 lg:pt-12"
      >
        <div class="flex flex-col items-center lg:w-1/2">
          <img
            :src="mainImage"
            :alt="product.title"
            class="h-96 w-full object-contain"
          />

          <div class="mt-6 flex gap-3">
            <img
              v-if="product.images.length > 1"
              v-for="img in product.images"
              :key="img"
              :src="img"
              class="h-14 w-14 cursor-pointer rounded-md border object-cover transition hover:scale-105"
              @click="mainImage = img"
            />
          </div>
        </div>

        <div class="flex flex-col gap-6 lg:w-1/2">
          <div class="flex items-center gap-4">
            <h2 class="text-blue text-3xl font-semibold">
              {{ product.price }} €
            </h2>
            <span class="text-sm text-green-600">
              -{{ product.discountPercentage }}%
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>Marque : {{ product.brand }}</span>
            <span>Stock : {{ product.stock }}</span>
            <span>Note : {{ product.rating }} / 5</span>

            <NuxtLink :to="`/category/${product.category}`">
              <ProductCategory :category="product.category" />
            </NuxtLink>
          </div>

          <p class="text-sm leading-relaxed sm:text-base">
            {{ product.description }}
          </p>

          <div class="flex items-center gap-4 pt-4">
            <Incrementer
              :value="quantity"
              @update:value="(v) => (quantity = v)"
            />
            <AddToCart :product="product" :quantity="quantity" size="big" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
