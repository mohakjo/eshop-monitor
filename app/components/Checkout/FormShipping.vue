<script setup lang="ts">
const model = defineModel();
</script>
<template>
  <div class="space-y-4">
    <h2 class="font-bold">Adresse de livraison</h2>
    <FormAddress v-model="model" />
  </div>
</template>
