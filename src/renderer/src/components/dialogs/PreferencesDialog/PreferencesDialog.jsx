/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// //import PropTypes from 'prop-types'
// import { Card, List, Menu, Typography, Spin } from 'antd'
// //import { Settings, SettingsApplications, Email, Timeline, Telegram } from '@material-ui/icons'
// import {
//   SettingOutlined,
//   MailOutlined,
//   InstagramOutlined,
//   FieldTimeOutlined
// } from '@ant-design/icons'
// import { Modal, notification } from 'antd'
// //import { withStyles } from '@material-ui/core/styles'
// import { requireSetNICData, requestGetNICData } from '../../../features/generalSlice'
// import Mail from './Mail/Mail'
// import SNMP from './SNMP/SNMP'
// import Advance from './Advance/Advance'
// import General from './General/General'
// import MenuItem from 'antd/es/menu/MenuItem'
// import { useDispatch } from 'react-redux'
// import Telegram from './Telegram/Telegram'

// const { confirm } = Modal

// const navs = [
// {
//   label: 'General ',
//   icon: <SettingOutlined />,
//   page: <General />
// },
// { label: 'Mail', icon: <MailOutlined />, page: <Mail /> },
// { label: 'Telegram', icon: <InstagramOutlined />, page: <Telegram /> },
// { label: 'SNMP', icon: <FieldTimeOutlined />, page: <SNMP /> },
// { label: 'Advanced', page: <Advance /> }
//   // { label: 'Notifications', page: <NotificationsContainer /> },
// ]

// const TITLE = 'Preferences'
// const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'

// const PreferencesDialog = (props) => {
//   // eslint-disable-next-line no-unused-vars
//   const dispatch = useDispatch()
//   const { selectedIndex, loading, onClose, setSelectIndex } = props

//   const handleMenuItemClick = (newIndex) => () => {
//     if (newIndex === selectedIndex) return
//     const { configChangeFlag, configValidFlag } = props
//     if (configChangeFlag && configValidFlag) {
//       new Promise((resolve, reject) => {
//         showConfirm(resolve, reject)
//       })
//         .then(() => {
//           handleRequireSetData()
//           handleChangePage(newIndex)
//           return null
//         })
//         .catch(() => {
//           handleChangePage(newIndex)
//         })
//     } else {
//       handleChangePage(newIndex)
//     }
//   }

//   const handleCancelButtonClick = () => {
//     const { configChangeFlag, configValidFlag } = props
//     if (configChangeFlag && configValidFlag) {
//       new Promise((resolve, reject) => {
//         showConfirm(resolve, reject)
//       })
//         .then(() => {
//           handleRequireSetData()
//           onClose()
//           return null
//         })
//         .catch(() => {
//           onClose()
//         })
//     } else {
//       onClose()
//     }
//   }

//   const showConfirm = (resolve, reject) => {
//     confirm({
//       zIndex: 1500,
//       title: CONFIRM_CONTENT_TXTT,
//       okText: 'Save',
//       onOk() {
//         resolve()
//       },
//       onCancel() {
//         reject()
//       }
//     })
//   }

//   const handleShowResult = (selectedIndex) => (result) => {
//     const type = result ? 'success' : 'error'
//     notification[type]({
//       message: `${navs[selectedIndex].label} settings ${
//         result ? 'successfully saved.' : 'save error.'
//       }`
//     })
//   }

//   const handleRequireSetData = () => {
//     switch (selectedIndex) {
//       case 0:
//         requireSetNICData(handleShowResult(selectedIndex))
//         break
//     }
//   }

//   const handleChangePage = (newIndex) => {
//     switch (newIndex) {
//       case 0:
//         dispatch(requestGetNICData())
//         break
//     }
//     setSelectIndex(newIndex)
//   }

//   return (
//     <Modal
//       open
//       footer={null}
//       close={handleCancelButtonClick}
//       style={{ width: '100px', height: '80px' }}
//     >
//       <span title="Preferences">
//         <SettingOutlined />
//       </span>

