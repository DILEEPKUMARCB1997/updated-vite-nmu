/* eslint-disable no-unused-vars */
import { Badge, ConfigProvider } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useTheme } from 'antd-style'
import { ProTable } from '@ant-design/pro-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectDiscoveryTable, discoverySelector } from '../../features/discoverySlice'

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
  const token = useTheme()
  const dispatch = useDispatch()
  const [tableType, setTableType] = useState('')
  const [groupId, setGroupId] = useState()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const { defaultDeviceArrayData, groupDeviceArrayData, SNMPSelectOnly } =
    useSelector(discoverySelector)
  const handleSort = (filterArray) => {
    if (orderBy === '') {
      return filterArray
    }
    const sortArray =
      order === 'desc'
        ? filterArray.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : filterArray.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
    return sortArray
  }
  const handleFilter = (originArray) => {
    if (searchValue === '') {
      return originArray
    }
    const filterArray = originArray.filter((device) =>
      Object.values(device).reduce(
        (isContain, value) =>
          isContain || (typeof value === 'string' && value.includes(searchValue)),
        false
      )
    )
    return filterArray
  }
  const convertToMACArray = (sortArray) => {
    let finalArray = []
    finalArray.forEach((deviceInfo) => {
      finalArray = [...finalArray, deviceInfo.MACAddress]
    })
    return finalArray
  }
  const sourceDeviceArrayData = () => {
    tableType === 'default'
      ? defaultDeviceArrayData
      : groupDeviceArrayData[groupId] !== undefined
      ? groupDeviceArrayData[groupId]
      : defaultDeviceArrayData
    return { sourceDeviceArrayData }
  }
  const viewDevicesData = convertToMACArray(handleSort(handleFilter(sourceDeviceArrayData)))
  const handleCheckBoxChange = (isSelect) => {
    dispatch(
      selectDiscoveryTable({
        isSelect,
        deviceData: viewDevicesData
      })
    )
  }
  const { isAUZ, deviceType, online } = deviceData
  const isSupportSNMP = deviceType !== 'gwd'
  const disableCheckBox = !isAUZ || !online || (!isSupportSNMP && SNMPSelectOnly)
  const [inputSearch, setInputSearch] = useState('')
  const recordAfterfiltering = (dataSource) => {
    return dataSource.filter((row) => {
      let rec = columns.map((element) => {
        return row[element.dataIndex].toString().includes(inputSearch)
      })
      return rec.includes(true)
    })
  }

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
          onChange={handleCheckBoxChange}
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
              }
            }
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default DeviceTable
