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
  // console.log(status)

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
    <div
      data-testid="custom-element"
      style={{ position: 'absolute', bottom: '10px', right: '10px' }}
    >
      {
        {
          wait: (
            <div title="wait">
              <Button
                role="cancel"
                onClick={handleCancelButtonClick}
                style={{ marginRight: '5px' }}
                data-testid="id"
              >
                {' '}
                Cancel
              </Button>
              <Button
                role="start"
                disabled={filePath === ''}
                type="primary"
                onClick={handleStartButtonClick}
              >
                Start
              </Button>
            </div>
          ),
          start: (
            <Button type="primary" danger onClick={handleStopButtonClick}>
              Stop
            </Button>
          ),
          done: (
            <Button type="primary" role="finish" onClick={handleFinishButtonClick}>
              Finish
            </Button>
          )
        }[status]
      }
    </div>
  )
}

export default React.memo(FWUButton)
