/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable react/prop-types */
// // /* eslint-disable no-unused-vars */
// // import React, { useEffect } from 'react'
// // import { SettingOutlined } from '@ant-design/icons'

// // import { Layout, Menu, theme, Modal, Spin } from 'antd'
// // import {
// //   clearPreferencesData,
// //   preferenceSelector,
// //   setSelectIndex,
// //   requestGetNICData,
// //   requireSetNICData
// // } from '../../../features/Preferences/preferenceSlice'
// // import { useDispatch, useSelector } from 'react-redux'
// // import General from './General/General'
// // import { Mail } from './Mail/Mail'
// // import Telegram from './Telegram/Telegram'
// // import Advance from './Advance/Advance'
// // import SNMP from './SNMP/SNMP'
// // const items = [
// //   { label: 'General', key: 'gen', page: <General /> },
// //   { label: 'Mail', key: 'mail', page: <Mail /> },
// //   { label: 'Telegram', key: 'tel', page: <Telegram /> },
// //   { label: 'SNMP', key: 'snmp', page: <SNMP /> },
// //   { label: 'Advance', key: 'advance', page: <Advance /> }
// // ]
// // const { Header, Content, Sider } = Layout
// // const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'
// //  const PreferencesDialog = ({ onClose }) => {
// // const {
// //   token: { colorBgContainer }
// // } = theme.useToken()
// // const dispatch = useDispatch()
// // const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)
// // console.log(selectedIndex)

// // useEffect(() => {
// //   dispatch(clearPreferencesData())
// // }, [])
// //  const handleChangePage = (newIndex) => {
// //   switch (newIndex) {
// //     case 0:
// //       dispatch(requestGetNICData())
// //       break
// //   }
// //   setSelectIndex(newIndex)
// // }
// //  const showConfirm = (resolve, reject) => {
// //   confirm({
// //     zIndex: 1500,
// //     title: CONFIRM_CONTENT_TXTT,
// //     okText: 'Save',
// //     onOk() {
// //       resolve()
// //     },
// //     onCancel() {
// //       reject()
// //     }
// //   })
// // }
// // const handleMenuItemClick = (newIndex) => {
// //   console.log(newIndex)
// //   const array = items.findIndex((e) => e.newIndex === newIndex)
// //   console.log(array)
// //   const { configChangeFlag, configValidFlag } = props
// //   if (configChangeFlag && configValidFlag) {
// //     new Promise((resolve, reject) => {
// //       showConfirm(resolve, reject)
// //     })
// //       .then(() => {
// //         handleRequireSetData()
// //         handleChangePage(newIndex)
// //         return null
// //       })
// //       .catch(() => {
// //         handleChangePage(newIndex)
// //       })
// //   } else {
// //     handleChangePage(newIndex)
// //   }
// // }
// //  const handleRequireSetData = () => {
// //   switch (selectedIndex) {
// //     case 0:
// //     requireSetNICData(handleShowResult(selectedIndex));
// //   }

// // return (
// //   <Modal
// //     open
// //     onCancel={onClose}
// //     footer={null}
// //     width="100%"
// //     // bodyStyle={{ height: '80vh', padding: '20px' }}
// //     style={{
// //       top: '10px',
// //       bottom: 0,
// //       left: 0,
// //       right: 0,
// //       position: 'fixed'
// //     }}
// //     bodyStyle={{ height: '100%' }}
// //   >
// //     <Header
// //       style={{
// //         background: ' #6fbbd6',
// //         fontSize: 35,
// //         height: '90px',
// //         width: '1460px',
// //         position: 'relative',
// //         top: '-10px'
// //       }}
// //       // close={handleCancelButtonClick}
// //     >
// //       <SettingOutlined /> Preference
// //     </Header>
// //     <Layout hasSider style={{ height: '540px' }}>
// //       <Sider
// //         breakpoint="lg"
// //         collapsedWidth="0"
// //         onBreakpoint={(broken) => {
// //           console.log(broken)
// //         }}
// //         onCollapse={(collapsed, type) => {
// //           console.log(collapsed, type)
// //         }}
// //       >
// //         <div className="demo-logo-vertical" />
// //         <Menu
// //           theme="dark"
// //           mode="inline"
// //           defaultSelectedKeys={['5']}
// //           items={items}
// //           style={{ fontSize: '16px', color: 'white', position: 'relative', top: '-10px' }}
// //           onClick={handleMenuItemClick}
// //         ></Menu>
// //       </Sider>

// //       <Content>
// //         <div
// //           style={{
// //             // padding: 0,
// //             minHeight: 560,
// //             width: '1250px',
// //             background: colorBgContainer,
// //             position: 'relative',
// //             top: '-10px'
// //           }}
// //         ></div>
// //       </Content>
// //     </Layout>
// //   </Modal>
// // )
// // };
// // export default PreferencesDialog

// import React, { useEffect } from 'react'
// import { SettingOutlined } from '@ant-design/icons'

// import { Layout, Menu, theme, Modal, Spin } from 'antd'
// import {
//   preferenceSelector,
//   setSelectIndex
// } from '../../../features/Preferences/preferenceSlice.js'
// import { requestGetNICData } from '../../../features/Preferences/generalSlice.js'

// import { useDispatch, useSelector } from 'react-redux'
// import General from './General/General'
// import { Mail } from './Mail/Mail'
// import Telegram from './Telegram/Telegram'
// import Advance from './Advance/Advance'
// import SNMP from './SNMP/SNMP'

