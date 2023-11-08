/* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// import {
//   clearOpenWebData,
//   openWebSelector,
//   requestOpenWebData
// } from '../../../features/openWebSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { Button, Menu, Modal, Tooltip, Typography } from 'antd'
// import {
//   ArrowLeftOutlined,
//   ArrowRightOutlined,
//   SyncOutlined,
//   ExportOutlined,
//   CloseCircleOutlined
// } from '@ant-design/icons'
// import { useRef } from 'react'
// //import { shell } from 'electron'

// const WebBrowserDialog = ({ onClose }) => {
//   const { IPAddress, URL } = useSelector(openWebSelector)
//   console.log(URL)
//   const dispatch = useDispatch()
//   const webRef = useRef()

//   useEffect(() => {
//     dispatch(requestOpenWebData())
//     setTimeout(() => {
//       const webContentsInstance = webRef.current?.getWebContents()
//       if (webContentsInstance && !webContentsInstance.isLoading()) {
//         webContentsInstance.session
//           .clearStorageData({
//             origin: 'https://www.examplewebsite.com',
//             storages: ['cookies']
//           })
//           .then(() => console.log('Cleared session data'))
//           .catch((error) => console.error(`Failed clearing session data ${error}`))

//         webContentsInstance.clearHistory().finally(() => console.log('history cleared'))
//       } else {
//         alert('Please wait until webpage has finished loading.')
//       }

//       // //props.changeNextURL();
//       // const webv = document.getElementById('mainwebview')
//       // webv.clearHistory()
//     }, 2000)
//     return () => {
//       dispatch(clearOpenWebData())
//     }
//   }, [])

//   const handleCloseButtonClick = () => {
//     onClose()
//   }

//   const handleGoBackButtonClick = () => {
//     const webContentsInstance = webRef.current?.getWebContents()
//     if (webContentsInstance.canGoBack()) {
//       webContentsInstance.goBack().finally(() => {
//         console.log('goBack button working')
//       })
//     }
//   }

//   const handleGoForwardButtonClick = (mainWindow) => {
//     const contents = mainWindow.webContents
//     if (contents.canGoForward()) {
//       contents.goForward()
//     }
//   }

//   const handleReloadButtonClick = () => {
//     const webv = document.getElementById('mainwebview')
//     webv.reload()
//   }

//   const handleOpenInBrowserButtonClick = () => {
//     // window.electron.shell.openExternal(URL)
//     window.electron.shell.openExternal(URL)
//   }

//   return (
//     <Modal open footer={null} onCancel={onClose} width="100%" maskClosable={false}>
//       <Menu mode="horizontal" theme="light">
//         <Tooltip title={<Typography style={{ color: 'white' }}>previous Page</Typography>}>
//           <Button
//             icon={<ArrowLeftOutlined />}
//             onClick={handleGoBackButtonClick}
//             style={{ marginLeft: '10px' }}
//           ></Button>
//         </Tooltip>

//         <Tooltip title={<Typography style={{ color: 'white' }}>Next Page</Typography>}>
//           <Button
//             icon={<ArrowRightOutlined />}
//             onClick={handleGoForwardButtonClick}
//             style={{ marginLeft: '10px' }}
//           ></Button>
//         </Tooltip>

//         <Tooltip title={<Typography style={{ color: 'white' }}>Refresh</Typography>}>
//           <Button
//             icon={<SyncOutlined />}
//             onClick={handleReloadButtonClick}
//             style={{ marginLeft: '10px' }}
//           ></Button>
//         </Tooltip>
//         <Tooltip title={<Typography style={{ color: 'white' }}> Open onOs Browser</Typography>}>
//           <Button
//             icon={<ExportOutlined />}
//             onClick={handleOpenInBrowserButtonClick}
//             style={{ marginLeft: '10px' }}
//           ></Button>
//         </Tooltip>
//         <Typography> {`https://${IPAddress}`}</Typography>
//         <Button icon={<CloseCircleOutlined />} onClick={handleCloseButtonClick}></Button>
//       </Menu>
// <webview
//   id="mainWebview"
//   ref={(ref) => {
//     webRef.webview = ref
//   }}
//   src={URL}
//   style={{ display: 'inline-flex', width: '640px', height: '480px' }}
// ></webview>
//     </Modal>
//   )
// }

// export default WebBrowserDialog
import React, { useEffect, useRef } from 'react'
import { changeNextUrl, clearOpenWebData, openWebSelector } from '../../../features/openWebSlice'
import { Modal, Button, Typography, Tooltip } from 'antd'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  ReloadOutlined,
  ExportOutlined
} from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'

const { Title } = Typography

const shell = require('electron').shell

const WebBrowserDialog = ({ onClose }) => {
  const { IPAddress, URL } = useSelector(openWebSelector)
  const dispatch = useDispatch()
  console.log(URL)
  const webv = useRef(null)

  useEffect(() => {
    dispatch(changeNextUrl())
    setTimeout(() => {
      if (window.history) {
        // const webv = document.getElementById('mainwebview')
        // webv.clearHistory()
        //  window.history.clearHistory()
        window.history.replace('http://stackoverflow.com')
      }
    }, 20000)
    return () => {
      dispatch(clearOpenWebData())
    }
  }, [])

  const handleCloseButtonClick = () => {
    onClose()
  }

  // const handleGoBackButtonClick = () => {
  //   window.history.back()

  //   // if (webv.current.canGoBack()) {
  //   //   webv.current.goBack()
  //   // }
  // }
  function goBack() {
    history.back()
  }

  function goForward() {
    history.forward()
  }

  // const handleGoForwardButtonClick = () => {
  //   window.history.go()

  //   // window.history?.goForward()
  //   // if (window.history) {
  //   //   window.history.goForward()
  //   // }
  // }

  const handleReloadButtonClick = () => {
    if (window.location) {
      window.location.reload()
    }
    // webv.current.reload()
  }

  const handleOpenInBrowserButtonClick = () => {
    shell.openExternal(URL)
    // window?.openExternal(URL)
    // window.location.assign('npm https://procomponents.ant.design/en-US/components/table')

    // console.log(URL)

    // console.log(URL)
    // if (window) {
    //   window.openExternal()
    // }
  }

  return (
    <Modal
      open
      width="100%"
      style={{ top: 20 }}
      bodyStyle={{
        margin: 0,
        paddingTop: 10,
        paddingBottom: '10px'
      }}
      footer={null}
      closable
      maskClosable={false}
    >
      {/* <div
        style={{ background: '#f2f2f2' }}
        // className={styles.header}
      > */}
      <Tooltip title="Previous page">
        <Button
          value="Back"
          onClick={goBack}
          icon={<ArrowLeftOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Next page">
        <Button
          value="Forward"
          onClick={goForward()}
          icon={<ArrowRightOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Refresh">
        <Button
          onClick={handleReloadButtonClick}
          icon={<ReloadOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Tooltip title="Open on OS browser">
        <Button
          onClick={handleOpenInBrowserButtonClick}
          icon={<ExportOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Tooltip>
      <Title
        level={5}
        // style={{ color: 'black', flexGrow: '1', marginLeft: '5px' }}
        //  className={styles.url}
      >
        {`https://${IPAddress}`}
      </Title>
      <Button
        onClick={handleCloseButtonClick}
        icon={<CloseOutlined />}
        style={{ marginLeft: '10px' }}
      />
      {/* </div> */}

      <webview
        id="mainWebview"
        ref={(ref) => {
          webv.webview = ref
        }}
        src={URL}
        style={{ height: '480px' }}
      />
    </Modal>
  )
}

export default WebBrowserDialog
