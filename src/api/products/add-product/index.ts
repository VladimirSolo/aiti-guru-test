import type { Product } from "@/types";

export async function addProduct(product: Product) {
  const response = await fetch("/api/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Ошибка добавления продукта");
  }

  return data;
}