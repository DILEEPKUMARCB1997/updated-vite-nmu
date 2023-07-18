/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Modal, Menu, Layout, App, Spin, theme } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import {
  preferenceSelector,
  setSelectIndex,
  clearPreferencesData
} from '../../../features/Preferences/preferenceSlice'

import {
  requestSetAdvancedData,
  requestGetAdvancedData
} from '../../../features/Preferences/advancedSlice'
import { requireSetNICData, requestGetNICData } from '../../../features/Preferences/generalSlice'

import { useDispatch, useSelector } from 'react-redux'
import Advanced from './Advanced/Advanced'
import General from './General/General'
import Mail from './Mail/Mail'
import SNMP from './SNMP/SNMP'
import Telegram from './Telegram/Telegram'
import {
  requestGetIPRange,
  requestGetSNMPData,
  requestSetSNMPData
} from '../../../features/Preferences/snmpSlice'
import { getTelegramToken } from '../../../features/Preferences/telegramSlice'
import { requestGetMail, requestSetMail } from '../../../features/Preferences/mailSlice'

const { Header, Sider, Content } = Layout

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
<<<<<<< HEAD
  const { modal } = App.useApp()
  const { useToken } = theme
  const { token } = useToken()

  const data = useSelector(preferenceSelector)
  const { loading, selectedIndex, selectedPage } = data

  const dispatch = useDispatch()
  const { notification } = App.useApp()
  console.log([selectedPage])

  const configChangeFlag = [selectedPage].isConfigChange
  const configValidFlag = [selectedPage].validsData
=======
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)
  console.log(selectedPage)

  const dispatch = useDispatch()
  const { notification, modal } = App.useApp()
  useEffect(() => {
    return () => {
      dispatch(clearPreferencesData())
    }
  }, [])

  // const configChangeFlag = [selectedPage].isConfigChange
  // const configValidFlag = ![selectedPage].validsData
  // console.log(configChangeFlag)
  // console.log(configValidFlag)

  const configChangeFlag = useSelector((state) => state[selectedPage].isConfigChange)
  const configValidFlag = useSelector(
    (state) => !Object.values(state[selectedPage].validsData).includes(false)
  )

  console.log(configChangeFlag)
  console.log(configValidFlag)
>>>>>>> be76a185b3c8421adfc82395c60931173898b2f8

  const handleMenuItemClick = ({ key }) => {
    console.log(key)
    const fetchIndex = items.findIndex((e) => e.key === key)
    console.log(fetchIndex)

    if (fetchIndex === selectedIndex) return
    if (configChangeFlag && configValidFlag) {
      console.log(configChangeFlag)
      console.log(configValidFlag)
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
<<<<<<< HEAD
    modal.warning({
=======
    modal.confirm({
>>>>>>> be76a185b3c8421adfc82395c60931173898b2f8
      zIndex: 1500,
      title: 'Do you want to save settings of this page?',
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
    notification.success({
      message: `${items[selectedIndex].label} settings ${
        result ? 'successfully saved.' : 'save error.'
      }`
    })
  }
  const handleRequireSetData = () => {
    console.log(selectedIndex)
    switch (selectedIndex) {
      case 0:
        dispatch(requireSetNICData(handleShowResult(selectedIndex)))
        break
      case 1:
        dispatch(requestSetMail(handleShowResult(selectedIndex)))
        break
      case 2:
        break
      case 3:
        dispatch(requestSetSNMPData(handleShowResult(selectedIndex)))
        break
      case 4:
        dispatch(requestSetAdvancedData(handleShowResult(selectedIndex)))
        break

      default:
        break
    }
  }

  const handleChangePage = (fetchIndex) => {
    switch (fetchIndex) {
      case 0:
        dispatch(requestGetNICData())
        break
      case 1:
        dispatch(requestGetMail())
        break
      case 2:
        dispatch(getTelegramToken())
        break
      case 3:
        dispatch(requestGetIPRange())
        dispatch(requestGetSNMPData())
        break
      case 4:
        dispatch(requestGetAdvancedData())
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
            background: token.colorPrimaryHover,
            fontSize: 35,
            height: '80px',
            color: '#fff',
            fontWeight: 'bold'
          }}
          onClick={handleCancelButtonClick}
        >
          <SettingOutlined /> Preference
        </Header>

        <Layout style={{ height: '100vh' }}>
          <Sider
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'left'
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
              // margin: '24px 16px 24px',
              minHeight: 280,
              background: token.colorBgContainer,
              overflow: 'auto'
            }}
          >
            {loading ? <Spin tip="Loading" size="small" /> : items[selectedIndex].page}
          </Content>
        </Layout>
      </Layout>
    </Modal>
  )
}

export default PreferencesDialog
