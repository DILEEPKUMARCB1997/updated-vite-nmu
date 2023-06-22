/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { DatePicker, Input, Divider, Table, Modal, Button } from 'antd'

// import {
//   clearHistoryData,
//   requestHistoryData,
//   eventLogSelector
// } from '../../../features/eventLogSlice'
// import { useDispatch, useSelector } from 'react-redux'
const { RangePicker } = DatePicker
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

const TrapHistoryDialog = (props) => {
  // const { onClose } = props
  // const dispatch = useDispatch()
  // const { trapHistoryData } = useSelector(eventLogSelector)
  const [open, setOpen] = useState(false)
  // const [tableLoading, setTableLoading] = useState(true)
  // const [sourceIP, setSourceIP] = useState('')
  // const [ge, setGe] = useState('')
  // const [le, setLe] = useState('')
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = (e) => {
    console.log(e)
    setOpen(false)
  }
  const handleCancel = (e) => {
    console.log(e)
    setOpen(false)
  }
  // useEffect(() => {
  //   setTableLoading(false)
  // }, [])

  // const handeRefreshButtonClick = () => {
  //   dispatch(
  //     requestHistoryData({
  //       type: 'trap',
  //       sourceIP: sourceIP,
  //       ge: ge,
  //       le: le
  //     })
  //   )
  // }

  // const handleCloseButtonOnClick = () => {
  //   onClose()
  //   dispatch(clearHistoryData())
  // }

  // const handleSourceIPInputOnChange = (event) => {
  //   setSourceIP({
  //     sourceIP: event.target.value
  //   })
  // }

  // const rangePickerChange = (value, dateString) => {
  //   setGe({ ge: dateString[0] })
  //   setLe({ le: dateString[1] })
  // }
  return (
    <>
      <Modal
        maxWidth={false}
        title="Trap History"
        width={1200}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: true
        }}
        cancelButtonProps={{
          disabled: false
        }}
      >
        <Input
          placeholder="Source IP"
          style={{ width: '150px', margin: '10px', marginTop: '50px' }}
          // onChange={handleSourceIPInputOnChange}
        />

        <RangePicker
          popupStyle={{ zIndex: '1301' }}
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder={['Start Time', 'End Time']}
          style={{ marginRight: '10px' }}
          // onChange={rangePickerChange}
          // onOk={rangePickerChange}
        />
        <Button
          variant="outlined"
          size="small"
          color="primary"
          style={{ height: '32px' }}
          // onClick={handeRefreshButtonClick}
        >
          Refresh
        </Button>
        <Divider style={{ margin: '10px 0px' }} />
        <Table
          // loading={tableLoading}
          rowKey="trapId"
          bordered
          columns={columns}
          // dataSource={trapHistoryData}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 'calc(80vh - 165px)', x: 1500 }}
        />
      </Modal>
    </>
  )
}

export default TrapHistoryDialog
