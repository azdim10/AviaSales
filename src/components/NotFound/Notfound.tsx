import { Alert, Space } from 'antd'

const Notfound: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert description="Билетов не найдено!" type="info" />
  </Space>
)

export default Notfound