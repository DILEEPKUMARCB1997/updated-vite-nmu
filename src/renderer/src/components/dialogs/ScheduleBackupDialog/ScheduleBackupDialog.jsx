import { Card, Col, Modal, Row, Typography } from 'antd'
import React from 'react'
import ConfigureSchedule from './ConfigureSchedule/ConfigureSchedule'
import DeviceList from './DeviceList/DeviceList'
import FileList from './FileList/FileList'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearData,
  getScheduledData,
  scheduleBackupSelector
} from '../../../features/scheduleBackupSlice'
import { useEffect } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'

const ScheduleBackupDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleCancelButtonOnClick = () => {
    onClose()
  }

  let intervalObj = null

  useEffect(() => {
    intervalObj = setInterval(() => {
      dispatch(getScheduledData())
    }, 20000)

    return () => {
      clearInterval(intervalObj)
      dispatch(clearData())
    }
  }, [])

  return (
    <Modal
      title={
        <Typography.Title level={4}>
          <CloudUploadOutlined /> - Schedule Backup
        </Typography.Title>
      }
      open
      style={{ top: 20 }}
      onCancel={handleCancelButtonOnClick}
      onOk={onClose}
      maskClosable={false}
      width={1200}
      closable={true}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      bodyStyle={{ height: 'calc(100vh - 150px)', overflow: 'auto', margin: 0, padding: 10 }}
    >
      <Row gutter={[15, 15]} style={{ margin: '15px' }}>
        <Col span={24}>
          <ConfigureSchedule />
        </Col>
        <Col span={16}>
          <DeviceList />
        </Col>
        <Col span={8}>
          <FileList />
        </Col>
      </Row>
    </Modal>
  )
}

export default ScheduleBackupDialog
