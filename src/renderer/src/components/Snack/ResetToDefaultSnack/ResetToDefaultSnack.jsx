/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react'
import { setSNMPSelectOnly } from '../../../features/discoverySlice'
import { useDispatch } from 'react-redux'
import { initResetToDefaultData } from '../../../features/resetToDefaultSlice'
import { openDialog } from '../../../features/dialogSlice'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'

const ResetToDefaultSnack = ({ onClose }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSNMPSelectOnly(false))
  }, [])
  const handleOKButtonOnClick = () => {
    dispatch(initResetToDefaultData())
    dispatch(openDialog('resetToDefault'))
  }
  const handleSnackOnClose = () => {
    onClose()
  }
  return (
    <div>
      <BasicSnackTemplate
        message='Please select devices for "Reset To Default" then press "OK".'
        tipsMessage="(Support SNMP only)"
        handleOKButtonOnClick={handleOKButtonOnClick}
        onClose={handleSnackOnClose}
      />
    </div>
  )
}

export default ResetToDefaultSnack
