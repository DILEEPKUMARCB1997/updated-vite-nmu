import { Col, Row } from 'antd'
import DevicesControl from '../components/devices/DevicesControl'
import DeviceTable from '../components/devices/DeviceTable'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../features/discoverySlice'
import GroupDeviceTable from '../components/devices/GroupDeviceTable'

const DevicePage = () => {
  const { groupView, defaultDeviceArrayData } = useSelector(discoverySelector)
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <DevicesControl />
      </Col>
      <Col span={24}>
        {groupView === 'table' ? (
          <DeviceTable deviceData={defaultDeviceArrayData} />
        ) : (
          <GroupDeviceTable />
        )}
      </Col>
    </Row>
  )
}

export default DevicePage
