<script setup lang="ts">
import type { Address } from "~/types";

const address = defineModel<Address>({ required: true });
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-bold">Adresse de livraison</h2>

    <FormAddress v-model="address" />
  </div>
</template>
