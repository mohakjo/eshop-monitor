<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
})

const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(form.value.username, form.value.password)
    router.push('/profile')
  } catch (e) {
    error.value = 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="font-commissioner p-4 lg:p-16">
    <h1 class="mb-8 text-2xl font-bold">Connexion</h1>

    <form @submit.prevent="onSubmit" class="flex max-w-sm flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold">Nom d'utilisateur</label>
        <input
          v-model="form.username"
          type="text"
          class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-semibold">Mot de passe</label>
        <input
          v-model="form.password"
          type="password"
          class="rounded border px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <span v-if="error" class="text-xs text-red-500">{{ error }}</span>

      <button
        type="submit"
        :disabled="loading"
        class="blue-gradient w-fit cursor-pointer rounded-full px-4 py-2 !text-white"
      >
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
  </section>
</template>