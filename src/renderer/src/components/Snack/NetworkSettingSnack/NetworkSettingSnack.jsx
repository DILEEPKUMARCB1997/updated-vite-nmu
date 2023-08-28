/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

// import { openDialog } from '../../../features/dialogSlice'
import { useDispatch } from 'react-redux'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'
import initNetworkSettingData from '../../../features/networkSettingSlice'

const NetworkSettingSnack = ({ onClose }) => {
  const dispatch = useDispatch()

  const handleOKButtonOnClick = () => {
    dispatch(initNetworkSettingData())
    // dispatch(openDialog('networkSetting'))
  }

  return (
    <BasicSnackTemplate
      message='Please select devices for "Network Setting" then press "OK"'
      handleOKButtonOnClick={handleOKButtonOnClick}
      onClose={onClose}
    />
  )
}

export default NetworkSettingSnack
