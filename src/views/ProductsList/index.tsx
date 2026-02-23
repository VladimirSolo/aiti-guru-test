import { useState } from "react";
import { Button, Flex, Input, Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import RefreshIcon from "@/assets/ArrowsClockwise.svg?react";
import { AddProductModal, ProductsTable } from "./_components";
import css from "./index.module.scss";

export const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

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
            <Button
              onClick={() => setIsOpenModal(true)}
              icon={<PlusCircleOutlined />}
              type="primary"
            >
              Добавить
            </Button>
          </Flex>
        </Flex>

        <ProductsTable search={search} />
      </Flex>

      {isOpenModal && (
        <AddProductModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
};
