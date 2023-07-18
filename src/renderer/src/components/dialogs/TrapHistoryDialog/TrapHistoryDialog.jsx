/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Divider, Table, Typography } from 'antd'
import {
  requestHistoryData,
  eventLogSelector,
  clearHistoryData
  // clearHistoryData
} from '../../../features/eventLogSlice'
import { useDispatch, useSelector } from 'react-redux'
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

const TrapHistoryDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const { trapHistoryData } = useSelector(eventLogSelector)
  const [tableLoading, setTableLoading] = useState(true)
  const [sourceIP, setSourceIP] = useState('')
  const [ge, setGe] = useState('')
  const [le, setLe] = useState('')

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleSourceIPInputOnChange = (event) => {
    setSourceIP({
      sourceIP: event.target.value
    })
  }

  const rangePickerChange = (value, dateString) => {
    setGe({ ge: dateString[0] })
    setLe({ le: dateString[1] })
  }

  const handleRefreshButtonClick = () => {
    dispatch(
      requestHistoryData({
        type: 'trap',
        sourceIP: sourceIP,
        ge: ge,
        le: le
      })
    )
  }

  const handleCloseButtonOnClick = () => {
    onClose()
    dispatch(clearHistoryData())
  }

  return (
    <>
      <Modal open onCancel={handleCloseButtonOnClick} footer={null} width="80%">
        <Typography>
          <h5>Trap History</h5>
        </Typography>
        <Input
          placeholder="Source IP"
          style={{
            width: 150,
            margin: '0px 10px 0px 10px',
            marginTop: '10px'
          }}
          onChange={handleSourceIPInputOnChange}
        />
        <CustomRangePicker onChange={rangePickerChange} />
        <Button type="primary" ghost onClick={handleRefreshButtonClick}>
          Refresh
        </Button>

        <Divider style={{ margin: '10px 0px' }} />
        <Table
          loading={tableLoading}
          rowKey="trapId"
          bordered
          columns={columns}
          dataSource={trapHistoryData}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
        />
      </Modal>
    </>
  )
}

export default TrapHistoryDialog
