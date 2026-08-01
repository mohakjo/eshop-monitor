<script setup lang="ts">
import * as Sentry from "@sentry/vue";

const router = useRouter();
const form = ref({
  cardNumber: "",
  expiry: "",
  cvv: "",
});
const { errors, validate } = useFormValidation(() => {
  const { cardNumber, expiry, cvv } = form.value;

  return [
    {
      field: "cardNumber",
      valid: isFilled(cardNumber),
      message: "Le numéro de carte est requis",
    },
    {
      field: "expiry",
      valid: isFilled(expiry),
      message: "La date d'expiration est requise",
    },
    { field: "cvv", valid: isFilled(cvv), message: "Le CVV est requis" },
  ];
});

usePageLoadSpan("checkout-payment-load");

/** Panne simulée du prestataire de paiement, une tentative sur trois. */
const PAYMENT_FAILURE_RATE = 0.33;

async function chargeCard() {
  if (Math.random() < PAYMENT_FAILURE_RATE) {
    throw new TypeError("Payment gateway timeout: charge_id is undefined");
  }
}

async function onSubmit() {
  if (!validate()) return;

  try {
    await chargeCard();

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
