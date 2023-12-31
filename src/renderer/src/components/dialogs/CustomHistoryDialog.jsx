import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Divider, Input, Modal, Table, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearHistoryData,
  eventLogSelector,
  requestHistoryData
} from '../../features/eventLogSlice'
import CustomRangePicker from './Common Code/CustomRangePicker'

const CustomHistoryDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const [tableLoading, setTableLoading] = useState(true)
  const [sourceIP, setSourceIp] = useState('')
  const [dateRange, setDateRange] = useState({ ge: '', le: '' })
  const { customEventHistoryData } = useSelector(eventLogSelector)
  console.log(customEventHistoryData)
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
  useEffect(() => {
    setTableLoading(false)
  }, [])
  const handleMACAddressInputChange = (event) => {
    setSourceIp(event.target.value)
  }
  const rangePickerChange = (value, dateString) => {
    setDateRange({ ...dateRange, ge: dateString[0], le: dateString[1] })
  }
  const handleRefreshButtonClick = () => {
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: sourceIP,
        ge: dateRange.ge,
        le: dateRange.le
      })
    )
  }
  const handleCloseButtonOnClick = () => {
    dispatch(onClose())
    clearHistoryData()
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
        title="Trap History"
        open
        onOk={onClose}
        closable={true}
        maskClosable={false}
        onCancel={handleCloseButtonOnClick}
        width={1200}
        style={{ top: 20 }}
        bodyStyle={{
          height: 'calc(100vh - 150px)',
          margin: 0,
          paddingTop: 10,
          paddingBottom: '10px'
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
        <div style={{ display: 'inline-flex', marginTop: '9px' }}>
          <Input
            placeholder="MAC Address"
            style={{ width: '150px', margin: '0px 10px 0px 10px' }}
            onChange={handleMACAddressInputChange}
          />
          <CustomRangePicker onChange={rangePickerChange} />
          <Button
            type="primary"
            ghost
            // style={{ margin: '10px' }}
            onClick={handleRefreshButtonClick}
            // className={styles.refreshButton}
          >
            Refresh
          </Button>
        </div>
        <Divider style={{ margin: '10px 0px' }} />
        <Table
          style={{ height: '50%', tableLayout: 'auto' }}
          loading={tableLoading}
          rowKey="trapId"
          bordered
          columns={columns}
          dataSource={customEventHistoryData}
          pagination={{
            // showQuickJumper: true,
            // showSizeChanger: true,
            size: 'default',
            defaultPageSize: 25,
            pageSizeOptions: [25, 50, 75, 100],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ y: 'calc(80vh - 165px)' }}
        />
      </Modal>
    </ConfigProvider>
  )
}
export default CustomHistoryDialog
