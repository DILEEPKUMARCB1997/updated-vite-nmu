import React from 'react'
import { Table } from 'antd'
// import PropTypes from 'prop-types'
// import styles from './FWUDoneTable.scss'
//import FWUDoneTableRow from './FWUDoneTableRow/FWUDoneTableRow'
import { useSelector } from 'react-redux'
import { firmwareSelector } from '../../../features/firmwareUpdate'

const columnData = [
  { key: 'model', title: 'Model' },
  { key: 'IPAddress', title: 'IP Address' },
  { key: 'MACAddress', title: 'MAC Address' },
  { key: 'status', title: 'Status' }
]

const FWUDoneTable = () => {
  const { FWUDoneDeviceData } = useSelector(firmwareSelector)
  console.log(FWUDoneDeviceData)
  const dataSource = Object.entries(FWUDoneDeviceData).map(([key, value]) => ({
    key,
    MACAddress: key,
    IPAddress: value.IPAddress,
    model: value.model,
    status: value.status
  }))
  const columns = columnData.map((column) => ({
    title: column.title,
    dataIndex: column.key,
    key: column.key
  }))

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="MACAddress"
      // className={styles.table}
    />
  )
}

export default FWUDoneTable
