/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { initBackupRestoreData } from '../../../features/backupRestoreSlice'
import { useDispatch } from 'react-redux'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'

const BackupRestoreSnack = ({ onClose }) => {
  const dispatch = useDispatch()

  const handleSnackOnClose = () => {
    onClose()
  }

  const handleOKButtonOnClick = () => {
    dispatch(initBackupRestoreData())
  }
  return (
    <div>
      <BasicSnackTemplate
        message='Please select devices for "Backup or Restore" then press "OK".'
        tipsMessage="(Support SNMP only)"
        handleOKButtonOnClick={handleOKButtonOnClick}
        onClose={handleSnackOnClose}
      />
    </div>
  )
}

export default BackupRestoreSnack
