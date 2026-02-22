import type { Product } from '@/api/products/_types';
import type { SorterResult } from 'antd/es/table/interface';
import { useSearchParams } from 'react-router-dom';

export const useSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("field") ?? undefined;
  const order = searchParams.get("order") ?? undefined;

  const sorter: SorterResult<Product> = {
    field: sortBy,
    order:
      order === "asc"
        ? "ascend"
        : order === "desc"
          ? "descend"
          : undefined,
  };

  const updateParams = (params: { field?: string; order?: string }) => {
    const newParams: Record<string, string> = {};

    if (params.field && params.order) {
      newParams.field = params.field;
      newParams.order = params.order;
    }

    setSearchParams(newParams);
  };

  return {
    sortBy,
    order: order as "asc" | "desc" | undefined,
    sorter,
    updateParams,
  };
}
