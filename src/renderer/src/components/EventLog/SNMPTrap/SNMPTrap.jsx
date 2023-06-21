/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './SNMPTrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Alert } from 'antd'
import { Card, Button } from 'antd'
import {
  initEventLogHistroyData,
  clearTrapData,
  eventLogSelector
} from '../../../features/eventlogSlice'

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
    key: 'sourceIP',
    title: 'Source IP',
    dataIndex: 'sourceIP',
    width: 150,
    sorter: (a, b) => (a.sourceIP > b.sourceIP ? 1 : -1),
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'upTime',
    title: 'Up Time',
    dataIndex: 'upTime',
    width: 150,
    sorter: (a, b) => a.upTime - b.upTime,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'specific',
    title: 'GT',
    dataIndex: 'specific',
    width: 80,
    sorter: (a, b) => a.specific - b.specific,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'generic',
    title: 'ST',
    dataIndex: 'generic',
    width: 80,
    sorter: (a, b) => a.generic - b.generic,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'version',
    title: 'Version',
    dataIndex: 'version',
    width: 120,
    sorter: (a, b) => a.version - b.version,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    dataIndex: 'enterprise',
    width: 180
  },
  { key: 'community', title: 'Community', dataIndex: 'community', width: 110 },
  { key: 'msg', title: 'Description', dataIndex: 'msg', width: 150 }
]

const SNMPTrap = () => {
  const dispatch = useDispatch()
  const { trapData } = useSelector(eventLogSelector)
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => {
    setTableLoading({ tableLoading: false })
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(initEventLogHistroyData({ type: 'trap' }))
  }
  const handleClearButtonOnClick = () => {
    dispatch(clearTrapData())
  }

  return (
    <Card className="content">
      <Button
        className="historyButton"
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleHistoryButtonOnClick}
      >
        History
      </Button>
      <Button
        className="clearButton"
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClearButtonOnClick}
      >
        Clear
      </Button>
      <Alert
        message="Here can check today log data, please check history for past data."
        type="warning"
        showIcon
      />
      <Table
        loading={tableLoading}
        bordered
        columns={columns}
        dataSource={trapData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(100vh - 365px)', x: 1500 }}
      />
    </Card>
  )
}

export default SNMPTrap
