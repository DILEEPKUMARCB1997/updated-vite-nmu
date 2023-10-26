/* eslint-disable no-unused-vars */
import { Modal, Typography, Divider, Row, Col, theme } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import DeviceList from './DeviceList/DeviceList'
import FileList from './FileList/FileList'
import { useDispatch } from 'react-redux'
import { clearData } from '../../../features/backupRestoreSlice'

// import { backupRestoreSelector } from '../../../features/backupRestoreSlice'
// import { useSelector } from 'react-redux'

const BackupRestoreDialog = ({ onClose }) => {
  // const { selectDevice } = useSelector(backupRestoreSelector)
  const { useToken } = theme
  const { token } = useToken()
  const [didMount, setDidMount] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      setDidMount(true)
    }, 200)

    return () => {
      dispatch(clearData())
    }
  }, [])

  const handleCancelButtonOnClick = () => {
    setDidMount(false)

    setTimeout(() => {
      onClose()
    }, 400)
  }
  return (
    <div>
      <Modal
        title={
          <Typography.Title level={4}>
            {' '}
            <CloudUploadOutlined /> - Backup and Restore
          </Typography.Title>
        }
        open
        onCancel={handleCancelButtonOnClick}
        onClose={handleCancelButtonOnClick}
        width={1000}
        maskClosable={false}
        // bodyStyle={{
        //   height: '520px'
        // }}
        style={{
          top: '20px'
        }}
        footer={null}
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={14}>
            {' '}
            <DeviceList didMount={didMount} />
          </Col>
          <Col className="gutter-row" span={10}>
            {' '}
            <FileList didMount={didMount} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default BackupRestoreDialog
