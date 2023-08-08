/* eslint-disable no-unused-vars */
import React from 'react'
import { Input, Button, Progress, notification, App, Typography, theme } from 'antd'
import {
  singleBackupRestoreSelector,
  requestBackupSelectFolder,
  setBackupFilename,
  requestBackup,
  requestRestoreSelectFile,
  requestRestore
} from '../../../../features/singleBackupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'

const BackupRestorePanel = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { modal } = App.useApp()
  const { backupPath, filename, isBackingUP, restorePath } = useSelector(
    singleBackupRestoreSelector
  )
  console.log(backupPath)
  console.log(filename)
  console.log(restorePath)
  const disableBackupButton = backupPath === '' || filename === '' || isBackingUP
  const disableRestoreButton = restorePath === ''
  const handleSelectFolderButtonOnClick = () => {
    dispatch(requestBackupSelectFolder())
  }
  const handleBackupFileNameInputOnChange = (event) => {
    dispatch(setBackupFilename({ filename: event.target.value }))
  }
  const handleBackupButtonOnClick = () => {
    dispatch(
      requestBackup((result) => {
        const type = result ? 'success' : 'error'
        notification[type]({
          message: `Backup configuration ${result ? 'success.' : 'fail.'}`
        })
      })
    )
  }
  const handleSelectFileButtonOnClick = () => {
    dispatch(requestRestoreSelectFile())
  }
  const showConfirm = () => {
    modal.confirm({
      zIndex: 1500,
      title: 'Do you want to restore this device?',
      onOk: () =>
        new Promise((resolve) => {
          dispatch(requestRestore(resolve))
        })
          .then((result) => {
            const type = result ? 'success' : 'error'
            notification[type]({
              message: `Restore configuration ${result ? 'success.' : 'fail.'}`
            })
            return null
          })
          .catch(() => {}),
      onCancel() {
        console.log('cancel')
      }
    })
  }

  const handleRestoreButtonOnClick = () => {
    showConfirm()
  }
  return (
    <div>
      <fieldset
        style={{
          display: 'block',
          marginLeft: '2px',
          marginRight: '2px',
          paddingTop: '0.35em',
          paddingBottom: '0.625em',
          paddingLeft: '0.75em',
          paddingRight: '0.75em'
        }}
      >
        <Typography.Title level={5} style={{ color: token.colorPrimary }}>
          Backup
        </Typography.Title>
        Path:
        <div>
          <Input
            disabled
            value={backupPath}
            style={{
              width: 'calc(100% - 145px)',
              cursor: 'unset',
              background: 'white',
              height: '34px'
            }}
          />
          <Button
            type="primary"
            ghost
            style={{ float: 'right' }}
            onClick={handleSelectFolderButtonOnClick}
          >
            Select Folder
          </Button>
        </div>
        File Name:
        <Input value={filename} onChange={handleBackupFileNameInputOnChange} />
        {isBackingUP ? (
          <Progress percent={40} />
        ) : (
          <Button
            type="primary"
            ghost
            style={{ marginTop: '16px' }}
            onClick={handleBackupButtonOnClick}
            disabled={disableBackupButton}
          >
            Backup
          </Button>
        )}
      </fieldset>
      <fieldset
        style={{
          display: 'block',
          marginLeft: '2px',
          marginRight: '2px',
          paddingTop: '0.35em',
          paddingBottom: '0.625em',
          paddingLeft: '0.75em',
          paddingRight: '0.75em'
        }}
      >
        <Typography.Title level={5} style={{ color: token.colorPrimary }}>
          Restore
        </Typography.Title>
        File:
        <div>
          <Input
            disabled
            value={restorePath}
            style={{
              width: 'calc(100% - 120px)',
              cursor: 'unset',
              background: 'white',
              height: '34px'
            }}
          />
          <Button
            type="primary"
            ghost
            style={{ float: 'right' }}
            onClick={handleSelectFileButtonOnClick}
          >
            Select File
          </Button>
        </div>
        <Button
          type="primary"
          ghost
          style={{ marginTop: '16px' }}
          onClick={handleRestoreButtonOnClick}
          disabled={disableRestoreButton}
        >
          Restore
        </Button>
      </fieldset>
    </div>
  )
}

export default BackupRestorePanel
