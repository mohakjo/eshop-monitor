export default defineNuxtPlugin(() => {
  const { umami } = useRuntimeConfig().public;

  const script = document.createElement("script");

  script.defer = true;
  script.src = umami.scriptUrl;
  script.setAttribute("data-website-id", umami.websiteId);

  document.head.appendChild(script);
});
