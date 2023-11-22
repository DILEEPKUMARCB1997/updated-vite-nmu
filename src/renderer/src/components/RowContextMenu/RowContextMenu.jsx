import React, { useCallback } from 'react'
import {
  UndoOutlined,
  ShareAltOutlined,
  FontSizeOutlined,
  SelectOutlined,
  GlobalOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  RiseOutlined,
  SoundOutlined,
  ExportOutlined
} from '@ant-design/icons'
import { ConfigProvider, Menu, App, Modal, theme, Dropdown } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { userManagementSelector } from '../../features/userManagementSlice'

const RowContextMenu = ({ position = {}, onMenuClick, record }) => {
  const { loggedInUser } = useSelector(userManagementSelector)
  const { userType } = loggedInUser
  const onClick = useCallback((e, record) => {
    onMenuClick(e.key, record)
  })
  const { token } = theme.useToken()
  const { showMenu, xPos, yPos } = position

  const items =
    userType === 'Operator'
      ? [
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
            label: 'Open on Os Browser',
            key: 'openOnOSbrowser',
            icon: <ExportOutlined />
          },
          { label: 'Open on NMU', key: 'openOnNMUApplication' },
          {
            label: 'Telnet',
            key: 'telnet',
            icon: <FontSizeOutlined />
          },
          {
            label: 'Beep',
            key: 'beep',
            icon: <SoundOutlined />
          },

          {
            label: 'Port Information',
            key: 'portInformation',
            icon: <RiseOutlined />
          }
        ]
      : [
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
            label: 'Open on Os Browser',
            key: 'openOnOSbrowser',
            icon: <ExportOutlined />
          },
          { label: 'Open on NMU', key: 'openOnNMUApplication' },
          {
            label: 'Telnet',
            key: 'telnet',
            icon: <FontSizeOutlined />
          },
          {
            label: 'Beep',
            key: 'beep',
            icon: <SoundOutlined />
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
