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
    key: 'backupAndRestore',
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
