export type Product = {
  id: number;
  title: string;
  brand: string;
  sku?: string;
  rating: number;
  price: number;
  category?: string;
}

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
};