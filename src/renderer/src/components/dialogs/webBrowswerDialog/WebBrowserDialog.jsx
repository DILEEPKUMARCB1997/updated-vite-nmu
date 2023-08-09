// import React, { useState, useEffect, useRef } from 'react'
// import { Button, Menu, Modal, Tooltip, Typography } from 'antd'
// import { clearOpenWebData, openWebSelector, changeNextUrl } from '../../../features/openWebSlice'
// //import { BrowserWindow } from 'electron'
// import {
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   SyncOutlined,
//   ExportOutlined,
//   CloseCircleOutlined
// } from '@ant-design/icons'
// import { useSelector } from 'react-redux'
// //import { shell } from 'electron'
// const WebBrowserDialog = ({ onClose }) => {
//   const { IPAddress } = useSelector(openWebSelector)
//   // const [url, setUrl] = useState('https://www.google.com')
//   //console.log(setUrl)
//   const [isLoading, setIsLoading] = useState(true)
//   console.log(isLoading)

//   const webRef = useRef()
//   useEffect(() => {
//     setTimeout(() => {
//       const webv = document.getElementById('mainwebview')
//       webv.clearHistory()
//     }, 20000)
//   }, [])
//   useEffect(() => {
//     const webv = document.getElementById('mainwebview')
//     console.log(webv)
//     // webv.addEventListener('did-start-loading', () => {
//     //   setIsLoading(true)
//     // })
//     // webv.addEventListener('did-stop-loading', () => {
//     //   setIsLoading(false)
//     // })
//   }, [])
//   const handleCloseButtonClick = () => {
//     onClose()
//   }
//   const handleGoBackButtonClick = () => {
//     const webv = document.getElementById('mainwebview')
//     if (webv.canGoBack()) {
//       webv.goBack()
//     }
//   }
//   const handleGoForwardButtonClick = () => {
//     const webv = document.getElementById('mainwebview')
//     if (webv.canGoForward()) {
//       webv.goForward()
//     }
//   }
//   const handleReloadButtonClick = () => {
//     const webv = document.getElementById('mainwebview')
//     webv.reload()
//   }
//   // useEffect(() => {
//   //   const webview = new window.WebView()
//   //   webview.addEventListener('load', () => {
//   //     console.log('Webview loaded')
//   //   })
//   //   webview.loadURL(url)
//   //   return () => webview.close()
//   // }, [url])

//   const handleOpenInBrowserButtonClick = () => {
//     window.electron.shell.openExternal('https://www.npmjs.com/package/react-diff-viewer')
//     //const mainWindow = new BrowserWindow({
//     // width: 800,
//     // height: 600,
//     // title: 'My Electron App'
//     // })
//     //mainWindow.loadURL('https://www.npmjs.com/package/react-diff-viewer')
//   }
//   return (
//     <div>
//       <Modal
//         open
//         title="Web Browser"
//         footer={null}
//         onCancel={onClose}
//         ///={styles.webBrowserDialogbd}
//       >
//         <Menu style={{ background: ' #f2f2f2' }}>
// <webview
//   onClick={handleOpenInBrowserButtonClick}
//   ref={(ref) => {
//     webRef.webview = ref
//   }}
//   src={url}
//   style={{ width: '100%', height: '100%' }}
//   //className={styles.webview}
// >
//             {' '}
//             <Tooltip title={<Typography style={{ color: 'white' }}>previous Page</Typography>}>
//               <Button icon={<ArrowLeftOutlined />} onClick={handleGoBackButtonClick}></Button>
//             </Tooltip>
//             <Tooltip title={<Typography style={{ color: 'white' }}>Next Page</Typography>}>
//               <Button icon={<ArrowRightOutlined />} onClick={handleGoForwardButtonClick}></Button>
//             </Tooltip>
//             <Tooltip title={<Typography style={{ color: 'white' }}>Refresh</Typography>}>
//               <Button icon={<SyncOutlined />} onClick={handleReloadButtonClick}></Button>
//             </Tooltip>
//             <Tooltip title={<Typography style={{ color: 'white' }}> Open onOs Browser</Typography>}>
//               <Button icon={<ExportOutlined />} onClick={handleOpenInBrowserButtonClick}></Button>
//             </Tooltip>
//             <Typography> {`https://${IPAddress}`}</Typography>
//             <Button icon={<CloseCircleOutlined />} onClick={handleCloseButtonClick}></Button>
//           </webview>
//         </Menu>
//       </Modal>
//     </div>
//   )
// }
// export default WebBrowserDialog

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

  const handleOpenInBrowserButtonClick = () => {
    window.electron.shell.openExternal(URL)
  }

  return (
    <Modal open onOk={onClose} onCancel={onClose}>
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
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
      </Menu>
      <webview
        onClick={handleOpenInBrowserButtonClick}
        ref={(ref) => {
          webRef.webview = ref
        }}
        src={URL}
        style={{ width: '100%', height: '100%', display: 'inline-flex' }}
        //className={styles.webview}
      ></webview>
    </Modal>
  )
}

export default WebBrowserDialog
