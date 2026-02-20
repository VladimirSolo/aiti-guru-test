import React, { useState } from "react";
import { Avatar, Button, Flex, Input, Table, Typography } from "antd";
import type { TableProps } from "antd";
import {
  EllipsisOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RefreshIcon from "../../assets/ArrowsClockwise.svg?react";
import css from "./index.module.scss";
import Column from "antd/es/table/Column";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  vendor: string;
  article: string;
  rating: number;
  price: number;
}

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    key: i,
    name: `Product ${i}`,
    vendor: `Vendor ${i}`,
    article: `Article ${i}`,
    rating: Math.floor(Math.random() * 5) + 1,
    price: Math.floor(Math.random() * 10000) + 100,
  }),
);

export const ProductsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
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

        <Table<DataType>
          scroll={{ y: "calc(100vh - 400px)" }}
          rowSelection={rowSelection}
          dataSource={dataSource}
        >
          <Column<DataType>
            key="name"
            ellipsis
            render={(_: unknown, row) => (
              <Flex align="center" gap={12}>
                <Avatar shape="square" size={48} icon={<UserOutlined />} />
                <span>{row.name}</span>
              </Flex>
            )}
            title="Наименование"
          />
          <Column<DataType>
            key="vendor"
            ellipsis
            render={(_: unknown, row) => <span>{row.vendor}</span>}
            title="Вендор"
          />
          <Column<DataType>
            key="article"
            ellipsis
            render={(_: unknown, row) => <span>{row.article}</span>}
            title="Артикул"
          />
          <Column<DataType>
            key="rating"
            ellipsis
            render={(_: unknown, row) => <span>{row.rating}</span>}
            title="Оценка"
          />
          <Column<DataType>
            key="price"
            ellipsis
            render={(_: unknown, row) => <span>{row.price} ₽</span>}
            title="Цена, ₽"
          />
          <Column<DataType>
            key="add"
            ellipsis
            render={() => <button className={css.addBtn}>+</button>}
            width={100}
          />
          <Column<DataType>
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
