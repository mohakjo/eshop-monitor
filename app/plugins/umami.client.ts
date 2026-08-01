export default defineNuxtPlugin(() => {
  const script = document.createElement("script");

  script.defer = true;
  script.src = "http://localhost:3000/script.js";
  script.setAttribute(
    "data-website-id",
    "f3276f17-e9d7-4235-93a2-6609febb6f24",
  );

  document.head.appendChild(script);
});
