/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Modal, Menu, Layout, App, Spin, theme, Typography, Card, Tooltip } from 'antd'
import { BorderBottomOutlined, CarFilled, SettingOutlined } from '@ant-design/icons'
import {
  preferenceSelector,
  setSelectIndex,
  clearPreferencesData
} from '../../../features/Preferences/preferenceSlice'

import {
  requestSetAdvancedData,
  requestGetAdvancedData
} from '../../../features/Preferences/advancedSlice'
import {
  requireSetNICData,
  requestGetNICData,
  generalSelector
} from '../../../features/Preferences/generalSlice'

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

const { Sider, Content } = Layout

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

const PreferencesDialog = ({ onClose, tip = 'Loading' }) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { useToken } = theme
  const { token } = useToken()
  const { loading, selectedIndex, selectedPage } = useSelector(preferenceSelector)

  const dispatch = useDispatch()
  const { notification, modal } = App.useApp()
  useEffect(() => {
    return () => {
      dispatch(clearPreferencesData())
    }
  }, [])

  const configChangeFlag = useSelector((state) => state[selectedPage].isConfigChange)
  const configValidFlag = useSelector(
    (state) => !Object.values(state[selectedPage].validsData).includes(false)
  )

  const handleMenuItemClick = ({ key }) => {
    console.log(key)
    const fetchIndex = items.findIndex((e) => e.key === key)

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
    modal.confirm({
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
    //console.log(selectedIndex)
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
      title={
        <Typography.Title level={3}>
          <SettingOutlined /> - Preferences
        </Typography.Title>
      }
      onCancel={handleCancelButtonClick}
      footer={null}
      width="100%"
      style={{
        top: '20px',
        padding: '5px 5px 5px 5px'
        // padding: '0px'
      }}
      // bodyStyle={{ overflow: 'auto' }}
    >
      <Layout style={{ height: '80vh' }}>
        <Layout style={{ height: '100vh', margin: '0px', padding: '0px' }}>
          <Sider
            style={{
              backgroundColor: 'white',
              paddingTop: '10px'
            }}
          >
            <Menu
              mode="inline"
              // selectedKeys={[selectedIndex]}
              style={{
                fontSize: '16px',
                position: 'relative',
                height: '100%'
              }}
              onClick={handleMenuItemClick}
              items={items}
            ></Menu>
          </Sider>

          <Content
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              paddingRight: '15px',
              paddingLeft: '15px',
              minHeight: 280
            }}
          >
            <Card bordered={false} style={{ height: '100%', overflow: 'auto' }}>
              {loading ? (
                <Tooltip title="Loading">
                  <Spin size="large" />
                </Tooltip>
              ) : (
                items[selectedIndex].page
              )}
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Modal>
  )
}

export default PreferencesDialog
