import React, { useState, useEffect } from 'react'
import { Modal, Typography, Table, Button, Progress, theme, ConfigProvider } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import {
  clearResetToDefaultData,
  requestResetToDefault
} from '../../../features/resetToDefaultSlice'
import { useSelector, useDispatch } from 'react-redux'
import { resetToDefaultSelector } from '../../../features/resetToDefaultSlice'
import './ResetToDefaultDialog.css'

const WAITING = 0
const RUNNING = 1

// const SUCCESS = 1
// const ERROR = 2

// const results = ['WAITING', 'SUCCESS', 'ERROR']

const columns = [
  {
    title: 'Modal',
    dataIndex: 'modal',
    key: 'modal',
    sorter: (a, b) => a.modal - b.modal
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress',
    sorter: (a, b) => a.MACAddress - b.MACAddress
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => a.IPAddress - b.IPAddress
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
    // render: (data) =>
    //   data
    //     ? results[1] === SUCCESS && <span style={{ color: 'green' }} />
    //     : results[2] === ERROR && <span style={{ color: 'red' }} />
    // render: (element) =>
    //   element ? (
    //     <span style={{ color: 'green' }}>SUCCESS</span>
    //   ) : (
    //     <span style={{ color: 'red' }}>ERROR</span>
    //   )
  }
]

const ResetToDefaultDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const { taskStatus, resetToDefaultStatus } = useSelector(resetToDefaultSelector)
  console.log(resetToDefaultStatus)

  const dataSource = []
  useEffect(() => {
    dataSource.push(resetToDefaultStatus)
    console.log(dataSource)
  }, [])
  const dispatch = useDispatch()
  const handleCancelButtonOnClick = () => {
    dispatch(clearResetToDefaultData())
    onClose()
  }

  const handleStartButtonOnClick = () => {
    dispatch(requestResetToDefault())
  }

  return (
    <div>
      <Modal
        title={
          <Typography.Title
            level={4}

            // disabled={taskStatus === RUNNING}
          >
            <RedoOutlined /> - Reset To Default
          </Typography.Title>
        }
        open
        onCancel={handleCancelButtonOnClick}
        width={1000}
        footer={null}
        bodyStyle={{ height: '300px' }}
        style={{ top: '20px' }}
        maskClosable={false}
      >
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
          <div style={{ padding: '24px' }}>
            <Table
              rowKey={resetToDefaultStatus.key}
              size="middle"
              // dataSource={data(resetToDefaultStatus)}
              columns={columns}
              dataSource={[resetToDefaultStatus]}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                total: dataSource.length,
                defaultPageSize: 10,
                pageSizeOptions: [10, 15, 20, 25],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              bordered
            >
              {/* {Object.entries(resetToDefaultStatus).map(([MACAddress, element]) => (
                <Table.Summary.Row key={MACAddress}>
                  <Typography style={{ fontSize: '1rem', fontWeight: '300', padding: '12px, 8px' }}>
                    {element.modal}
                  </Typography>
                  <Typography style={{ fontSize: '1rem', fontWeight: '300', padding: '12px, 8px' }}>
                    {element.MACAddress}
                  </Typography>
                  <Typography style={{ fontSize: '1rem', fontWeight: '300', padding: '12px, 8px' }}>
                    {element.IPAddress}
                  </Typography>
                  <Typography style={{ fontSize: '1rem', fontWeight: '300', padding: '12px, 8px' }}>
                    {element.status === SUCCESS && <span style={{ color: 'green' }} />}
                    {element.status === ERROR && <span style={{ color: 'red' }} />}
                    {results[element.status]}
                  </Typography>
                </Table.Summary.Row>
              ))} */}
            </Table>
          </div>
          {taskStatus === RUNNING && <Progress />}
          <div>
            {taskStatus === WAITING && (
              <Button
                type="primary"
                onClick={handleStartButtonOnClick}
                style={{ float: 'right', right: '25px' }}
              >
                Start
              </Button>
            )}
          </div>
        </ConfigProvider>
      </Modal>
    </div>
  )
}

export default ResetToDefaultDialog
