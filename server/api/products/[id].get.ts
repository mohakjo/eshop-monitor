import type { Product } from "~~/app/types";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      status: 400,
      message: "Identifiant de produit manquant",
    });
  }

  return fetchFromDummyJson<Product>(
    event,
    `/products/${encodeURIComponent(id)}`,
  );
});
