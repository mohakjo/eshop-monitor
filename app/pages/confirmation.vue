<script setup lang="ts">
const cart = useCartStore();
onMounted(() => {
  window.umami?.track("checkout_success", {
    cart_total: cart.totalCart,
    cart_items_count: cart.cart.length,
    cart_quantity: cart.cart.reduce((total, item) => total + item.quantity, 0),
  });

  cart.cart.length = 0;
});
</script>

<template>
  <section class="font-commissioner p-4 lg:p-16">
    <h1 class="mb-4 text-2xl font-bold">Merci pour votre commande !</h1>
    <p class="mb-4 text-gray-600">
      Un mail récapitulatif vous a été envoyé à votre adresse email.
    </p>
    <NuxtLink
      to="/"
      class="blue-gradient mx-auto block w-fit cursor-pointer rounded-full px-4 py-2 text-white"
    >
      Retourner à l'accueil
    </NuxtLink>
  </section>
</template>
