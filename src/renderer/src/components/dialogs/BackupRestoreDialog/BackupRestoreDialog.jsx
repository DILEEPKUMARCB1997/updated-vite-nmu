/* eslint-disable no-unused-vars */
import { Modal, Typography, Divider, Row, Col, theme } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import DeviceList from './DeviceList/DeviceList'
import FileList from './FileList/FileList'
// import { backupRestoreSelector } from '../../../features/backupRestoreSlice'
// import { useSelector } from 'react-redux'

const BackupRestoreDialog = ({ onClose }) => {
  // const { selectDevice } = useSelector(backupRestoreSelector)
  const { useToken } = theme
  const { token } = useToken()
  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setDidMount({ didMount: true })
    }, 200)
  }, [])
  const handleCancelButtonOnClick = () => {
    setDidMount({ didMount: false })
    setTimeout(() => {
      onClose()
    }, 400)
  }
  return (
    <div>
      <Modal
        open
        onCancel={onClose}
        width={1000}
        bodyStyle={{
          height: '500px'
        }}
        style={{
          top: '5px'
        }}
        footer={null}
      >
        <Typography.Title
          level={4}
          style={{ color: token.colorPrimary }}
          onClick={handleCancelButtonOnClick}
        >
          {' '}
          <CloudUploadOutlined /> Backup and Restore
        </Typography.Title>

        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            {' '}
            <DeviceList didMount={didMount} />
          </Col>
          <Col className="gutter-row" span={12}>
            {' '}
            <FileList />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default BackupRestoreDialog
