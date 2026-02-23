import type { Product } from "@/types";

export type Response = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Params = {
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  limit?: number;
  skip?: number;
};