/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, forwardRef } from 'react'
import { Card, Slider } from 'antd'
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
import FWUButton from './FWUButton/FWUButton'
import { useDispatch } from 'react-redux'
import OpenFile from './OpenFile/OpenFile'
import Typography from 'antd/es/typography/Typography'
import FWUTableTab from './FWUTable/FWUTableTab/FWUTableTab'

const FWUDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleDialogOnClose = () => {
    onClose()
  }

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_FIRMWARE_UPDATE_PROGRESS, firmwareUpdateDataListener)

    return () => {
      dispatch(requestStartFirmwareUpdate())
      dispatch(requestStopFirmwareUpdate())
      dispatch(clearFirmwareUpdateData())
    }
  }, [])

  const firmwareUpdateDataListener = (event, arg) => {
    if (Object.keys(arg).length !== 1) {
      updateFirmwareUpdateData(arg)
    } else {
      changeFirmwareUpdateStatus(2)
    }
  }
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slider direction="up" ref={ref} {...props} />
  })
  return (
    <Modal
      title={<Typography.Title level={4}>firmwareUpdate</Typography.Title>}
      footer={null}
      onCancel={onClose}
      open
      maskClosable={false}
      width="80%"
      transitionName={Transition}
      bodyStyle={{ height: '80vh', padding: '10px' }}
      style={{ marginTop: '10px', position: 'relative', top: '5px' }}
    >
      <StepView />
      <br />
      <OpenFile />
      <br />
      <br />
      <FWUTableTab />
      <FWUButton handleDialogOnClose={handleDialogOnClose} />
    </Modal>
  )
}

export default FWUDialog
