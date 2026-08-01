import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const { glitchtip } = useRuntimeConfig().public;

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: glitchtip.dsn,
    environment: glitchtip.environment,
    tracesSampleRate: glitchtip.tracesSampleRate,
    integrations: [Sentry.browserTracingIntegration()],
  });
});
