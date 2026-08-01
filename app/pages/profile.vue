<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const auth = useAuthStore()

const form = ref({
  name: auth.user?.firstName ?? '',
  firstname: auth.user?.lastName ?? '',
  email: auth.user?.email ?? '',
  phone: '',
  shippingAddress: { address: '', post_code: '', city: '' },
  billingAddress: { address: '', post_code: '', city: '' },
  sameAddress: true,
})
</script>

<template>
  <div class="flex flex-col gap-6 p-4 lg:p-16 font-commissioner">
    <h1 class="text-2xl font-bold">{{ auth.user?.firstName }} {{ auth.user?.lastName }}</h1>
    <h2 class="text-xl font-semibold">Adresse d'expédition</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <label>Nom</label>
        <input v-model="form.name" type="text" class="rounded border px-2 py-1" />
      </div>
      <div class="flex flex-col gap-1">
        <label>Prénom</label>
        <input v-model="form.firstname" type="text" class="rounded border px-2 py-1" />
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <label>Email</label>
      <input v-model="form.email" type="email" class="rounded border px-2 py-1" />
    </div>
    <CheckoutFormShipping v-model="form.shippingAddress" />
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
      class="blue-gradient w-fit cursor-pointer rounded-full px-4 py-2 !text-white"
      @click="auth.logout()"
    >
      Se déconnecter
    </button>
  </div>
</template>

<style></style>