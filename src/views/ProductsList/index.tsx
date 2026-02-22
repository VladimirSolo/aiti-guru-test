import React, { useState } from "react";
import { Avatar, Button, Flex, Input, Table, Typography } from "antd";
import type { TableProps } from "antd";
import {
  EllipsisOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RefreshIcon from "@/assets/ArrowsClockwise.svg?react";
import css from "./index.module.scss";
import Column from "antd/es/table/Column";
import { getProducts } from "@/api";
import type { Product } from "@/api/products/_types";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { removeExtraSpaces } from "@/utils/removeExtraSpaces";
import { useSortParams } from "./_hooks/useSortParams";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export const ProductsList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(removeExtraSpaces(search));
  const { sortBy, order, sorter, updateParams } = useSortParams();

  const { data, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch, sorter?.field, sorter.order],
    queryFn: () =>
      getProducts({
        search: debouncedSearch,
        sortBy,
        order,
      }),
  });

  const rowSelection: TableRowSelection<Product> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div className={css.container}>
      <Flex
        className={css.headerContainer}
        justify="space-between"
        align="center"
      >
        <Typography.Title className={css.title} level={2}>
          Товары
        </Typography.Title>

        <Input
          allowClear
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={css.searchInput}
          prefix={<SearchOutlined />}
          size="large"
          placeholder="Найти"
        />
        <div />
      </Flex>

      <Flex vertical gap={16} className={css.tableContainer}>
        <Flex justify="space-between" align="center">
          <Typography.Title level={2}>Все позиции</Typography.Title>
          <Flex gap={8}>
            <Button icon={<RefreshIcon width={16} height={16} />} />
            <Button icon={<PlusCircleOutlined />} type="primary">
              Добавить
            </Button>
          </Flex>
        </Flex>

        <Table<Product>
          scroll={{ y: "calc(100vh - 400px)" }}
          rowSelection={rowSelection}
          dataSource={data?.products ?? []}
          loading={isLoading}
          rowKey="id"
          onChange={(_, __, sorter) => {
            const single = Array.isArray(sorter) ? sorter[0] : sorter;

            updateParams({
              field: single.columnKey as string | undefined,
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
            sorter
            sortOrder={sorter.order}
            render={(_: unknown, row) => (
              <>
                <Typography.Text type={row.rating < 3 ? "danger" : undefined}>
                  {row.rating}
                </Typography.Text>
                <span>/5</span>
              </>
            )}
            title="Оценка"
          />
          <Column<Product>
            key="price"
            ellipsis
            sorter
            sortOrder={sorter.order}
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
      </Flex>
    </div>
  );
};
