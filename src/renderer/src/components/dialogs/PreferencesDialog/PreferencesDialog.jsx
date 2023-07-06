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
import General from './General/General'
import Mail from './Mail/Mail'
import Telegram from './Telegram/Telegram'

const items = [
  {
    label: 'General ',
    page: <General />
  },
  { label: 'Mail', page: <Mail /> },
  { label: 'Telegram', page: <Telegram /> },
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

  useEffect(() => {
    dispatch(clearPreferencesData())
  }, [])

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

            position: 'relative',
            top: '-10px'
          }}
          // close={handleCancelButtonClick}
        >
          <SettingOutlined /> Preference
        </Header>
        <Layout hasSider style={{ height: '540px' }}>
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

          <Content>
            <div
              style={{
                // padding: 0,
                minHeight: 540,
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
