/* eslint-disable no-unused-vars */
import { Alert, Button, Modal } from 'antd'
import React, { useEffect } from 'react'
import message from '../ResetToDefaultSnack/ResetToDefaultSnack'
import { tipsMessage, handleOKButtonOnClick } from '../ResetToDefaultSnack/ResetToDefaultSnack'
import { useSelector, useDispatch } from 'react-redux'
import { clearDiscoverTableSelect } from '../../../features/discoverySlice'
// import { closeSnack } from '../../../features/snackSlice'

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
    closeSnack()
  }

  const closeSnack = () => {
    dispatch(clearDiscoverTableSelect())

    onClose()
  }

  const handleCancelButtonOnClick = () => {
    closeSnack()
  }

  const handleOKButtonClick = () => {
    handleOKButtonOnClick()

    closeSnack()
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
          <Button key="cancel" type="primary" onClick={handleCancelButtonOnClick}>
            Cancel
          </Button>,
          <Button key="OK" type="primary" disabled={!enableOKButton} onClick={handleOKButtonClick}>
            OK
          </Button>
        ]}
      ></Alert>
    </div>
  )
}

export default BasicSnackTemplate
