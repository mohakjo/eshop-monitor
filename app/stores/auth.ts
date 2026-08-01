interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<AuthUser | null>('user', {
    default: () => null,
  })

  const isLoggedIn = computed(() => !!user.value)

  async function login(username: string, password: string) {
    const data = await $fetch<AuthUser>('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: { username, password },
    })
    user.value = data
  }

  function logout() {
    user.value = null
    navigateTo('/login')
  }

  return { user, isLoggedIn, login, logout }
})