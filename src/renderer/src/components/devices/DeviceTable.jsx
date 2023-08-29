/* eslint-disable no-unused-vars */
import { Badge, ConfigProvider } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'antd-style'
import { ProTable } from '@ant-design/pro-components'
import RowContextMenu from '../RowContextMenu/RowContextMenu'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDiscoveryTable, discoverySelector } from '../../features/discoverySlice'
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
  const token = useTheme()
  const dispatch = useDispatch()
  // const [tableType, setTableType] = useState('')
  // const [groupId, setGroupId] = useState()
  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('')
  // const [searchValue, setSearchValue] = useState('')
  const { defaultDeviceArrayData, groupDeviceArrayData, SNMPSelectOnly, showCheckBox } =
    useSelector(discoverySelector)
  // const handleSort = (filterArray) => {
  //   if (orderBy === '') {
  //     return filterArray
  //   }
  //   const sortArray =
  //     order === 'desc'
  //       ? filterArray.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
  //       : filterArray.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
  //   return sortArray
  // }
  // const handleFilter = (originArray) => {
  //   if (searchValue === '') {
  //     return originArray
  //   }
  //   const filterArray = originArray.filter((device) =>
  //     Object.values(device).reduce(
  //       (isContain, value) =>
  //         isContain || (typeof value === 'string' && value.includes(searchValue)),
  //       false
  //     )
  //   )
  //   return filterArray
  // }
  // const convertToMACArray = (sortArray) => {
  //   let finalArray = []
  //   finalArray.forEach((deviceInfo) => {
  //     finalArray = [...finalArray, deviceInfo.MACAddress]
  //   })
  //   return finalArray
  // }
  // const sourceDeviceArrayData = () => {
  //   tableType === 'default'
  //     ? defaultDeviceArrayData
  //     : groupDeviceArrayData[groupId] !== undefined
  //     ? groupDeviceArrayData[groupId]
  //     : defaultDeviceArrayData
  //   return { sourceDeviceArrayData }
  // }
  // const viewDevicesData = convertToMACArray(handleSort(handleFilter(sourceDeviceArrayData)))
  // const handleCheckBoxChange = (isSelect) => {
  //   dispatch(
  //     selectDiscoveryTable({
  //       isSelect,
  //       deviceData: viewDevicesData
  //     })
  //   )
  // }
  // const { isAUZ, deviceType, online } = deviceData
  // const isSupportSNMP = deviceType !== 'gwd'
  // const disableCheckBox = !isAUZ || !online || (!isSupportSNMP && SNMPSelectOnly)
  // const handleCheckBoxChange = (isSelect, MACAddress) => {
  //   dispatch(
  //     selectDiscoveryTable({
  //       isSelect,
  //       deviceData: [MACAddress]
  //     })
  //   )
  // }
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

  return (
    <div>
      {' '}
      <ConfigProvider
        theme={{
          inherit: false,
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
          // disable={disableCheckBox}
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
          onRow={(record, rowIndex) => {
            return {
              onContextMenu: (event) => {
                console.log(event)
                handleContextMenu(event)
              }
            }
          }}
        />
        <RowContextMenu position={{ showMenu, xPos, yPos }} />
      </ConfigProvider>
    </div>
  )
}

export default DeviceTable
