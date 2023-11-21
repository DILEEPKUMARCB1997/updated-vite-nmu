import { Collapse, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'
import DeviceTable from './DeviceTable'
import { useTheme } from 'antd-style'
import DeviceGroupSettings from './DeviceGroupSettings'

const GroupDeviceTable = () => {
  const token = useTheme()
  const { groupDeviceData, groupDeviceArrayData } = useSelector(discoverySelector)

  const panelStyle = {
    marginBottom: 8,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusSM,
    boxShadow: token?.Card?.boxShadow,
    border: 'none',
    alignItem: 'center'
  }
  const items = Object.keys(groupDeviceData).map((item) => ({
    key: item,
    label: (
      <Typography.Title level={5} style={{ margin: 0 }}>
        {`${groupDeviceData[item].groupName} (${
          Object.keys(groupDeviceData[item].deviceList).length
        })`}
      </Typography.Title>
    ),
    children: <DeviceTable deviceData={groupDeviceArrayData[item]} />,
    extra:
      item === 'unGrouped' ? null : (
        <DeviceGroupSettings groupId={item} groupName={groupDeviceData[item].groupName} />
      ),
    style: panelStyle,
    collapsible: Object.keys(groupDeviceData[item].deviceList).length === 0 ? 'disabled' : 'header'
  }))

  return (
    <Collapse
      accordion
      expandIconPosition="end"
      items={items}
      force
      style={{
        background: 'transparent',
        border: 'none'
      }}
      className="custom-colapse"
    />
  )
}

export default React.memo(GroupDeviceTable)
