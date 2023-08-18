/*
import React, { useState, useCallback } from 'react'
import { App, Button, Menu, Modal } from 'antd'
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

import { useDispatch } from 'react-redux'
import { openDialog } from '../../features/dialogSlice'
//import { openDialog } from '../../../features/dialogSlice'
import { requestOpenWebData } from '../../features/openWebSlice'
import { app } from 'electron'
import {
  requestDeviceBeep,
  requestDeviceReboot,
  requestOpenTelnet
} from '../../features/deviceBasiceOperatorSlice'
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
  const [current, setCurrent] = useState('mail')
  const { modal } = App.useApp

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const handleItemClick = useCallback((_, data) => {
    const { IPAddress, MACAddress, model, deviceType } = data
    switch (data.id) {
      case 'openOnOSbrowser':
        window.Electron.shell.openExternal(`http://${IPAddress}`)
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
      // case 'networkSetting':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handleNetworkSetting(MACAddress, IPAddress, deviceType, model, deviceType)
      case 'reboot':
        if (model === 'Cisco CGS2520') {
          modal.success({
            title: 'Success !',
            type: 'success',
            content: 'Device reboot success.'
          })
        }
        return handleReboot(MACAddress, IPAddress, deviceType)
      case 'deviceAdvancedSetting':
        if (model === 'Cisco CGS2520') {
          return null
        }
        break
      //   return handleDeviceAdvancedSetting(MACAddress, IPAddress, deviceType)
      // case 'portInformation':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handlePortInformation(MACAddress, IPAddress, deviceType)
      // case 'backup':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handleBackupConfig(MACAddress, IPAddress, deviceType)
      // case 'managedIp':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handleManagementIp(MACAddress, IPAddress, deviceType)
      default:
        break
    }
  }, [])

  // const handleBackupConfig = (MACAddress, IPAddress, deviceType) => {
  //   if (deviceType !== 'gwd') {
  //     requestGetBackupRestoreData({ MACAddress })
  //   } else {
  //     requestCheckSNMP(
  //       {
  //         MACAddress,
  //         IPAddress
  //       },
  //       (result) => {
  //         if (result) {
  //           requestGetBackupRestoreData({ MACAddress })
  //         } else {
  //           showCheckSNMPFailModal()
  //         }
  //       }
  //     )
  //   }
  // }

  const handleOpenTelnet = (IPAddress) => {
    dispatch(requestOpenTelnet(IPAddress))
  }

  const handleOpenWeb = (IPAddress, MACAddress) => {
    requestOpenWebData({
      IPAddress,
      MACAddress
    })
    openDialog('webBrowser')
  }

  const handleBeep = (IPAddress, MACAddress, deviceType) => {
    modal
      .confirm({
        title: 'Confirm',
        content: 'This will let device beep.'
      })
      .then(
        () => {
          requestDeviceBeep({
            IPAddress,
            MACAddress,
            deviceType
          })
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
          requestDeviceReboot({
            MACAddress,
            IPAddress,
            deviceType
          })
          return null
        },
        () => {}
      )
      .catch()
  }

  // const handleNetworkSetting = (MACAddress, IPAddress, deviceType) => {
  //   if (deviceType !== 'gwd' || !isPrecheck) {
  //     initSingleNetworkSetting({ MACAddress })
  //   } else {
  //     requestCheckSNMP(
  //       {
  //         MACAddress,
  //         IPAddress
  //       },
  //       () => {
  //         initSingleNetworkSetting({ MACAddress })
  //       }
  //     )
  //   }
  // }

  // const handleDeviceAdvancedSetting = (MACAddress, IPAddress, deviceType) => {
  //   if (deviceType !== 'gwd' || !isPrecheck) {
  //     initDeviceAdvanced({ MACAddress })
  //   } else {
  //     requestCheckSNMP(
  //       {
  //         MACAddress,
  //         IPAddress
  //       },
  //       () => {
  //         initDeviceAdvanced({ MACAddress })
  //       }
  //     )
  //   }
  // }

  // const handlePortInformation = (MACAddress, IPAddress, deviceType) => {
  //   if (deviceType !== 'gwd') {
  //     initPortInfoData({ MACAddress })
  //   } else {
  //     requestCheckSNMP(
  //       {
  //         MACAddress,
  //         IPAddress
  //       },
  //       (result) => {
  //         if (result) {
  //           initPortInfoData({ MACAddress })
  //         } else {
  //           showCheckSNMPFailModal()
  //         }
  //       }
  //     )
  //   }
  // }

  // const handleManagementIp = (MACAddress, IPAddress, deviceType) => {
  //   requestGetManagementIpData({ MACAddress })
  // }

  return (
    <div>
      <Menu
        onClick={onClick}
        onChange={handleItemClick}
        items={items}
        selectedKeys={[current]}
        mode="vertical"
        //onOpenChange={handleOpenWeb}
      ></Menu>
    </div>
  )
}

export default RowContextMenu
*/
