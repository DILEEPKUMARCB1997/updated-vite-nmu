/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'
import { initBackupRestoreData } from '../../../features/backupRestoreSlice'
import { useDispatch } from 'react-redux'

const SyslogSettingSnack = ({ onClose }) => {
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
        message='Please select devices for "Syslog Setting" then press "OK".'
        tipsMessage="(Support SNMP only)"
        handleOKButtonOnClick={handleOKButtonOnClick}
        onClose={handleSnackOnClose}
      />
    </div>
  )
}

export default SyslogSettingSnack
