/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { SettingOutlined } from '@ant-design/icons'

import { Layout, Menu, theme, Modal, Spin } from 'antd'
import {
  clearPreferencesData,
  preferenceSelector,
  setSelectIndex
} from '../../../features/Preferences/preferenceSlice'
import { useDispatch, useSelector } from 'react-redux'
// import General from './General/General'
import Mail from './Mail/Mail'
import Advanced from './Advanced/Advanced'

const items = [
  {
    label: 'General ',
    page: <Advanced />
  },
  { label: 'Mail', page: <Mail /> },
  { label: 'Telegram' },
  { label: 'SNMP' },
  { label: 'Advanced' }
  // { label: 'Notifications', page: <NotificationsContainer /> },
]
const { Header, Content, Footer, Sider } = Layout
const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'
const PreferencesDialog = ({ onClose }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const dispatch = useDispatch()
  const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)

  // const configChangeFlag = (state) => {
  //   state[selectedPage].isConfigChange
  // }
  // const configValidFlag = (state) => {
  //   !Object.values(state[selectedPage].validsData).includes(false)
  // }

  // useEffect(() => {
  //   dispatch(clearPreferencesData())
  // }, [])

  // const handleMenuItemClick = (newIndex) => () => {
  //   if (newIndex === selectedIndex) return

  //   if (configChangeFlag && configValidFlag) {
  //     new Promise((resolve, reject) => {
  //       showConfirm(resolve, reject)
  //     })
  //       .then(() => {
  //         handleRequireSetData()
  //         handleChangePage(newIndex)

  //         return null
  //       })
  //       .catch(() => {
  //         handleChangePage(newIndex)
  //       })
  //   } else {
  //     handleChangePage(newIndex)
  //   }
  // }
  // const handleCancelButtonClick = () => {
  //   if (configChangeFlag && configValidFlag) {
  //     new Promise((resolve, reject) => {
  //       showConfirm(resolve, reject)
  //     })
  //       .then(() => {
  //         handleRequireSetData()
  //         onClose()
  //         return null
  //       })
  //       .catch(() => {
  //         onClose()
  //       })
  //   } else {
  //     onClose()
  //   }
  // }

  // const showConfirm = (resolve, reject) => {
  //   confirm({
  //     zIndex: 1500,
  //     title: CONFIRM_CONTENT_TXTT,
  //     okText: 'Save',
  //     onOk() {
  //       resolve()
  //     },
  //     onCancel() {
  //       reject()
  //     }
  //   })
  // }

  // // // const handleShowResult = (selectedIndex) => (result) => {
  // // //   const type = result ? 'success' : 'error'
  // // //   notification[type]({
  // // //     message: `${items[selectedIndex].label} settings ${
  // // //       result ? 'successfully saved.' : 'save error.'
  // // //     }`
  // // //   })
  // // // }

  // const handleRequireSetData = () => {
  //   switch (selectedIndex) {
  //     // case 0:
  //     //   this.props.requireSetNICData(handleShowResult(selectedIndex))
  //     //   break
  //     // case 1:
  //     //   this.props.requestSetMail(handleShowResult(selectedIndex))
  //     //   break
  //     // case 2:
  //     //   break
  //     // case 3:
  //     //   this.props.requestSetSNMPData(handleShowResult(selectedIndex))
  //     //   break
  //     // case 4:
  //     //   this.props.requestSetAdvancedData(handleShowResult(selectedIndex))
  //     //   break
  //     // case 5:
  //     //   //this.props.requestSetMail(this.handleShowResult(selectedIndex));
  //     //   break
  //     default:
  //       break
  //   }
  // }

  // const handleChangePage = (newIndex) => {
  //   switch (newIndex) {
  //     // case 0:
  //     //   this.props.requestGetNICData()
  //     //   break
  //     // case 1:
  //     //   this.props.requestGetMail()
  //     //   break
  //     // case 2:
  //     //   this.props.getTelegramToken()
  //     //   break
  //     // case 3:
  //     //   this.props.requestGetIPRange()
  //     //   this.props.requestGetSNMPData()
  //     //   break
  //     // case 4:
  //     //   this.props.requestGetAdvancedData()
  //     //   break
  //     // case 5:
  //     //   this.props.requestGetNotification()
  //     //   break
  //     default:
  //       break
  //   }
  //   dispatch(setSelectIndex(newIndex))
  // }

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      width="100%"
      // bodyStyle={{ height: '80vh', padding: '20px' }}
      style={{
        top: '10px',
        bottom: 0,
        left: 0,
        right: 0,

        position: 'fixed'
      }}
      bodyStyle={{ height: '600px' }}
    >
      <Layout>
        <Header
          style={{
            background: ' #6fbbd6',
            fontSize: 35,
            height: '80px',
            width: '1290px',
            color: 'white',
            position: 'relative',
            top: '-10px',
            fontWeight: 'bold'
          }}
          // close={handleCancelButtonClick}
        >
          <SettingOutlined /> Preference
        </Header>
        <Layout hasSider style={{ height: '540px' }}>
          <Sider
          // breakpoint="lg"
          // collapsedWidth="0"
          // onBreakpoint={(broken) => {
          //   console.log(broken)
          // }}
          // onCollapse={(collapsed, type) => {
          //   console.log(collapsed, type)
          // }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['5']}
              items={items}
              // onClick={handleMenuItemClick()}
              style={{ fontSize: '16px', color: 'white', position: 'relative', top: '-10px' }}
            />
          </Sider>

          <Content>
            <div
              style={{
                // padding: 0,
                minHeight: 530,
                width: '1090px',
                background: colorBgContainer,
                position: 'relative',
                top: '-10px'
              }}
            >
              {loading ? <Spin /> : items[selectedIndex].page}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Modal>
  )
}

export default PreferencesDialog

// import React from 'react'
// import { Modal, Menu } from 'antd'
// import General from './General/General'
// import { Header } from 'antd/es/layout/layout'

// const PreferencesDialog = ({ onClose }) => {
//   return (
//     <div>
//       <Modal
//         open
//         onCancel={onClose}
//         footer={null}
//         width="100%"
//         // bodyStyle={{ height: '80vh', padding: '20px' }}
//         style={{
//           top: '10px',
//           bottom: 0,
//           left: 0,
//           right: 0,

//           position: 'fixed'
//         }}
//         bodyStyle={{ height: '600px' }}
//       >
//         <Header
//         ></Header>
//         <div style={{ display: 'flex', flexDirection: 'row' }}>
//           <Menu
//             items={[
//               { label: 'General ', key: <General /> },
//               { label: 'Mail' },
//               { label: 'Telegram' },
//               { label: 'SNMP' },
//               { label: 'Advanced' }
//               // { label: 'Notifications', page: <NotificationsContainer /> },
//             ]}
//           ></Menu>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export default PreferencesDialog
