import React from 'react'
import { Modal, Typography, Table, Button, Layout } from 'antd'
import {
  clearResetToDefaultData,
  requestResetToDefault
} from '../../../features/resetToDefaultSlice'
import { useSelector, useDispatch } from 'react-redux'
import { resetToDefaultSelector } from '../../../features/resetToDefaultSlice'

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
    key: 'IPAddress'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }
]

const WAITING = 0
const RUNNING = 1

const SUCCESS = 1
const ERROR = 2

const results = ['WAITING', 'SUCCESS', 'ERROR']

const ResetToDefaultDialog = ({ onClose }) => {
  const { resetToDefaultStatus, taskStatus, waitingDeviceCount } =
    useSelector(resetToDefaultSelector)
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
      <Modal open onCancel={onClose} width="100%" footer={null}>
        <Typography.Title
          level={5}
          onClick={handleCancelButtonOnClick}
          disabled={taskStatus === RUNNING}
        >
          Reset To Default
        </Typography.Title>
        <div>
          <Table rowKey="MACAddress" columns={columns} bordered />
        </div>
        <div>
          <Button type="primary" onClick={handleStartButtonOnClick}>
            Start
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ResetToDefaultDialog
