import React from 'react'
import { Table } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'

const columnData = [
  { key: 'model', label: 'Model' },
  { key: 'IPAddress', label: 'IP Address' },
  { key: 'MACAddress', label: 'MAC Address' },
  { key: 'status', label: 'Status' }
]

const FWUDoneTable = () => {
  const { FWUDoneDeviceData } = useSelector(firmwareSelector)
  const columns = columnData.map((column) => ({
    title: column.label,
    dataIndex: column.key,
    key: column.key
  }))

  return (
    <Table
      columns={columns}
      dataSource={FWUDoneDeviceData.map((value) => ({ MACAddress: value }))}
      rowKey="MACAddress"
      pagination={false}
    />
  )
}

export default FWUDoneTable
