import type { Response } from "./_types";

export async function getProducts(
  search?: string,
): Promise<Response> {
  const endpoint = search?.trim()
    ? `/api/products/search?q=${encodeURIComponent(search)}`
    : "/api/products";

  const response = await fetch(endpoint);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки товаров");
  }

  return data;
}