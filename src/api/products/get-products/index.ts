import type { Params, Response } from "./_types";

export async function getProducts(
  params?: Params,
): Promise<Response> {
  const { search, sortBy, order, limit, skip } = params || {};
  const searchParams = new URLSearchParams();
  console.log(params);
  if (search?.trim()) {
    searchParams.append("q", search);
  }

  if (sortBy && order) {
    searchParams.append("sortBy", sortBy);
    searchParams.append("order", order);
  }

  if (limit !== undefined) {
    searchParams.append("limit", limit.toString());
  }

  if (skip !== undefined) {
    searchParams.append("skip", skip.toString());
  }

  const basePath = search?.trim()
    ? "/api/products/search"
    : "/api/products";
  console.log(basePath)
  const url = `${basePath}?${searchParams.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки товаров");
  }

  return data;
}