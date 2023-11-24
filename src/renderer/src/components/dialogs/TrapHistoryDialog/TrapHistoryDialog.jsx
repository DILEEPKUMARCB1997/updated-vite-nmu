/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Modal, Input, Button, Divider, Table, Typography, ConfigProvider, theme } from 'antd'
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
    width: 150,
    sorter: (a, b) => a.specific - b.specific,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'generic',
    title: 'ST',
    dataIndex: 'generic',
    width: 150,
    sorter: (a, b) => a.generic - b.generic,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'version',
    title: 'Version',
    dataIndex: 'version',
    width: 100,
    sorter: (a, b) => a.version - b.version,
    sortDirections: ['descend', 'ascend']
  },
  {
    key: 'enterprise',
    title: 'Enterprise',
    dataIndex: 'enterprise',
    width: 150
  },
  { key: 'community', title: 'Community', dataIndex: 'community', width: 150 },
  { key: 'msg', title: 'Description', dataIndex: 'msg' }
]

const TrapHistoryDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { trapHistoryData } = useSelector(eventLogSelector)
  // console.log(trapHistoryData)
  const [tableLoading, setTableLoading] = useState(true)
  const [sourceIP, setSourceIP] = useState('')
  const [ge, setGe] = useState('')
  const [le, setLe] = useState('')

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
    console.log(trapHistoryData)
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
    <ConfigProvider
      theme={{
        inherit: true,
        components: {
          Table: {
            colorFillAlter: token.colorPrimaryBg,
            fontSize: 14
          }
        }
      }}
    >
      <Modal
        open
        onCancel={handleCloseButtonOnClick}
        width="90%"
        title="Trap History"
        onOk={onClose}
        closable={true}
        maskClosable={false}
        style={{ top: 20 }}
        bodyStyle={{
          // height: 'calc(70vh - 150px)',
          margin: 0,
          paddingTop: 10,
          paddingBottom: '10px'
          // height: '50%'
        }}
        okButtonProps={{
          style: {
            display: 'none'
          }
        }}
        cancelButtonProps={{
          style: {
            display: 'none'
          }
        }}
      >
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
          pagination={{
            // showQuickJumper: true,
            // showSizeChanger: true,
            size: 'default',
            defaultPageSize: 25,
            pageSizeOptions: [25, 50, 75, 100],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ y: 'calc(80vh - 195px)', x: 1500 }}
        />
      </Modal>
    </ConfigProvider>
  )
}

export default TrapHistoryDialog
