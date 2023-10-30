/* eslint-disable no-unused-vars */
import { Button, Card, Input, Popover, Segmented, Tooltip, App, Modal } from 'antd'
import { REQUEST_MP_REBOOT_GWD_DEVICE } from '../../../../main/utils/IPCEvents'
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
  AudioOutlined
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Flexbox } from 'react-layout-kit'
import { useDispatch, useSelector } from 'react-redux'
import { discoverySelector, requestDiscovery, switchGroupView } from '../../features/discoverySlice'
import { initScheduleBackup } from '../../features/scheduleBackupSlice.js'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../main/utils/IPCEvents'
import { openDialog } from '../../features/dialogSlice'
import {
  requestDeviceBeep,
  requestDeviceReboot,
  requestOpenTelnet
} from '../../features/deviceBasiceOperatorSlice'
import { removeBatchOperateEvent, setBatchOperateEvent } from '../../features/UIControllSlice'
import { setSNMPSelectOnly } from '../../features/discoverySlice'
import { userManagementSelector } from '../../features/userManagementSlice'

const options = [
  { label: 'Table View', value: 'table' },
  { label: 'Group View', value: 'group' }
]

const DevicesControl = ({ onClose }) => {
  const dispatch = useDispatch()
  const [groupAddInput, setGroupAddInput] = useState('')
  const { groupView } = useSelector(discoverySelector)
  const { loggedInUser } = useSelector(userManagementSelector)
  const { userType } = loggedInUser
  const { modal } = App.useApp()

  useEffect(() => {
    dispatch(requestDeviceBeep())
    dispatch(requestDeviceReboot())
  }, [])
  const handleSwitchTableView = (value) => {
    dispatch(switchGroupView(value))
  }

  const handleGroupAddClick = () => {
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addGroup',
      groupName: groupAddInput
    })
  }

  const handleResetToDefault = () => {
    dispatch(setBatchOperateEvent({ event: 'resetToDefault' }))
    dispatch(setSNMPSelectOnly(true))
  }

  const handleBackupRestore = () => {
    dispatch(setBatchOperateEvent({ event: 'backupRestore' }))
    dispatch(setSNMPSelectOnly(true))
  }

  const handleSyslogSetting = () => {
    dispatch(setBatchOperateEvent({ event: 'syslogSetting' }))
    dispatch(setSNMPSelectOnly(true))
  }
  const handleTrapSetting = () => {
    dispatch(setBatchOperateEvent({ event: 'trapSetting' }))
    dispatch(setSNMPSelectOnly(true))
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

  const buttons = [
    { title: 'Discovery', key: 'discovery', icon: <SyncOutlined /> },
    { title: 'Firmware Update', key: 'firmwareUpdate', icon: <UploadOutlined /> },
    { title: 'Network Setting', key: 'networkSetting', icon: <ShareAltOutlined /> },
    {
      title: 'Reset To Default',
      key: 'resetToDefault',
      icon: <RedoOutlined />
    },
    { title: 'Backup and Restore', key: 'backupRestore', icon: <CloudUploadOutlined /> },
    { title: 'Schedule Backup', key: 'scheduleBackup', icon: <ClockCircleOutlined /> },
    { title: 'Syslog Server Setting', key: 'syslogSetting', icon: <CalendarOutlined /> },
    { title: 'Trap Server Setting', key: 'trapSetting', icon: <ClusterOutlined /> }
  ]

  const handleButtonClick = (key) => () => {
    console.log(key)
    dispatch(removeBatchOperateEvent())
    switch (key) {
      case 'discovery':
        dispatch(requestDiscovery())
        break
      case 'firmwareUpdate':
        dispatch(setBatchOperateEvent({ event: 'firmwareUpdate' }))
        // this.props.openSnack('FWU')
        // this.props.openMainDeviceCheckBox(true);
        break
      case 'networkSetting':
        dispatch(setBatchOperateEvent({ event: 'networkSetting' }))
        // this.props.removeBatchOperateEvent();
        // this.props.openSnack('networkSetting');
        // this.props.openMainDeviceCheckBox(true);
        break
      case 'resetToDefault':
        dispatch(setBatchOperateEvent({ event: 'resetToDefault' }))
        // this.props.openSnack('resetToDefault');
        // this.props.openMainDeviceCheckBox(true);
        dispatch(setSNMPSelectOnly(true))
        break
      case 'backupRestore':
        dispatch(setBatchOperateEvent({ event: 'backupRestore' }))
        // this.props.openSnack('backupRestore');
        // this.props.openMainDeviceCheckBox(true);
        dispatch(setSNMPSelectOnly(true))
        break
      case 'scheduleBackup':
        dispatch(initScheduleBackup())
        // this.props.openSnack('backupRestore');
        // this.props.openMainDeviceCheckBox(true);
        //this.props.setSNMPSelectOnly(true);
        break
      case 'syslogSetting':
        dispatch(setBatchOperateEvent({ event: 'syslogSetting' }))
        // this.props.openSnack('backupRestore');
        // this.props.openMainDeviceCheckBox(true);
        dispatch(setSNMPSelectOnly(true))
        break
      case 'trapSetting':
        dispatch(setBatchOperateEvent({ event: 'trapSetting' }))
        // this.props.openSnack('backupRestore');
        // this.props.openMainDeviceCheckBox(true);
        dispatch(setSNMPSelectOnly(true))
        break
      default:
        break
    }
  }

  return (
    <Card bordered={false} bodyStyle={{ paddingBlock: 8 }}>
      <Flexbox gap={20} direction="horizontal">
        {buttons.map(
          (item) =>
            userType !== 'Operator' && (
              <Tooltip key={item.key} title={item.title}>
                <Button icon={item.icon} onClick={handleButtonClick(item.key)} />
              </Tooltip>
            )
        )}
        {userType !== 'Operator' && (
          <Tooltip title="Add New Group">
            <Popover placement="topLeft" title="Enter group name" content={content} trigger="click">
              <Button icon={<UsergroupAddOutlined />} />
            </Popover>
          </Tooltip>
        )}
        {/* <Tooltip title="Discovery">
          <Button icon={<SyncOutlined />} onClick={() => dispatch(requestDiscovery())} />
        </Tooltip>
        <Tooltip title="Firmware Update">
          <Button
            icon={<UploadOutlined />}
            onClick={() => {
              dispatch(setBatchOperateEvent({ event: 'firmwareUpdate' }))
            }}
          />
        </Tooltip>
        <Tooltip title="Network Settings">
          <Button
            icon={<ShareAltOutlined />}
            onClick={() => dispatch(({ event: 'networkSetting' }))}
          />
        </Tooltip>
        <Tooltip title="Reset To Default">
          <Button icon={<RedoOutlined />} onClick={handleResetToDefault} />
        </Tooltip>
        <Tooltip title="Backup and Restore">
          <Button icon={<CloudUploadOutlined />} onClick={handleBackupRestore} />
        </Tooltip>
        <Tooltip title="Schedule Backup">
          <Button icon={<ClockCircleOutlined />} onClick={() => dispatch(initScheduleBackup())} />
        </Tooltip>
        <Tooltip title="Syslog Settings">
          <Button icon={<CalendarOutlined />} onClick={handleSyslogSetting} />
        </Tooltip>
        <Tooltip title="Trap Settings">
          <Button icon={<ClusterOutlined />} onClick={handleTrapSetting} />
        </Tooltip>
        <Tooltip title="Add New Group">
          <Popover placement="topLeft" title="Enter group name" content={content} trigger="click">
            <Button icon={<UsergroupAddOutlined />} />
          </Popover>
        </Tooltip>
        <Tooltip title="Buzzer">
          <Button
            icon={<AudioOutlined />}
            onClick={() => {
              dispatch(openDialog('buzzer'))
            }}
          />
        </Tooltip>{' '} */}
        <div style={{ flexGrow: 1 }}></div>
        <Segmented options={options} value={groupView} onChange={(v) => handleSwitchTableView(v)} />
      </Flexbox>
    </Card>
  )
}

export default DevicesControl
