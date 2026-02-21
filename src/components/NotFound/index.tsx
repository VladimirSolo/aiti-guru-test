import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <Result
    title="Страница не найдена"
    extra={
      <Button type="primary">
        <Link to="/">На главную</Link>
      </Button>
    }
  />
);
