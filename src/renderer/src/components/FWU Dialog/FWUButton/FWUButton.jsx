/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'

import {
  requestStartFirmwareUpdate,
  requestStopFirmwareUpdate,
  firmwareSelector
} from '../../../features/firmwareUpdate'

import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
const FWUButton = ({ handleDialogOnClose }) => {
  const dispatch = useDispatch()
  const { status, filePath } = useSelector(firmwareSelector)
  console.log(filePath)

  const handleStartButtonClick = () => {
    dispatch(requestStartFirmwareUpdate())
  }

  const handleStopButtonClick = () => {
    dispatch(requestStopFirmwareUpdate())
  }

  const handleCancelButtonClick = () => {
    handleDialogOnClose()
    console.log(handleDialogOnClose())
  }

  const handleFinishButtonClick = () => {
    handleDialogOnClose()
  }
  return (
    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      {
        {
          wait: (
            <div>
              <Button onClick={handleCancelButtonClick} style={{ marginRight: '5px' }}>
                Cancel
              </Button>
              <Button disabled={filePath === ''} type="primary" onClick={handleStartButtonClick}>
                Start
              </Button>
            </div>
          ),
          start: (
            <Button type="secondary" onClick={handleStopButtonClick}>
              Stop
            </Button>
          ),
          done: (
            <Button type="primary" onClick={handleFinishButtonClick}>
              Finish
            </Button>
          )
        }[status]
      }
    </div>
  )
}

export default FWUButton
