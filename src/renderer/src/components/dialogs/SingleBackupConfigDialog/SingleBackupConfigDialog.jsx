/* eslint-disable no-unused-vars */
import { Alert, Modal, Typography, theme } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import { singleBackupRestoreSelector, clearData } from '../../../features/singleBackupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'
import BackupRestorePanel from './BackupRestorePanel/BackupRestorePanel'

const TIPS_TEXT =
  'If Backup or Restore fail, please check you select NIC with a real external IP.' +
  ' (File \u279E Preferences \u279E General \u279E Network Interface Card)'
const SingleBackupConfigDialog = ({ onClose }) => {
  const { useToken } = theme
  const { token } = useToken()
  const { MACAddress, isBackingUP } = useSelector(singleBackupRestoreSelector)
  const disableCancel = isBackingUP
  const [didMount, setDidMount] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      setDidMount({ didMount: true })
    }, 200)
    return () => {
      dispatch(clearData())
    }
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
        title={
          <Typography.Title
            level={4}
            // style={{ color: token.colorPrimary }}
          >
            {' '}
            <CloudUploadOutlined /> {`${MACAddress} - Backup and Restore`}
          </Typography.Title>
        }
        style={{ top: 20 }}
        onCancel={handleCancelButtonOnClick}
        maskClosable={false}
        width={1000}
        closable={true}
        footer={null}
        cancelButtonProps={{ disabled: disableCancel }}
      >
        <div>
          <BackupRestorePanel didMount={didMount} />
        </div>
        <Alert message={TIPS_TEXT} banner type="info" showIcon style={{ marginTop: '5px' }} />
      </Modal>
    </div>
  )
}

export default SingleBackupConfigDialog
