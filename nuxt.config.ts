import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt", "@nuxt/fonts"],

  /**
   * Toutes les valeurs ci-dessous conservent les constantes qui étaient
   * codées en dur dans les sources ; elles sont désormais surchargeables par
   * variable d'environnement (NUXT_* / NUXT_PUBLIC_*) sans rebuild.
   */
  runtimeConfig: {
    // Serveur uniquement : consommé par server/utils/dummyjson.ts
    dummyJsonBaseUrl: "https://dummyjson.com",

    public: {
      // Exposé au navigateur : le store auth appelle l'API directement
      dummyJsonBaseUrl: "https://dummyjson.com",

      umami: {
        scriptUrl: "http://localhost:3000/script.js",
        websiteId: "f3276f17-e9d7-4235-93a2-6609febb6f24",
      },

      glitchtip: {
        dsn: "CHANGE_ME@localhost:8000/1",
        tracesSampleRate: 1,
      },
    },
  },
});
