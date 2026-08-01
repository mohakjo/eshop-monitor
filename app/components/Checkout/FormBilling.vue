<script setup lang="ts">
const address = defineModel("address");
const phone = defineModel("phone");
</script>
<template>
  <div class="space-y-4">
    <h2 class="font-bold">Adresse de facturation</h2>
    <FormAddress v-model="address" />
    <div>
      <label for="phone">Numéro de téléphone</label>
      <input
        id="phone"
        type="tel"
        required
        v-model="phone"
        class="ml-2 rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
      />
    </div>
  </div>
</template>
