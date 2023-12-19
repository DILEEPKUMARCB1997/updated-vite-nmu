import { Button, Drawer, Tabs, Typography, theme, App } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearDeviceAdvancedData,
  deviceAdvanceSettingSelector,
  requireSaveDeviceAdvanced
} from '../../../features/deviceAdvanceSettingSlice'
import Authentication from './Authentication/Authentication'
import AlarmSettings from './AlarmSettings/AlarmSettings'

const DeviceAdvanceDrawer = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { notification } = App.useApp()
  const { drawVisible, MACAddress, model } = useSelector(deviceAdvanceSettingSelector)
  // console.log(drawVisible)

  const items = [
    {
      key: '1',
      label: `Authentication`,
      children: <Authentication />
    },

    {
      key: '2',
      label: `Alarm`,
      children: <AlarmSettings />
    }
  ]

  const handleCloseDrawer = () => {
    dispatch(clearDeviceAdvancedData())
  }

  const handleApplyButtonClick = () => {
    dispatch(
      requireSaveDeviceAdvanced((result, mag) => {
        const type = result ? 'success' : 'error'
        notification[type]({ message: mag })
      })
    )
    handleCloseDrawer()
  }

  return (
    <Drawer
      open={drawVisible}
      title={<Typography.Title level={4}>Advance Setting</Typography.Title>}
      closable={false}
      maskClosable={false}
      onClose={handleCloseDrawer}
      destroyOnClose
      width={400}
      headerStyle={{ backgroundColor: token.colorPrimaryBgHover, paddingBottom: '0px' }}
      bodyStyle={{ backgroundColor: token.colorBgLayout }}
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button style={{ marginRight: '10px' }} onClick={handleCloseDrawer}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleApplyButtonClick}>
            Apply
          </Button>
        </div>
      }
      // style={{ overflow: 'auto' }}
    >
      <Typography style={{ marginBottom: '10px' }}>{`${model}(${MACAddress})`}</Typography>
      <Tabs type="card" defaultActiveKey="1" items={items} style={{ overflow: 'auto' }} />
    </Drawer>
  )
}

export default DeviceAdvanceDrawer