//       <div
//       // style={{
//       //   background: ' #555555',
//       //   height: 'calc(100vh - 80px)',
//       //   width: '150px',
//       //   position: 'absolute',
//       //   marginTop: '0px'
//       // }}
//       >
//         <Menu>
//           {navs.map((item, index) => (
//             <MenuItem
//               key={item.label}
//               style={{ background: ' #6fbbd6' }}
//               // className={selectedIndex === index ? styles.navItem : null}
//               onClick={handleMenuItemClick(index)}
//             >
//               <List
//                 primary={
//                   <Typography style={{ color: 'white' }} variant="subtitle1">
//                     {item.label}
//                   </Typography>
//                 }
//               />
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//       <div>{loading ? <Spin /> : navs[selectedIndex]}</div>
//     </Modal>
//   )
// }
// // export default PreferencesDialog

// import React from 'react'
// import { Layout, Modal, Space, Spin } from 'antd'

// const { Header, Footer, Sider, Content } = Layout
// import {
//   SettingOutlined,
//   MailOutlined,
//   InstagramOutlined,
//   FieldTimeOutlined
// } from '@ant-design/icons'
// import Mail from './Mail/Mail'
// import SNMP from './SNMP/SNMP'
// import Advance from './Advance/Advance'
// import General from './General/General'
// import Telegram from './Telegram/Telegram'

// const navs = [
// {
//   label: 'General ',
//   icon: <SettingOutlined />,
//   page: <General />
// },
// { label: 'Mail', icon: <MailOutlined />, page: <Mail /> },
// { label: 'Telegram', icon: <InstagramOutlined />, page: <Telegram /> },
// { label: 'SNMP', icon: <FieldTimeOutlined />, page: <SNMP /> },
// { label: 'Advanced', page: <Advance /> }
// ]
// const PreferencesDialog = (props) => {
//   const { selectedIndex, loading, onClose, setSelectIndex } = props
//   return (
//     <Modal open footer={null}>
//       <Space direction="vertical">
//         <Layout>
//           <Header
//             style={{
//               textAlign: 'center',
//               color: '#fff',
//               height: 64,
//               paddingInline: '50',
//               lineHeight: '64px',
//               background: '#7dbcea'
//             }}
//           >
//             Preferences
//           </Header>
//           <span
//             style={{
//               textAlign: 'center',
//               minHeight: 120,
//               lineHeight: '120px',
//               color: '#fff',
//               backgroundColor: '#108ee9'
//             }}
//           >
//             <SettingOutlined />
//           </span>
//           <Footer style={{ textAlign: 'center', color: '#fff', backgroundColor: '#7dbcea' }}>
//             Footer
//           </Footer>
//         </Layout>
//         <Layout hasSider>
//           <Sider
//             style={{
//               textAlign: 'center',
//               lineHeight: '120px',
//               color: '#fff',
//               backgroundColor: '#3ba0e9'
//             }}
//           >
//             Sider
//           </Sider>
//         </Layout>
//       </Space>
//       <div>{loading ? <Spin /> : navs[selectedIndex]}</div>
//     </Modal>
//   )
// }
// // export default PreferencesDialog

// import React from 'react'
// import {
//   SettingOutlined,
//   MailOutlined,
//   InstagramOutlined,
//   FieldTimeOutlined
// } from '@ant-design/icons'
// import { Breadcrumb, Layout, Menu, theme, Modal } from 'antd'
// import Mail from './Mail/Mail'
// import SNMP from './SNMP/SNMP'
// import Advance from './Advance/Advance'
// import General from './General/General'
// import Telegram from './Telegram/Telegram'

// const { Header, Content, Sider } = Layout

