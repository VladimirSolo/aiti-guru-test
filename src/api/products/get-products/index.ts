import type { Params, Response } from "./_types";
import { buildUrl } from "./_utils";

export async function getProducts(params?: Params): Promise<Response> {
  const { search, sortBy, order, limit, skip } = params || {};

  const basePath = search?.trim() ? "/api/products/search" : "/api/products";

  const url = buildUrl(basePath, {
    q: search?.trim(),
    sortBy: sortBy && order ? sortBy : undefined,
    order: sortBy && order ? order : undefined,
    limit,
    skip,
  });

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки товаров");
  }

  return data;
}