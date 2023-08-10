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
  NodeIndexOutlined,
  UngroupOutlined,
  LineHeightOutlined,
  SettingOutlined,
  BackwardOutlined,
  FundOutlined,
  ExportOutlined
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
import { openAdvanceDrawer } from '../../features/deviceAdvanceSettingSlice'
import { openPortInfoDrawer } from '../../features/portInformationSlice'
import { openDrawer } from '../../features/singleNetworkSettingSlice'

const options = [
  { label: 'Table View', value: 'table' },
  { label: 'Group View', value: 'group' }
]

const DevicesControl = ({ onClose }) => {
  const dispatch = useDispatch()
  const [modal1Open, setModal1Open] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [groupAddInput, setGroupAddInput] = useState('')
  const { groupView } = useSelector(discoverySelector)
  const { modal } = App.useApp()

  useEffect(() => {
    dispatch(requestDeviceBeep())
    dispatch(requestDeviceReboot())
  }, [])
  const handleSwitchTableView = (value) => {
    dispatch(switchGroupView(value))
  }
  const showModal = () => {
    setVisible(true)
  }
  const handleGroupAddClick = () => {
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addGroup',
      groupName: groupAddInput
    })
  }
  const handleOk = async () => {
    setLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    // setLoading(false)

    // setVisible(false)
    setTimeout(() => {
      Modal.success({
        title: 'Success!',
        content: 'Device reboot success.'
      })
    }, 1000)

    console.log(true)
  }

  const handleCancel = () => {
    setVisible(false)

    Modal.error({
      title: 'Error',
      content: 'Device reboot error'
    })

    console.log(false)
  }
  const handleReboot = (MACAddress, IPAddress, deviceType) => {
    modal.confirm({
      title: 'Confirm',
      content: 'This will reboot the device.'
    })
    setTimeout(async () => {
      const confirmed = await modal.success({
        title: 'Success !',
        type: 'success',
        content: 'Device reboot success.'
      })
      console.log(confirmed)
    }, 3000)

    //   : modal.error({
    //       title: 'Error',
    //       content: 'Device Reboot Error'
    //     })
    dispatch(
      requestDeviceReboot({
        MACAddress,
        IPAddress,
        deviceType
      })
    )
  }

  const handleBeep = async (IPAddress, MACAddress, deviceType) => {
    const confirmed = await modal.confirm({
      title: 'Confirm',
      content: 'This will let device beep.'
    })
    console.log('Confirmed: ', confirmed)
    dispatch(
      requestDeviceBeep({
        IPAddress,
        MACAddress,
        deviceType
      })
    )
  }
  const handleOpenTelnet = (IPAddress) => {
    dispatch(requestOpenTelnet(IPAddress))
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
          <Button icon={<RedoOutlined />} onClick={() => dispatch(openDialog('resetToDefault'))} />
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
        <Tooltip title="Beep">
          <Button icon={<UngroupOutlined />} onClick={handleBeep} />
        </Tooltip>
        <Tooltip title="Reboot">
          <Button icon={<ExportOutlined />} onClick={handleReboot} />
        </Tooltip>
        <Tooltip title="Telnet">
          <Button icon={<LineHeightOutlined />} onClick={handleOpenTelnet} />
        </Tooltip>

        <Tooltip title="Single Network Setting">
          <Button
            icon={<SettingOutlined />}
            onClick={() => {
              dispatch(openDrawer(true), dispatch(openDialog('singleNetworkSetting')))
            }}
          ></Button>
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
