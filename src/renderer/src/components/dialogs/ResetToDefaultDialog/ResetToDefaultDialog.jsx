/* eslint-disable no-unused-vars */
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

const SUCCESS = 1
const ERROR = 2

const results = ['WAITING', 'SUCCESS', 'ERROR']

const columns = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
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
    key: 'status',
    render: (text, record) => (
      <span
        style={{
          color: record.status === SUCCESS ? 'green' : record.status === ERROR ? 'red' : null
        }}
      >
        {results[record.status]}
      </span>
    )
  }
]

const ResetToDefaultDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const { taskStatus, resetToDefaultStatus } = useSelector(resetToDefaultSelector)

  // console.log(taskStatus)

  const dispatch = useDispatch()
  const handleCancelButtonOnClick = () => {
    dispatch(clearResetToDefaultData())
    onClose()
  }

  const handleStartButtonOnClick = () => {
    dispatch(requestResetToDefault())
  }

  const data = Object.entries(resetToDefaultStatus).map(([key, element]) => ({
    key,
    MACAddress: key,
    IPAddress: element.IPAddress,
    model: element.model,
    status: element.status
  }))

  return (
    <div>
      <Modal
        title={
          <Typography.Title level={4}>
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
        data-testid="modalData"
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
              columns={columns}
              dataSource={data}
              pagination={{
                position: ['bottomCenter'],
                showQuickJumper: true,
                size: 'default',
                total: data.length,
                defaultPageSize: 10,
                pageSizeOptions: [10, 15, 20, 25],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              bordered
            ></Table>
          </div>
          {taskStatus === RUNNING && (
            <Progress
              size="small"
              percent={taskStatus === SUCCESS ? 100 : 0}
              data-testid="progress"
            />
          )}
          <div>
            {taskStatus === WAITING && (
              <Button
                type="primary"
                onClick={handleStartButtonOnClick}
                style={{ float: 'right', right: '25px' }}
                data-testid="startButton"
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
