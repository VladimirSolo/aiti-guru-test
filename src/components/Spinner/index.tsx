import { Card, Spin } from 'antd'
import css from './index.module.scss'

export const Spinner = () => {
  return (
    <Card variant="borderless" className={css.spinner}>
      <Spin size="large" />
    </Card>
  )
}
