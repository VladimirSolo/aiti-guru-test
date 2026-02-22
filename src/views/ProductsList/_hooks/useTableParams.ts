import type { Product } from '@/api/products/_types';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';
import type { SorterResult } from 'antd/es/table/interface';
import { useSearchParams } from 'react-router-dom';

export const useTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("field") ?? undefined;
  const order = searchParams.get("order") ?? undefined;
  const currentPage = Number(searchParams.get("currentPage") ?? CURRENT_PAGE);
  const pageSize = Number(searchParams.get("pageSize") ?? PAGE_SIZE);

  const sorter: SorterResult<Product> = {
    field: sortBy,
    order:
      order === "asc"
        ? "ascend"
        : order === "desc"
          ? "descend"
          : undefined,
  };

  const updateParams = (params: { field?: string; order?: string, currentPage?: number, pageSize?: number }) => {
    const newParams: Record<string, string> = {};

    if (params.field && params.order) {
      newParams.field = params.field;
      newParams.order = params.order;
    }

    if (params.currentPage !== undefined) {
      newParams.currentPage = params.currentPage.toString();
    }

    if (params.pageSize !== undefined) {
      newParams.pageSize = params.pageSize.toString();
    }

    setSearchParams(newParams);
  };

  return {
    sortBy,
    order: order as "asc" | "desc" | undefined,
    currentPage,
    pageSize,
    sorter,
    updateParams,
  };
}
