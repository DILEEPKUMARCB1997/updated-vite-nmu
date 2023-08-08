/* eslint-disable no-unused-vars */
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
  UsergroupAddOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  BackwardOutlined,
  FundOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Flexbox } from 'react-layout-kit'
import { useDispatch, useSelector } from 'react-redux'
import { discoverySelector, requestDiscovery, switchGroupView } from '../../features/discoverySlice'
import { initScheduleBackup } from '../../features/scheduleBackupSlice.js'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../main/utils/IPCEvents'
// import { openSnack } from '../../features/snackSlice'
import { openDialog } from '../../features/dialogSlice'
import { removeBatchOperateEvent, setBatchOperateEvent } from '../../features/UIControllSlice'
import { setSNMPSelectOnly } from '../../features/discoverySlice'
// import { openSnack } from '../../features/snackSlice'
import { openAdvanceDrawer } from '../../features/deviceAdvanceSettingSlice'
import { openPortInfoDrawer } from '../../features/portInformationSlice'
import { openDrawer } from '../../features/singleNetworkSettingSlice'

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

  const handleGroupAddClick = () => {
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addGroup',
      groupName: groupAddInput
    })
  }
  // const handleResetToDefault = () => {
  //   dispatch(openDialog('resetToDefault'))
  // }

  const handleResetButtonClick = () => {
    dispatch(removeBatchOperateEvent())
    dispatch(setBatchOperateEvent('resetToDefault'))
    // dispatch(openSnack('resetToDefault'))
    dispatch(setSNMPSelectOnly(true))
  }

  // const handleBackButtonClick = () => {
  //   dispatch(removeBatchOperateEvent())
  //   dispatch(setBatchOperateEvent('backupRestore'))
  //   // dispatch(openSnack('backupRestore'))
  //   dispatch(setSNMPSelectOnly(true))
  // }
  // const handleButtonClick = (key) => () => {
  //   dispatch(removeBatchOperateEvent())
  //   switch (key) {
  //     case 'resetToDefault':
  //       dispatch(setBatchOperateEvent('resetToDefault'))

  //       dispatch(setSNMPSelectOnly(true))
  //       break
  //     case 'backupRestore':
  //       dispatch(setBatchOperateEvent('backupRestore'))

  //       dispatch(setSNMPSelectOnly(true))
  //       break

  //     default:
  //       break
  //   }
  // }
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
          <Button icon={<SyncOutlined />} onClick={() => dispatch(requestDiscovery())} />
        </Tooltip>
        <Tooltip title="Firmware Update">
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              dispatch(openDialog('FWU'))
            }}
          />
        </Tooltip>
        <Tooltip title="Network Settings">
          <Button
            icon={<ShareAltOutlined />}
            onClick={() => dispatch(openDialog('networkSetting'))}
          />
        </Tooltip>
        <Tooltip title="Reset To Default">
          <Button
            icon={<RedoOutlined />}
            onClick={() => dispatch(openDialog('resetToDefault'))}
            // onClick={handleResetButtonClick}
            // onClick={() => dispatch(setBatchOperateEvent({ event: 'resetToDefault' }))}
            // onChange={() => dispatch(setSNMPSelectOnly(true))}
          />
        </Tooltip>
        <Tooltip title="Backup and Restore">
          <Button
            icon={<CloudUploadOutlined />}
            onClick={() => dispatch(openDialog('backupRestore'))}
          />
        </Tooltip>
        <Tooltip title="Schedule Backup">
          <Button icon={<ClockCircleOutlined />} onClick={() => dispatch(initScheduleBackup())} />
        </Tooltip>
        <Tooltip title="Syslog Settings">
          <Button
            icon={<CalendarOutlined />}
            onClick={() => dispatch(openDialog('syslogSetting'))}
          />
        </Tooltip>
        <Tooltip title="Trap Settings">
          <Button icon={<ClusterOutlined />} onClick={() => dispatch(openDialog('trapSetting'))} />
        </Tooltip>
        <Tooltip title="Add New Group">
          <Popover placement="topLeft" title="Enter group name" content={content} trigger="click">
            <Button icon={<UsergroupAddOutlined />} />
          </Popover>
        </Tooltip>
        <Tooltip title="Advance Setting">
          <Button
            icon={<NodeIndexOutlined />}
            onClick={() => {
              dispatch(openAdvanceDrawer(true), dispatch(openDialog('advanceSetting')))
            }}
          />
        </Tooltip>
        <Tooltip title="Port Information">
          <Button
            icon={<FundOutlined />}
            onClick={() => {
              dispatch(openPortInfoDrawer(true), dispatch(openDialog('portInformation')))
            }}
          />
        </Tooltip>
        <Tooltip title="Single Network Setting">
          <Button
            icon={<SettingOutlined />}
            onClick={() => {
              dispatch(openDrawer(true), dispatch(openDialog('singleNetworkSetting')))
            }}
          />
        </Tooltip>
        <Tooltip title="Backup and Restore">
          <Button
            icon={<BackwardOutlined />}
            onClick={() => {
              dispatch(openDialog('singleBackupConfig'))
            }}
          />
        </Tooltip>
        <div style={{ flexGrow: 1 }}></div>
        <Segmented options={options} value={groupView} onChange={(v) => handleSwitchTableView(v)} />
      </Flexbox>
    </Card>
  )
}

export default DevicesControl
