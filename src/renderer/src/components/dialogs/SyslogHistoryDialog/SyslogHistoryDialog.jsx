/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Modal, Divider, Table, Input, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  eventLogSelector,
  requestHistoryData,
  clearHistoryData
} from '../../../features/eventLogSlice'
import CustomRangePicker from '../Common Code/CustomRangePicker'

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

function SyslogHistoryDialog({ onClose }) {
  const { syslogHistoryData } = useSelector(eventLogSelector)
  console.log(syslogHistoryData)

  const dispatch = useDispatch()
  const [sourceIP, setSourceIP] = useState()
  const [ge, setGe] = useState('')
  const [le, setLe] = useState('')
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleSourceIPInputOnChange = (event) => {
    setSourceIP(event.target.value)
  }
  const rangePickerChange = (value, dateString) => {
    setGe(dateString[0])
    setLe(dateString[1])
  }

  const handleRefreshButtonClick = () => {
    dispatch(requestHistoryData({ type: 'syslog', sourceIP: sourceIP, ge: ge, le: le }))
  }
  const handleCloseButtonOnClick = () => {
    onClose()
    dispatch(clearHistoryData())
  }

  return (
    <Modal
      title="Syslog History"
      open
      width="80%"
      footer={null}
      onCancel={handleCloseButtonOnClick}
    >
      <div>
        <Input
          style={{ width: 150, margin: '0px 10px 0px 10px' }}
          placeholder="Source IP"
          onChange={handleSourceIPInputOnChange}
        />
        <CustomRangePicker onChange={rangePickerChange} />
        <Button
          onClick={handleRefreshButtonClick}
          type="primary"
          ghost
          style={{ marginBottom: '15px', marginLeft: '10px' }}
        >
          {' '}
          Refresh{' '}
        </Button>
      </div>
      <Divider style={{ margin: '10px 0px' }} />
      <Table
        loading={tableLoading}
        rowKey="syslogId"
        bordered
        columns={columns}
        dataSource={syslogHistoryData}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
      />
    </Modal>
  )
}

export default SyslogHistoryDialog
