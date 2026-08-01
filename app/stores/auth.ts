import type { AuthUser } from "~/types";

export const useAuthStore = defineStore("auth", () => {
  const user = useCookie<AuthUser | null>("user", {
    default: () => null,
  });

  const isLoggedIn = computed(() => !!user.value);

  async function login(username: string, password: string) {
    const { dummyJsonBaseUrl } = useRuntimeConfig().public;

    user.value = await $fetch<AuthUser>(`${dummyJsonBaseUrl}/auth/login`, {
      method: "POST",
      body: { username, password },
    });
  }

  function logout() {
    user.value = null;
    navigateTo("/login");
  }

  return { user, isLoggedIn, login, logout };
});
