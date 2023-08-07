// import React, { useState, useEffect, useRef } from 'react'
// //import PropTypes from 'prop-types'
// // import { shell } from 'electron'
// import { useDispatch, useSelector } from 'react-redux'
// import { clearOpenWebData, openWebSelector, changeNextUrl } from '../../../features/openWebSlice'
// import { Button, Menu, Modal, Tooltip, Typography } from 'antd'
// import {
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   SyncOutlined,
//   ExportOutlined,
//   CloseCircleOutlined
// } from '@ant-design/icons'
// //import { exec } from 'child_process'
// // const { shell } = window.require('electron')
// //import styles from './WebBrowserDialog.scss'
// //const { ipcRenderer } = window.require('electron')

// const WebBrowserDialog = ({ onClose }) => {
//   const { IPAddress, URL } = useSelector(openWebSelector)
//   const [isLoading, setIsLoading] = useState(true)
//   console.log(isLoading)
// const webRef = useRef()
// useEffect(() => {
//   setTimeout(() => {
//     const webv = document.getElementById('mainwebview')
//     webv.clearHistory()
//   }, 20000)
// }, [])
// useEffect(() => {
//   const webv = document.getElementById('mainwebview')
//   webv.addEventListener('did-start-loading', () => {
//     setIsLoading(true)
//   })
//   webv.addEventListener('did-stop-loading', () => {
//     setIsLoading(false)
//   })
// }, [])
// const handleCloseButtonClick = () => {
//   onClose()
// }
// const handleGoBackButtonClick = () => {
//   const webv = document.getElementById('mainwebview')
//   if (webv.canGoBack()) {
//     webv.goBack()
//   }
// }
// const handleGoForwardButtonClick = () => {
//   const webv = document.getElementById('mainwebview')
//   if (webv.canGoForward()) {
//     webv.goForward()
//   }
// }
// const handleReloadButtonClick = () => {
//   const webv = document.getElementById('mainwebview')
//   webv.reload()
// }
//   const handleOpenInBrowserButtonClick = (openExternal) => {
//     console.log(openExternal)
//     // exec.__promisify__(
//     //   'https://marketplace.visualstudio.com/items?itemName=lzrnic.javascript-vscode-extension'
//     // )

// shell.openExternal(
//   'https://marketplace.visualstudio.com/items?itemName=lzrnic.javascript-vscode-extension'
// )
//   }
//   // const handleTitleChange = (e) => {
//   //   const title = e.target.getTitle()
//   //   ipcRenderer.send('change-title', title)
//   // }
//   // const handleURLChange = (e) => {
//   //   const url = e.target.getURL()
//   //   ipcRenderer.send('change-url', url)
//   // }
//   return (
// <Modal
//   fullScreen
//   open
//   title="Web Browser"
//   footer={null}
//   onCancel={onClose}
//   ///={styles.webBrowserDialogbd}
// >
//   <Menu style={{ background: ' #f2f2f2' }}>
//     <Tooltip title={<Typography style={{ color: 'white' }}>previous Page</Typography>}>
//       <Button icon={<ArrowLeftOutlined />} onClick={handleGoBackButtonClick}></Button>
//     </Tooltip>
//     <Tooltip title={<Typography style={{ color: 'white' }}>Next Page</Typography>}>
//       <Button icon={<ArrowRightOutlined />} onClick={handleGoForwardButtonClick}></Button>
//     </Tooltip>
//     <Tooltip title={<Typography style={{ color: 'white' }}>Refresh</Typography>}>
//       <Button icon={<SyncOutlined />} onClick={handleReloadButtonClick}></Button>
//     </Tooltip>
//     <Tooltip title={<Typography style={{ color: 'white' }}> Open onOs Browser</Typography>}>
//       <Button icon={<ExportOutlined />} onClick={handleOpenInBrowserButtonClick}></Button>
//     </Tooltip>
//     <Typography> {`https://${IPAddress}`}</Typography>
//     <Button icon={<CloseCircleOutlined />} onClick={handleCloseButtonClick}></Button>
//         <webview
//           ref={(el) => {
//             webRef.webview = el
//           }}
//           id="mainwebview"
//           src={URL}
//         />
//       </Menu>
//     </Modal>
//   )
// }

// export default WebBrowserDialog

import React, { useState, useEffect, useRef } from 'react'
import { Button, Menu, Modal, Tooltip, Typography } from 'antd'
import { clearOpenWebData, openWebSelector, changeNextUrl } from '../../../features/openWebSlice'
//import { BrowserWindow } from 'electron'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SyncOutlined,
  ExportOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
// import { shell } from 'electron'
const WebBrowserDialog = ({ onClose }) => {
  const { IPAddress } = useSelector(openWebSelector)
  const [url, setUrl] = useState('https://www.google.com')
  console.log(setUrl)
  const [isLoading, setIsLoading] = useState(true)
  console.log(isLoading)

  const webRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      const webv = document.getElementById('mainwebview')
      webv.clearHistory()
    }, 20000)
  }, [])
  useEffect(() => {
    const webv = document.getElementById('mainwebview')
    console.log(webv)
    // webv.addEventListener('did-start-loading', () => {
    //   setIsLoading(true)
    // })
    // webv.addEventListener('did-stop-loading', () => {
    //   setIsLoading(false)
    // })
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
  // useEffect(() => {
  //   const webview = new window.WebView()
  //   webview.addEventListener('load', () => {
  //     console.log('Webview loaded')
  //   })
  //   webview.loadURL(url)
  //   return () => webview.close()
  // }, [url])

  const handleOpenInBrowserButtonClick = () => {
    // shell.openExternal('https://www.npmjs.com/package/react-diff-viewer')
    //const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    // title: 'My Electron App'
    // })
    //mainWindow.loadURL('https://www.npmjs.com/package/react-diff-viewer')
  }
  return (
    <div>
      <Modal
        open
        title="Web Browser"
        footer={null}
        onCancel={onClose}
        ///={styles.webBrowserDialogbd}
      >
        <Menu style={{ background: ' #f2f2f2' }}>
          <Tooltip title={<Typography style={{ color: 'white' }}>previous Page</Typography>}>
            <Button icon={<ArrowLeftOutlined />} onClick={handleGoBackButtonClick}></Button>
          </Tooltip>
          <Tooltip title={<Typography style={{ color: 'white' }}>Next Page</Typography>}>
            <Button icon={<ArrowRightOutlined />} onClick={handleGoForwardButtonClick}></Button>
          </Tooltip>
          <Tooltip title={<Typography style={{ color: 'white' }}>Refresh</Typography>}>
            <Button icon={<SyncOutlined />} onClick={handleReloadButtonClick}></Button>
          </Tooltip>
          <Tooltip title={<Typography style={{ color: 'white' }}> Open onOs Browser</Typography>}>
            <Button icon={<ExportOutlined />} onClick={handleOpenInBrowserButtonClick}></Button>
          </Tooltip>
          <Typography> {`https://${IPAddress}`}</Typography>
          <Button icon={<CloseCircleOutlined />} onClick={handleCloseButtonClick}></Button>
          <webview
            ref={(ref) => {
              webRef.webview = ref
            }}
            src={url}
            style={{ width: '100%', height: '100%' }}
            //className={styles.webview}
          />
        </Menu>
      </Modal>
    </div>
  )
}
export default WebBrowserDialog
