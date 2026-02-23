import React, { useState } from "react";
import { Avatar, Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { EllipsisOutlined, UserOutlined } from "@ant-design/icons";
import css from "./index.module.scss";
import Column from "antd/es/table/Column";
import { getProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { removeExtraSpaces } from "@/utils/removeExtraSpaces";

import type { Product } from "@/types";
import { useTableParams } from "../../_hooks/useTableParams";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

type Props = {
  search: string;
};

export const ProductsTable = ({ search }: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const debouncedSearch = useDebounce(removeExtraSpaces(search));
  const { sortBy, order, sorter, currentPage, pageSize, updateParams } =
    useTableParams();

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      debouncedSearch,
      sorter?.field,
      sorter.order,
      currentPage,
      pageSize,
    ],
    queryFn: () =>
      getProducts({
        search: debouncedSearch,
        sortBy,
        order,
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
      }),
  });

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <Table<Product>
      scroll={{ y: "calc(100vh - 400px)" }}
      rowSelection={rowSelection}
      dataSource={data?.products ?? []}
      loading={isLoading}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize,
        total: data?.total,
        showSizeChanger: true,
      }}
      onChange={(pagination, _, sorterArg) => {
        const single = Array.isArray(sorterArg) ? sorterArg[0] : sorterArg;

        updateParams({
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          field: single?.field as string | undefined,
          order:
            single?.order === "ascend"
              ? "asc"
              : single?.order === "descend"
                ? "desc"
                : undefined,
        });
      }}
    >
      <Column<Product>
        key="title"
        ellipsis
        render={(_: unknown, row) => (
          <Flex align="center" gap={12}>
            <Avatar shape="square" size={48} icon={<UserOutlined />} />
            <Flex vertical align="start">
              <span>{row.title}</span>
              <span>{row.category}</span>
            </Flex>
          </Flex>
        )}
        title="Наименование"
        width={300}
      />
      <Column<Product>
        key="brand"
        ellipsis
        render={(_: unknown, row) => <span>{row.brand}</span>}
        title="Вендор"
      />
      <Column<Product>
        key="sku"
        ellipsis
        render={(_: unknown, row) => <span>{row.sku}</span>}
        title="Артикул"
      />
      <Column<Product>
        key="rating"
        ellipsis
        dataIndex="rating"
        sorter
        sortOrder={sorter.field === "rating" ? sorter.order : undefined}
        render={(_: unknown, row) => (
          <>
            {row.rating && (
              <>
                <Typography.Text
                  type={row?.rating && row.rating < 3 ? "danger" : undefined}
                >
                  {row.rating}
                </Typography.Text>
                <span>/5</span>
              </>
            )}
          </>
        )}
        title="Оценка"
      />
      <Column<Product>
        dataIndex="price"
        key="price"
        ellipsis
        sorter
        sortOrder={sorter.field === "price" ? sorter.order : undefined}
        render={(_: unknown, row) => <span>{row.price} ₽</span>}
        title="Цена, ₽"
      />
      <Column<Product>
        key="add"
        ellipsis
        render={() => <button className={css.addBtn}>+</button>}
        width={100}
      />
      <Column<Product>
        key="info"
        ellipsis
        render={() => (
          <Button className={css.infoBtn} icon={<EllipsisOutlined />} />
        )}
        width={100}
      />
    </Table>
  );
};
