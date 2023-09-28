/* eslint-disable no-unused-vars */
/*
import React, { useCallback } from 'react'
import {
  UndoOutlined,
  ShareAltOutlined,
  FontSizeOutlined,
  UngroupOutlined,
  SelectOutlined,
  GlobalOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu, App, Modal, theme, Dropdown } from 'antd'
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
import { openPortInfoDrawer, initPortInfoData } from '../../features/portInformationSlice'
import { requestCheckSNMP } from '../../features/discoverySlice'

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

const RowContextMenu = ({ position = {} }) => {
  const dispatch = useDispatch()
  const { isPrecheck } = useSelector(snmpSelector)
  const { modal } = App.useApp()

  const handleItemClick = (data) => {
    console.log(data.key)
    const { IPAddress, MACAddress, model, deviceType } = data
    switch (data.key) {
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
      default:
        break
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

  const handleReboot = async (MACAddress, IPAddress, deviceType) => {
    const confirm = await modal.confirm({
      title: 'Confirm',
      content: 'This will reboot the device.'
    })
    console.log(confirm)
      ? setTimeout(async () => {
          const confirmed = await modal.error({
            title: 'Error !',
            type: 'error',
            content: 'Device reboot fails.'
          })
          console.log(confirmed)
        }, 3000)
      : setTimeout(async () => {
          const confirmed = await modal.success({
            title: 'Success !',
            type: 'success',
            content: 'Device reboot success.'
          })
          console.log(confirmed)
        }, 3000)
    // : setTimeout(async () => {
    //     const confirmed = await modal.error({
    //       title: 'Error !',
    //       type: 'error',
    //       content: 'Device reboot fails.'
    //     })
    //     console.log(confirmed)
    //   }, 3000)
    dispatch(
      requestDeviceReboot({
        MACAddress,
        IPAddress,
        deviceType
      })
    )
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
      )
    }
  }

  const { token } = theme.useToken()
  const { showMenu, xPos, yPos } = position

  return showMenu ? (
    <div
      style={{
        position: 'absolute',
        background: token.colorBgBase,
        top: yPos + 2 + 'px',
        left: xPos + 4 + 'px',
        boxShadow: token.boxShadowCard,
        zIndex: 30
      }}
    >
      <ConfigProvider
        theme={{
          inherit: false,
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
    </div>
  ) : null
}

export default RowContextMenu
*/

import React, { useCallback } from 'react'
import {
  UndoOutlined,
  ShareAltOutlined,
  FontSizeOutlined,
  UngroupOutlined,
  SelectOutlined,
  GlobalOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu, App, Modal, theme, Dropdown } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const items = [
  {
    label: 'OpenWeb',
    key: 'openWeb',
    icon: <GlobalOutlined />,

    children: [
      {
        label: 'Open on Os Browser',
        key: 'openOnOSbrowser',
        icon: <SelectOutlined />
      },
      { label: 'Open on NMU', key: 'openOnNMUApplication' }
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
    key: 'singleBackupConfig',
    icon: <CloudUploadOutlined />
  }
]

const RowContextMenu = ({ position = {}, onMenuClick, record }) => {
  const onClick = useCallback((e, record) => {
    onMenuClick(e.key, record)
  })
  const { token } = theme.useToken()
  const { showMenu, xPos, yPos } = position

  return showMenu ? (
    <div
      style={{
        position: 'absolute',
        background: token.colorBgBase,
        top: yPos + 2 + 'px',
        left: xPos + 4 + 'px',
        boxShadow: token.boxShadowCard,
        zIndex: 30
      }}
    >
      <ConfigProvider
        theme={{
          inherit: false,
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
        <Menu items={items} mode="inline" onClick={(e) => onClick(e, record)} />
      </ConfigProvider>
    </div>
  ) : null
}

export default RowContextMenu
