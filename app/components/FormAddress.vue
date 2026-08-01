<script setup>
const address = defineModel();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="address" class="text-sm font-semibold">Adresse</label>
      <input
        id="address"
        type="text"
        required
        v-model="address.address"
        class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label for="post_code" class="text-sm font-semibold">Code Postal</label>
        <input
          id="post_code"
          type="text"
          required
          v-model="address.post_code"
          class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="city" class="text-sm font-semibold">Ville</label>
        <input
          id="city"
          type="text"
          required
          v-model="address.city"
          class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>
    </div>
  </div>
</template>
