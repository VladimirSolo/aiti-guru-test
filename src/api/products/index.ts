import type { Params, Response } from "./_types";

export async function getProducts(
  params?: Params,
): Promise<Response> {
  const { search, sortBy, order } = params || {};
  const searchParams = new URLSearchParams();

  if (sortBy && order) {
    searchParams.append("sortBy", sortBy);
    searchParams.append("order", order);
  }

  const basePath = search?.trim()
    ? "/api/products/search"
    : "/api/products";

  const url = `${basePath}?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки товаров");
  }

  return data;
}