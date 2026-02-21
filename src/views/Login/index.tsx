import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  Typography,
  notification,
} from "antd";
import css from "./index.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import LoginFormIcon from "../../assets/Login.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api";

const { Title, Paragraph } = Typography;

type FieldType = {
  username: string;
  password: string;
  remember?: string;
};

export const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    setLoading(true);

    try {
      const data = await login({
        username: values.username,
        password: values.password,
      });

      const storage = values.remember ? localStorage : sessionStorage;

      storage.setItem("user", JSON.stringify(data));

      navigate("/products");
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification.error({
          message: "Ошибка авторизации",
          description: error.message,
        });
      } else {
        notification.error({
          message: "Ошибка",
          description: "Неизвестная ошибка",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical justify="center" align="center" className={css.loginPage}>
      <Card className={css.loginForm}>
        <Flex vertical align="center">
          <LoginFormIcon />
        </Flex>
        <Title level={2} className={css.title}>
          Добро пожаловать!
        </Title>
        <Paragraph type="secondary" className={css.subtitle}>
          Пожалуйста, авторизируйтесь
        </Paragraph>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Логин"
            name="username"
            rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
          >
            <Input prefix={<UserOutlined />} allowClear />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Запомнить данные</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              block
              size="large"
              type="primary"
              htmlType="submit"
            >
              {isSignIn ? "Войти" : "Создать"}
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>
          {" "}
          <Paragraph type="secondary" className={css.subtitle}>
            или
          </Paragraph>
        </Divider>

        <Paragraph type="secondary" className={css.subtitle}>
          <span>
            {isSignIn ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <Button type="link" onClick={() => setIsSignIn(!isSignIn)}>
              {isSignIn ? "Создать" : "Войти"}
            </Button>
          </span>
        </Paragraph>
      </Card>
    </Flex>
  );
};