// const PreferencesDialog = () => {
//   const {
//     token: { colorBgContainer }
//   } = theme.useToken()
//   return (
//     <Modal open footer={null} width="100%">
//       <Layout>
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
//             defaultSelectedKeys={['4']}
//             items={[SettingOutlined, MailOutlined, InstagramOutlined, FieldTimeOutlined].map(
//               (icon, index) => ({
//                 key: String(index + 1),
//                 icon: React.createElement(icon),
//                 label: `items ${index + 1}`
//               })
//             )}
//           />
//         </Sider>
//         <Layout>
//           <Header
//             style={{
//               padding: 0,
//               background: colorBgContainer
//             }}
//           />
//           <Content
//             style={{
//               margin: '24px 16px 0'
//             }}
//           >
//             <div
//               style={{
//                 padding: 24,
//                 minHeight: 360,
//                 background: colorBgContainer
//               }}
//             >
//               content
//             </div>
//           </Content>
//         </Layout>
//       </Layout>
//     </Modal>
//   )
// }

// export default PreferencesDialog

// import React, { useState } from 'react'
// import { Modal } from 'antd'
// //import enUS from 'antd/lib/locale-provider/en_US'
// import { Layout, Menu, Breadcrumb, Space } from 'antd'
// const { Header, Footer, Sider, Content } = Layout

// //import Icon from '@ant-design/icons/lib/components/AntdIcon'

// import { Row, Col } from 'antd'
// import {
//   MailOutlined,
//   InstagramOutlined,
//   SettingOutlined,
//   FieldTimeOutlined
// } from '@ant-design/icons'
// import Mail from './Mail/Mail'
// import SNMP from './SNMP/SNMP'
// import Advance from './Advance/Advance'
// import General from './General/General'
// import Telegram from './Telegram/Telegram'

// const SubMenu = Menu.SubMenu
// const MenuItemGroup = Menu.ItemGroup

// //import { FlowRouter } from 'meteor/kadira:flow-router'

// const PreferencesDialog = () => {
//   const [collapsed, setCollapsed] = useState(false)

//   const toggle = () => {
//     setCollapsed(collapsed)
//   }

//   const linkTo = (item) => {
//     console.log(item)
//     // FlowRouter.go(item.key)
//   }

//   return (
//     <Modal open footer={null} width={'100%'} bodyStyle={{ height: 800 }}>
//       <Space
//         direction="vertical"
//         style={{
//           width: '100%'
//         }}
//         size={[0, 48]}
//       >
//         <Layout style={{ minHeight: '100vh', marginTop: '20px', marginBottom: '20px' }}>
//           <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} onClick={linkTo}>
//             <Header
//               style={{
//                 textAlign: 'center',
//                 color: '#fff',
//                 height: 64,
//                 paddingInline: 50,
//                 lineHeight: '64px',
//                 backgroundColor: '#7dbcea'
//               }}
//             >
//               Header
//             </Header>
//             <hasSider>
//               <Sider
//                 style={{
//                   textAlign: 'center',
//                   lineHeight: '120px',
//                   color: '#fff',
//                   backgroundColor: '#3ba0e9'
//                 }}
//               >
//                 Sider
//               </Sider>
//               <Content
//                 style={{
//                   textAlign: 'center',
//                   minHeight: 120,
//                   lineHeight: '120px',
//                   color: '#fff',
//                   backgroundColor: '#108ee9'
//                 }}
//               >
//                 Content
//               </Content>

//               <Footer style={{ textAlign: 'center', color: '#fff', backgroundColor: '#7dbcea' }}>
//                 Footer
//               </Footer>
//             </hasSider>
//           </Menu>
//         </Layout>
//       </Space>
//     </Modal>
//   )
// }
// export default PreferencesDialog

import { Card, Col, Modal, Row, Spin, Typography } from 'antd'
//import enUS from 'antd/lib/locale-provider/en_US'
import { Layout, Menu, Breadcrumb, Space } from 'antd'
import {
  MailOutlined,
  InstagramOutlined,
  SettingOutlined,
  FieldTimeOutlined
} from '@ant-design/icons'
import Mail from './Mail/Mail'
import SNMP from './SNMP/SNMP'
import Advance from './Advance/Advance'
import General from './General/General'
import Telegram from './Telegram/Telegram'
import { Children } from 'react'

