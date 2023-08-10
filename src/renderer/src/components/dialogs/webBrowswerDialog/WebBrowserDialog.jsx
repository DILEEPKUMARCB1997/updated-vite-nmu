import React, { useEffect } from 'react'
import { clearOpenWebData, openWebSelector } from '../../../features/openWebSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Menu, Modal, Tooltip, Typography } from 'antd'

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SyncOutlined,
  ExportOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { useRef } from 'react'

const WebBrowserDialog = ({ onClose }) => {
  const { IPAddress, URL } = useSelector(openWebSelector)
  console.log(URL)
  const dispatch = useDispatch()
  const webRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      //props.changeNextURL();
      const webv = document.getElementById('mainwebview')
      webv.clearHistory()
    }, 20000)
    return () => {
      dispatch(clearOpenWebData())
    }
  }, [])

  const handleCloseButtonClick = () => {
    onClose()
  }

  const handleGoBackButtonClick = () => {
    const webv = document.getElementById('mainwebview')
    if (webv.canGoBack()) {
      webv.goBack()
    }
  }

  // const handleGoBackButtonClick = () => {
  //   // const mainWindow = new BrowserWindow({
  //   //   width: 800,
  //   //   height: 600,
  //   //   webPreferences: {
  //   //     nodeIntegration: true
  //   //   }
  //   // })
  //   //   const contents = mainWindow.webContents

  //   //   if (direction === 'back') {
  //   //     contents.goBack()
  //   //   } else if (direction === 'forward') {
  //   //     contents.goForward()
  //   //   }
  //   // }
  //   console.log(window.history) // logs array of visited URLs

  //   var backEnabled = window.history && typeof window.history.back === 'function' ? true : false

  //   return backEnabled
  // }

  const handleGoForwardButtonClick = (mainWindow) => {
    const contents = mainWindow.webContents
    if (contents.canGoForward()) {
      contents.goForward()
    }
  }

  const handleReloadButtonClick = () => {
    const webv = document.getElementById('mainwebview')
    webv.reload()
  }

  const handleOpenInBrowserButtonClick = () => {
    // window.electron.shell.openExternal(URL)
    window.electron.shell.openExternal(URL)
  }

  return (
    <Modal open footer={null} onCancel={onClose} width="100%">
      <Menu mode="horizontal" theme="light">
        <Tooltip title={<Typography style={{ color: 'white' }}>previous Page</Typography>}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBackButtonClick}
            style={{ marginLeft: '10px' }}
          ></Button>
        </Tooltip>

        <Tooltip title={<Typography style={{ color: 'white' }}>Next Page</Typography>}>
          <Button
            icon={<ArrowRightOutlined />}
            onClick={handleGoForwardButtonClick}
            style={{ marginLeft: '10px' }}
          ></Button>
        </Tooltip>

        <Tooltip title={<Typography style={{ color: 'white' }}>Refresh</Typography>}>
          <Button
            icon={<SyncOutlined />}
            onClick={handleReloadButtonClick}
            style={{ marginLeft: '10px' }}
          ></Button>
        </Tooltip>

        <Tooltip title={<Typography style={{ color: 'white' }}> Open onOs Browser</Typography>}>
          <Button
            icon={<ExportOutlined />}
            onClick={handleOpenInBrowserButtonClick}
            style={{ marginLeft: '10px' }}
          ></Button>
        </Tooltip>
        <Typography> {`https://${IPAddress}`}</Typography>
        <Button icon={<CloseCircleOutlined />} onClick={handleCloseButtonClick}></Button>
      </Menu>
      <webview
        id="foo"
        ref={(ref) => {
          webRef.webview = ref
        }}
        src="https://www.github.com/"
        style={{ display: 'inline-flex', width: '640px', height: '480px' }}
      ></webview>
    </Modal>
  )
}

export default WebBrowserDialog
/*
const { app, BrowserWindow } = require('electron')

let mainWindow


function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('https://www.electronjs.org/')


  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', function () {

  app.quit()
})

app.on('activate', function () {
  // Recreate the window if it was closed on macOS
  if (mainWindow === null) {
    createWindow()
  }
})
function checkNavigation() {

  const contents = mainWindow.webContents

  console.log('Can go back:', contents.canGoBack())
  console.log('Can go forward:', contents.canGoForward())
}


function navigate(direction) {

  const contents = mainWindow.webContents


  if (direction === 'back') {
    contents.goBack()
  } else if (direction === 'forward') {
    contents.goForward()
  }
}


setTimeout(checkNavigation, 5000)

setTimeout(() => navigate('back'), 10000)


setTimeout(checkNavigation, 15000)


setTimeout(() => navigate('forward'), 20000)


setTimeout(checkNavigation, 25000)
*/
