import { Form, Input, InputNumber, Modal } from "antd";
import type { Product } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddProductModal = ({ isOpen, onClose }: Props) => {
  const [form] = Form.useForm<Product>();

  return (
    <Modal
      cancelText="Отмена"
      centered
      destroyOnHidden
      okButtonProps={{
        form: "add-product-form",
        htmlType: "submit",
      }}
      okText="Применить"
      open={isOpen}
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

          onClose();
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
          <InputNumber style={{ width: "100%" }} placeholder="Цена" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
