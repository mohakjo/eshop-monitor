export default defineNuxtRouteMiddleware(() => {
  const cartStore = useCartStore();

  if (cartStore.cart.length === 0) {
    return navigateTo("/");
  }
});
