/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Card, Table, Button, Alert } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSyslogData,
  eventLogSelector,
  initEventLogHistoryData
} from '../../features/eventLogSlice'
import { openDialog } from '../../features/dialogSlice.js'

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
    key: 'facility',
    title: 'Facility',
    dataIndex: 'facility',
    width: 110,
    sorter: (a, b) => a.facility - b.facility,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'severity',
    title: 'Severity',
    dataIndex: 'severity',
    width: 110,
    sorter: (a, b) => a.severity - b.severity,
    sortDirections: ['descend', 'ascend']
  },
  { key: 'tag', title: 'Tag', dataIndex: 'tag', width: 100 },
  { key: 'message', title: 'Message', dataIndex: 'message' }
]

const Syslog = () => {
  const { syslogData } = useSelector(eventLogSelector)
  const dispatch = useDispatch()

  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    setTableLoading(tableLoading)
    dispatch(initEventLogHistoryData({ type: 'syslog' }))
  }, [tableLoading])

  const handleHistoryButtonOnClick = () => {
    initEventLogHistoryData({ type: 'syslog' })
    dispatch(openDialog('sysLogHistoryDialog'))
  }
  const handleClearButtonOnClick = () => {
    dispatch(clearSyslogData(syslogData))
  }

  return (
    <Card>
      <Button
        variant="outlined"
        size="default"
        color="primary"
        onClick={handleHistoryButtonOnClick}
      >
        History
      </Button>
      <Button variant="outlined" size="default" color="primary" onClick={handleClearButtonOnClick}>
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
        dataSource={syslogData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(100vh - 365px)' }}
      />
    </Card>
  )
}

export default Syslog
