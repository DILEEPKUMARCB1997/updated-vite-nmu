/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
import React from 'react'
import { Modal, Menu, Layout, App, Spin, theme } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { preferenceSelector, setSelectIndex } from '../../../features/Preferences/preferenceSlice'
import {
  requestSetAdvancedData,
  requestGetAdvancedData
} from '../../../features/Preferences/advancedSlice'
import { requireSetNICData, requestGetNICData } from '../../../features/Preferences/generalSlice'
import { useDispatch, useSelector } from 'react-redux'
// import './PreferencesDialog.css'
const { Header, Sider, Content, Footer } = Layout
import Advanced from './Advanced/Advanced'

import General from './General/General'
import Mail from './Mail/Mail'
import SNMP from './SNMP/SNMP'
import Telegram from './Telegram/Telegram'

const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'

const items = [
  {
    label: 'General',
    key: 'general',
    page: <General />
  },
  {
    label: 'Mail',
    key: 'mail',
    page: <Mail />
  },
  {
    label: 'Telegram',
    key: 'telegram',
    page: <Telegram />
  },
  {
    label: 'SNMP',
    key: 'snmp',
    page: <SNMP />
  },
  {
    label: 'Advanced',
    key: 'advanced',
    page: <Advanced />
  }
]
const PreferencesDialog = ({ onClose }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)
  const dispatch = useDispatch()
  const { notification } = App.useApp()

  const configChangeFlag = [selectedPage].isConfigChange
  const configValidFlag = [selectedPage].validsData

  const handleMenuItemClick = ({ key }) => {
    // console.log(key)

    const fetchIndex = items.findIndex((e) => e.key === key)
    console.log(fetchIndex)

    if (fetchIndex === selectedIndex) return

    if (configChangeFlag && configValidFlag) {
      new Promise((resolve, reject) => {
        showConfirm(resolve, reject)
      })
        .then(() => {
          handleRequireSetData()
          handleChangePage(fetchIndex)
          return null
        })
        .catch(() => {
          handleChangePage(fetchIndex)
        })
    } else {
      handleChangePage(fetchIndex)
    }
  }
  const handleCancelButtonClick = () => {
    if (configChangeFlag && configValidFlag) {
      new Promise((resolve, reject) => {
        showConfirm(resolve, reject)
      })
        .then(() => {
          handleRequireSetData()
          onClose()
          return null
        })
        .catch(() => {
          onClose()
        })
    } else {
      onClose()
    }
  }
  const showConfirm = (resolve, reject) => {
    confirm({
      zIndex: 1500,
      title: CONFIRM_CONTENT_TXTT,
      okText: 'Save',
      onOk() {
        resolve()
      },
      onCancel() {
        reject()
      }
    })
  }
  const handleShowResult = (selectedIndex) => (result) => {
    const type = result ? 'success' : 'error'
    notification[type]({
      message: `${items[selectedIndex].label} settings ${
        result ? 'successfully saved.' : 'save error.'
      }`
    })
  }
  const handleRequireSetData = () => {
    switch (selectedIndex) {
      case 0:
        requireSetNICData(handleShowResult(selectedIndex))
        break
      case 4:
        requestSetAdvancedData(handleShowResult(selectedIndex))
        break

      default:
        break
    }
  }

  const handleChangePage = (fetchIndex) => {
    // const fetchIndex = items.findIndex((e) => e.key === e.key)
    // console.log(fetchIndex)
    switch (fetchIndex) {
      case 0:
        requestGetNICData()
        break
      case 4:
        requestGetAdvancedData()
        break

      default:
        break
    }
    dispatch(setSelectIndex(fetchIndex))
  }

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      width="100%"
      style={{
        top: '5px'
      }}
    >
      <Layout style={{ height: '89vh' }}>
        <Header
          style={{
            background: ' #6fbbd6',
            fontSize: 35,
            height: '80px',
            color: '#fff',
            fontWeight: 'bold'
          }}
          close={handleCancelButtonClick}
        >
          <SettingOutlined /> Preference
        </Header>

        <Layout style={{ height: '100vh' }}>
          <Sider
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              // selectedKeys={[selectedIndex]}
              style={{
                fontSize: '16px',
                color: 'white',
                position: 'relative'
                // top: '-10px'
              }}
              onClick={handleMenuItemClick}
              items={items}
            ></Menu>
          </Sider>
          <Content
            style={{
              padding: 24,
              margin: '24px 16px 24px',
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            {loading ? <Spin /> : items[selectedIndex].page}
          </Content>
        </Layout>
      </Layout>
    </Modal>

    // <Modal
    //   open
    //   width="100%"
    //   footer={null}
    //   style={{
    //     top: '5px'
    //   }}
    //   //   bodyStyle={{ height: '200px' }}
    // >
    //   <Layout style={{ height: '89vh' }}>
    //     <Header
    //       style={{
    //         background: '#000',
    //         color: '#fff',
    //         fontSize: '24px',
    //         fontWeight: 'bold'
    //       }}
    //     >
    //       Header
    //     </Header>
    //     <Layout style={{ height: '100vh' }}>
    //       <Sider
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           background: '#000',
    //           color: '#fff'
    //         }}
    //       >
    //         Sider
    //       </Sider>
    //       <Content
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           flexWrap: 'wrap',
    //           gap: '4px',
    //           fontSize: '24px',
    //           fontWeight: 'bold'
    //         }}
    //       >
    //         Content
    //       </Content>
    //     </Layout>
    //     {/* <Footer
    //       style={{
    //         background: '#000',
    //         color: '#fff',
    //         textAlign: 'center',
    //         fontSize: '10px',
    //         fontWeight: 'bold'
    //       }}
    //     >
    //       Footer
    //     </Footer> */}
    //   </Layout>
    // </Modal>
  )
}

export default PreferencesDialog
