/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'
import { initTrapSettingData } from '../../../features/trapSettingSlice'
import { useDispatch } from 'react-redux'

const TrapSettingSnack = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleSnackOnClose = () => {
    onClose()
  }

  const handleOKButtonOnClick = () => {
    dispatch(initTrapSettingData())
  }
  return (
    <div>
      <BasicSnackTemplate
        message='Please select devices for "Trap Setting" then press "OK".'
        tipsMessage="(Support SNMP only)"
        handleOKButtonOnClick={handleOKButtonOnClick}
        onClose={handleSnackOnClose}
      />
    </div>
  )
}

export default TrapSettingSnack
