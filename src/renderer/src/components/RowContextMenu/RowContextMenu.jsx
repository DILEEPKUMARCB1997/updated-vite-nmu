import React, { useState } from 'react'
import { Menu } from 'antd'
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
//import { shell } from 'electron'
//import WebBrowserDialog from '../dialogs/webBrowswerDialog/WebBrowserDialog'
import { useDispatch } from 'react-redux'
import { openDialog } from '../../features/dialogSlice'
//import { openDialog } from '../../../features/dialogSlice'
import { requestOpenWebData } from '../../features/openWebSlice'
// /const shell = require('electron').shell
// import { shell } from 'electron'
//import WebBrowserDialog from '../dialogs/webBrowswerDialog/WebBrowserDialog'

const RowContextMenu = () => {
  const dispatch = useDispatch()
  const [current, setCurrent] = useState('mail')
  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const handleItemClick = (event, data) => {
    const { IPAddress, MACAddress, model, deviceType } = data
    switch (data.id) {
      case 'openOnOSbrowser':
        window.electron.shell.openExternal(`http://${IPAddress}`)
        window.electron.shell.openExternal(
          'https://marketplace.visualstudio.com/items?itemName=lzrnic.javascript-vscode-extension'
        )
        break
      case 'openOnApplication':
        return handleOpenWeb(IPAddress, MACAddress)
      default:
        break
    }
  }
  const handleOpenWeb = (IPAddress, MACAddress) => {
    console.log(IPAddress)
    console.log(MACAddress)
    dispatch(
      requestOpenWebData({
        IPAddress,
        MACAddress
      })
    )
    dispatch(openDialog('webBrowser'))
  }

  return (
    <div>
      <Menu
        onClick={onClick}
        // onChange={handleOpenWeb}
        selectedKeys={[current]}
        mode="vertical"
        onOpenChange={handleOpenWeb}
        items={[
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
        ]}
      ></Menu>
    </div>
  )
}

export default RowContextMenu
