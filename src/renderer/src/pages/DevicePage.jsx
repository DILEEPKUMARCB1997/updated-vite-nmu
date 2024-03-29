import { Col, Row } from 'antd'
import DevicesControl from '../components/devices/DevicesControl'
import DeviceTable from '../components/devices/DeviceTable'
import { useSelector, useDispatch } from 'react-redux'
import { discoverySelector } from '../features/discoverySlice'
import GroupDeviceTable from '../components/devices/GroupDeviceTable'
import EventTips from '../components/devices/EventTips/EventTips'
import { store } from '../app/store'

const DevicePage = () => {
  const { groupView, defaultDeviceArrayData } = useSelector(discoverySelector)
  console.log('store', store.getState())
  return (
    <Row gutter={[16, 16]}>
      {/* <Col span={24}> */}
      <div style={{ position: 'absolute', width: '100%', padding: '25px 15px 15px 15px' }}>
        <EventTips />
      </div>
      {/* </Col> */}
      <Col span={24}>
        <DevicesControl />
        {/* <EventTips /> */}
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
