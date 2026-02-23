import React, { useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Typography,
} from "antd";
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
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { removeExtraSpaces } from "@/utils/removeExtraSpaces";
import { useTableParams } from "./_hooks/useTableParams";
import type { Product } from "@/types";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export const ProductsList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(removeExtraSpaces(search));
  const { sortBy, order, sorter, currentPage, pageSize, updateParams } =
    useTableParams();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm<Product>();

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
            sortOrder={sorter.order}
            render={(_: unknown, row) => (
              <>
                {row.rating && (
                  <>
                    <Typography.Text
                      type={
                        row?.rating && row.rating < 3 ? "danger" : undefined
                      }
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

      {isOpenModal && (
        <Modal
          cancelText="Отмена"
          centered
          destroyOnHidden
          okButtonProps={{
            form: "add-product-form",
            htmlType: "submit",
          }}
          okText="Применить"
          open={isOpenModal}
          title="Добавить продукт"
          width="400px"
        >
          <Form
            autoComplete="off"
            clearOnDestroy
            form={form}
            layout="vertical"
            name="add-product-form"
            onFinish={(values) => {
              console.log(values);

              setIsOpenModal(false);
              form.resetFields();
            }}
          >
            <Form.Item
              label="Наименование"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите наименование!",
                },
              ]}
            >
              <Input allowClear placeholder="Наименование" />
            </Form.Item>
            <Form.Item
              label="Вендор"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите вендор!",
                },
              ]}
            >
              <Input allowClear placeholder="Вендор" />
            </Form.Item>
            <Form.Item
              label="Артикул"
              name="sku"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите артикул!",
                },
              ]}
            >
              <Input allowClear placeholder="Артикул" />
            </Form.Item>
            <Form.Item
              label="Цена"
              name="price"
              rules={[{ required: true, message: "Пожалуйста, введите цену!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Цена"
                min={0}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};
