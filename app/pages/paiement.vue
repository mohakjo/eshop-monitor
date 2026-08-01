<script setup lang="ts">
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
      <BaseField
        v-model="form.cardNumber"
        label="Carte de crédit"
        placeholder="1234 5678 9012 3456"
        :error="errors.cardNumber"
      />

      <div class="grid grid-cols-2 gap-4">
        <BaseField
          v-model="form.expiry"
          label="Date d'expiration"
          placeholder="MM/AA"
          :error="errors.expiry"
        />

        <BaseField
          v-model="form.cvv"
          label="CVV"
          placeholder="123"
          :error="errors.cvv"
        />
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
