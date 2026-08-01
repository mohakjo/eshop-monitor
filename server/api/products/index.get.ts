import type { ProductApiResponse } from "~~/app/types";

export default defineEventHandler((event) =>
  fetchFromDummyJson<ProductApiResponse>(event, "/products"),
);
