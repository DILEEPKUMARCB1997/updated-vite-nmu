/*
import React, { useState, useEffect } from 'react'
import { Table, Modal } from 'antd'
import { dashboardSelector } from '../../../features/dashboardSlice'
import { useSelector } from 'react-redux'

const columns = [
  {
    key: 'createAt',
    title: 'Time',
    dataIndex: 'createAt',
    width: 200,
    defaultSortOrder: 'descend',
    sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt)
  },
  {
    key: 'eventCondition',
    title: 'Event Condition',
    dataIndex: 'eventCondition'
  },
  {
    key: 'severity',
    title: 'Severity',
    dataIndex: 'severity',
    sorter: (a, b) => (a.severity > b.severity ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'sourceIP',
    title: 'Source IP',
    dataIndex: 'sourceIP',
    width: 150,
    sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  { key: 'model', title: 'Model', dataIndex: 'model', width: 200 },
  {
    key: 'MACAddress',
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    width: 200
  },
  { key: 'msg', title: 'Message', dataIndex: 'msg' }
]

const CustomGraphTableDialog = ({ onClose }) => {
  const { customTableData } = useSelector(dashboardSelector)
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    setTableLoading(tableLoading)
  }, [tableLoading])

  const handleCloseButtonOnClick = () => {
    onClose()
  }

  return (
    <Modal
      open
      maxWidth={false}
      title={<span style={{ float: 'left', marginTop: '12px' }}>Custom Event Graph Data</span>}
      onCancel={handleCloseButtonOnClick}
    >
      <Table
        loading={tableLoading}
        rowKey="eventId"
        bordered
        columns={columns}
        dataSource={customTableData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(80vh - 160px)', x: 1500 }}
        rowClassName={(record) => {
          if (record.severity === 'Information') return 'table-information'
          if (record.severity === 'Warning') return 'table-warning'
          if (record.severity === 'Critical') return 'table-critical'
          return ''
        }}
      />
    </Modal>
  )
}

export default CustomGraphTableDialog
*/
