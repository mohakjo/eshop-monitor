import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: "CHANGE_ME@localhost:8000/1",
    tracesSampleRate: 1,
    integrations: [Sentry.browserTracingIntegration()],
  });
});
