import { Layout } from "antd";
import css from "./index.module.scss";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FullErrorPage = ({ children }: Props) => (
  <Layout className={css.fullErrorPage}>
    <div className={css.fullErrorPage__content}>{children}</div>
  </Layout>
);
