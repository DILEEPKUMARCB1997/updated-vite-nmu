/* eslint-disable no-unused-vars */
import { App, Badge, ConfigProvider } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'antd-style'
import { ProTable } from '@ant-design/pro-components'
import RowContextMenu from '../RowContextMenu/RowContextMenu'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDiscoveryTable, discoverySelector } from '../../features/discoverySlice'
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
// import EnhanceCheckBox from './EnhanceCheckBox/EnhanceCheckBox'

const columns = [
  {
    title: 'Online',
    dataIndex: 'online',
    key: 'online',
    render: (data) =>
      data ? (
        <Badge color="green" className="cutomBadge" status="processing" />
      ) : (
        <Badge status="error" className="cutomBadge" />
      )
  },
  {
    title: 'Device Type',
    dataIndex: 'deviceType',
    key: 'deviceType',
    valueEnum: {
      all: { text: 'Basic/SNMP' },
      gwd: { text: 'Basic' },
      snmp: { text: 'SNMP' },
      unknown: { text: 'N/A' }
    }
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    sorter: (a, b) => (a.model > b.model ? 1 : -1)
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => (a.IPAddress > b.IPAddress ? 1 : -1)
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress'
  },
  {
    title: 'Hostname',
    dataIndex: 'hostname',
    key: 'hostname'
  },
  {
    title: 'Kernel',
    dataIndex: 'kernel',
    key: 'kernel'
  },
  {
    title: 'Ap',
    dataIndex: 'ap',
    key: 'ap'
  },
  {
    title: 'Access',
    dataIndex: 'isAUZ',
    key: 'isAUZ',
    render: (data) =>
      data ? (
        <CheckOutlined style={{ color: '#49aa19' }} />
      ) : (
        <CloseOutlined style={{ color: 'red' }} />
      )
  }
]

const DeviceTable = ({ deviceData = [] }) => {
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [contextRecord, setContextRecord] = useState({})
  const token = useTheme()
  const dispatch = useDispatch()
  const { isPrecheck } = useSelector(snmpSelector)
  const { modal } = App.useApp()

  const showCheckSNMPFailModal = () => {
    modal.error({
      title: 'Check SNMP feature fail. ',
      content: 'Please check SNMP of this device is enable.'
    })
  }

  const { defaultDeviceArrayData, groupDeviceArrayData, SNMPSelectOnly, showCheckBox } =
    useSelector(discoverySelector)

  const [inputSearch, setInputSearch] = useState('')
  const recordAfterfiltering = (dataSource) => {
    return dataSource.filter((row) => {
      let rec = columns.map((element) => {
        return row[element.dataIndex].toString().includes(inputSearch)
      })
      return rec.includes(true)
    })
  }

  const handleContextMenu = useCallback(
    (e) => {
      console.log(e)
      // e.preventDefault()
      setXPos(e.pageX - 220)
      setYPos(e.pageY - 150)
      setShowMenu(true)
    },
    [setXPos, setYPos]
  )

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false)
  }, [showMenu])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.addEventListener('click', handleClick)
    }
  })

  const handleItemClick = (key, data) => {
    console.log(data)
    const { IPAddress, MACAddress, model, deviceType } = data
    switch (key) {
      case 'openOnOSbrowser':
        window.electron.shell.openExternal(`http://${IPAddress}`)
        break
      case 'openOnNMUApplication':
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
        console.log(MACAddress, IPAddress, deviceType, model, deviceType)
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
      case 'singleBackupConfig':
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
    console.log(MACAddress, IPAddress, deviceType)
    dispatch(openAdvanceDrawer(true), dispatch(openDialog('advanceSetting')))
    if (deviceType !== 'gwd' || !isPrecheck) {
      dispatch(initDeviceAdvanced({ MACAddress }))
    } else {
      requestCheckSNMP(
        {
          MACAddress,
          IPAddress
        },
        () => {
          dispatch(initDeviceAdvanced({ MACAddress }))
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
    // dispatch(openDialog('singleBackupConfig'))
    if (deviceType !== 'gwd') {
      dispatch(requestGetBackupRestoreData({ MACAddress }))
    } else {
      dispatch(
        requestCheckSNMP(
          {
            MACAddress,
            IPAddress
          },
          (result) => {
            if (result) {
              dispatch(requestGetBackupRestoreData({ MACAddress }))
            } else {
              dispatch(showCheckSNMPFailModal())
            }
          }
        )
      )
    }
  }
  // const handleCheckBoxChange = () => {
  //   dispatch(
  //     selectDiscoveryTable({
  //       isSelect
  //     })
  //   )
  // }

  return (
    <div>
      {' '}
      <ConfigProvider
        theme={{
          inherit: true,
          components: {
            Table: {
              colorFillAlter: token.colorPrimaryBg,
              fontSize: 14
            }
          }
        }}
      >
        {/* <EnhanceCheckBox
          disable={false}
          groupId={groupId}
          parents="header"
          handleCheckBoxChange={handleCheckBoxChange}
          viewDevicesData={viewDevicesData}
        /> */}
        <ProTable
          cardProps={{
            style: { boxShadow: token?.Card?.boxShadow }
          }}
          headerTitle="Device List"
          columns={columns}
          dataSource={recordAfterfiltering(deviceData)}
          rowKey="MACAddress"
          size="small"
          pagination={{
            position: ['bottomCenter'],
            showQuickJumper: true,
            size: 'default',
            total: recordAfterfiltering(deviceData).length,
            defaultPageSize: 10,
            pageSizeOptions: [10, 15, 20, 25],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{
            x: 1100
          }}
          rowSelection={showCheckBox}
          // // disable={disableCheckBox}
          // onChange={handleCheckBoxChange}
          // viewDevicesData={viewDevicesData}

          toolbar={{
            search: {
              onSearch: (value) => {
                setInputSearch(value)
              }
            }
          }}
          options={{
            reload: false,
            fullScreen: false,
            density: false,
            setting: false
          }}
          search={false}
          dateFormatter="string"
          columnsState={{
            persistenceKey: 'device-table',
            persistenceType: 'localStorage'
          }}
          onRow={(record) => {
            return {
              onContextMenu: (event) => {
                console.log(event)
                setContextRecord(record)
                handleContextMenu(event)
              }
            }
          }}
        />
        <RowContextMenu
          position={{ showMenu, xPos, yPos }}
          record={contextRecord}
          onMenuClick={handleItemClick}
        />
      </ConfigProvider>
    </div>
  )
}

export default DeviceTable
