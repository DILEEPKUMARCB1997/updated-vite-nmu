/* eslint-disable prettier/prettier */
import { Alert, Button, Card, Table } from 'antd'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventLogSelector } from '../../features/eventLogSlice'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../../main/utils/IPCEvents'

function Event() {
  const { eventHistoryData } = useSelector(eventLogSelector)
  console.log(eventHistoryData)
  const dispatch = useDispatch()

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

  useEffect((param) => {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
      const { data } = arg
      console.log(arg)
      dispatch(updateEventHistory(data))
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
  })
  return (
    <div>Events</div>
    // <div>
    //   <Card>
    //     <Button>History</Button>
    //     <Button>Clear</Button>
    //     <Alert
    //       message="Here you can check today's log data, please check history for past data."
    //       type="warning"
    //       showIcon
    //     />
    //     <Table columns={columns} />
    //   </Card>
    // </div>
  )
}

export default Event
