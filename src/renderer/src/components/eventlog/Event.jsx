/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearEventData, eventLogSelector, requestHistoryData } from '../../features/eventLogSlice'

function Event() {
  const { eventData } = useSelector(eventLogSelector)
  console.log(eventData)
  const dispatch = useDispatch()
  const [tableLoading, setTableLoading] = useState(true)
  const [isEventHistoryModalOpen, setIsEventHistoryModalOpen] = useState(false)
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
      key: 'IPAddress',
      title: 'Source IP',
      dataIndex: 'IPAddress',
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

  useEffect(() => {
    setTableLoading(false)
  }, [])

  const handleHistoryButtonOnClick = () => {
    dispatch(
      requestHistoryData({
        type: 'event',
        MACAddress: '',
        ge: '',
        le: ''
      })
    )
  }

  const handleClearButtonOnClick = () => {
    dispatch(clearEventData())
  }

  return (
    // <div>Events</div>
    <div>
      <Card>
        <Button onClick={handleHistoryButtonOnClick}>History</Button>
        <Button onClick={handleClearButtonOnClick}>Clear</Button>
        <Alert
          message="Here you can check today's log data, please check history for past data."
          type="warning"
          showIcon
        />
        <Table columns={columns} dataSource={eventData} loading={tableLoading} />
      </Card>
    </div>
  )
}

export default Event
