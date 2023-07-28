/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  requestStartFirmwareUpdate,
  requestStopFirmwareUpdate,
  firmwareSelector
} from '../../../features/firmwareUpdate'

import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
const FWUButton = (props) => {
  const { disableStart, handleDialogOnClose } = props
  FWUButton.propTypes = {
    handleDialogOnClose: PropTypes.func.isRequired
  }

  const dispatch = useDispatch()
  const { status, filePath } = useSelector(firmwareSelector)
  console.log(filePath)
  // const { disableStart } = filePath
  const dialogRef = useRef()

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
              <Button
                variant="contained"
                type="primary"
                onClick={() => {
                  handleCancelButtonClick()
                }}
                style={{ marginRight: '5px' }}
              >
                Cancel
              </Button>
              <Button
                disabled={disableStart}
                variant="contained"
                type="primary"
                onClick={handleStartButtonClick}
              >
                Start
              </Button>
            </div>
          ),
          start: (
            <Button variant="contained" type="secondary" onClick={handleStopButtonClick}>
              Stop
            </Button>
          ),
          done: (
            <Button variant="contained" type="primary" onClick={handleFinishButtonClick}>
              Finish
            </Button>
          )
        }[status]
      }
    </div>
  )
}

export default FWUButton
