/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'
import { initFirmwareUpdateData } from '../../../features/firmwareUpdate'
import { openDialog } from '../../../features/dialogSlice'
import { useDispatch } from 'react-redux'
const FWUSnack = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleOKButtonOnClick = () => {
    dispatch(initFirmwareUpdateData())
    dispatch(openDialog('FWU'))
  }
  return (
    <div>
      <BasicSnackTemplate
        message='Please select devices for "Firmware Update" then press "OK"'
        handleOKButtonOnClick={handleOKButtonOnClick}
        onClose={onClose}
      />
    </div>
  )
}

export default FWUSnack
