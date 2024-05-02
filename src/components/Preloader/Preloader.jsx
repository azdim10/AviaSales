import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 70,
      margin: 30,
    }}
    spin
  />
)
const Loading = () => <Spin indicator={antIcon} />
export default Loading