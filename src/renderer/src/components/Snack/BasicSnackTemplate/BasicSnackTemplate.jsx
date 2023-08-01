/* eslint-disable no-unused-vars */
import { Alert, Button, Modal } from 'antd'
import React, { useEffect } from 'react'
import message from '../../devices/EventTips/EventTips'
import { tipsMessage, handleOKButtonOnClick } from '../ResetToDefaultSnack'
import { useSelector, useDispatch } from 'react-redux'
import { clearDiscoverTableSelect } from '../../../features/discoverySlice'
import { closeSnack } from '../../../features/snackSlice'

const BasicSnackTemplate = ({ onClose }) => {
  const dispatch = useDispatch()
  const enableOKButton = useSelector((state) => state.discovery.selected.length > 0)
  useEffect(() => {
    return () => {
      dispatch(clearDiscoverTableSelect())
    }
  })
  const handleSnackOnClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeSnack())
  }

  const closeSnack = () => {
    dispatch(clearDiscoverTableSelect())

    onClose()
  }

  const handleCancelButtonOnClick = () => {
    dispatch(closeSnack())
  }

  const handleOKButtonOnClick = () => {
    handleOKButtonOnClick()
    dispatch(closeSnack())
  }

  return (
    <div>
      <Alert
        type="info"
        onClose={handleSnackOnClose}
        message={
          <span>
            {message}
            <span>{tipsMessage}</span>
          </span>
        }
        showIcon
        action={[
          <Button key="cancel" color="secondary" onClick={handleCancelButtonOnClick}>
            Cancel
          </Button>,
          <Button
            key="OK"
            color="secondary"
            disabled={!enableOKButton}
            onClick={handleOKButtonOnClick}
          >
            OK
          </Button>
        ]}
      ></Alert>
    </div>
  )
}

export default BasicSnackTemplate