// // const pagesList = {
// //   0: 'general',
// //   1: 'mail',
// //   2: 'telegram',
// //   3: 'snmp',
// //   4: 'advanced',
// //   5: 'notification'
// // }
// const items = [
//   { label: 'General', key: 'gen', page: <General /> },
//   { label: 'Mail', key: 'mail', page: <Mail /> },
//   { label: 'Telegram', key: 'tel', page: <Telegram /> },
//   { label: 'SNMP', key: 'snmp', page: <SNMP /> },
//   { label: 'Advance', key: 'advance', page: <Advance /> }
// ]
// const { Header, Content, Sider } = Layout
// const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'

// const PreferencesDialog = ({ onClose }) => {
//   const {
//     token: { colorBgContainer }
//   } = theme.useToken()
//   const dispatch = useDispatch()
//   const { selectedIndex } = useSelector(preferenceSelector)
//   // console.log(selectedIndex)
//   // const handleChangePage = (newIndex) => {
//   //   switch (newIndex) {
//   //     case 0:
//   //       dispatch(requestGetNICData())
//   //       break
//   //   }
//   //   setSelectIndex(newIndex)
//   // }
//   // const handleRequireSetData = () => {
//   //   requireSetNICData(handleShowResult(selectedIndex))
//   // }
//   const handleMenuItemClick = (e) => {
//     //console.log(e)
//     const array = items.findIndex(() => e.key === e.key)
//     console.log(array)
//     // if (selectedIndex === pagesList) return
//     // const { configChangeFlag, configValidFlag } = props
//     // if (configChangeFlag && configValidFlag) {
//     //   new Promise((resolve, reject) => {
//     //     showConfirm(resolve, reject)
//     //   })
//     //     .then(() => {
//     //       handleRequireSetData()
//     //       handleChangePage(newIndex)
//     //       return null
//     //     })
//     //     .catch(() => {
//     //       handleChangePage(newIndex)
//     //     })
//     // } else {
//     //   handleChangePage(newIndex)
//     // }
//   }
//   const handleChangePage = (newIndex) => {
//     dispatch(requestGetNICData())
//     setSelectIndex(newIndex)
//   }
//   return (
//     <Modal
//       open
//       onCancel={onClose}
//       footer={null}
//       width="100%"
//       // bodyStyle={{ height: '80vh', padding: '20px' }}
//       style={{
//         top: '10px',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         position: 'fixed'
//       }}
//       bodyStyle={{ height: '100%' }}
//     >
//       <Header
//         style={{
//           background: ' #6fbbd6',
//           fontSize: 35,
//           height: '90px',
//           width: '1460px',
//           position: 'relative',
//           top: '-10px'
//         }}
//         // close={handleCancelButtonClick}
//       >
//         <SettingOutlined /> Preference
//       </Header>
//       <Layout hasSider style={{ height: '540px' }}>
//         <Sider
//           breakpoint="lg"
//           collapsedWidth="0"
//           onBreakpoint={(broken) => {
//             console.log(broken)
//           }}
//           onCollapse={(collapsed, type) => {
//             console.log(collapsed, type)
//           }}
//         >
//           <div className="demo-logo-vertical" />
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={['5']}
//             style={{ fontSize: '16px', color: 'white', position: 'relative', top: '-10px' }}
//             onClick={handleMenuItemClick}
//           >
//             <Menu.Item key="gen">
//               <span>General</span>
//             </Menu.Item>
//           </Menu>
//         </Sider>

//         <Content>
//           <div
//             style={{
//               // padding: 0,
//               minHeight: 560,
//               width: '1250px',
//               background: colorBgContainer,
//               position: 'relative',
//               top: '-10px'
//             }}
//           >
//             <General />
//           </div>
//         </Content>
//       </Layout>
//     </Modal>
//   )
// }

// export default PreferencesDialog

import React from 'react'

import { SettingOutlined } from '@ant-design/icons'

import { Layout, Menu, theme, Modal, Spin, Card, List, Typography } from 'antd'
import {
  preferenceSelector,
  setSelectIndex
} from '../../../features/Preferences/preferenceSlice.js'
import { requestGetNICData } from '../../../features/Preferences/generalSlice.js'

import { useDispatch, useSelector } from 'react-redux'

import General from './General/General'
import { Mail } from './Mail/Mail'
import Telegram from './Telegram/Telegram'
import Advance from './Advance/Advance'
import SNMP from './SNMP/SNMP'
import Sider from 'antd/es/layout/Sider'

const items = [
  { label: 'General', key: 'gen', page: <General /> },
  { label: 'Mail', key: 'mail', page: <Mail /> },
  { label: 'Telegram', key: 'tel', page: <Telegram /> },
  { label: 'SNMP', key: 'snmp', page: <SNMP /> },
  { label: 'Advance', key: 'advance', page: <Advance /> }
]
const PreferencesDialog = ({ onClose }) => {
  const { selectedIndex } = useSelector(preferenceSelector)
  const handleMenuItemClick = (e) => {
    console.log(e)
    const newIndex = items.findIndex(() => e.key === e.key)
    return newIndex
  }
  return (
    <Card bordered>
      <Modal
        open
        footer={null}
        onCancel={onClose}
        width="100%"
        bodyStyle={{ height: '650px', marginTop: '50px' }}
      >
        <Sider width={150}>
          <Menu theme="dark" items={items} style={{ height: 650, marginTop: '50px' }}>
            {items.map((item, index) => (
              <Menu.Item
                key={item.label}
                // className={selectedIndex === index ?  : null}
                className={selectedIndex === index}
                onClick={handleMenuItemClick(index + 1)}
              >
                <List.Item actions={<Typography variant="subtitle1">{item.label}</Typography>} />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </Modal>
    </Card>
  )
}

export default PreferencesDialog
