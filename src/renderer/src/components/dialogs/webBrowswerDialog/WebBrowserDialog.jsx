import React, { useEffect, useRef } from 'react'
import { changeNextUrl, clearOpenWebData, openWebSelector } from '../../../features/openWebSlice'
import { Modal, Button, Tooltip } from 'antd'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  ExportOutlined
} from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'

const shell = require('electron').shell

const WebBrowserDialog = ({ onClose }) => {
  const { IPAddress, URL } = useSelector(openWebSelector)
  const dispatch = useDispatch()

  const handleCloseButtonClick = () => {
    onClose()
  }

  function goBack() {
    history.back()
  }

  function goForward() {
    history.forward()
  }

  const handleReloadButtonClick = () => {
    if (window.location) {
      window.location.reload()
    }
  }

  const handleOpenInBrowserButtonClick = () => {
    shell.openExternal(URL)
  }

  const webviewRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(changeNextUrl())
    }, 1500)
    console.log(timer)
    return () => dispatch(clearOpenWebData())
  }, [changeNextUrl, webviewRef])

  return (
    <Modal
      open
      onCancel={handleCloseButtonClick}
      width="100%"
      style={{ top: '20px' }}
      bodyStyle={{
        margin: 0,
        paddingTop: 10,
        paddingBottom: '10px',
        height: '90vh',
        overflowX: 'hidden',
        overscrollBehavior: 'none'
      }}
      footer={null}
      closable
      maskClosable={false}
    >
      <Tooltip title="Previous page" style={{ color: 'white' }}>
        <Button
          value="Back"
          onClick={goBack()}
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Next page" style={{ color: 'white' }}>
        <Button
          value="Forward"
          onClick={goForward()}
          icon={<ArrowRightOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Refresh" style={{ color: 'white' }}>
        <Button
          onClick={handleReloadButtonClick}
          icon={<ReloadOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Open on OS browser" style={{ color: 'white' }}>
        <Button
          onClick={handleOpenInBrowserButtonClick}
          icon={<ExportOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      &nbsp; &nbsp;&nbsp;
      <Tooltip style={{ color: 'black', flexGrow: '1', marginLeft: '4em', marginRight: '20px' }}>
        {`https://${IPAddress}`}
      </Tooltip>
      <webview
        id="mainWebview"
        ref={(ref) => {
          webviewRef.webview = ref
        }}
        src={URL}
        style={{ height: '680px' }}
      />
    </Modal>
  )
}

export default WebBrowserDialog
