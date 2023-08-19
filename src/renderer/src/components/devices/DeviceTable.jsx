/* eslint-disable no-unused-vars */
import { Badge, ConfigProvider } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useTheme } from 'antd-style'
import { ProTable } from '@ant-design/pro-components'
import RowContextMenu from '../RowContextMenu/RowContextMenu'
import { openDialog } from '../../features/dialogSlice'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()
  const token = useTheme()
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
              onContextMenu: (event) => {}
            }
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default DeviceTable
