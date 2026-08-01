export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  return await $fetch(`https://dummyjson.com/products/${params.id}`);
});
