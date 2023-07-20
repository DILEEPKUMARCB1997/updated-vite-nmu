import { Button, Card, Input, Popover, Segmented, Tooltip } from 'antd'
import {
  SyncOutlined,
  UploadOutlined,
  ShareAltOutlined,
  RedoOutlined,
  CloudUploadOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ClusterOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Flexbox } from 'react-layout-kit'
import { useDispatch, useSelector } from 'react-redux'
import { discoverySelector, switchGroupView } from '../../features/discoverySlice'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../main/utils/IPCEvents'
import { openDialog } from '../../features/dialogSlice'
import { initFirmwareUpdateData } from '../../features/firmwareUpdate'

const options = [
  { label: 'Table View', value: 'table' },
  { label: 'Group View', value: 'group' }
]

const DevicesControl = () => {
  const dispatch = useDispatch()
  const [groupAddInput, setGroupAddInput] = useState('')
  const { groupView } = useSelector(discoverySelector)
  const handleSwitchTableView = (value) => {
    dispatch(switchGroupView(value))
  }
  const handleOKButtonOnClick = () => {
    //console.log(handleOKButtonOnClick)
    initFirmwareUpdateData()
    dispatch(openDialog('FWU'))
  }
  const handleGroupAddClick = () => {
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addGroup',
      groupName: groupAddInput
    })
  }

  const content = (
    <Flexbox gap={5}>
      <Input
        placeholder="enter group name"
        value={groupAddInput}
        onChange={(e) => setGroupAddInput(e.target.value)}
      />
      <Button type="primary" onClick={handleGroupAddClick}>
        Apply
      </Button>
    </Flexbox>
  )

  return (
    <Card bordered={false} bodyStyle={{ paddingBlock: 8 }}>
      <Flexbox gap={20} direction="horizontal">
        <Tooltip title="Discovery">
          <Button icon={<SyncOutlined />} />
        </Tooltip>
        <Tooltip title="Firmware Update">
          <Button icon={<UploadOutlined />} onClick={handleOKButtonOnClick} />
        </Tooltip>
        <Tooltip title="Network Settings">
          <Button icon={<ShareAltOutlined />} />
        </Tooltip>
        <Tooltip title="Reset To Default">
          <Button icon={<RedoOutlined />} />
        </Tooltip>
        <Tooltip title="Backup and Restore">
          <Button icon={<CloudUploadOutlined />} />
        </Tooltip>
        <Tooltip title="Schedule Backup">
          <Button icon={<ClockCircleOutlined />} />
        </Tooltip>
        <Tooltip title="Syslog Settings">
          <Button icon={<CalendarOutlined />} />
        </Tooltip>
        <Tooltip title="Trap Settings">
          <Button icon={<ClusterOutlined />} onClick={() => dispatch(openDialog('testDialog'))} />
        </Tooltip>
        <Tooltip title="Add New Group">
          <Popover placement="topLeft" title="Enter group name" content={content} trigger="click">
            <Button icon={<UsergroupAddOutlined />} />
          </Popover>
        </Tooltip>
        <div style={{ flexGrow: 1 }}></div>
        <Segmented options={options} value={groupView} onChange={(v) => handleSwitchTableView(v)} />
      </Flexbox>
    </Card>
  )
}

export default DevicesControl
