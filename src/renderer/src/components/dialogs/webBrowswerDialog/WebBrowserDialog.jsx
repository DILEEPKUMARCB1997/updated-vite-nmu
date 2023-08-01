import React from 'react'
//import { shell } from 'electron'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SyncOutlined,
  ExportOutlined
} from '@ant-design/icons'
import { openWebSelector, requestOpenWebData } from '../../../features/openWebSlice'
import { Button, Tooltip, Modal } from 'antd'
import { openDialog } from '../../../features/dialogSlice'
import { useDispatch, useSelector } from 'react-redux'

const WebBrowserDialog = ({ onClose }) => {
  console.log(onClose)
  // const { IPAddress } = useSelector(openWebSelector)
  //console.log(URL)
  //console.log(IPAddress)
  const dispatch = useDispatch()
  // const handleGoBackButtonClick = () => {
  //   const webv = document.getElementById('mainwebview')
  //   if (webv.canGoBack()) {
  //     webv.goBack()
  //   }
  // }
  const handleOpenWeb = (IPAddress, MACAddress) => {
    dispatch(
      requestOpenWebData({
        IPAddress,
        MACAddress
      })
    )
    dispatch(openDialog('webBrowser'))
  }

  const handleGoForwardButtonClick = () => {
    const webv = document.getElementById('mainwebview')
    if (webv.canGoForward()) {
      webv.goForward()
    }
  }
  const handleReloadButtonClick = () => {
    const webv = document.getElementById('mainwebview')
    webv.reload()
  }
  // const handleOpenInBrowserButtonClick = () => {
  //   shell.openExternal(URL)
  // }

  return (
    <Modal open onCancel={onClose}>
      <Tooltip title="previous Page"></Tooltip>
      <Button icon={<ArrowLeftOutlined />}></Button>
      <Tooltip title="Next Page">
        <Button onClick={handleGoForwardButtonClick} icon={<ArrowRightOutlined />}></Button>
      </Tooltip>
      <Tooltip title="Refresh">
        <Button onClick={handleReloadButtonClick} icon={<SyncOutlined />}></Button>
      </Tooltip>
      <Tooltip title="Open on OS browser">
        <Button onClick={handleOpenWeb} icon={<ExportOutlined />}></Button>
      </Tooltip>
    </Modal>
  )
}

export default WebBrowserDialog
