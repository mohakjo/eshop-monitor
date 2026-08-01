<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "nuxt/app";
import * as Sentry from "@sentry/vue";

const router = useRouter();
const form = ref({
  cardNumber: "",
  expiry: "",
  cvv: "",
});
const errors = ref<Record<string, string>>({});
function validate() {
  errors.value = {};
  if (!form.value.cardNumber)
    errors.value.cardNumber = "Le numéro de carte est requis";
  if (!form.value.expiry)
    errors.value.expiry = "La date d'expiration est requise";
  if (!form.value.cvv) errors.value.cvv = "Le CVV est requis";
  return Object.keys(errors.value).length === 0;
}

onMounted(() => {
  const transaction = Sentry.startInactiveSpan({
    name: "checkout-confirmation-load",
    op: "page.load",
  });

  setTimeout(() => {
    transaction.end();
  }, 0);
});

async function onSubmit() {
  if (!validate()) return;

  try {
    await new Promise<void>((resolve, reject) => {
      if (Math.random() < 0.33) {
        reject(
          new TypeError("Payment gateway timeout: charge_id is undefined"),
        );
      } else {
        resolve();
      }
    });

    router.push("/confirmation");
  } catch (error) {
    Sentry.captureException(error);
    errors.value.cardNumber = "Une erreur est survenue, veuillez réessayer.";
  }
}
</script>

<template>
  <section class="font-commissioner p-4 lg:p-16">
    <h1 class="mb-8 text-2xl font-bold">Paiement</h1>

    <form @submit.prevent="onSubmit" class="flex max-w-lg flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold">Carte de crédit</label>
        <input
          v-model="form.cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
        <span v-if="errors.cardNumber" class="text-xs text-red-500">{{
          errors.cardNumber
        }}</span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">Date d'expiration</label>
          <input
            v-model="form.expiry"
            type="text"
            placeholder="MM/AA"
            class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <span v-if="errors.expiry" class="text-xs text-red-500">{{
            errors.expiry
          }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm font-semibold">CVV</label>
          <input
            v-model="form.cvv"
            type="text"
            placeholder="123"
            class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          <span v-if="errors.cvv" class="text-xs text-red-500">{{
            errors.cvv
          }}</span>
        </div>
      </div>

      <button
        type="submit"
        class="blue-gradient mt-2 w-fit cursor-pointer rounded-full px-4 py-2 text-white"
      >
        Confirmer la commande
      </button>
    </form>
  </section>
</template>
