/* eslint-disable no-unused-vars */
import React from 'react'
import { Modal, Menu, Layout, theme } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { preferenceSelector, setSelectIndex } from '../../../features/Preferences/preferenceSlice'
import {
  requestSetAdvancedData,
  requestGetAdvancedData
} from '../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'
import './PreferencesDialog.css'
const { Header, Sider } = Layout
import Advanced from './Advanced/Advanced'
import EnhanceSpin from './EnhanceSpin'
import General from './General/General'
import Mail from './Mail/Mail'
import Telegram from './Telegram/Telegram'
// import Mail from './Mail/Mail'

const items = [
  {
    label: 'General ',
    icon: <SettingOutlined />,
    page: <General />
  },
  { label: 'Mail', page: <Mail /> },
  { label: 'Telegram', page: <Telegram /> },
  { label: 'Mail' },
  { label: 'Telegram' },
  { label: 'SNMP' },
  { label: 'Advanced', page: <Advanced /> }
  // { label: 'Notifications', page: <NotificationsContainer /> },
]
const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'

const PreferencesDialog = ({ onClose }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const dispatch = useDispatch()
  const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)

  const configChangeFlag = [selectedPage].isConfigChange
  const configValidFlag = [selectedPage].validsData

  const handleMenuItemClick = (newIndex) => {
    if (newIndex === selectedIndex) return

    if (configChangeFlag && configValidFlag) {
      new Promise((resolve, reject) => {
        showConfirm(resolve, reject)
      })
        .then(() => {
          handleRequireSetData()
          handleChangePage(newIndex)
          return null
        })
        .catch(() => {
          handleChangePage(newIndex)
        })
    } else {
      handleChangePage(newIndex)
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
    const { selectedIndex } = this.props
    switch (selectedIndex) {
      case 4:
        requestSetAdvancedData(handleShowResult(selectedIndex))
        break

      default:
        break
    }
  }

  const handleChangePage = (newIndex) => {
    switch (newIndex) {
      case 4:
        requestGetAdvancedData()
        break

      default:
        break
    }
    setSelectIndex(newIndex)
  }

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
      bodyStyle={{ height: '100%' }}
    >
      <Layout>
        <Header
          style={{
            background: ' #6fbbd6',
            fontSize: 35,
            height: '90px',
            width: '1460px',
            position: 'relative',
            top: '-10px'
          }}
          // close={handleCancelButtonClick}
        >
          <SettingOutlined /> Preference
        </Header>
      </Layout>
      <Layout hasSider style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['5']}
            items={items}
            // onClick={handleMenuItemClick()}
            style={{ fontSize: '16px', color: 'white', position: 'relative', top: '-10px' }}
          />
        </Sider>
      </Layout>
      <div>
        <Modal
          open
          onCancel={onClose}
          footer={null}
          width="100%"
          // bodyStyle={{ height: '80vh', padding: '20px' }}
          // style={{
          //   top: 0,
          //   bottom: 0,
          //   left: 0,
          //   right: 0,
          //   marginLeft: 0,
          //   marginRight: 0,

          //   position: 'fixed'
          // }}
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
              close={handleCancelButtonClick}
            >
              <SettingOutlined /> Preference
            </Header>
            <Layout hasSider style={{ height: '540px' }}>
              <Sider>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['5']}
                    defaultOpenKeys={['5']}
                    style={{
                      fontSize: '16px',
                      color: 'white',
                      position: 'relative',
                      top: '-10px'
                    }}
                    items={items}
                    onClick={handleMenuItemClick()}
                    // key={item.label}
                    // className={selectedIndex === index ? 'navItem' : null}
                  >
                    {/* {items.map((item, index) => (
                    <MenuItem
                      key={item.label}
                      className={selectedIndex === index ? 'navItem' : null}
                      onClick={handleMenuItemClick()}
                    ></MenuItem>
                  ))} */}
                  </Menu>
                </div>
              </Sider>
              {loading ? <EnhanceSpin /> : items[selectedIndex].page}
            </Layout>
          </Layout>
        </Modal>
      </div>
    </Modal>
  )
}

export default PreferencesDialog
