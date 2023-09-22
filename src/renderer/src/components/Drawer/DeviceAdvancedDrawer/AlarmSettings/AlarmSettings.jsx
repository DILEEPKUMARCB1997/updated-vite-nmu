/* eslint-disable no-unused-vars */
import { Checkbox, Divider, List, Tooltip, Typography, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deviceAdvanceSettingSelector,
  switchPortLinkAlarm,
  switchPowerAlarm
} from '../../../../features/deviceAdvanceSettingSlice'

const AlarmSettings = () => {
  const dispatch = useDispatch()
  const { Item } = List
  const { portInfo, powerInfo } = useSelector(deviceAdvanceSettingSelector)

  const portListData = Object.values(portInfo)
  const powerListData = Object.values(powerInfo)

  const { useToken } = theme
  const { token } = useToken()

  const handlePortLinkSwitchOnChange = (port, type) => (e) => {
    dispatch(switchPortLinkAlarm({ port, value: e.target.checked, type }))
  }

  const handlePowerSwitchOnChange = (power, type) => (e) => {
    dispatch(switchPowerAlarm({ power, value: e.target.checked, type }))
  }

  const portListHeadRender = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Name</span>
      <span>LinkUp</span>
      <span>LinkDown</span>
    </div>
  )

  const powerListHeadRender = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Name</span>
      <span>On</span>
      <span>Off</span>
    </div>
  )

  const portListItemRender = (item) => (
    <Item>
      <Typography>{`${item.portName}`}</Typography>
      <Tooltip
        title={`When ${item.portName} link up show alarm.`}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0}
      >
        <Checkbox
          checked={item.linkUp}
          onChange={handlePortLinkSwitchOnChange(item.portName, 'linkUp')}
        />
      </Tooltip>
      <Tooltip
        title={`When ${item.portName} link down show alarm.`}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0}
      >
        <Checkbox
          checked={item.linkDown}
          onChange={handlePortLinkSwitchOnChange(item.portName, 'linkDown')}
        />
      </Tooltip>
    </Item>
  )

  const powerListItemRender = (item) => (
    <Item>
      <Typography>{`${item.powerName}`}</Typography>
      <Tooltip
        title={`When ${item.powerName} on show alarm.`}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0}
      >
        <Checkbox checked={item.on} onChange={handlePowerSwitchOnChange(item.powerName, 'on')} />
      </Tooltip>
      <Tooltip
        title={`When ${item.powerName} off show alarm.`}
        mouseEnterDelay={0.3}
        mouseLeaveDelay={0}
      >
        <Checkbox checked={item.off} onChange={handlePowerSwitchOnChange(item.powerName, 'off')} />
      </Tooltip>
    </Item>
  )

  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginTop: '0px',
          marginBottom: '10px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        Port
      </Divider>
      <List
        size="small"
        header={portListHeadRender()}
        bordered
        dataSource={portListData}
        renderItem={(item) => portListItemRender(item)}
      />

      <Divider
        orientation="left"
        style={{
          marginBottom: '10px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        Power
      </Divider>
      <List
        size="small"
        header={powerListHeadRender()}
        s
        bordered
        dataSource={powerListData}
        renderItem={(item) => powerListItemRender(item)}
      />
    </div>
  )
}

export default AlarmSettings