const { Header, Footer, Sider, Content } = Layout

const items = [
  // {
  //   label: 'General ',
  //   icon: <SettingOutlined />
  //   // key: <General />
  // },
  // {
  //   label: 'Mail',
  //   icon: <MailOutlined />
  //   // key: <Mail />
  // },
  // {
  //   label: 'Telegram',
  //   icon: <InstagramOutlined />
  //   // key: <Telegram />
  // },
  // {
  //   label: 'SNMP',
  //   icon: <FieldTimeOutlined />
  //   //  key: <SNMP />
  // },
  // {
  //   label: 'Advanced'
  //   // key: <Advance />
  // }
  // { label: 'Notifications', page: <NotificationsContainer /> },
]
const TITLE = 'Preferences'
const PreferencesDialog = (props) => {
  const { selectedIndex, loading } = props
  return (
    <Modal open footer={null} width={'100%'} bodyStyle={{ height: 800 }}>
      <Space
        direction="vertical"
        style={{
          width: '100%'
        }}
        size={[0, 48]}
      >
        <Layout style={{ minHeight: '100vh', marginTop: '20px', marginBottom: '20px' }}>
          <Header
            style={{
              textAlign: 'center',
              color: '#fff',
              height: 64,
              paddingInline: 50,
              lineHeight: '64px',
              backgroundColor: '#7dbcea'
            }}
          >
            <Card
              title={TITLE}
              bordered={false}
              style={{ width: '100%', marginBottom: '0px', marginTop: '0px' }}
            >
              {' '}
            </Card>
          </Header>
          <Layout hasSider>
            <Sider
              theme="dark"
              style={{
                textAlign: 'center',
                lineHeight: '150px'
              }}
            >
              <Menu
                theme="dark"
                style={{ fontSize: '15px', justifyContent: 'center' }}
                defaultSelectedKeys={['1']}
                items={items}
              />
              <div
                style={{
                  marginTop: '0px',
                  position: 'absolute'
                }}
              >
                <Row>
                  <Col span={24}>
                    <General />
                  </Col>
                  <Col span={24}>
                    <Mail />
                  </Col>
                  <Col span={24}>
                    <Telegram />
                  </Col>
                  <Col span={24}>
                    <Advance />
                  </Col>
                  <Col span={24}>
                    <SNMP />
                  </Col>
                </Row>
              </div>
            </Sider>

            <Content
              style={{
                textAlign: 'center',
                minHeight: 120,
                lineHeight: '120px',
                color: '#fff',
                backgroundColor: '#108ee9'
              }}
            ></Content>
          </Layout>
        </Layout>
      </Space>
    </Modal>
  )
}
export default PreferencesDialog

// <Menu theme="dark">
//   <Row justify="start">
//     <Col span={24}>
//       <Menu.Item>
//         <SettingOutlined />
//         <span>General</span>
//       </Menu.Item>
//     </Col>
//
//     <Col span={24}>
//       <Menu.Item>
//         <MailOutlined />
//         <span>Mail</span>
//       </Menu.Item>
//     </Col>
//
//     <br />
//     <Col span={24}>
//       <Menu.Item>
//         <InstagramOutlined />
//         <span>Telegram</span>
//       </Menu.Item>
//     </Col>
//     <br />
//     <br />
//     <Col span={24}>
//       <Menu.Item>
//         <FieldTimeOutlined />
//         <span>SNMP</span>
//       </Menu.Item>
//     </Col>
//     <br />
//     <br />

//     <Col span={24}>
//       <Menu.Item>
//         <MailOutlined />
//         <span>Advance</span>
//       </Menu.Item>
//     </Col>
//   </Row>
// </Menu>
