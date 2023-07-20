/* eslint-disable no-unused-vars */
import React from 'react'
import {
  requestStartFirmwareUpdate,
  requestStopFirmwareUpdate,
  firmwareSelector
} from '../../../features/firmwareUpdate'
import handleDialogOnClose from '../FWUDialog'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
const FWUButton = () => {
  // const { handleDialogOnClose } = props
  const dispatch = useDispatch()
  const { status, filePath } = useSelector(firmwareSelector)
  console.log(filePath)
  const { disableStart } = filePath

  const handleStartButtonClick = () => {
    dispatch(requestStartFirmwareUpdate())
  }

  const handleStopButtonClick = () => {
    dispatch(requestStopFirmwareUpdate())
  }

  const handleCancelButtonClick = () => {
    handleDialogOnClose()
  }

  const handleFinishButtonClick = () => {
    handleDialogOnClose()
  }
  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '24px' }}>
      {
        {
          wait: (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCancelButtonClick}
                style={{ marginRight: '8px' }}
              >
                Cancel
              </Button>
              <Button
                disabled={disableStart}
                variant="contained"
                color="primary"
                onClick={handleStartButtonClick}
              >
                Start
              </Button>
            </div>
          ),
          start: (
            <Button variant="contained" color="secondary" onClick={handleStopButtonClick}>
              Stop
            </Button>
          ),
          done: (
            <Button variant="contained" color="primary" onClick={handleFinishButtonClick}>
              Finish
            </Button>
          )
        }[status]
      }
    </div>
  )
}

export default FWUButton
