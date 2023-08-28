import React, { useState } from 'react'
import {
  UndoOutlined,
  ShareAltOutlined,
  FontSizeOutlined,
  UngroupOutlined,
  // ExportOutlined,
  SelectOutlined,
  GlobalOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { App, Menu } from 'antd'
import { initPortInfoData } from '../../features/portInformationSlice'
import { requestCheckSNMP } from '../../features/discoverySlice'
import { useDispatch, useSelector } from 'react-redux'
import { initDeviceAdvanced } from '../../features/deviceAdvanceSettingSlice'
import { snmpSelector } from '../../features/Preferences/snmpSlice'
import { initSingleNetworkSetting } from '../../features/singleNetworkSettingSlice'
import { openAdvanceDrawer } from '../../features/deviceAdvanceSettingSlice'
import {
  requestDeviceBeep,
  requestDeviceReboot,
  requestOpenTelnet
} from '../../features/deviceBasiceOperatorSlice'
import { requestOpenWebData } from '../../features/openWebSlice'
import { openDialog } from '../../features/dialogSlice'
import { requestGetBackupRestoreData } from '../../features/singleBackupRestoreSlice'
import { openDrawer } from '../../features/singleNetworkSettingSlice'
import { openPortInfoDrawer } from '../../features/portInformationSlice'

const items = [
  {
    label: 'OpenWeb',
    key: 'openWeb',
    icon: <GlobalOutlined />,

    children: [
      {
        label: 'Open on Os Browser',
        key: 'Openon Os',
        icon: <SelectOutlined />

        // onTitleClick={handleOpenWeb}
      },
      { label: 'Open on NMU', key: 'Open on NMU' }
    ]
  },
  {
    label: 'Telnet',
    key: 'telnet',
    icon: <FontSizeOutlined />
  },
  {
    label: 'Beep',
    key: 'beep',
    icon: <UngroupOutlined />
  },
  {
    label: 'Reboot',
    key: 'reboot',
    icon: <UndoOutlined />
  },

  {
    label: 'Network Setting',
    key: 'network',
    icon: <ShareAltOutlined />
  },
  {
    label: 'Device Advanced Setting',
    key: 'device Advance',
    icon: <SettingOutlined />
  },
  {
    label: 'Port Information',
    key: 'port information',
    icon: <RiseOutlined />
  },
  {
    label: 'BackUp and Restore',
    key: 'baackup and restore',
    icon: <CloudUploadOutlined />
  }
]

const RowContextMenu = () => {
  const dispatch = useDispatch()
  const { isPrecheck } = useSelector(snmpSelector)
  const { modal } = App.useApp()

  const handleItemClick = (event, data = {}) => {
    console.log(data)
    console.log(event)

    const { IPAddress = '', MACAddress = '', model = '', deviceType = '' } = data
    console.log(IPAddress)
    switch (event.id) {
      case 'openOnOSbrowser':
        window.electron.shell.openExternal(`http://${IPAddress}`)
        break
      case 'openOnApplication':
        return handleOpenWeb(IPAddress, MACAddress)
      case 'telnet':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleOpenTelnet(IPAddress)
      case 'beep':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleBeep(IPAddress, MACAddress, deviceType)
      case 'networkSetting':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleNetworkSetting(MACAddress, IPAddress, deviceType, model, deviceType)
      case 'reboot':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleReboot(MACAddress, IPAddress, deviceType)
      case 'deviceAdvancedSetting':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleDeviceAdvancedSetting(MACAddress, IPAddress, deviceType)
      case 'portInformation':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handlePortInformation(MACAddress, IPAddress, deviceType)
      case 'backup':
        if (model === 'Cisco CGS2520') {
          return null
        }
        return handleBackupConfig(MACAddress, IPAddress, deviceType)
      // case 'managedIp':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handleManagementIp(MACAddress, IPAddress, deviceType)
      default:
        break
    }
  }

  const handleBackupConfig = (MACAddress, IPAddress, deviceType) => {
    dispatch(openDialog('singleBackupConfig'))
    if (deviceType !== 'gwd') {
      dispatch(requestGetBackupRestoreData({ MACAddress }))
    } else {
      requestCheckSNMP(
        {
          MACAddress,
          IPAddress
        },
        (result) => {
          if (result) {
            dispatch(requestGetBackupRestoreData({ MACAddress }))
          } else {
            showCheckSNMPFailModal()
          }
        }
      )
    }
  }

  const handleOpenTelnet = (IPAddress) => {
    dispatch(requestOpenTelnet(IPAddress))
  }

  const handleOpenWeb = (IPAddress, MACAddress) => {
    dispatch(
      requestOpenWebData({
        IPAddress,
        MACAddress
      })
    )
    dispatch(openDialog('webBrowser'))
  }

  const handleBeep = (IPAddress, MACAddress, deviceType) => {
    modal
      .confirm({
        title: 'Confirm',
        content: 'This will let device beep.'
      })

      .then(
        () => {
          dispatch(
            requestDeviceBeep({
              IPAddress,
              MACAddress,
              deviceType
            })
          )
          return null
        },
        () => {}
      )
      .catch()
  }

  const handleReboot = (MACAddress, IPAddress, deviceType) => {
    modal
      .confirm({
        title: 'Confirm',
        content: 'This will reboot the device.'
      })
      .then(
        () => {
          dispatch(
            requestDeviceReboot({
              MACAddress,
              IPAddress,
              deviceType
            })
          )
          return null
        },
        () => {}
      )
      .catch()
  }

  const handleNetworkSetting = (MACAddress, IPAddress, deviceType) => {
    dispatch(openDrawer(true), dispatch(openDialog('singleNetworkSetting')))
    if (deviceType !== 'gwd' || !isPrecheck) {
      dispatch(initSingleNetworkSetting({ MACAddress }))
    } else {
      requestCheckSNMP(
        {
          MACAddress,
          IPAddress
        },
        () => {
          dispatch(initSingleNetworkSetting({ MACAddress }))
        }
      )
    }
  }

  const handleDeviceAdvancedSetting = (MACAddress, IPAddress, deviceType) => {
    dispatch(openAdvanceDrawer(true), dispatch(openDialog('advanceSetting')))
    if (deviceType !== 'gwd' || !isPrecheck) {
      initDeviceAdvanced({ MACAddress })
    } else {
      requestCheckSNMP(
        {
          MACAddress,
          IPAddress
        },
        () => {
          initDeviceAdvanced({ MACAddress })
        }
      )
    }
  }

  const showCheckSNMPFailModal = () => {
    modal.error({
      title: 'Check SNMP feature fail. ',
      content: 'Please check SNMP of this device is enable.'
    })
  }

  const handlePortInformation = (MACAddress, IPAddress, deviceType) => {
    dispatch(openPortInfoDrawer(true), dispatch(openDialog('portInformation')))
    if (deviceType !== 'gwd') {
      dispatch(initPortInfoData({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP(
          {
            MACAddress,
            IPAddress
          },
          (result) => {
            if (result) {
              initPortInfoData({ MACAddress })
            } else {
              showCheckSNMPFailModal()
            }
          }
        )
      )
    }
  }

  return (
    <div>
      <Menu items={items} onClick={handleItemClick}></Menu>
    </div>
  )
}

export default RowContextMenu
