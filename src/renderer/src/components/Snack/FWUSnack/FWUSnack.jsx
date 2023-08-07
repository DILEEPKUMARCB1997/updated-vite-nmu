import React from 'react'
import BasicSnackTemplate from '../BasicSnackTemplate/BasicSnackTemplate'
import { initFirmwareUpdateData } from '../../../features/firmwareUpdate'
import { openDialog } from '../../../features/dialogSlice'
const FWUSnack = ({ onClose }) => {
  const handleOKButtonOnClick = () => {
    initFirmwareUpdateData()
    openDialog('FWU')
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
