import React, { useState } from 'react'
import {
  CloudUploadOutlined,
  ExportOutlined,
  FontSizeOutlined,
  GlobalOutlined,
  LayoutOutlined,
  RiseOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UndoOutlined,
  UngroupOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestOpenWebData } from '../../features/openWebSlice'
import { openDialog } from '../../features/dialogSlice'
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
import { snmpSelector } from '../../features/Preferences/snmpSlice'
import { initSingleNetworkSetting } from '../../features/singleNetworkSettingSlice'
import { requestCheckSNMP } from '../../features/discoverySlice'
import { initDeviceAdvanced } from '../../features/deviceAdvanceSettingSlice'
import { initPortInfoData } from '../../features/portInformationSlice'
import { requestGetBackupRestoreData } from '../../features/singleBackupRestoreSlice'
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
  const items = [
    {
      label: 'Open Web',
      key: 'openWeb',
      icon: <GlobalOutlined />,

      children: [
        {
          label: 'Open on OS Browser',
          key: 'OpenOnOSbrowser',
          icon: <ExportOutlined />
          // render: (data) => (data ? <Button /> : <Button status="error" className="cutomBadge" />)

          // onTitleClick={handleOpenWeb}
        },
        { label: 'Open on NMU', key: 'openOnApplication', icon: <LayoutOutlined /> }
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
      key: 'networkSetting',
      icon: <ShareAltOutlined />
    },
    {
      label: 'Device Advanced Setting',
      key: 'deviceAdvancedSetting',
      icon: <SettingOutlined />
    },
    {
      label: 'Port Information',
      key: 'portInformation',
      icon: <RiseOutlined />
    },
    {
      label: 'BackUp and Restore',
      key: 'backup',
      icon: <CloudUploadOutlined />
    }
  ]

  const BEEP_CONFIRM_MESSAGE = 'This will let device beep.'
  const REBOOT_CONFIRM_MESSAGE = 'This will reboot the device.'

  const handleItemClick = (data) => {
    console.log(data)
    const { IPAddress, MACAddress, model, deviceType } = data
    switch (data.key) {
  const { modal } = App.useApp()
  const [type, setType] = useState({
    IPAddress: {} || '',
    MACAddress: {} || '',
    model: {} || '',
    deviceType: {} || ''
  })
  console.log(setType)

  const handleItemClick = (event, data) => {
    console.log(data)
    // console.log(settype)

    // const { IPAddress:data.IPAddress, MACAddress, model, deviceType }
    switch (data.id) {
      case 'openOnOSbrowser':
        window.electron.shell.openExternal(`http://${IPAddress}`)
        break
      case 'openOnApplication':
        handleOpenWeb(IPAddress, MACAddress)
        break
      case 'telnet':
        return handleOpenTelnet(IPAddress)
        return handleOpenWeb(type.IPAddress, type.MACAddress)
      case 'telnet':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleOpenTelnet(type.IPAddress)
      case 'beep':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleBeep(IPAddress, MACAddress)
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
        return handleBeep(type.IPAddress, type.MACAddress, type.deviceType)
      case 'networkSetting':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleNetworkSetting(
          type.MACAddress,
          type.IPAddress,
          type.deviceType,
          type.model,
          type.deviceType
        )
      case 'reboot':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleReboot(type.MACAddress, type.IPAddress, type.deviceType)
      case 'deviceAdvancedSetting':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleDeviceAdvancedSetting(type.MACAddress, type.IPAddress, type.deviceType)
      case 'portInformation':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handlePortInformation(type.MACAddress, type.IPAddress, type.deviceType)
      case 'backup':
        if (type.model === 'Cisco CGS2520') {
          return null
        }
        return handleBackupConfig(type.MACAddress, type.IPAddress, type.deviceType)
      // case 'managedIp':
      //   if (model === 'Cisco CGS2520') {
      //     return null
      //   }
      //   return handleManagementIp(MACAddress, IPAddress, deviceType)
    }
  }

  const handleOpenWeb = (IPAddress, MACAddress) => {
    dispatch(requestOpenWebData({ IPAddress, MACAddress }))
    dispatch(openDialog('webBrowser'))
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

  const handleBeep = (IPAddress, MACAddress, deviceType) => {
    confirm(BEEP_CONFIRM_MESSAGE)
      .then(
        () => {
          dispatch(requestDeviceBeep({ IPAddress, MACAddress, deviceType }))
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
    confirm(REBOOT_CONFIRM_MESSAGE)
      .then(
        () => {
          dispatch(requestDeviceReboot({ MACAddress, IPAddress, deviceType }))
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
    if (deviceType !== 'gwd' || isPrecheck) {
      dispatch(initSingleNetworkSetting({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP({ MACAddress, IPAddress }, () => {
          dispatch(initSingleNetworkSetting({ MACAddress }))
        })
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
    if (deviceType !== 'gwd' || !isPrecheck) {
      dispatch(initDeviceAdvanced({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP({ MACAddress, IPAddress }, () => {
          dispatch(initDeviceAdvanced({ MACAddress }))
        })
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

  const handlePortInformation = (MACAddress, IPAddress, deviceType) => {
    if (deviceType !== 'gwd') {
      dispatch(initPortInfoData({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP({ MACAddress, IPAddress }, (result) => {
          if (result) {
            dispatch(initPortInfoData({ MACAddress }))
          } else {
            dispatch(showCheckSNMPFailModal())
          }
        })
      )
    }
  }

  const handleBackupConfig = (MACAddress, IPAddress, deviceType) => {
    if (deviceType !== 'gwd') {
      dispatch(requestGetBackupRestoreData({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP({ MACAddress, IPAddress }, (result) => {
          if (result) {
            dispatch(requestGetBackupRestoreData({ MACAddress }))
          } else {
            dispatch(showCheckSNMPFailModal())
          }
        })
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
      <ConfigProvider
        theme={{
          inherit: true,
          components: {
            Menu: {
              colorActiveBarWidth: 0,
              colorItemBg: 'transparent',
              colorSubItemBg: 'transparent',
              colorSplit: 'transparent'
            }
          }
        }}
      >
        <Menu items={items} mode="inline" onClick={handleItemClick} />
      </ConfigProvider>
      <Menu items={items} onClick={handleOpenWeb}></Menu>
    </div>
  )
}

export default RowContextMenu
