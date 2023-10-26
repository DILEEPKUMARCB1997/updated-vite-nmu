/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Alert, Button, Modal } from 'antd'
import React, { useEffect } from 'react'
// import message from '../ResetToDefaultSnack/ResetToDefaultSnack'
// import { tipsMessage, handleOKButtonOnClick } from '../ResetToDefaultSnack/ResetToDefaultSnack'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearDiscoverTableSelect,
  discoverySelector,
  selectDiscoveryTable
} from '../../../features/discoverySlice'
// import { closeSnack } from '../../../features/snackSlice'

const BasicSnackTemplate = ({ onClose, props }) => {
  const dispatch = useDispatch()
  const { selected } = useSelector(discoverySelector)
  // const enableOKButton = useSelector((state) => state.discovery.selected.length > 0)

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
  // const enableOKButton = () => {
  //   selected.length > 0
  // }

  const enableOKButton = selected.length > 0

  const closeSnack = () => {
    dispatch(clearDiscoverTableSelect())

    onClose()
  }

  const handleCancelButtonOnClick = () => {
    closeSnack()
  }

  const handleOKButtonOnClick = () => {
    props.handleOKButtonOnClick()

    closeSnack()
  }

  return (
    <div>
      <Alert
        type="info"
        onClose={handleSnackOnClose}
        message={
          <span>
            {props.message}
            <span>{props.tipsMessage}</span>
          </span>
        }
        showIcon
        action={[
          <Button key="cancel" type="primary" onClick={handleCancelButtonOnClick}>
            Cancel
          </Button>,
          <Button
            key="OK"
            type="primary"
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
