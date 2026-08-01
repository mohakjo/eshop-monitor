<script setup lang="ts">
import type { Address } from "~/types";

const address = defineModel<Address>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseField
      id="address"
      v-model="address.address"
      label="Adresse"
      required
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseField
        id="post_code"
        v-model="address.post_code"
        label="Code Postal"
        required
      />

      <BaseField id="city" v-model="address.city" label="Ville" required />
    </div>
  </div>
</template>
