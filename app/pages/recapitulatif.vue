<script setup lang="ts">
const cart = useCartStore();
const router = useRouter();
const { trackCart } = useAnalytics();

const form = ref({
  name: "",
  firstname: "",
  email: "",
  phone: "",
  shippingAddress: { address: "", post_code: "", city: "" },
  billingAddress: { address: "", post_code: "", city: "" },
  sameAddress: true,
});

const errors = ref<Record<string, string>>({});

function validate() {
  errors.value = {};
  if (!form.value.name) errors.value.name = "Le nom est requis";
  if (!form.value.firstname) errors.value.firstname = "Le prénom est requis";
  if (!form.value.email) errors.value.email = "L'email est requis";
  else if (!/\S+@\S+\.\S+/.test(form.value.email))
    errors.value.email = "L'email est invalide";
  if (!form.value.shippingAddress.address)
    errors.value.address = "L'adresse est requise";
  if (!form.value.shippingAddress.post_code)
    errors.value.post_code = "Le code postal est requis";
  if (!form.value.shippingAddress.city)
    errors.value.city = "La ville est requise";
  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (validate()) {
    router.push("/paiement");
  }
}

onMounted(() => {
  trackCart(ANALYTICS_EVENTS.checkoutStart, cart.cart);
});
</script>

<template>
  <section class="font-commissioner p-4 lg:p-16">
    <h1 class="mb-8 text-2xl font-bold">Récapitulatif de commande</h1>

    <div class="mb-6 flex flex-wrap gap-4">
      <div
        v-for="item in cart.cart"
        :key="item.id"
        class="flex flex-col items-center gap-1"
      >
        <img
          :src="item.thumbnail"
          :alt="item.title"
          class="h-20 w-20 object-contain"
        />
        <p class="text-sm font-semibold">{{ item.title }}</p>
        <p class="text-xs text-gray-500">Quantité : {{ item.quantity }}</p>
        <p class="text-xs">{{ item.price }} €</p>
      </div>
    </div>

    <p class="mb-8 text-lg font-semibold">
      Total : {{ cart.totalCart.toFixed(2) }} €
    </p>

    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Adresse d'expédition</h2>

      <div class="grid grid-cols-2 gap-4">
        <BaseField
          v-model="form.name"
          label="Nom"
          variant="compact"
          :error="errors.name"
        />

        <BaseField
          v-model="form.firstname"
          label="Prénom"
          variant="compact"
          :error="errors.firstname"
        />
      </div>

      <BaseField
        v-model="form.email"
        label="Email"
        type="email"
        variant="compact"
        :error="errors.email"
      />

      <CheckoutFormShipping v-model="form.shippingAddress" />
      <span v-if="errors.address" class="text-xs text-red-500">{{
        errors.address
      }}</span>

      <div class="flex items-center gap-2">
        <input type="checkbox" id="same-address" v-model="form.sameAddress" />
        <label for="same-address">Identique à l'adresse d'expédition</label>
      </div>

      <CheckoutFormBilling
        v-if="!form.sameAddress"
        v-model:address="form.billingAddress"
        v-model:phone="form.phone"
      />

      <button
        type="submit"
        class="blue-gradient w-fit cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Continuer vers le paiement
      </button>
    </form>
  </section>
</template>
