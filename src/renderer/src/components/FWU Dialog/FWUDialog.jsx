import React, { useEffect } from 'react'
import { Card } from 'antd'
import Modal from 'antd/es/modal/Modal'
import {
  changeFirmwareUpdateStatus,
  requestStartFirmwareUpdate,
  requestStopFirmwareUpdate,
  clearFirmwareUpdateData,
  updateFirmwareUpdateData
} from '../../features/firmwareUpdate'
import { SEND_RP_FIRMWARE_UPDATE_PROGRESS } from '../../../../main/utils/IPCEvents'
import StepView from './StepView/StepView'
import FWUTable from './FWUTable/FWUTable'

const FWUDialog = ({ onClose }) => {
  const handleDialogOnClose = () => {
    onClose()
  }
  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_FIRMWARE_UPDATE_PROGRESS, firmwareUpdateDataListener)
  }, [])
  const firmwareUpdateDataListener = (event, arg) => {
    //console.log(JSON.stringify(arg));
    if (Object.keys(arg).length !== 1) {
      updateFirmwareUpdateData(arg)
    } else {
      changeFirmwareUpdateStatus(2)
    }
  }
  return (
    <Modal
      footer={null}
      title="FirmWare Update"
      onCancel={onClose}
      open
      width="80%"
      bodyStyle={{ height: '80vh' }}
      style={{ marginBottom: '20px' }}
    >
      <Card
        placeholder="firmware Update"
        onClick={handleDialogOnClose}
        bordered={false}
        style={{ marginBottom: '20px' }}
      >
        {' '}
        <StepView />
      </Card>
      <FWUTable />
    </Modal>
  )
}

export default FWUDialog
