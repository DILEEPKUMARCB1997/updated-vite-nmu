import { Col, Row } from 'antd'
import DevicesControl from '../components/devices/DevicesControl'
import DeviceTable from '../components/devices/DeviceTable'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../features/discoverySlice'
import GroupDeviceTable from '../components/devices/GroupDeviceTable'
// import EventTips from '../components/devices/EventTips/EventTips'
// import Snacks from '../components/Snack/Snacks'

const DevicePage = () => {
  const { groupView, defaultDeviceArrayData } = useSelector(discoverySelector)
  return (
    <Row gutter={[16, 16]}>
      {/* <Col span={24}>
        <Snacks />
      </Col>
      <Col span={24}>
        <EventTips />
      </Col> */}
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
